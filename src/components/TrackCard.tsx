import React from 'react';
import { 
  Play, 
  Pause, 
  Download, 
  FileText, 
  Disc, 
  Sparkles, 
  Clock, 
  Radio, 
  CheckCircle2, 
  Flame,
  Volume2
} from 'lucide-react';
import { usePlayer } from '../context/PlayerContext';
import { Track } from '../types';
import { Tooltip } from './Tooltip';

interface TrackCardProps {
  track: Track;
  isListMode?: boolean;
}

export const TrackCard: React.FC<TrackCardProps> = ({ track, isListMode = false }) => {
  const { 
    currentTrack, 
    isPlaying, 
    playTrack, 
    togglePlay, 
    openTrackDetails, 
    downloadTrack 
  } = usePlayer();

  const isCurrentTrackPlaying = currentTrack?.id === track.id && isPlaying;
  const isThisCurrentTrack = currentTrack?.id === track.id;

  const handlePlayToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isThisCurrentTrack) {
      togglePlay();
    } else {
      playTrack(track);
    }
  };

  const handleDownloadClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    downloadTrack(track);
  };

  const getGenreBadgeColor = (genre: string) => {
    switch (genre) {
      case 'Kizomba':
        return 'text-[#00D2FF] bg-[#00D2FF]/15 border-[#00D2FF]/30';
      case 'Kuduro':
        return 'text-[#FF2A54] bg-[#FF2A54]/15 border-[#FF2A54]/30';
      case 'Semba':
        return 'text-[#F59E0B] bg-[#F59E0B]/15 border-[#F59E0B]/30';
      case 'Afro House':
        return 'text-[#10B981] bg-[#10B981]/15 border-[#10B981]/30';
      case 'Hip-Hop/Trap':
        return 'text-[#8B5CF6] bg-[#8B5CF6]/15 border-[#8B5CF6]/30';
      default:
        return 'text-zinc-300 bg-zinc-800 border-zinc-700';
    }
  };

  // --- LIST MODE PRESENTATION ---
  if (isListMode) {
    return (
      <div 
        id={`track-card-list-${track.id}`}
        onClick={() => openTrackDetails(track)}
        className={`group relative flex items-center justify-between p-3.5 sm:p-4 rounded-2xl transition-all duration-300 cursor-pointer shadow-lg ${
          isThisCurrentTrack
            ? 'bg-[#181824] border-2 border-[#00D2FF]/60 shadow-[0_4px_25px_rgba(0,210,255,0.15)]'
            : 'bg-[#121218] hover:bg-[#181822] border border-[#22222e] hover:border-[#0066FF]/40'
        }`}
      >
        <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
          {/* Cover Art with Interactive Play/Pause Button */}
          <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden shadow-md border border-white/10 shrink-0 group/cover">
            <img
              src={track.coverUrl}
              alt={track.title}
              className={`w-full h-full object-cover transition-transform duration-500 ${
                isCurrentTrackPlaying ? 'scale-105' : 'group-hover/cover:scale-105'
              }`}
              referrerPolicy="no-referrer"
            />
            
            {/* Overlay */}
            <div className={`absolute inset-0 bg-black/40 transition-opacity ${
              isThisCurrentTrack ? 'opacity-90' : 'opacity-0 group-hover:opacity-80'
            }`} />

            {/* Play/Pause Button on Cover with Tooltip */}
            <div className="absolute inset-0 flex items-center justify-center">
              <Tooltip 
                content={isCurrentTrackPlaying ? 'Pausar Reprodução' : 'Ouvir Música'}
                subtext="Áudio original de estúdio em alta fidelidade"
                position="top"
              >
                <button
                  onClick={handlePlayToggle}
                  aria-label={isCurrentTrackPlaying ? 'Pausar Áudio' : 'Ouvir Música'}
                  className={`w-9 h-9 rounded-full flex items-center justify-center shadow-lg transition-transform active:scale-95 ${
                    isCurrentTrackPlaying
                      ? 'bg-[#FF2A54] text-white scale-100'
                      : 'bg-gradient-to-r from-[#0066FF] to-[#00D2FF] text-white scale-90 group-hover:scale-100'
                  }`}
                >
                  {isCurrentTrackPlaying ? (
                    <Pause className="w-4 h-4 fill-white" />
                  ) : (
                    <Play className="w-4 h-4 fill-white ml-0.5" />
                  )}
                </button>
              </Tooltip>
            </div>

            {/* Soundwave animation if playing */}
            {isCurrentTrackPlaying && (
              <div className="absolute bottom-1 left-1 right-1 flex items-end justify-center gap-0.5 h-2">
                <span className="w-0.5 bg-[#00D2FF] animate-[pulse_0.4s_ease-in-out_infinite] h-2 rounded-full" />
                <span className="w-0.5 bg-[#FF2A54] animate-[pulse_0.6s_ease-in-out_infinite_0.2s] h-1.5 rounded-full" />
                <span className="w-0.5 bg-[#00D2FF] animate-[pulse_0.5s_ease-in-out_infinite_0.4s] h-2 rounded-full" />
              </div>
            )}
          </div>

          {/* Metadata */}
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className={`px-2 py-0.5 text-[10px] font-black uppercase tracking-wider rounded-md border ${getGenreBadgeColor(track.genre)}`}>
                {track.genre}
              </span>
              {track.bpm && (
                <span className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono text-zinc-400 bg-[#1a1a24] rounded border border-[#262634]">
                  {track.bpm} BPM
                </span>
              )}
              {isThisCurrentTrack && (
                <span className="flex items-center gap-1 text-[10px] font-bold text-[#00D2FF] font-mono animate-pulse">
                  <Volume2 className="w-3 h-3" />
                  {isCurrentTrackPlaying ? 'TOCANDO AGORA' : 'PAUSADO'}
                </span>
              )}
            </div>

            <h4 className="text-sm sm:text-base font-bold text-white group-hover:text-[#00D2FF] truncate transition-colors">
              {track.title}
            </h4>

            <p className="text-xs text-zinc-400 truncate mt-0.5">
              <span className="font-semibold text-zinc-300">{track.artist}</span>
              {track.featuredArtists && (
                <span className="text-zinc-500 font-normal"> feat. {track.featuredArtists}</span>
              )}
              {track.credits?.producer && (
                <span className="text-zinc-500 text-[11px] hidden md:inline"> • Prod: {track.credits.producer}</span>
              )}
            </p>
          </div>
        </div>

        {/* List Action Buttons with Tooltips */}
        <div className="flex items-center gap-2 sm:gap-3 ml-3 shrink-0">
          <Tooltip 
            content="Ver Ficha Técnica & Letra"
            subtext="Créditos de estúdio, compositores e letra completa"
            position="top"
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                openTrackDetails(track, true);
              }}
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 text-zinc-300 hover:text-white bg-[#1a1a24] hover:bg-[#242432] border border-[#282836] rounded-xl text-xs font-semibold transition-colors"
            >
              <FileText className="w-3.5 h-3.5 text-[#00D2FF]" />
              <span>Ficha & Letra</span>
            </button>
          </Tooltip>

          <Tooltip 
            content={isCurrentTrackPlaying ? 'Pausar Áudio' : 'Ouvir Música'}
            subtext="Reprodução imediata com reprodutor contínuo"
            position="top"
          >
            <button
              onClick={handlePlayToggle}
              className={`flex items-center gap-1.5 px-3 sm:px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                isCurrentTrackPlaying
                  ? 'bg-[#FF2A54] text-white shadow-lg shadow-red-500/20'
                  : 'bg-[#1c1c28] hover:bg-[#262638] text-white border border-[#2e2e42]'
              }`}
            >
              {isCurrentTrackPlaying ? (
                <>
                  <Pause className="w-3.5 h-3.5 fill-white" />
                  <span className="hidden sm:inline">Pausar</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-[#00D2FF] text-[#00D2FF]" />
                  <span className="hidden sm:inline">Ouvir</span>
                </>
              )}
            </button>
          </Tooltip>

          <Tooltip 
            content="Baixar MP3 Masterizado"
            subtext="Download direto em áudio de alta definição (320kbps)"
            position="top"
          >
            <button
              onClick={handleDownloadClick}
              className="flex items-center gap-1.5 px-3 sm:px-4 py-2 bg-gradient-to-r from-[#0066FF] to-[#00D2FF] text-white hover:brightness-110 rounded-xl text-xs font-bold shadow-md shadow-blue-500/20 active:scale-95 transition-all"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden xs:inline">Baixar MP3</span>
            </button>
          </Tooltip>
        </div>
      </div>
    );
  }

  // --- GRID MODE PRESENTATION ---
  return (
    <div 
      id={`track-card-grid-${track.id}`}
      onClick={() => openTrackDetails(track)}
      className={`group relative flex flex-col justify-between p-4 rounded-3xl transition-all duration-300 cursor-pointer shadow-xl hover:-translate-y-1.5 ${
        isThisCurrentTrack
          ? 'bg-[#181824] border-2 border-[#00D2FF] shadow-[0_8px_30px_rgba(0,210,255,0.25)]'
          : 'bg-[#121218] hover:bg-[#161620] border border-[#222230] hover:border-[#0066FF]/50 hover:shadow-[0_12px_35px_rgba(0,102,255,0.18)]'
      }`}
    >
      {/* Artwork with Gradient, Floating Badges & Dual Action Controls */}
      <div className="relative aspect-square w-full rounded-2xl overflow-hidden shadow-2xl border border-white/10 mb-4 group/cover bg-[#0d0d12]">
        <img
          src={track.coverUrl}
          alt={track.title}
          className={`w-full h-full object-cover transition-transform duration-500 ${
            isCurrentTrackPlaying ? 'scale-105' : 'group-hover/cover:scale-105'
          }`}
          referrerPolicy="no-referrer"
        />

        {/* Dynamic Dark Gradient */}
        <div className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent transition-opacity ${
          isCurrentTrackPlaying ? 'opacity-90' : 'opacity-70 group-hover/cover:opacity-85'
        }`} />

        {/* Top Badges: Genre & Quality */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 z-10">
          <span className={`px-2.5 py-1 text-[10px] font-black uppercase tracking-wider rounded-lg backdrop-blur-md border shadow-md ${getGenreBadgeColor(track.genre)}`}>
            {track.genre}
          </span>

          <span className="px-2 py-0.5 text-[10px] font-mono font-bold rounded-md bg-black/75 backdrop-blur-md text-[#00D2FF] border border-white/10 shadow-md">
            MP3 320K
          </span>
        </div>

        {/* Center Big Action Play/Pause Toggle with Tooltip */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Tooltip 
            content={isCurrentTrackPlaying ? 'Pausar Reprodução' : 'Ouvir Música'}
            subtext="Clique para ouvir agora com o player de estúdio"
            position="top"
          >
            <button
              onClick={handlePlayToggle}
              aria-label={isCurrentTrackPlaying ? 'Pausar Áudio' : 'Ouvir Prévia'}
              className={`w-14 h-14 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(0,102,255,0.6)] transition-all duration-300 active:scale-90 ${
                isCurrentTrackPlaying
                  ? 'bg-[#FF2A54] text-white scale-105 shadow-[0_0_30px_rgba(255,42,84,0.7)]'
                  : 'bg-gradient-to-r from-[#0066FF] to-[#00D2FF] text-white group-hover/cover:scale-110'
              }`}
            >
              {isCurrentTrackPlaying ? (
                <Pause className="w-6 h-6 fill-white" />
              ) : (
                <Play className="w-6 h-6 fill-white ml-0.5" />
              )}
            </button>
          </Tooltip>
        </div>

        {/* Bottom Audio Info Bar over cover */}
        <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-[11px] font-mono text-zinc-300 bg-black/70 backdrop-blur-md px-2.5 py-1.5 rounded-xl border border-white/10">
          <div className="flex items-center gap-1.5">
            {isCurrentTrackPlaying ? (
              <div className="flex items-end gap-0.5 h-3">
                <span className="w-1 bg-[#00D2FF] animate-[pulse_0.4s_ease-in-out_infinite] h-3 rounded-full" />
                <span className="w-1 bg-[#FF2A54] animate-[pulse_0.6s_ease-in-out_infinite_0.2s] h-2 rounded-full" />
                <span className="w-1 bg-[#00D2FF] animate-[pulse_0.5s_ease-in-out_infinite_0.4s] h-3 rounded-full" />
              </div>
            ) : (
              <Disc className="w-3.5 h-3.5 text-[#00D2FF]" />
            )}
            <span className="font-semibold text-white">
              {isCurrentTrackPlaying ? 'Em Reprodução' : (track.duration || '03:45')}
            </span>
          </div>

          {track.bpm && (
            <span className="text-zinc-400 font-bold">
              {track.bpm} BPM
            </span>
          )}
        </div>
      </div>

      {/* Track Information */}
      <div className="space-y-1.5 mb-4 flex-1">
        <h3 className="text-base font-extrabold text-white group-hover:text-[#00D2FF] truncate transition-colors leading-snug">
          {track.title}
        </h3>
        
        <p className="text-xs text-zinc-300 font-medium truncate">
          <span className="text-white font-semibold">{track.artist}</span>
          {track.featuredArtists && (
            <span className="text-zinc-400 font-normal"> feat. {track.featuredArtists}</span>
          )}
        </p>

        {track.description && (
          <p className="text-[11px] text-zinc-400 line-clamp-2 pt-0.5 leading-relaxed font-normal">
            {track.description}
          </p>
        )}
      </div>

      {/* Card Action Buttons with Tooltips: Lyrics + Download Direct */}
      <div className="grid grid-cols-2 gap-2 pt-3 border-t border-[#20202c]">
        <Tooltip
          content="Ficha & Letra"
          subtext="Ver créditos de estúdio e letra oficial"
          position="top"
          className="w-full"
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              openTrackDetails(track, true);
            }}
            className="w-full flex items-center justify-center gap-1.5 py-2.5 px-2 bg-[#1a1a24] hover:bg-[#242434] text-zinc-300 hover:text-white rounded-xl text-xs font-bold border border-[#282838] transition-colors"
          >
            <FileText className="w-3.5 h-3.5 text-[#00D2FF]" />
            <span>Ficha & Letra</span>
          </button>
        </Tooltip>

        <Tooltip
          content="Download Direto MP3"
          subtext="Baixar áudio em 320kbps de alta qualidade"
          position="top"
          className="w-full"
        >
          <button
            onClick={handleDownloadClick}
            className="w-full flex items-center justify-center gap-1.5 py-2.5 px-2 bg-gradient-to-r from-[#0066FF] to-[#00D2FF] text-white hover:brightness-110 rounded-xl text-xs font-bold shadow-md shadow-blue-500/20 active:scale-95 transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Baixar MP3</span>
          </button>
        </Tooltip>
      </div>
    </div>
  );
};
