export type MusicGenre = 'Kizomba' | 'Kuduro' | 'Semba' | 'Afro House' | 'Hip-Hop/Trap' | 'Outros';

export interface TrackCredits {
  producer?: string;
  mixingMastering?: string;
  recordingStudio?: string;
  composer?: string;
  additionalMusicians?: string[];
}

export interface Track {
  id: string;
  title: string;
  artist: string;
  featuredArtists?: string;
  genre: MusicGenre;
  coverUrl: string;
  audioUrl: string;
  releaseDate: string;
  duration?: string;
  description: string;
  lyrics?: string;
  credits: TrackCredits;
  downloadAvailable: boolean;
  downloadUrl?: string;
  featured?: boolean;
  playCount: number;
  downloadCount?: number;
}

export type NewsCategory = 'Lançamento' | 'Estúdio' | 'Artistas' | 'Bastidores' | 'Comunicado' | 'Entrevista';

export interface NewsArticle {
  id: string;
  title: string;
  slug: string;
  category: NewsCategory;
  coverUrl: string;
  summary: string;
  content: string;
  publishDate: string;
  author: string;
  readTimeMinutes?: number;
}

export type ActivityStatus = 'PRÓXIMO' | 'CONFIRMADO' | 'EM BREVE' | 'REALIZADO';

export interface ActivityEvent {
  id: string;
  title: string;
  type: 'Lançamento' | 'Concerto' | 'Sessão de Gravação' | 'Videoclipe' | 'Entrevista' | 'Workshop';
  status: ActivityStatus;
  date: string;
  time: string;
  location: string;
  coverUrl: string;
  description: string;
  link?: string;
  linkLabel?: string;
}

export type VideoCategory = 'Videoclipe' | 'Sessão de Estúdio' | 'Making Of' | 'Entrevista' | 'Trailer' | 'Ao Vivo';

export interface StudioVideo {
  id: string;
  title: string;
  youtubeIdOrUrl: string;
  category: VideoCategory;
  description: string;
  thumbnailUrl?: string;
  duration?: string;
  featured?: boolean;
}

export interface StudioService {
  id: string;
  title: string;
  iconName: 'Mic' | 'Music' | 'Sliders' | 'Sparkles' | 'Video' | 'Radio' | 'Disc' | 'Headphones';
  shortDescription: string;
  features: string[];
  recommendedFor: string;
}

export interface FeaturedArtist {
  id: string;
  name: string;
  stageName?: string;
  photoUrl: string;
  primaryGenre: MusicGenre;
  secondaryGenres?: string[];
  role: string;
  bio: string;
  instagram?: string;
  spotifyOrYoutube?: string;
  hitsRecordedAtStudio: string[];
  monthlyListenersOrStats?: string;
  verified?: boolean;
}

export interface StudioInfo {
  name: string;
  slogan: string;
  description: string;
  foundedYear: string;
  location: {
    city: string;
    country: string;
    address: string;
  };
  contacts: {
    phone: string;
    whatsapp: string;
    email: string;
  };
  socials: {
    youtube: string;
    instagram: string;
    facebook: string;
    tiktok: string;
    spotify?: string;
  };
  gearHighlights: string[];
}
