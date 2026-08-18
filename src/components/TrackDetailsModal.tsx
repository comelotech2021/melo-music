import React, { useState } from 'react';
import { 
  X, 
  Play,
  Pause,
  Download, 
  Disc, 
  FileText, 
  Sliders, 
  Mic2, 
  Share2, 
  Sparkles, 
  Check, 
  Building2, 
  Users,
  Volume2
} from 'lucide-react';
import { usePlayer } from '../context/PlayerContext';
import { Track } from '../types';
import { Tooltip } from './Tooltip';

export const TrackDetailsModal: React.FC = () => {
  const { 
    currentTrack,
    isPlaying,
    playTrack,
    togglePlay,
    selectedTrackForDetails, 
    isDetailsOpen, 
    isLyricsOpen, 
    closeTrackDetails, 
    downloadTrack 
  } = usePlayer();

  const [activeTab, setActiveTab] = useState<'lyrics' | 'credits'>(isLyricsOpen ? 'lyrics' : 'credits');
  const [copied, setCopied] = useState(false);

  // Sync tab with initial requested view
  React.useEffect(() => {
    if (isLyricsOpen) {
      setActiveTab('lyrics');
    }
  }, [isLyricsOpen]);

  if (!isDetailsOpen || !selectedTrackForDetails) return null;

  const track: Track = selectedTrackForDetails;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${track.title} - ${track.artist}`,
        text: `Ouça "${track.title}" gravada no MELO MUSIC-studio!`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-3xl max-h-[90vh] bg-[#141418] border border-[#24242c] rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header with Track Artwork Banner */}
        <div className="relative h-44 sm:h-52 w-full overflow-hidden bg-gradient-to-t from-[#141418] via-transparent to-black/60">
          <img
            src={track.coverUrl}
            alt={track.title}
            className="w-full h-full object-cover blur-sm opacity-40 scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#141418] via-[#141418]/60 to-black/40" />

          {/* Close button */}
          <Tooltip content="Fechar Janela" position="bottom">
            <button
              onClick={closeTrackDetails}
              aria-label="Fechar Modal"
              className="absolute top-4 right-4 z-20 p-2 text-zinc-300 hover:text-white bg-black/50 hover:bg-black/80 rounded-full border border-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </Tooltip>

          {/* Header Track Info */}
          <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between gap-4 z-10">
            <div className="flex items-center gap-4">
              <div className="relative group w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden shadow-2xl border border-white/10 shrink-0">
                <img
                  src={track.coverUrl}
                  alt={track.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div>
                <span className="inline-block px-2 py-0.5 mb-1 text-[11px] font-bold uppercase rounded bg-[#0066FF]/30 text-[#00D2FF] border border-[#0066FF]/40">
                  {track.genre}
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white leading-tight">
                  {track.title}
                </h3>
                <p className="text-sm font-semibold text-zinc-300">
                  {track.artist} {track.featuredArtists && <span className="text-zinc-400 font-normal">{track.featuredArtists}</span>}
                </p>
              </div>
            </div>

            {/* Quick Actions in Banner with Tooltips */}
            <div className="hidden sm:flex items-center gap-2">
              <Tooltip
                content={currentTrack?.id === track.id && isPlaying ? 'Pausar Reprodução' : 'Ouvir Música'}
                subtext="Áudio original do estúdio"
                position="bottom"
              >
                <button
                  onClick={() => {
                    if (currentTrack?.id === track.id) {
                      togglePlay();
                    } else {
                      playTrack(track);
                    }
                  }}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    currentTrack?.id === track.id && isPlaying
                      ? 'bg-[#FF2A54] text-white shadow-lg shadow-red-500/30'
                      : 'bg-[#1c1c28] hover:bg-[#28283a] text-white border border-[#2e2e42]'
                  }`}
                >
                  {currentTrack?.id === track.id && isPlaying ? (
                    <>
                      <Pause className="w-4 h-4 fill-white" />
                      <span>Pausar</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 fill-[#00D2FF] text-[#00D2FF]" />
                      <span>Tocar Faixa</span>
                    </>
                  )}
                </button>
              </Tooltip>

              <Tooltip
                content="Download Direto MP3"
                subtext="Áudio em alta fidelidade 320kbps"
                position="bottom"
              >
                <button
                  onClick={() => downloadTrack(track)}
                  className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#0066FF] to-[#00D2FF] text-white text-xs font-bold rounded-xl shadow-lg shadow-blue-500/25 hover:brightness-110 active:scale-95 transition-all"
                >
                  <Download className="w-4 h-4 text-white" />
                  <span>Baixar MP3</span>
                </button>
              </Tooltip>

              <Tooltip
                content={copied ? "Link Copiado!" : "Compartilhar Música"}
                subtext="Copiar link direto para esta faixa"
                position="bottom"
              >
                <button
                  onClick={handleShare}
                  aria-label="Compartilhar Faixa"
                  className="p-2.5 bg-[#202028] text-zinc-300 hover:text-white rounded-xl border border-[#2e2e3c] transition-colors"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
                </button>
              </Tooltip>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-[#24242c] bg-[#101014] px-6">
          <button
            onClick={() => setActiveTab('lyrics')}
            className={`flex items-center gap-2 py-3 px-4 text-xs sm:text-sm font-bold border-b-2 transition-all ${
              activeTab === 'lyrics'
                ? 'border-[#00D2FF] text-[#00D2FF]'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Letra da Música</span>
          </button>
          <button
            onClick={() => setActiveTab('credits')}
            className={`flex items-center gap-2 py-3 px-4 text-xs sm:text-sm font-bold border-b-2 transition-all ${
              activeTab === 'credits'
                ? 'border-[#00D2FF] text-[#00D2FF]'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Sliders className="w-4 h-4" />
            <span>Ficha Técnica do Estúdio</span>
          </button>
        </div>

        {/* Modal Body Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-zinc-300 custom-scrollbar">
          {activeTab === 'lyrics' ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                  Letra Oficial
                </span>
                <span className="text-xs text-zinc-400">
                  Lançamento: {track.releaseDate}
                </span>
              </div>

              {track.lyrics ? (
                <div className="p-5 rounded-xl bg-[#0c0c0f] border border-[#202028] text-sm sm:text-base leading-relaxed whitespace-pre-line text-zinc-200 font-sans">
                  {track.lyrics}
                </div>
              ) : (
                <div className="p-8 text-center rounded-xl bg-[#0c0c0f] border border-[#202028]">
                  <Disc className="w-10 h-10 text-zinc-600 mx-auto mb-2" />
                  <p className="text-zinc-400 text-sm">Letra instrumental ou em processo de transcrição.</p>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-6">
              {/* Studio Description */}
              <div className="p-4 rounded-xl bg-[#0c0c0f] border border-[#202028]">
                <h4 className="text-xs font-bold text-[#00D2FF] uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  Visão Geral da Produção
                </h4>
                <p className="text-sm text-zinc-300 leading-relaxed">
                  {track.description || 'Faixa gravada e masterizada nos laboratórios acústicos do MELO MUSIC-studio em Luanda.'}
                </p>
              </div>

              {/* Technical Credits Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl bg-[#181820] border border-[#262632]">
                  <div className="flex items-center gap-2 text-zinc-400 text-xs mb-1">
                    <Mic2 className="w-3.5 h-3.5 text-[#FF2A54]" />
                    <span className="font-semibold uppercase tracking-wider">Produção Musical</span>
                  </div>
                  <p className="text-sm font-bold text-white">
                    {track.credits.producer || 'Melo Producer'}
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-[#181820] border border-[#262632]">
                  <div className="flex items-center gap-2 text-zinc-400 text-xs mb-1">
                    <Sliders className="w-3.5 h-3.5 text-[#00D2FF]" />
                    <span className="font-semibold uppercase tracking-wider">Mix & Masterização</span>
                  </div>
                  <p className="text-sm font-bold text-white">
                    {track.credits.mixingMastering || 'MELO Studio Pro Suite'}
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-[#181820] border border-[#262632]">
                  <div className="flex items-center gap-2 text-zinc-400 text-xs mb-1">
                    <Building2 className="w-3.5 h-3.5 text-amber-400" />
                    <span className="font-semibold uppercase tracking-wider">Estúdio de Gravação</span>
                  </div>
                  <p className="text-sm font-bold text-white">
                    {track.credits.recordingStudio || 'MELO MUSIC-studio (Luanda)'}
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-[#181820] border border-[#262632]">
                  <div className="flex items-center gap-2 text-zinc-400 text-xs mb-1">
                    <Users className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="font-semibold uppercase tracking-wider">Composição</span>
                  </div>
                  <p className="text-sm font-bold text-white">
                    {track.credits.composer || track.artist}
                  </p>
                </div>
              </div>

              {/* Additional Musicians */}
              {track.credits.additionalMusicians && track.credits.additionalMusicians.length > 0 && (
                <div className="p-4 rounded-xl bg-[#181820] border border-[#262632]">
                  <h5 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">
                    Músicos Convidados & Instrumentistas
                  </h5>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                    {track.credits.additionalMusicians.map((musician, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-zinc-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#00D2FF]" />
                        {musician}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Mobile Actions Footer */}
        <div className="sm:hidden p-4 border-t border-[#24242c] bg-[#101014] flex items-center justify-between gap-2">
          <button
            onClick={() => {
              if (currentTrack?.id === track.id) {
                togglePlay();
              } else {
                playTrack(track);
              }
            }}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-bold transition-all ${
              currentTrack?.id === track.id && isPlaying
                ? 'bg-[#FF2A54] text-white shadow-lg shadow-red-500/25'
                : 'bg-[#1c1c28] text-white border border-[#2e2e42]'
            }`}
          >
            {currentTrack?.id === track.id && isPlaying ? (
              <>
                <Pause className="w-4 h-4 fill-white" />
                <span>Pausar</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-[#00D2FF] text-[#00D2FF]" />
                <span>Ouvir Prévia</span>
              </>
            )}
          </button>

          <button
            onClick={() => downloadTrack(track)}
            className="flex-1 flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-[#0066FF] to-[#00D2FF] text-white text-xs font-bold rounded-xl shadow-lg shadow-blue-500/25 active:scale-95 transition-all"
          >
            <Download className="w-4 h-4 text-white" />
            <span>Baixar MP3</span>
          </button>
        </div>
      </div>
    </div>
  );
};
