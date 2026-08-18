import { Track, NewsArticle, ActivityEvent, StudioVideo, StudioInfo, StudioService, FeaturedArtist } from '../types';
import {
  INITIAL_TRACKS,
  INITIAL_NEWS,
  INITIAL_ACTIVITIES,
  INITIAL_VIDEOS,
  INITIAL_STUDIO_INFO,
  INITIAL_SERVICES,
  INITIAL_ARTISTS,
} from '../data/initialData';
import { 
  db, 
  auth, 
  handleFirestoreError, 
  OperationType,
  subscribeToTracks,
  subscribeToNews,
  subscribeToEvents,
  incrementTrackMetric,
  seedInitialFirestoreData,
  testFirestoreConnection
} from '../lib/firebase';
import { 
  collection, 
  doc, 
  setDoc, 
  deleteDoc, 
  updateDoc, 
  getDocs,
  getDoc 
} from 'firebase/firestore';

const STORAGE_KEYS = {
  TRACKS: 'melo_studio_tracks_v2',
  NEWS: 'melo_studio_news_v2',
  ACTIVITIES: 'melo_studio_activities_v2',
  VIDEOS: 'melo_studio_videos_v2',
  STUDIO_INFO: 'melo_studio_info_v2',
  ARTISTS: 'melo_studio_artists_v2',
  ADMIN_AUTH: 'melo_studio_admin_session_v1',
};

type Listener = () => void;
const listeners = new Set<Listener>();

function notifyChange() {
  listeners.forEach((listener) => {
    try {
      listener();
    } catch (e) {
      console.error('Error notifying listener:', e);
    }
  });
}

// In-memory synced state
let liveTracks: Track[] = INITIAL_TRACKS;
let liveNews: NewsArticle[] = INITIAL_NEWS;
let liveActivities: ActivityEvent[] = INITIAL_ACTIVITIES;
let isFirestoreInitialized = false;

// Initialize Firestore Subscriptions
function initFirestoreSync() {
  if (isFirestoreInitialized) return;
  isFirestoreInitialized = true;

  testFirestoreConnection();
  seedInitialFirestoreData();

  // Real-time Tracks from Firestore
  subscribeToTracks((tracks) => {
    liveTracks = tracks;
    try {
      localStorage.setItem(STORAGE_KEYS.TRACKS, JSON.stringify(tracks));
    } catch (e) {
      console.warn('Storage save warning:', e);
    }
    notifyChange();
  });

  // Real-time News from Firestore
  subscribeToNews((news) => {
    liveNews = news;
    try {
      localStorage.setItem(STORAGE_KEYS.NEWS, JSON.stringify(news));
    } catch (e) {
      console.warn('Storage save warning:', e);
    }
    notifyChange();
  });

  // Real-time Activities/Events from Firestore
  subscribeToEvents((events) => {
    liveActivities = events;
    try {
      localStorage.setItem(STORAGE_KEYS.ACTIVITIES, JSON.stringify(events));
    } catch (e) {
      console.warn('Storage save warning:', e);
    }
    notifyChange();
  });
}

// Start Firestore Sync immediately
initFirestoreSync();

