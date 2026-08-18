import React, { useState, useEffect } from 'react';
import { 
  X, 
  Lock, 
  Unlock, 
  Music, 
  Newspaper, 
  CalendarDays, 
  Youtube, 
  Settings, 
  Plus, 
  Trash2, 
  Edit, 
  Save, 
  Check, 
  AlertCircle, 
  Download, 
  Upload, 
  RotateCcw,
  Sparkles,
  Sliders,
  Code2,
  Copy,
  Database,
  Radio
} from 'lucide-react';
import { contentService } from '../services/contentService';
import { signInWithGoogle, signOutUser, auth } from '../lib/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { 
  Track, 
  MusicGenre, 
  NewsArticle, 
  NewsCategory, 
  ActivityEvent, 
  ActivityStatus, 
  StudioVideo, 
  VideoCategory, 
  StudioInfo 
} from '../types';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'tracks' | 'news' | 'activities' | 'videos' | 'settings' | 'backup' | 'blogger';
}

export const AdminModal: React.FC<AdminModalProps> = ({ isOpen, onClose, initialTab = 'tracks' }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(contentService.isAdminAuthenticated());
  const [pinInput, setPinInput] = useState<string>('');
  const [authError, setAuthError] = useState<string>('');

  const [activeTab, setActiveTab] = useState<'tracks' | 'news' | 'activities' | 'videos' | 'settings' | 'backup' | 'blogger'>(initialTab);

  // Lists
  const [tracks, setTracks] = useState<Track[]>(contentService.getTracks());
  const [news, setNews] = useState<NewsArticle[]>(contentService.getNews());
  const [activities, setActivities] = useState<ActivityEvent[]>(contentService.getActivities());
  const [videos, setVideos] = useState<StudioVideo[]>(contentService.getVideos());
  const [studioInfo, setStudioInfo] = useState<StudioInfo>(contentService.getStudioInfo());

  // Editing items state
  const [editingTrack, setEditingTrack] = useState<Partial<Track> | null>(null);
  const [editingNews, setEditingNews] = useState<Partial<NewsArticle> | null>(null);
  const [editingActivity, setEditingActivity] = useState<Partial<ActivityEvent> | null>(null);
  const [editingVideo, setEditingVideo] = useState<Partial<StudioVideo> | null>(null);

  const [successToast, setSuccessToast] = useState<string>('');
  const [backupJsonString, setBackupJsonString] = useState<string>('');

  const [firebaseUser, setFirebaseUser] = useState<User | null>(auth.currentUser);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      setFirebaseUser(user);
      if (user) {
        setIsAuthenticated(true);
      }
    });

    const unsubscribeContent = contentService.subscribe(() => {
      setTracks(contentService.getTracks());
      setNews(contentService.getNews());
      setActivities(contentService.getActivities());
      setVideos(contentService.getVideos());
      setStudioInfo(contentService.getStudioInfo());
    });

    return () => {
      unsubscribeAuth();
      unsubscribeContent();
    };
  }, []);

  const showToast = (msg: string) => {
    setSuccessToast(msg);
    setTimeout(() => setSuccessToast(''), 3000);
  };

  const handleGoogleLogin = async () => {
    try {
      setAuthError('');
      const user = await signInWithGoogle();
      if (user) {
        setIsAuthenticated(true);
        showToast(`Bem-vindo, ${user.displayName || user.email}!`);
      }
    } catch (err: unknown) {
      console.error(err);
      setAuthError('Erro ao autenticar com Google. Tente novamente ou use a senha.');
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Default PIN: "melo2025" or "1234"
    if (pinInput.trim() === 'melo2025' || pinInput.trim() === '1234' || pinInput.trim() === 'admin') {
      contentService.setAdminAuthenticated(true);
      setIsAuthenticated(true);
      setAuthError('');
      showToast('Acesso concedido com sucesso!');
    } else {
      setAuthError('Senha de administrador incorreta. Tente "melo2025"');
    }
  };

  const handleLogout = async () => {
    await signOutUser();
    contentService.setAdminAuthenticated(false);
    setIsAuthenticated(false);
    setPinInput('');
  };

  if (!isOpen) return null;

  // --- TRACK HANDLERS ---
  const handleSaveTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTrack || !editingTrack.title || !editingTrack.artist) {
      alert('Por favor preencha pelo menos Título e Artista');
      return;
    }

    const payload: Omit<Track, 'id' | 'playCount'> = {
      title: editingTrack.title || 'Nova Música',
      artist: editingTrack.artist || 'Artista MELO',
      featuredArtists: editingTrack.featuredArtists || '',
      genre: (editingTrack.genre as MusicGenre) || 'Kizomba',
      coverUrl: editingTrack.coverUrl || 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop&q=80',
      audioUrl: editingTrack.audioUrl || 'https://actions.google.com/sounds/v1/ambiences/outdoor_evening_crickets.ogg',
      releaseDate: editingTrack.releaseDate || new Date().toISOString().split('T')[0],
      duration: editingTrack.duration || '03:30',
      description: editingTrack.description || 'Produzido no MELO MUSIC-studio',
      lyrics: editingTrack.lyrics || '',
      credits: {
        producer: editingTrack.credits?.producer || 'Melo Producer',
        mixingMastering: editingTrack.credits?.mixingMastering || 'MELO Studio Suite',
        recordingStudio: editingTrack.credits?.recordingStudio || 'MELO MUSIC-studio Luanda',
        composer: editingTrack.credits?.composer || editingTrack.artist,
      },
      downloadAvailable: editingTrack.downloadAvailable ?? true,
      downloadUrl: editingTrack.downloadUrl || editingTrack.audioUrl,
      featured: editingTrack.featured ?? false,
    };

    if (editingTrack.id) {
      contentService.updateTrack(editingTrack.id, payload);
      showToast('Música atualizada com sucesso!');
    } else {
      contentService.addTrack(payload);
      showToast('Nova música adicionada com sucesso!');
    }

    setEditingTrack(null);
  };

  const handleDeleteTrack = (id: string) => {
    if (confirm('Tem certeza que deseja eliminar esta música?')) {
      contentService.deleteTrack(id);
      showToast('Música eliminada com sucesso.');
    }
  };

  // --- NEWS HANDLERS ---
  const handleSaveNews = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingNews || !editingNews.title) {
      alert('Preencha o título da notícia');
      return;
    }

    const payload: Omit<NewsArticle, 'id' | 'slug'> = {
      title: editingNews.title || 'Novidade no Estúdio',
      category: (editingNews.category as NewsCategory) || 'Estúdio',
      coverUrl: editingNews.coverUrl || 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=1000&auto=format&fit=crop&q=80',
      summary: editingNews.summary || '',
      content: editingNews.content || '',
      publishDate: editingNews.publishDate || new Date().toISOString().split('T')[0],
      author: editingNews.author || 'Equipa MELO',
      readTimeMinutes: editingNews.readTimeMinutes || 3,
    };

    if (editingNews.id) {
      contentService.updateNews(editingNews.id, payload);
      showToast('Notícia atualizada!');
    } else {
      contentService.addNews(payload);
      showToast('Notícia publicada com sucesso!');
    }

    setEditingNews(null);
  };

  const handleDeleteNews = (id: string) => {
    if (confirm('Tem certeza que deseja eliminar esta notícia?')) {
      contentService.deleteNews(id);
      showToast('Notícia eliminada.');
    }
  };

  // --- ACTIVITIES HANDLERS ---
  const handleSaveActivity = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingActivity || !editingActivity.title) {
      alert('Preencha o título da atividade');
      return;
    }

    const payload: Omit<ActivityEvent, 'id'> = {
      title: editingActivity.title || 'Nova Atividade',
      type: (editingActivity.type as any) || 'Sessão de Gravação',
      status: (editingActivity.status as ActivityStatus) || 'CONFIRMADO',
      date: editingActivity.date || new Date().toISOString().split('T')[0],
      time: editingActivity.time || '19:00',
      location: editingActivity.location || 'MELO MUSIC-studio',
      coverUrl: editingActivity.coverUrl || 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&auto=format&fit=crop&q=80',
      description: editingActivity.description || '',
      link: editingActivity.link || '',
      linkLabel: editingActivity.linkLabel || 'Saber Mais',
    };

    if (editingActivity.id) {
      contentService.updateActivity(editingActivity.id, payload);
      showToast('Atividade atualizada!');
    } else {
      contentService.addActivity(payload);
      showToast('Atividade adicionada com sucesso!');
    }

    setEditingActivity(null);
  };

  const handleDeleteActivity = (id: string) => {
    if (confirm('Tem certeza que deseja eliminar esta atividade?')) {
      contentService.deleteActivity(id);
      showToast('Atividade eliminada.');
    }
  };

  // --- VIDEOS HANDLERS ---
  const handleSaveVideo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingVideo || !editingVideo.title || !editingVideo.youtubeIdOrUrl) {
      alert('Preencha o título e o ID/URL do YouTube');
      return;
    }

    const payload: Omit<StudioVideo, 'id'> = {
      title: editingVideo.title || 'Novo Vídeo',
      youtubeIdOrUrl: editingVideo.youtubeIdOrUrl || '',
      category: (editingVideo.category as VideoCategory) || 'Videoclipe',
      description: editingVideo.description || '',
      thumbnailUrl: editingVideo.thumbnailUrl || 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop&q=80',
      duration: editingVideo.duration || '03:45',
      featured: editingVideo.featured ?? false,
    };

    if (editingVideo.id) {
      contentService.updateVideo(editingVideo.id, payload);
      showToast('Vídeo atualizado!');
    } else {
      contentService.addVideo(payload);
      showToast('Vídeo adicionado com sucesso!');
    }

    setEditingVideo(null);
  };

  const handleDeleteVideo = (id: string) => {
    if (confirm('Tem certeza que deseja eliminar este vídeo?')) {
      contentService.deleteVideo(id);
      showToast('Vídeo eliminado.');
    }
  };

  // --- STUDIO INFO HANDLER ---
  const handleSaveStudioInfo = (e: React.FormEvent) => {
    e.preventDefault();
    contentService.saveStudioInfo(studioInfo);
    showToast('Informações do estúdio guardadas!');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-5xl max-h-[92vh] bg-[#101015] border border-[#24242c] rounded-2xl shadow-[0_0_60px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Topbar */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#0a0a0d] border-b border-[#202028]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-to-r from-[#0066FF] to-[#FF2A54] text-white">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black text-white uppercase tracking-wider flex items-center gap-2">
                Painel Administrativo
                <span className="text-[10px] px-2 py-0.5 rounded bg-[#00D2FF]/20 text-[#00D2FF] font-bold border border-[#00D2FF]/40">
                  MELO CMS
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 font-bold border border-emerald-500/30">
                  <Radio className="w-2.5 h-2.5 animate-pulse text-emerald-400" />
                  Firestore Live
                </span>
              </h2>
              <p className="text-xs text-zinc-400">
                Gerencie músicas, novidades, atividades, vídeos e configurações com persistência em tempo real no Firebase.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAuthenticated && (
              <div className="flex items-center gap-2">
                {firebaseUser && (
                  <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 bg-[#14141c] border border-[#242432] rounded-lg text-xs text-zinc-300">
                    {firebaseUser.photoURL && (
                      <img src={firebaseUser.photoURL} alt={firebaseUser.displayName || ''} className="w-4 h-4 rounded-full" />
                    )}
                    <span className="font-medium truncate max-w-[120px]">{firebaseUser.displayName || firebaseUser.email}</span>
                  </div>
                )}
                <button
                  onClick={handleLogout}
                  className="px-3 py-1.5 bg-[#181820] hover:bg-[#22222c] text-zinc-300 hover:text-white rounded-xl text-xs font-semibold border border-[#2a2a36] transition-colors"
                >
                  Terminar Sessão
                </button>
              </div>
            )}
            <button
              onClick={onClose}
              aria-label="Fechar Painel"
              className="p-2 text-zinc-400 hover:text-white hover:bg-[#1a1a22] rounded-xl transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Success Toast */}
        {successToast && (
          <div className="bg-emerald-600/90 text-white text-xs font-bold px-4 py-2 text-center flex items-center justify-center gap-2 animate-in slide-in-from-top-2">
            <Check className="w-4 h-4" />
            <span>{successToast}</span>
          </div>
        )}

        {!isAuthenticated ? (
          /* Authentication Screen */
          <div className="p-8 sm:p-12 text-center max-w-md mx-auto space-y-6 flex-1 flex flex-col justify-center">
            <div className="w-16 h-16 rounded-2xl bg-[#141418] border border-[#262632] flex items-center justify-center text-[#FF2A54] mx-auto shadow-xl">
              <Lock className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <h3 className="text-xl font-bold text-white">Área Restrita do Estúdio</h3>
              <p className="text-xs text-zinc-400">
                Acesse o painel com sua conta Google de administrador ou com a senha de estúdio.
              </p>
            </div>

            {/* Google Login Option */}
            <button
              onClick={handleGoogleLogin}
              type="button"
              className="w-full py-3 px-4 rounded-xl bg-[#1a1a24] hover:bg-[#242434] text-white font-bold text-xs border border-[#303044] hover:border-[#00D2FF]/50 shadow-md flex items-center justify-center gap-3 transition-all"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              <span>Entrar com Conta Google</span>
            </button>

            <div className="relative flex items-center justify-center">
              <div className="border-t border-[#222230] w-full absolute" />
              <span className="bg-[#121218] px-3 text-[11px] text-zinc-500 font-medium relative z-10">ou use a senha</span>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <input
                  type="password"
                  placeholder="Senha de Acesso (ex: melo2025)"
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value)}
                  className="w-full px-4 py-3 bg-[#0a0a0d] border border-[#24242c] focus:border-[#00D2FF] text-center text-sm text-white rounded-xl focus:outline-none tracking-widest"
                />
                {authError && (
                  <p className="text-xs text-[#FF2A54] mt-2 font-medium">{authError}</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#0066FF] to-[#00D2FF] text-white font-bold text-xs shadow-lg shadow-blue-500/25 hover:brightness-110 transition-all"
              >
                Acessar com Senha
              </button>

              <p className="text-[11px] text-zinc-500">
                Dica de demonstração: Senha <code className="text-zinc-300 font-mono font-bold">melo2025</code>
              </p>
            </form>
          </div>
        ) : (
          /* Authenticated CMS Workspace */
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* CMS Navigation Tabs */}
            <div className="flex border-b border-[#202028] bg-[#0c0c0f] px-6 overflow-x-auto scrollbar-none">
              <button
                onClick={() => { setActiveTab('tracks'); setEditingTrack(null); }}
                className={`flex items-center gap-2 py-3 px-4 text-xs font-bold border-b-2 transition-all whitespace-nowrap ${
                  activeTab === 'tracks'
                    ? 'border-[#00D2FF] text-[#00D2FF]'
                    : 'border-transparent text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <Music className="w-4 h-4" />
                <span>Músicas ({tracks.length})</span>
              </button>

              <button
                onClick={() => { setActiveTab('news'); setEditingNews(null); }}
                className={`flex items-center gap-2 py-3 px-4 text-xs font-bold border-b-2 transition-all whitespace-nowrap ${
                  activeTab === 'news'
                    ? 'border-[#00D2FF] text-[#00D2FF]'
                    : 'border-transparent text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <Newspaper className="w-4 h-4" />
                <span>Novidades ({news.length})</span>
              </button>

              <button
                onClick={() => { setActiveTab('activities'); setEditingActivity(null); }}
                className={`flex items-center gap-2 py-3 px-4 text-xs font-bold border-b-2 transition-all whitespace-nowrap ${
                  activeTab === 'activities'
                    ? 'border-[#00D2FF] text-[#00D2FF]'
                    : 'border-transparent text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <CalendarDays className="w-4 h-4" />
                <span>Atividades ({activities.length})</span>
              </button>

              <button
                onClick={() => { setActiveTab('videos'); setEditingVideo(null); }}
                className={`flex items-center gap-2 py-3 px-4 text-xs font-bold border-b-2 transition-all whitespace-nowrap ${
                  activeTab === 'videos'
                    ? 'border-[#00D2FF] text-[#00D2FF]'
                    : 'border-transparent text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <Youtube className="w-4 h-4" />
                <span>Vídeos ({videos.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('settings')}
                className={`flex items-center gap-2 py-3 px-4 text-xs font-bold border-b-2 transition-all whitespace-nowrap ${
                  activeTab === 'settings'
                    ? 'border-[#00D2FF] text-[#00D2FF]'
                    : 'border-transparent text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <Settings className="w-4 h-4" />
                <span>Informações do Estúdio</span>
              </button>

              <button
                onClick={() => setActiveTab('backup')}
                className={`flex items-center gap-2 py-3 px-4 text-xs font-bold border-b-2 transition-all whitespace-nowrap ${
                  activeTab === 'backup'
                    ? 'border-[#00D2FF] text-[#00D2FF]'
                    : 'border-transparent text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <Sliders className="w-4 h-4" />
                <span>Backup & Dados</span>
              </button>

              <button
                onClick={() => setActiveTab('blogger')}
                className={`flex items-center gap-2 py-3 px-4 text-xs font-bold border-b-2 transition-all whitespace-nowrap ${
                  activeTab === 'blogger'
                    ? 'border-[#F59E0B] text-[#F59E0B]'
                    : 'border-transparent text-zinc-400 hover:text-[#F59E0B]'
                }`}
              >
                <Code2 className="w-4 h-4 text-[#F59E0B]" />
                <span>Integração Blogger</span>
              </button>
            </div>

            {/* Tab Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar bg-[#101015]">
              
              {/* === TRACKS TAB === */}
              {activeTab === 'tracks' && (
                <div className="space-y-6">
                  {editingTrack ? (
                    /* Edit / Add Track Form */
                    <form onSubmit={handleSaveTrack} className="p-6 rounded-2xl bg-[#141418] border border-[#24242c] space-y-4">
                      <div className="flex items-center justify-between pb-3 border-b border-[#202028]">
                        <h4 className="text-sm font-bold text-white flex items-center gap-2">
                          <Music className="w-4 h-4 text-[#00D2FF]" />
                          {editingTrack.id ? 'Editar Música' : 'Adicionar Nova Música'}
                        </h4>
                        <button
                          type="button"
                          onClick={() => setEditingTrack(null)}
                          className="text-xs text-zinc-400 hover:text-white"
                        >
                          Cancelar
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-zinc-300 mb-1">Título da Música *</label>
                          <input
                            type="text"
                            required
                            placeholder="ex: Noite Quente"
                            value={editingTrack.title || ''}
                            onChange={(e) => setEditingTrack({ ...editingTrack, title: e.target.value })}
                            className="w-full px-3.5 py-2 bg-[#0a0a0d] border border-[#24242c] focus:border-[#00D2FF] rounded-xl text-xs text-white"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-zinc-300 mb-1">Artista Principal *</label>
                          <input
                            type="text"
                            required
                            placeholder="ex: Melo & Artista Convidado"
                            value={editingTrack.artist || ''}
                            onChange={(e) => setEditingTrack({ ...editingTrack, artist: e.target.value })}
                            className="w-full px-3.5 py-2 bg-[#0a0a0d] border border-[#24242c] focus:border-[#00D2FF] rounded-xl text-xs text-white"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-zinc-300 mb-1">Artistas Convidados (ft.)</label>
                          <input
                            type="text"
                            placeholder="ex: ft. Soraia Silva"
                            value={editingTrack.featuredArtists || ''}
                            onChange={(e) => setEditingTrack({ ...editingTrack, featuredArtists: e.target.value })}
                            className="w-full px-3.5 py-2 bg-[#0a0a0d] border border-[#24242c] focus:border-[#00D2FF] rounded-xl text-xs text-white"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-zinc-300 mb-1">Género Musical</label>
                          <select
                            value={editingTrack.genre || 'Kizomba'}
                            onChange={(e) => setEditingTrack({ ...editingTrack, genre: e.target.value as MusicGenre })}
                            className="w-full px-3.5 py-2 bg-[#0a0a0d] border border-[#24242c] focus:border-[#00D2FF] rounded-xl text-xs text-white"
                          >
                            <option value="Kizomba">Kizomba</option>
                            <option value="Kuduro">Kuduro</option>
                            <option value="Semba">Semba</option>
                            <option value="Afro House">Afro House</option>
                            <option value="Hip-Hop/Trap">Hip-Hop/Trap</option>
                            <option value="Outros">Outros</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-zinc-300 mb-1">URL da Imagem de Capa</label>
                          <input
                            type="url"
                            placeholder="https://..."
                            value={editingTrack.coverUrl || ''}
                            onChange={(e) => setEditingTrack({ ...editingTrack, coverUrl: e.target.value })}
                            className="w-full px-3.5 py-2 bg-[#0a0a0d] border border-[#24242c] focus:border-[#00D2FF] rounded-xl text-xs text-white font-mono"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-zinc-300 mb-1">URL do Áudio (MP3 / Stream)</label>
                          <input
                            type="url"
                            placeholder="https://...mp3"
                            value={editingTrack.audioUrl || ''}
                            onChange={(e) => setEditingTrack({ ...editingTrack, audioUrl: e.target.value })}
                            className="w-full px-3.5 py-2 bg-[#0a0a0d] border border-[#24242c] focus:border-[#00D2FF] rounded-xl text-xs text-white font-mono"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-zinc-300 mb-1">Data de Lançamento</label>
                          <input
                            type="date"
                            value={editingTrack.releaseDate || ''}
                            onChange={(e) => setEditingTrack({ ...editingTrack, releaseDate: e.target.value })}
                            className="w-full px-3.5 py-2 bg-[#0a0a0d] border border-[#24242c] focus:border-[#00D2FF] rounded-xl text-xs text-white"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-zinc-300 mb-1">Duração (mm:ss)</label>
                          <input
                            type="text"
                            placeholder="03:45"
                            value={editingTrack.duration || ''}
                            onChange={(e) => setEditingTrack({ ...editingTrack, duration: e.target.value })}
                            className="w-full px-3.5 py-2 bg-[#0a0a0d] border border-[#24242c] focus:border-[#00D2FF] rounded-xl text-xs text-white font-mono"
                          />
                        </div>
                      </div>

                      {/* Download Checkbox & URL */}
                      <div className="p-3.5 rounded-xl bg-[#0a0a0d] border border-[#202028] space-y-3">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={editingTrack.downloadAvailable ?? true}
                            onChange={(e) => setEditingTrack({ ...editingTrack, downloadAvailable: e.target.checked })}
                            className="rounded bg-[#141418] border-[#24242c] text-[#00D2FF] focus:ring-0"
                          />
                          <span className="text-xs font-bold text-white">Disponibilizar Botão de Download MP3 para o público</span>
                        </label>

                        {editingTrack.downloadAvailable && (
                          <div>
                            <label className="block text-[11px] text-zinc-400 mb-1">URL Direto do Ficheiro de Download (opcional, usa o áudio padrão caso vazio)</label>
                            <input
                              type="url"
                              placeholder="https://..."
                              value={editingTrack.downloadUrl || ''}
                              onChange={(e) => setEditingTrack({ ...editingTrack, downloadUrl: e.target.value })}
                              className="w-full px-3 py-1.5 bg-[#141418] border border-[#24242c] text-xs text-white font-mono rounded-lg"
                            />
                          </div>
                        )}
                      </div>

                      {/* Lyrics & Credits */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                        <div>
                          <label className="block text-xs font-bold text-zinc-300 mb-1">Letra da Música</label>
                          <textarea
                            rows={4}
                            placeholder="Insira a letra da música aqui..."
                            value={editingTrack.lyrics || ''}
                            onChange={(e) => setEditingTrack({ ...editingTrack, lyrics: e.target.value })}
                            className="w-full px-3.5 py-2 bg-[#0a0a0d] border border-[#24242c] focus:border-[#00D2FF] rounded-xl text-xs text-white"
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="block text-xs font-bold text-zinc-300">Ficha Técnica do Estúdio</label>
                          <input
                            type="text"
                            placeholder="Produtor (ex: Melo Producer)"
                            value={editingTrack.credits?.producer || ''}
                            onChange={(e) => setEditingTrack({
                              ...editingTrack,
                              credits: { ...editingTrack.credits, producer: e.target.value }
                            })}
                            className="w-full px-3.5 py-1.5 bg-[#0a0a0d] border border-[#24242c] rounded-lg text-xs text-white"
                          />
                          <input
                            type="text"
                            placeholder="Mix & Master (ex: MELO Pro Lab)"
                            value={editingTrack.credits?.mixingMastering || ''}
                            onChange={(e) => setEditingTrack({
                              ...editingTrack,
                              credits: { ...editingTrack.credits, mixingMastering: e.target.value }
                            })}
                            className="w-full px-3.5 py-1.5 bg-[#0a0a0d] border border-[#24242c] rounded-lg text-xs text-white"
                          />
                          <input
                            type="text"
                            placeholder="Estúdio de Gravação"
                            value={editingTrack.credits?.recordingStudio || ''}
                            onChange={(e) => setEditingTrack({
                              ...editingTrack,
                              credits: { ...editingTrack.credits, recordingStudio: e.target.value }
                            })}
                            className="w-full px-3.5 py-1.5 bg-[#0a0a0d] border border-[#24242c] rounded-lg text-xs text-white"
                          />
                        </div>
                      </div>

                      <div className="flex justify-end gap-3 pt-4 border-t border-[#202028]">
                        <button
                          type="button"
                          onClick={() => setEditingTrack(null)}
                          className="px-4 py-2 bg-[#1a1a22] text-zinc-300 rounded-xl text-xs font-semibold"
                        >
                          Cancelar
                        </button>
                        <button
                          type="submit"
                          className="flex items-center gap-1.5 px-6 py-2 bg-gradient-to-r from-[#0066FF] to-[#00D2FF] text-white rounded-xl text-xs font-bold shadow-lg"
                        >
                          <Save className="w-4 h-4" />
                          <span>Guardar Música</span>
                        </button>
                      </div>
                    </form>
                  ) : (
                    /* Tracks List */
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-zinc-400">Total de faixas: {tracks.length}</span>
                        <button
                          onClick={() => setEditingTrack({
                            title: '',
                            artist: '',
                            genre: 'Kizomba',
                            downloadAvailable: true,
                            releaseDate: new Date().toISOString().split('T')[0],
                          })}
                          className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-[#0066FF] to-[#00D2FF] text-white rounded-xl text-xs font-bold shadow-md hover:brightness-110"
                        >
                          <Plus className="w-4 h-4" />
                          <span>Adicionar Música</span>
                        </button>
                      </div>

                      <div className="space-y-2">
                        {tracks.map((track) => (
                          <div 
                            key={track.id}
                            className="flex items-center justify-between p-3.5 rounded-xl bg-[#141418] border border-[#24242c] hover:border-[#00D2FF]/30 transition-all"
                          >
                            <div className="flex items-center gap-3 min-w-0">
                              <img
                                src={track.coverUrl}
                                alt={track.title}
                                className="w-10 h-10 rounded-lg object-cover"
                                referrerPolicy="no-referrer"
                              />
                              <div className="min-w-0">
                                <div className="flex items-center gap-2">
                                  <span className="px-1.5 py-0.2 text-[9px] font-bold rounded bg-[#0066FF]/20 text-[#00D2FF]">
                                    {track.genre}
                                  </span>
                                  <h5 className="text-xs font-bold text-white truncate">{track.title}</h5>
                                </div>
                                <p className="text-[11px] text-zinc-400 truncate">{track.artist}</p>
                              </div>
                            </div>

                            <div className="flex items-center gap-1.5 shrink-0">
                              <button
                                onClick={() => setEditingTrack(track)}
                                title="Editar Música"
                                className="p-2 text-zinc-300 hover:text-white hover:bg-[#20202a] rounded-lg transition-colors"
                              >
                                <Edit className="w-4 h-4 text-[#00D2FF]" />
                              </button>
                              <button
                                onClick={() => handleDeleteTrack(track.id)}
                                title="Eliminar Música"
                                className="p-2 text-zinc-400 hover:text-[#FF2A54] hover:bg-[#20202a] rounded-lg transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* === NEWS TAB === */}
              {activeTab === 'news' && (
                <div className="space-y-6">
                  {editingNews ? (
                    <form onSubmit={handleSaveNews} className="p-6 rounded-2xl bg-[#141418] border border-[#24242c] space-y-4">
                      <div className="flex items-center justify-between pb-3 border-b border-[#202028]">
                        <h4 className="text-sm font-bold text-white flex items-center gap-2">
                          <Newspaper className="w-4 h-4 text-[#FF2A54]" />
                          {editingNews.id ? 'Editar Notícia' : 'Publicar Nova Notícia'}
                        </h4>
                        <button type="button" onClick={() => setEditingNews(null)} className="text-xs text-zinc-400 hover:text-white">Cancelar</button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="sm:col-span-2">
                          <label className="block text-xs font-bold text-zinc-300 mb-1">Título da Notícia *</label>
                          <input
                            type="text"
                            required
                            value={editingNews.title || ''}
                            onChange={(e) => setEditingNews({ ...editingNews, title: e.target.value })}
                            className="w-full px-3.5 py-2 bg-[#0a0a0d] border border-[#24242c] focus:border-[#00D2FF] rounded-xl text-xs text-white"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-zinc-300 mb-1">Categoria</label>
                          <select
                            value={editingNews.category || 'Estúdio'}
                            onChange={(e) => setEditingNews({ ...editingNews, category: e.target.value as NewsCategory })}
                            className="w-full px-3.5 py-2 bg-[#0a0a0d] border border-[#24242c] focus:border-[#00D2FF] rounded-xl text-xs text-white"
                          >
                            <option value="Lançamento">Lançamento</option>
                            <option value="Estúdio">Estúdio</option>
                            <option value="Artistas">Artistas</option>
                            <option value="Bastidores">Bastidores</option>
                            <option value="Comunicado">Comunicado</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-zinc-300 mb-1">URL da Imagem</label>
                          <input
                            type="url"
                            value={editingNews.coverUrl || ''}
                            onChange={(e) => setEditingNews({ ...editingNews, coverUrl: e.target.value })}
                            className="w-full px-3.5 py-2 bg-[#0a0a0d] border border-[#24242c] rounded-xl text-xs text-white font-mono"
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <label className="block text-xs font-bold text-zinc-300 mb-1">Resumo / Subtítulo</label>
                          <textarea
                            rows={2}
                            value={editingNews.summary || ''}
                            onChange={(e) => setEditingNews({ ...editingNews, summary: e.target.value })}
                            className="w-full px-3.5 py-2 bg-[#0a0a0d] border border-[#24242c] rounded-xl text-xs text-white"
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <label className="block text-xs font-bold text-zinc-300 mb-1">Conteúdo Completo</label>
                          <textarea
                            rows={6}
                            value={editingNews.content || ''}
                            onChange={(e) => setEditingNews({ ...editingNews, content: e.target.value })}
                            className="w-full px-3.5 py-2 bg-[#0a0a0d] border border-[#24242c] rounded-xl text-xs text-white leading-relaxed"
                          />
                        </div>
                      </div>

                      <div className="flex justify-end gap-3 pt-4 border-t border-[#202028]">
                        <button type="button" onClick={() => setEditingNews(null)} className="px-4 py-2 bg-[#1a1a22] text-zinc-300 rounded-xl text-xs font-semibold">Cancelar</button>
                        <button type="submit" className="flex items-center gap-1.5 px-6 py-2 bg-gradient-to-r from-[#FF2A54] to-[#0066FF] text-white rounded-xl text-xs font-bold">
                          <Save className="w-4 h-4" />
                          <span>Guardar Notícia</span>
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-zinc-400">Total de notícias: {news.length}</span>
                        <button
                          onClick={() => setEditingNews({
                            title: '',
                            category: 'Lançamento',
                            publishDate: new Date().toISOString().split('T')[0],
                            author: 'Equipa MELO',
                          })}
                          className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-[#FF2A54] to-[#0066FF] text-white rounded-xl text-xs font-bold"
                        >
                          <Plus className="w-4 h-4" />
                          <span>Nova Notícia</span>
                        </button>
                      </div>

                      <div className="space-y-2">
                        {news.map((item) => (
                          <div key={item.id} className="flex items-center justify-between p-3.5 rounded-xl bg-[#141418] border border-[#24242c]">
                            <div className="min-w-0 flex items-center gap-3">
                              <img src={item.coverUrl} alt={item.title} className="w-10 h-10 rounded-lg object-cover" referrerPolicy="no-referrer" />
                              <div className="min-w-0">
                                <div className="flex items-center gap-2">
                                  <span className="px-1.5 py-0.2 text-[9px] font-bold rounded bg-[#FF2A54]/20 text-[#FF2A54]">{item.category}</span>
                                  <h5 className="text-xs font-bold text-white truncate">{item.title}</h5>
                                </div>
                                <p className="text-[11px] text-zinc-400 truncate">{item.publishDate}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <button onClick={() => setEditingNews(item)} className="p-2 text-zinc-300 hover:text-white"><Edit className="w-4 h-4 text-[#00D2FF]" /></button>
                              <button onClick={() => handleDeleteNews(item.id)} className="p-2 text-zinc-400 hover:text-[#FF2A54]"><Trash2 className="w-4 h-4" /></button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* === ACTIVITIES TAB === */}
              {activeTab === 'activities' && (
                <div className="space-y-6">
                  {editingActivity ? (
                    <form onSubmit={handleSaveActivity} className="p-6 rounded-2xl bg-[#141418] border border-[#24242c] space-y-4">
                      <div className="flex items-center justify-between pb-3 border-b border-[#202028]">
                        <h4 className="text-sm font-bold text-white flex items-center gap-2">
                          <CalendarDays className="w-4 h-4 text-[#00D2FF]" />
                          {editingActivity.id ? 'Editar Atividade' : 'Nova Atividade'}
                        </h4>
                        <button type="button" onClick={() => setEditingActivity(null)} className="text-xs text-zinc-400">Cancelar</button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-zinc-300 mb-1">Título da Atividade *</label>
                          <input
                            type="text"
                            required
                            value={editingActivity.title || ''}
                            onChange={(e) => setEditingActivity({ ...editingActivity, title: e.target.value })}
                            className="w-full px-3.5 py-2 bg-[#0a0a0d] border border-[#24242c] rounded-xl text-xs text-white"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-zinc-300 mb-1">Estado</label>
                          <select
                            value={editingActivity.status || 'CONFIRMADO'}
                            onChange={(e) => setEditingActivity({ ...editingActivity, status: e.target.value as ActivityStatus })}
                            className="w-full px-3.5 py-2 bg-[#0a0a0d] border border-[#24242c] rounded-xl text-xs text-white"
                          >
                            <option value="PRÓXIMO">PRÓXIMO</option>
                            <option value="CONFIRMADO">CONFIRMADO</option>
                            <option value="EM BREVE">EM BREVE</option>
                            <option value="REALIZADO">REALIZADO</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-zinc-300 mb-1">Data</label>
                          <input
                            type="date"
                            value={editingActivity.date || ''}
                            onChange={(e) => setEditingActivity({ ...editingActivity, date: e.target.value })}
                            className="w-full px-3.5 py-2 bg-[#0a0a0d] border border-[#24242c] rounded-xl text-xs text-white"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-zinc-300 mb-1">Hora</label>
                          <input
                            type="text"
                            placeholder="ex: 19:30"
                            value={editingActivity.time || ''}
                            onChange={(e) => setEditingActivity({ ...editingActivity, time: e.target.value })}
                            className="w-full px-3.5 py-2 bg-[#0a0a0d] border border-[#24242c] rounded-xl text-xs text-white"
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <label className="block text-xs font-bold text-zinc-300 mb-1">Local</label>
                          <input
                            type="text"
                            value={editingActivity.location || ''}
                            onChange={(e) => setEditingActivity({ ...editingActivity, location: e.target.value })}
                            className="w-full px-3.5 py-2 bg-[#0a0a0d] border border-[#24242c] rounded-xl text-xs text-white"
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <label className="block text-xs font-bold text-zinc-300 mb-1">Descrição</label>
                          <textarea
                            rows={3}
                            value={editingActivity.description || ''}
                            onChange={(e) => setEditingActivity({ ...editingActivity, description: e.target.value })}
                            className="w-full px-3.5 py-2 bg-[#0a0a0d] border border-[#24242c] rounded-xl text-xs text-white"
                          />
                        </div>
                      </div>

                      <div className="flex justify-end gap-3 pt-4 border-t border-[#202028]">
                        <button type="button" onClick={() => setEditingActivity(null)} className="px-4 py-2 bg-[#1a1a22] text-zinc-300 rounded-xl text-xs font-semibold">Cancelar</button>
                        <button type="submit" className="flex items-center gap-1.5 px-6 py-2 bg-gradient-to-r from-[#0066FF] to-[#00D2FF] text-white rounded-xl text-xs font-bold">
                          <Save className="w-4 h-4" />
                          <span>Guardar Atividade</span>
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-zinc-400">Total de atividades: {activities.length}</span>
                        <button
                          onClick={() => setEditingActivity({
                            title: '',
                            status: 'PRÓXIMO',
                            type: 'Lançamento',
                            date: new Date().toISOString().split('T')[0],
                            time: '20:00',
                          })}
                          className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-[#0066FF] to-[#00D2FF] text-white rounded-xl text-xs font-bold"
                        >
                          <Plus className="w-4 h-4" />
                          <span>Nova Atividade</span>
                        </button>
                      </div>

                      <div className="space-y-2">
                        {activities.map((act) => (
                          <div key={act.id} className="flex items-center justify-between p-3.5 rounded-xl bg-[#141418] border border-[#24242c]">
                            <div className="min-w-0">
                              <div className="flex items-center gap-2">
                                <span className="px-1.5 py-0.2 text-[9px] font-bold rounded bg-[#00D2FF]/20 text-[#00D2FF]">{act.status}</span>
                                <h5 className="text-xs font-bold text-white truncate">{act.title}</h5>
                              </div>
                              <p className="text-[11px] text-zinc-400">{act.date} • {act.time} • {act.location}</p>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <button onClick={() => setEditingActivity(act)} className="p-2 text-zinc-300"><Edit className="w-4 h-4 text-[#00D2FF]" /></button>
                              <button onClick={() => handleDeleteActivity(act.id)} className="p-2 text-zinc-400 hover:text-[#FF2A54]"><Trash2 className="w-4 h-4" /></button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* === VIDEOS TAB === */}
              {activeTab === 'videos' && (
                <div className="space-y-6">
                  {editingVideo ? (
                    <form onSubmit={handleSaveVideo} className="p-6 rounded-2xl bg-[#141418] border border-[#24242c] space-y-4">
                      <div className="flex items-center justify-between pb-3 border-b border-[#202028]">
                        <h4 className="text-sm font-bold text-white flex items-center gap-2">
                          <Youtube className="w-4 h-4 text-[#FF0000]" />
                          {editingVideo.id ? 'Editar Vídeo' : 'Adicionar Vídeo'}
                        </h4>
                        <button type="button" onClick={() => setEditingVideo(null)} className="text-xs text-zinc-400">Cancelar</button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="sm:col-span-2">
                          <label className="block text-xs font-bold text-zinc-300 mb-1">Título do Vídeo *</label>
                          <input
                            type="text"
                            required
                            value={editingVideo.title || ''}
                            onChange={(e) => setEditingVideo({ ...editingVideo, title: e.target.value })}
                            className="w-full px-3.5 py-2 bg-[#0a0a0d] border border-[#24242c] rounded-xl text-xs text-white"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-zinc-300 mb-1">ID ou Link do YouTube *</label>
                          <input
                            type="text"
                            required
                            placeholder="ex: dQw4w9WgXcQ ou https://youtube.com/watch?v=..."
                            value={editingVideo.youtubeIdOrUrl || ''}
                            onChange={(e) => setEditingVideo({ ...editingVideo, youtubeIdOrUrl: e.target.value })}
                            className="w-full px-3.5 py-2 bg-[#0a0a0d] border border-[#24242c] rounded-xl text-xs text-white font-mono"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-zinc-300 mb-1">Categoria</label>
                          <select
                            value={editingVideo.category || 'Videoclipe'}
                            onChange={(e) => setEditingVideo({ ...editingVideo, category: e.target.value as VideoCategory })}
                            className="w-full px-3.5 py-2 bg-[#0a0a0d] border border-[#24242c] rounded-xl text-xs text-white"
                          >
                            <option value="Videoclipe">Videoclipe</option>
                            <option value="Sessão de Estúdio">Sessão de Estúdio</option>
                            <option value="Making Of">Making Of</option>
                            <option value="Entrevista">Entrevista</option>
                          </select>
                        </div>

                        <div className="sm:col-span-2">
                          <label className="block text-xs font-bold text-zinc-300 mb-1">Descrição</label>
                          <textarea
                            rows={3}
                            value={editingVideo.description || ''}
                            onChange={(e) => setEditingVideo({ ...editingVideo, description: e.target.value })}
                            className="w-full px-3.5 py-2 bg-[#0a0a0d] border border-[#24242c] rounded-xl text-xs text-white"
                          />
                        </div>
                      </div>

                      <div className="flex justify-end gap-3 pt-4 border-t border-[#202028]">
                        <button type="button" onClick={() => setEditingVideo(null)} className="px-4 py-2 bg-[#1a1a22] text-zinc-300 rounded-xl text-xs font-semibold">Cancelar</button>
                        <button type="submit" className="flex items-center gap-1.5 px-6 py-2 bg-gradient-to-r from-[#FF0000] to-[#FF2A54] text-white rounded-xl text-xs font-bold">
                          <Save className="w-4 h-4" />
                          <span>Guardar Vídeo</span>
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-zinc-400">Total de vídeos: {videos.length}</span>
                        <button
                          onClick={() => setEditingVideo({
                            title: '',
                            category: 'Videoclipe',
                          })}
                          className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-[#FF0000] to-[#FF2A54] text-white rounded-xl text-xs font-bold"
                        >
                          <Plus className="w-4 h-4" />
                          <span>Adicionar Vídeo</span>
                        </button>
                      </div>

                      <div className="space-y-2">
                        {videos.map((vid) => (
                          <div key={vid.id} className="flex items-center justify-between p-3.5 rounded-xl bg-[#141418] border border-[#24242c]">
                            <div className="min-w-0">
                              <span className="px-1.5 py-0.2 text-[9px] font-bold rounded bg-[#FF0000]/20 text-[#FF2A54]">{vid.category}</span>
                              <h5 className="text-xs font-bold text-white truncate">{vid.title}</h5>
                              <p className="text-[10px] text-zinc-500 font-mono">ID: {vid.youtubeIdOrUrl}</p>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <button onClick={() => setEditingVideo(vid)} className="p-2 text-zinc-300"><Edit className="w-4 h-4 text-[#00D2FF]" /></button>
                              <button onClick={() => handleDeleteVideo(vid.id)} className="p-2 text-zinc-400 hover:text-[#FF2A54]"><Trash2 className="w-4 h-4" /></button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* === STUDIO SETTINGS TAB === */}
              {activeTab === 'settings' && (
                <form onSubmit={handleSaveStudioInfo} className="p-6 rounded-2xl bg-[#141418] border border-[#24242c] space-y-4">
                  <h4 className="text-sm font-bold text-white pb-3 border-b border-[#202028]">
                    Configurações Gerais do Estúdio
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-zinc-300 mb-1">Nome do Estúdio</label>
                      <input
                        type="text"
                        value={studioInfo.name}
                        onChange={(e) => setStudioInfo({ ...studioInfo, name: e.target.value })}
                        className="w-full px-3.5 py-2 bg-[#0a0a0d] border border-[#24242c] rounded-xl text-xs text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-zinc-300 mb-1">Slogan</label>
                      <input
                        type="text"
                        value={studioInfo.slogan}
                        onChange={(e) => setStudioInfo({ ...studioInfo, slogan: e.target.value })}
                        className="w-full px-3.5 py-2 bg-[#0a0a0d] border border-[#24242c] rounded-xl text-xs text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-zinc-300 mb-1">Telefone / WhatsApp</label>
                      <input
                        type="text"
                        value={studioInfo.contacts.phone}
                        onChange={(e) => setStudioInfo({
                          ...studioInfo,
                          contacts: { ...studioInfo.contacts, phone: e.target.value, whatsapp: e.target.value }
                        })}
                        className="w-full px-3.5 py-2 bg-[#0a0a0d] border border-[#24242c] rounded-xl text-xs text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-zinc-300 mb-1">Email de Contacto</label>
                      <input
                        type="email"
                        value={studioInfo.contacts.email}
                        onChange={(e) => setStudioInfo({
                          ...studioInfo,
                          contacts: { ...studioInfo.contacts, email: e.target.value }
                        })}
                        className="w-full px-3.5 py-2 bg-[#0a0a0d] border border-[#24242c] rounded-xl text-xs text-white"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-zinc-300 mb-1">Endereço Físico</label>
                      <input
                        type="text"
                        value={studioInfo.location.address}
                        onChange={(e) => setStudioInfo({
                          ...studioInfo,
                          location: { ...studioInfo.location, address: e.target.value }
                        })}
                        className="w-full px-3.5 py-2 bg-[#0a0a0d] border border-[#24242c] rounded-xl text-xs text-white"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end pt-4 border-t border-[#202028]">
                    <button
                      type="submit"
                      className="flex items-center gap-1.5 px-6 py-2 bg-gradient-to-r from-[#0066FF] to-[#00D2FF] text-white rounded-xl text-xs font-bold"
                    >
                      <Save className="w-4 h-4" />
                      <span>Salvar Configurações</span>
                    </button>
                  </div>
                </form>
              )}

              {/* === BACKUP TAB === */}
              {activeTab === 'backup' && (
                <div className="p-6 rounded-2xl bg-[#141418] border border-[#24242c] space-y-6">
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      <Sliders className="w-4 h-4 text-[#00D2FF]" />
                      Backup & Portabilidade de Dados
                    </h4>
                    <p className="text-xs text-zinc-400">
                      Exporte todos os seus dados em formato JSON para transferir de dispositivo ou importar para um banco de dados na nuvem.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-[#0a0a0d] border border-[#202028] space-y-3">
                      <h5 className="text-xs font-bold text-white">Exportar Base de Dados</h5>
                      <p className="text-[11px] text-zinc-400">Baixe um arquivo JSON com todas as faixas, notícias e agenda cadastradas.</p>
                      <button
                        onClick={() => {
                          const json = contentService.exportBackupJSON();
                          const blob = new Blob([json], { type: 'application/json' });
                          const url = URL.createObjectURL(blob);
                          const a = document.createElement('a');
                          a.href = url;
                          a.download = `melo_music_backup_${new Date().toISOString().split('T')[0]}.json`;
                          a.click();
                          showToast('Backup exportado com sucesso!');
                        }}
                        className="flex items-center gap-2 px-4 py-2 bg-[#1e1e26] hover:bg-[#282834] text-[#00D2FF] border border-[#2a2a36] rounded-xl text-xs font-bold transition-all"
                      >
                        <Download className="w-4 h-4" />
                        <span>Exportar JSON de Backup</span>
                      </button>
                    </div>

                    <div className="p-4 rounded-xl bg-[#0a0a0d] border border-[#202028] space-y-3">
                      <h5 className="text-xs font-bold text-white">Restaurar Dados Padrão</h5>
                      <p className="text-[11px] text-zinc-400">Restaura as músicas, novidades e informações originais do estúdio.</p>
                      <button
                        onClick={() => {
                          if (confirm('Deseja restaurar os dados originais?')) {
                            contentService.resetToDefaults();
                            showToast('Dados restaurados para o padrão.');
                          }
                        }}
                        className="flex items-center gap-2 px-4 py-2 bg-[#FF2A54]/20 hover:bg-[#FF2A54]/30 text-[#FF2A54] border border-[#FF2A54]/40 rounded-xl text-xs font-bold transition-all"
                      >
                        <RotateCcw className="w-4 h-4" />
                        <span>Restaurar Padrões de Fábrica</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* === BLOGGER INTEGRATION TAB === */}
              {activeTab === 'blogger' && (
                <div className="space-y-6">
                  <div className="p-5 rounded-2xl bg-[#141418] border border-[#24242c] space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-gradient-to-r from-[#FF2A54] via-[#F59E0B] to-[#0066FF] text-white shadow-md">
                        <Code2 className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white">
                          Integração & Gerador de Código para Blogger
                        </h4>
                        <p className="text-xs text-zinc-400">
                          Estrutura pré-configurada com as cores oficiais: Vermelho (topo & submenu hover), Amarelo Torrado (hover links) e Azul (linha submenu & botão download).
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                      <div className="p-3 rounded-xl bg-[#0e0e12] border border-[#20202a]">
                        <div className="flex items-center gap-2 text-xs font-bold text-white mb-1">
                          <span className="w-2.5 h-2.5 rounded-full bg-[#FF2A54]" />
                          Vermelho
                        </div>
                        <p className="text-[11px] text-zinc-400">
                          Barra superior do menu e fundo dinâmico dos botões do submenu ao passar o rato.
                        </p>
                      </div>

                      <div className="p-3 rounded-xl bg-[#0e0e12] border border-[#20202a]">
                        <div className="flex items-center gap-2 text-xs font-bold text-white mb-1">
                          <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" />
                          Amarelo Torrado
                        </div>
                        <p className="text-[11px] text-zinc-400">
                          Texto dos links principais ao passar o cursor, gerando contraste no Dark Mode.
                        </p>
                      </div>

                      <div className="p-3 rounded-xl bg-[#0e0e12] border border-[#20202a]">
                        <div className="flex items-center gap-2 text-xs font-bold text-white mb-1">
                          <span className="w-2.5 h-2.5 rounded-full bg-[#0066FF]" />
                          Azul Elétrico
                        </div>
                        <p className="text-[11px] text-zinc-400">
                          Linha superior do submenu e destaque do botão de Download MP3.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Step 1 Quick Copy */}
                  <div className="p-5 rounded-2xl bg-[#141418] border border-[#24242c] space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-[#FF2A54]" />
                          Passo 1: Código do Menu Superior para Blogger (Gadget)
                        </h5>
                        <p className="text-[11px] text-zinc-400">
                          Cole em: Blogger &rarr; Layout &rarr; Bloco Superior (Header) &rarr; Adicionar Gadget &rarr; HTML/JavaScript.
                        </p>
                      </div>

                      <button
                        onClick={() => {
                          const code = `<!-- MELO MUSIC-STUDIO MENU BLOGGER -->
<div id="melo-blogger-nav-container">
  <div style="height:4px;width:100%;background:linear-gradient(90deg,#DC2626,#FF2A54,#DC2626);box-shadow:0 0 12px rgba(255,42,84,0.7);"></div>
  <nav style="max-width:1200px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;padding:12px 20px;background:#0c0c10;font-family:sans-serif;">
    <a href="/" style="color:#fff;text-decoration:none;font-weight:900;font-size:18px;text-transform:uppercase;">MELO <span style="color:#00D2FF">MUSIC</span> <span style="background:rgba(255,42,84,0.2);color:#FF2A54;font-size:10px;padding:2px 6px;border-radius:4px;border:1px solid rgba(255,42,84,0.4);">STUDIO</span></a>
    <ul style="display:flex;align-items:center;list-style:none;margin:0;padding:0;gap:8px;">
      <li><a href="/" style="color:#d1d5db;text-decoration:none;font-size:13px;font-weight:600;padding:8px 12px;">Início</a></li>
      <li style="position:relative;" class="has-drop">
        <a href="/search/label/Músicas" style="color:#d1d5db;text-decoration:none;font-size:13px;font-weight:600;padding:8px 12px;">Músicas &#9662;</a>
        <ul style="position:absolute;top:100%;left:0;min-width:180px;background:#121216;border-top:3px solid #0066FF;box-shadow:0 10px 25px rgba(0,0,0,0.8);list-style:none;padding:6px 0;margin:0;border-radius:0 0 8px 8px;">
          <li><a href="/search/label/Kizomba" style="display:block;padding:8px 16px;color:#e2e8f0;text-decoration:none;font-size:12px;">● Kizomba</a></li>
          <li><a href="/search/label/Kuduro" style="display:block;padding:8px 16px;color:#e2e8f0;text-decoration:none;font-size:12px;">● Kuduro</a></li>
          <li><a href="/search/label/Semba" style="display:block;padding:8px 16px;color:#e2e8f0;text-decoration:none;font-size:12px;">● Semba</a></li>
          <li><a href="/search/label/Afro House" style="display:block;padding:8px 16px;color:#e2e8f0;text-decoration:none;font-size:12px;">● Afro House</a></li>
          <li><a href="/search/label/Hip-Hop" style="display:block;padding:8px 16px;color:#e2e8f0;text-decoration:none;font-size:12px;">● Hip-Hop / Trap</a></li>
        </ul>
      </li>
      <li><a href="/search/label/Novidades" style="color:#d1d5db;text-decoration:none;font-size:13px;font-weight:600;padding:8px 12px;">Novidades</a></li>
      <li><a href="/search/label/Atividades" style="color:#d1d5db;text-decoration:none;font-size:13px;font-weight:600;padding:8px 12px;">Atividades</a></li>
      <li><a href="/search/label/Vídeos" style="color:#d1d5db;text-decoration:none;font-size:13px;font-weight:600;padding:8px 12px;">Vídeos</a></li>
    </ul>
    <a href="https://wa.me/${studioInfo.contacts.whatsapp.replace(/[^0-9]/g, '')}" target="_blank" style="background:linear-gradient(90deg,#0066FF,#00D2FF);color:#fff;text-decoration:none;font-size:12px;font-weight:700;padding:8px 14px;border-radius:8px;">Agendar WhatsApp</a>
  </nav>
</div>
<style>
  #melo-blogger-nav-container a:hover { color:#F59E0B !important; }
  #melo-blogger-nav-container .has-drop ul a:hover { background-color:#FF2A54 !important; color:#ffffff !important; }
</style>`;
                          navigator.clipboard.writeText(code);
                          showToast('Código do Menu Blogger copiado!');
                        }}
                        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#FF2A54] to-red-600 hover:brightness-110 text-white rounded-xl text-xs font-bold shadow-md transition-all shrink-0"
                      >
                        <Copy className="w-4 h-4" />
                        <span>Copiar Código do Menu</span>
                      </button>
                    </div>
                  </div>

                  {/* Step 2 Quick Copy */}
                  <div className="p-5 rounded-2xl bg-[#141418] border border-[#24242c] space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-[#0066FF]" />
                          Passo 2: Publicar Música no Blogger (com Player e Botão Azul de Download)
                        </h5>
                        <p className="text-[11px] text-zinc-400">
                          Blogger &rarr; Nova postagem &rarr; Vista HTML (&lt;&gt;) &rarr; Colar o modelo de post &rarr; Marcar estilo (ex: Kizomba).
                        </p>
                      </div>

                      <button
                        onClick={() => {
                          const sampleTrack = tracks[0];
                          const postCode = `<!-- MELO MUSIC-STUDIO POST MÚSICA -->
<div style="max-width:600px;margin:20px auto;background:#121217;border:1px solid #262632;border-radius:16px;padding:24px;color:#fff;font-family:sans-serif;box-shadow:0 10px 30px rgba(0,0,0,0.5);">
  <img src="${sampleTrack?.coverUrl || 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop&q=80'}" alt="${sampleTrack?.title || 'Título'}" style="width:100%;border-radius:12px;margin-bottom:16px;" />
  <h2 style="font-size:22px;margin:0 0 6px 0;color:#fff;">${sampleTrack?.title || 'Título da Música'}</h2>
  <p style="font-size:15px;color:#00D2FF;margin:0 0 12px 0;">${sampleTrack?.artist || 'Artista'}</p>
  <div style="margin:16px 0;">
    <audio controls style="width:100%;height:44px;border-radius:8px;">
      <source src="${sampleTrack?.audioUrl || 'https://actions.google.com/sounds/v1/ambiences/outdoor_evening_crickets.ogg'}" type="audio/mpeg">
    </audio>
  </div>
  <a href="${sampleTrack?.downloadUrl || sampleTrack?.audioUrl || '#'}" download target="_blank" style="display:flex;align-items:center;justify-content:center;gap:8px;padding:14px 20px;background:linear-gradient(135deg,#0066FF,#00D2FF);color:#ffffff;text-decoration:none;font-weight:800;font-size:14px;border-radius:12px;box-shadow:0 6px 20px rgba(0,102,255,0.4);">
    BAIXAR MÚSICA (MP3)
  </a>
</div>`;
                          navigator.clipboard.writeText(postCode);
                          showToast('Código modelo de Post copiado!');
                        }}
                        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#0066FF] to-[#00D2FF] hover:brightness-110 text-white rounded-xl text-xs font-bold shadow-md transition-all shrink-0"
                      >
                        <Copy className="w-4 h-4" />
                        <span>Copiar Modelo de Post</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>
        )}
      </div>
    </div>
  );
};
