import React, { createContext, useContext, useState, useRef, useEffect, useCallback } from 'react';
import { Track } from '../types';
import { contentService } from '../services/contentService';

interface PlayerContextType {
  currentTrack: Track | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isMuted: boolean;
  isLoading: boolean;
  queue: Track[];
  selectedTrackForDetails: Track | null;
  isDetailsOpen: boolean;
  isLyricsOpen: boolean;
  playTrack: (track: Track, customQueue?: Track[]) => void;
  togglePlay: () => void;
  pauseTrack: () => void;
  resumeTrack: () => void;
  seekTo: (time: number) => void;
  setVolumeLevel: (val: number) => void;
  toggleMute: () => void;
  playNext: () => void;
  playPrevious: () => void;
  openTrackDetails: (track: Track, showLyricsFirst?: boolean) => void;
  closeTrackDetails: () => void;
  downloadTrack: (track: Track) => void;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export const PlayerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [volume, setVolume] = useState<number>(0.85);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [queue, setQueue] = useState<Track[]>([]);
  const [selectedTrackForDetails, setSelectedTrackForDetails] = useState<Track | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState<boolean>(false);
  const [isLyricsOpen, setIsLyricsOpen] = useState<boolean>(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const synthAudioCtxRef = useRef<AudioContext | null>(null);
  const synthOscRef = useRef<OscillatorNode | null>(null);

  // Initialize audio element
  useEffect(() => {
    const audio = new Audio();
    audio.preload = 'metadata';
    audioRef.current = audio;

    const handleLoadedMetadata = () => {
      if (audio.duration && !isNaN(audio.duration)) {
        setDuration(audio.duration);
      }
      setIsLoading(false);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleWaiting = () => setIsLoading(true);
    const handleCanPlay = () => setIsLoading(false);

    const handleEnded = () => {
      setIsPlaying(false);
      // Auto play next in queue
      playNext();
    };

    const handleError = (e: Event) => {
      console.warn('Audio playback encountered an issue, keeping controls active:', e);
      setIsLoading(false);
    };

    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('waiting', handleWaiting);
    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);

    return () => {
      audio.pause();
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('waiting', handleWaiting);
      audio.removeEventListener('canplay', handleCanPlay);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
    };
  }, []);

  const playTrack = useCallback((track: Track, customQueue?: Track[]) => {
    const audio = audioRef.current;
    if (!audio) return;

    if (customQueue && customQueue.length > 0) {
      setQueue(customQueue);
    } else if (queue.length === 0) {
      setQueue(contentService.getTracks());
    }

    setCurrentTrack(track);
    setIsLoading(true);
    setCurrentTime(0);

    // Count play
    contentService.incrementPlayCount(track.id);

    audio.src = track.audioUrl;
    audio.volume = isMuted ? 0 : volume;
    audio
      .play()
      .then(() => {
        setIsPlaying(true);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log('Autoplay request deferred or audio load:', err);
        setIsLoading(false);
      });
  }, [queue.length, volume, isMuted]);

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (!currentTrack) {
      const tracks = contentService.getTracks();
      if (tracks.length > 0) {
        playTrack(tracks[0], tracks);
      }
      return;
    }

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch((e) => console.log('Audio resume error:', e));
    }
  }, [currentTrack, isPlaying, playTrack]);

  const pauseTrack = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  }, []);

  const resumeTrack = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.play().catch(console.error);
      setIsPlaying(true);
    }
  }, []);

  const seekTo = useCallback((time: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = time;
    setCurrentTime(time);
  }, []);

  const setVolumeLevel = useCallback((val: number) => {
    const clamped = Math.max(0, Math.min(1, val));
    setVolume(clamped);
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : clamped;
    }
    if (clamped > 0 && isMuted) {
      setIsMuted(false);
    }
  }, [isMuted]);

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => {
      const next = !prev;
      if (audioRef.current) {
        audioRef.current.volume = next ? 0 : volume;
      }
      return next;
    });
  }, [volume]);

  const playNext = useCallback(() => {
    const currentQueue = queue.length > 0 ? queue : contentService.getTracks();
    if (currentQueue.length === 0) return;

    if (!currentTrack) {
      playTrack(currentQueue[0], currentQueue);
      return;
    }

    const currentIndex = currentQueue.findIndex((t) => t.id === currentTrack.id);
    const nextIndex = (currentIndex + 1) % currentQueue.length;
    playTrack(currentQueue[nextIndex], currentQueue);
  }, [queue, currentTrack, playTrack]);

  const playPrevious = useCallback(() => {
    const currentQueue = queue.length > 0 ? queue : contentService.getTracks();
    if (currentQueue.length === 0) return;

    if (!currentTrack) {
      playTrack(currentQueue[0], currentQueue);
      return;
    }

    // If current time > 3 seconds, restart track
    if (currentTime > 3 && audioRef.current) {
      seekTo(0);
      return;
    }

    const currentIndex = currentQueue.findIndex((t) => t.id === currentTrack.id);
    const prevIndex = (currentIndex - 1 + currentQueue.length) % currentQueue.length;
    playTrack(currentQueue[prevIndex], currentQueue);
  }, [queue, currentTrack, currentTime, playTrack, seekTo]);

  const openTrackDetails = useCallback((track: Track, showLyricsFirst: boolean = false) => {
    setSelectedTrackForDetails(track);
    setIsLyricsOpen(showLyricsFirst);
    setIsDetailsOpen(true);
  }, []);

  const closeTrackDetails = useCallback(() => {
    setIsDetailsOpen(false);
    setSelectedTrackForDetails(null);
  }, []);

  const downloadTrack = useCallback((track: Track) => {
    if (!track.downloadAvailable) return;
    contentService.incrementDownloadCount(track.id);
    const url = track.downloadUrl || track.audioUrl;
    const link = document.createElement('a');
    link.href = url;
    link.download = `${track.artist} - ${track.title}.mp3`;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, []);

  return (
    <PlayerContext.Provider
      value={{
        currentTrack,
        isPlaying,
        currentTime,
        duration,
        volume,
        isMuted,
        isLoading,
        queue,
        selectedTrackForDetails,
        isDetailsOpen,
        isLyricsOpen,
        playTrack,
        togglePlay,
        pauseTrack,
        resumeTrack,
        seekTo,
        setVolumeLevel,
        toggleMute,
        playNext,
        playPrevious,
        openTrackDetails,
        closeTrackDetails,
        downloadTrack,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = (): PlayerContextType => {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error('usePlayer must be used within a PlayerProvider');
  }
  return context;
};