export const contentService = {
  subscribe(listener: Listener) {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  },

  // --- TRACKS ---
  getTracks(): Track[] {
    if (liveTracks && liveTracks.length > 0) {
      return liveTracks;
    }
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.TRACKS);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error('Failed to parse tracks from storage:', e);
    }
    return INITIAL_TRACKS;
  },

  saveTracks(tracks: Track[]) {
    liveTracks = tracks;
    localStorage.setItem(STORAGE_KEYS.TRACKS, JSON.stringify(tracks));
    notifyChange();
  },

  async addTrack(track: Omit<Track, 'id' | 'playCount'>): Promise<Track> {
    const id = `track-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    const newTrack: Track = {
      ...track,
      id,
      playCount: 0,
    };

    // Update local immediately (optimistic UI)
    const current = this.getTracks();
    this.saveTracks([newTrack, ...current]);

    // Persist to Firestore
    try {
      await setDoc(doc(db, 'tracks', id), newTrack);
    } catch (err) {
      console.warn('Firestore write warning:', err);
    }

    return newTrack;
  },

  async updateTrack(id: string, updatedFields: Partial<Track>): Promise<Track | null> {
    const tracks = this.getTracks();
    const index = tracks.findIndex((t) => t.id === id);
    if (index === -1) return null;

    const updatedTrack = { ...tracks[index], ...updatedFields };
    tracks[index] = updatedTrack;
    this.saveTracks(tracks);

    // Sync to Firestore
    try {
      await updateDoc(doc(db, 'tracks', id), updatedFields);
    } catch (err) {
      console.warn('Firestore update warning:', err);
    }

    return updatedTrack;
  },

  async deleteTrack(id: string): Promise<boolean> {
    const tracks = this.getTracks();
    const filtered = tracks.filter((t) => t.id !== id);
    if (filtered.length !== tracks.length) {
      this.saveTracks(filtered);
      try {
        await deleteDoc(doc(db, 'tracks', id));
      } catch (err) {
        console.warn('Firestore delete warning:', err);
      }
      return true;
    }
    return false;
  },

  incrementPlayCount(id: string) {
    const tracks = this.getTracks();
    const track = tracks.find((t) => t.id === id);
    if (track) {
      track.playCount = (track.playCount || 0) + 1;
      this.saveTracks(tracks);
    }
    // Update live in Firestore
    incrementTrackMetric(id, 'playCount');
  },

  incrementDownloadCount(id: string) {
    incrementTrackMetric(id, 'downloadCount');
  },

  // --- NEWS ---
  getNews(): NewsArticle[] {
    if (liveNews && liveNews.length > 0) {
      return liveNews;
    }
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.NEWS);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error('Failed to parse news from storage:', e);
    }
    return INITIAL_NEWS;
  },

  saveNews(news: NewsArticle[]) {
    liveNews = news;
    localStorage.setItem(STORAGE_KEYS.NEWS, JSON.stringify(news));
    notifyChange();
  },

  async addNews(article: Omit<NewsArticle, 'id' | 'slug'>): Promise<NewsArticle> {
    const slug = article.title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');

    const id = `news-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    const newArticle: NewsArticle = {
      ...article,
      id,
      slug: `${slug}-${Date.now().toString().slice(-4)}`,
    };

    const current = this.getNews();
    this.saveNews([newArticle, ...current]);

    try {
      await setDoc(doc(db, 'news', id), newArticle);
    } catch (err) {
      console.warn('Firestore news write warning:', err);
    }

    return newArticle;
  },

  async updateNews(id: string, updatedFields: Partial<NewsArticle>): Promise<NewsArticle | null> {
    const articles = this.getNews();
    const index = articles.findIndex((n) => n.id === id);
    if (index === -1) return null;

    const updated = { ...articles[index], ...updatedFields };
    articles[index] = updated;
    this.saveNews(articles);

    try {
      await updateDoc(doc(db, 'news', id), updatedFields);
    } catch (err) {
      console.warn('Firestore news update warning:', err);
    }

    return updated;
  },

  async deleteNews(id: string): Promise<boolean> {
    const articles = this.getNews();
    const filtered = articles.filter((n) => n.id !== id);
    if (filtered.length !== articles.length) {
      this.saveNews(filtered);
      try {
        await deleteDoc(doc(db, 'news', id));
      } catch (err) {
        console.warn('Firestore news delete warning:', err);
      }
      return true;
    }
    return false;
  },

  // --- ACTIVITIES ---
  getActivities(): ActivityEvent[] {
    if (liveActivities && liveActivities.length > 0) {
      return liveActivities;
    }
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.ACTIVITIES);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error('Failed to parse activities from storage:', e);
    }
    return INITIAL_ACTIVITIES;
  },

  saveActivities(activities: ActivityEvent[]) {
    liveActivities = activities;
    localStorage.setItem(STORAGE_KEYS.ACTIVITIES, JSON.stringify(activities));
    notifyChange();
  },

  async addActivity(activity: Omit<ActivityEvent, 'id'>): Promise<ActivityEvent> {
    const id = `act-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    const newActivity: ActivityEvent = {
      ...activity,
      id,
    };

    const current = this.getActivities();
    this.saveActivities([newActivity, ...current]);

    try {
      await setDoc(doc(db, 'events', id), newActivity);
    } catch (err) {
      console.warn('Firestore event write warning:', err);
    }

    return newActivity;
  },

  async updateActivity(id: string, updatedFields: Partial<ActivityEvent>): Promise<ActivityEvent | null> {
    const activities = this.getActivities();
    const index = activities.findIndex((a) => a.id === id);
    if (index === -1) return null;

    const updated = { ...activities[index], ...updatedFields };
    activities[index] = updated;
    this.saveActivities(activities);

    try {
      await updateDoc(doc(db, 'events', id), updatedFields);
    } catch (err) {
      console.warn('Firestore event update warning:', err);
    }

    return updated;
  },

  async deleteActivity(id: string): Promise<boolean> {
    const activities = this.getActivities();
    const filtered = activities.filter((a) => a.id !== id);
    if (filtered.length !== activities.length) {
      this.saveActivities(filtered);
      try {
        await deleteDoc(doc(db, 'events', id));
      } catch (err) {
        console.warn('Firestore event delete warning:', err);
      }
      return true;
    }
    return false;
  },

  // --- VIDEOS ---
  getVideos(): StudioVideo[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.VIDEOS);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error('Failed to parse videos from storage:', e);
    }
    return INITIAL_VIDEOS;
  },

  saveVideos(videos: StudioVideo[]) {
    localStorage.setItem(STORAGE_KEYS.VIDEOS, JSON.stringify(videos));
    notifyChange();
  },

  addVideo(video: Omit<StudioVideo, 'id'>): StudioVideo {
    const videos = this.getVideos();
    const newVideo: StudioVideo = {
      ...video,
      id: `video-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    };
    this.saveVideos([newVideo, ...videos]);
    return newVideo;
  },

  updateVideo(id: string, updatedFields: Partial<StudioVideo>): StudioVideo | null {
    const videos = this.getVideos();
    const index = videos.findIndex((v) => v.id === id);
    if (index === -1) return null;

    videos[index] = { ...videos[index], ...updatedFields };
    this.saveVideos(videos);
    return videos[index];
  },

  deleteVideo(id: string): boolean {
    const videos = this.getVideos();
    const filtered = videos.filter((v) => v.id !== id);
    if (filtered.length !== videos.length) {
      this.saveVideos(filtered);
      return true;
    }
    return false;
  },

  // --- STUDIO INFO & SERVICES ---
  getStudioInfo(): StudioInfo {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.STUDIO_INFO);
      if (stored) {
        const parsed = JSON.parse(stored);
        return {
          ...INITIAL_STUDIO_INFO,
          ...parsed,
          contacts: {
            ...INITIAL_STUDIO_INFO.contacts,
            ...(parsed.contacts || {}),
          },
        };
      }
    } catch (e) {
      console.error('Failed to parse studio info from storage:', e);
    }
    return INITIAL_STUDIO_INFO;
  },

  async saveStudioInfo(info: StudioInfo) {
    localStorage.setItem(STORAGE_KEYS.STUDIO_INFO, JSON.stringify(info));
    notifyChange();
    try {
      await setDoc(doc(db, 'studio', 'settings'), info);
    } catch (err) {
      console.warn('Firestore studio info update warning:', err);
    }
  },

  getServices(): StudioService[] {
    return INITIAL_SERVICES;
  },

  // --- FEATURED ARTISTS ---
  getArtists(): FeaturedArtist[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.ARTISTS);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error('Failed to parse artists from storage:', e);
    }
    return INITIAL_ARTISTS;
  },

  saveArtists(artists: FeaturedArtist[]) {
    localStorage.setItem(STORAGE_KEYS.ARTISTS, JSON.stringify(artists));
    notifyChange();
  },

  getArtistById(id: string): FeaturedArtist | undefined {
    const artists = this.getArtists();
    return artists.find((a) => a.id === id);
  },

  // --- BACKUP & RESTORE ---
  exportBackupJSON(): string {
    const backup = {
      version: '1.0',
      exportedAt: new Date().toISOString(),
      studioInfo: this.getStudioInfo(),
      tracks: this.getTracks(),
      news: this.getNews(),
      activities: this.getActivities(),
      videos: this.getVideos(),
      artists: this.getArtists(),
    };
    return JSON.stringify(backup, null, 2);
  },

  importBackupJSON(jsonString: string): boolean {
    try {
      const data = JSON.parse(jsonString);
      if (data.tracks) this.saveTracks(data.tracks);
      if (data.news) this.saveNews(data.news);
      if (data.activities) this.saveActivities(data.activities);
      if (data.videos) this.saveVideos(data.videos);
      if (data.studioInfo) this.saveStudioInfo(data.studioInfo);
      if (data.artists) this.saveArtists(data.artists);
      notifyChange();
      return true;
    } catch (e) {
      console.error('Failed to import backup:', e);
      return false;
    }
  },

  resetToDefaults() {
    localStorage.removeItem(STORAGE_KEYS.TRACKS);
    localStorage.removeItem(STORAGE_KEYS.NEWS);
    localStorage.removeItem(STORAGE_KEYS.ACTIVITIES);
    localStorage.removeItem(STORAGE_KEYS.VIDEOS);
    localStorage.removeItem(STORAGE_KEYS.STUDIO_INFO);
    localStorage.removeItem(STORAGE_KEYS.ARTISTS);
    notifyChange();
  },

  // --- ADMIN AUTH HELPER ---
  isAdminAuthenticated(): boolean {
    if (auth.currentUser) return true;
    try {
      const session = sessionStorage.getItem(STORAGE_KEYS.ADMIN_AUTH);
      return session === 'authenticated_melo_admin';
    } catch {
      return false;
    }
  },

  setAdminAuthenticated(isAuthenticated: boolean) {
    if (isAuthenticated) {
      sessionStorage.setItem(STORAGE_KEYS.ADMIN_AUTH, 'authenticated_melo_admin');
    } else {
      sessionStorage.removeItem(STORAGE_KEYS.ADMIN_AUTH);
    }
    notifyChange();
  },
};
