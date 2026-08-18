import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User 
} from 'firebase/auth';
import { 
  initializeFirestore, 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  setDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  onSnapshot,
  increment 
} from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';
import { Track, NewsArticle, ActivityEvent, StudioInfo } from '../types';
import { INITIAL_TRACKS, INITIAL_NEWS, INITIAL_ACTIVITIES, INITIAL_STUDIO_INFO } from '../data/initialData';

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Initialize Auth
export const auth = getAuth(app);

// Initialize Firestore with Force Long Polling to prevent WebChannel timeout in sandboxed iframes/proxies
export const db = initializeFirestore(
  app,
  {
    experimentalForceLongPolling: true,
  },
  firebaseConfig.firestoreDatabaseId
);

export const googleProvider = new GoogleAuthProvider();

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
  };
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errMessage = error instanceof Error ? error.message : String(error);
  
  // Non-fatal logging for network/offline states to prevent UI breakage
  const isOfflineOrUnavailable = 
    errMessage.includes('unavailable') || 
    errMessage.includes('offline') || 
    errMessage.includes('Could not reach Cloud Firestore backend');

  const errInfo: FirestoreErrorInfo = {
    error: errMessage,
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
    },
    operationType,
    path,
  };

  if (isOfflineOrUnavailable) {
    console.info(`Firestore operating with local state [${operationType} on ${path}]`);
  } else {
    console.error('Firestore Error: ', JSON.stringify(errInfo));
  }
}

// Check Connection gracefully
export async function testFirestoreConnection() {
  try {
    await getDoc(doc(db, 'studio', 'settings'));
  } catch (error: unknown) {
    // Normal non-blocking fallback
  }
}

// Seed initial tracks, news, events if empty
export async function seedInitialFirestoreData() {
  try {
    const tracksSnap = await getDocs(collection(db, 'tracks'));
    if (tracksSnap.empty) {
      for (const track of INITIAL_TRACKS) {
        await setDoc(doc(db, 'tracks', track.id), {
          ...track,
          downloadCount: track.downloadCount || 0,
          playCount: track.playCount || 0,
        });
      }
    }

    const newsSnap = await getDocs(collection(db, 'news'));
    if (newsSnap.empty) {
      for (const article of INITIAL_NEWS) {
        await setDoc(doc(db, 'news', article.id), article);
      }
    }

    const eventsSnap = await getDocs(collection(db, 'events'));
    if (eventsSnap.empty) {
      for (const event of INITIAL_ACTIVITIES) {
        await setDoc(doc(db, 'events', event.id), event);
      }
    }

    const studioDoc = await getDoc(doc(db, 'studio', 'settings'));
    if (!studioDoc.exists()) {
      await setDoc(doc(db, 'studio', 'settings'), INITIAL_STUDIO_INFO);
    }
  } catch (err: unknown) {
    // Suppress network-unavailable errors during initial seeding; local cache will serve data
  }
}

// Real-Time Listeners with resilient fallback
export function subscribeToTracks(
  onSuccess: (tracks: Track[]) => void, 
  onError?: (err: unknown) => void
) {
  return onSnapshot(
    collection(db, 'tracks'),
    (snapshot) => {
      if (snapshot.empty) {
        onSuccess(INITIAL_TRACKS);
        return;
      }
      const tracks: Track[] = [];
      snapshot.forEach((doc) => {
        tracks.push({ id: doc.id, ...doc.data() } as Track);
      });
      onSuccess(tracks);
    },
    (error) => {
      const isOffline = error?.code === 'unavailable' || error?.message?.includes('offline') || error?.message?.includes('unavailable');
      if (isOffline) {
        onSuccess(INITIAL_TRACKS);
      } else {
        handleFirestoreError(error, OperationType.LIST, 'tracks');
      }
      if (onError) onError(error);
    }
  );
}

export function subscribeToNews(
  onSuccess: (articles: NewsArticle[]) => void,
  onError?: (err: unknown) => void
) {
  return onSnapshot(
    collection(db, 'news'),
    (snapshot) => {
      if (snapshot.empty) {
        onSuccess(INITIAL_NEWS);
        return;
      }
      const news: NewsArticle[] = [];
      snapshot.forEach((doc) => {
        news.push({ id: doc.id, ...doc.data() } as NewsArticle);
      });
      onSuccess(news);
    },
    (error) => {
      const isOffline = error?.code === 'unavailable' || error?.message?.includes('offline') || error?.message?.includes('unavailable');
      if (isOffline) {
        onSuccess(INITIAL_NEWS);
      } else {
        handleFirestoreError(error, OperationType.LIST, 'news');
      }
      if (onError) onError(error);
    }
  );
}

export function subscribeToEvents(
  onSuccess: (events: ActivityEvent[]) => void,
  onError?: (err: unknown) => void
) {
  return onSnapshot(
    collection(db, 'events'),
    (snapshot) => {
      if (snapshot.empty) {
        onSuccess(INITIAL_ACTIVITIES);
        return;
      }
      const events: ActivityEvent[] = [];
      snapshot.forEach((doc) => {
        events.push({ id: doc.id, ...doc.data() } as ActivityEvent);
      });
      onSuccess(events);
    },
    (error) => {
      const isOffline = error?.code === 'unavailable' || error?.message?.includes('offline') || error?.message?.includes('unavailable');
      if (isOffline) {
        onSuccess(INITIAL_ACTIVITIES);
      } else {
        handleFirestoreError(error, OperationType.LIST, 'events');
      }
      if (onError) onError(error);
    }
  );
}

// Increment download / play counters
export async function incrementTrackMetric(trackId: string, metric: 'playCount' | 'downloadCount') {
  const path = `tracks/${trackId}`;
  try {
    const trackRef = doc(db, 'tracks', trackId);
    await updateDoc(trackRef, {
      [metric]: increment(1),
    });
  } catch (error) {
    // Non-blocking catch for public counters
  }
}

// Submit artist booking request to Firestore
export async function submitBookingRequest(bookingData: {
  name: string;
  phone: string;
  email?: string;
  serviceType: string;
  preferredDate?: string;
  message: string;
}) {
  const path = 'bookings';
  try {
    const docRef = await addDoc(collection(db, path), {
      ...bookingData,
      status: 'PENDING',
      createdAt: new Date().toISOString(),
    });
    return docRef.id;
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
  }
}

// Authentication Helpers
export async function signInWithGoogle() {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error) {
    console.error('Google Sign In Error:', error);
    throw error;
  }
}

export async function signOutUser() {
  try {
    await firebaseSignOut(auth);
  } catch (error) {
    console.error('Sign Out Error:', error);
    throw error;
  }
}
