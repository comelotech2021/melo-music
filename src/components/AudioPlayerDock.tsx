import React, { useState } from 'react';
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Volume2, 
  VolumeX, 
  Download, 
  FileText, 
  Sliders, 
  Maximize2, 
  Disc,
  Radio
} from 'lucide-react';
import { usePlayer } from '../context/PlayerContext';
import { Tooltip } from './Tooltip';

export const AudioPlayerDock: React.FC = () => {
  const {
    currentTrack,
    isPlaying,
    currentTime,
    duration,
    volume,
    isMuted,
    isLoading,
    togglePlay,
    seekTo,
    setVolumeLevel,
    toggleMute,
    playNext,
    playPrevious,
    openTrackDetails,
    downloadTrack,
  } = usePlayer();

  if (!currentTrack) {
    return null;
  }

  const formatTime = (secs: number) => {
    if (isNaN(secs) || secs === 0) return '00:00';
    const minutes = Math.floor(secs / 60);
    const seconds = Math.floor(secs % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div
      id="persistent-audio-player"
      className="fixed bottom-0 left-0 right-0 z-50 bg-[#0e0e12]/95 backdrop-blur-xl border-t border-[#24242c] shadow-[0_-10px_30px_rgba(0,0,0,0.7)] px-3 sm:px-6 py-2.5 sm:py-3 transition-all duration-300"
    >
      {/* Top micro progress bar for quick visual feedback */}
      <div 
        className="absolute top-0 left-0 right-0 h-[3px] bg-[#1e1e26] cursor-pointer group"
        onClick={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const clickX = e.clientX - rect.left;
          const newTime = (clickX / rect.width) * (duration || 1);
          seekTo(newTime);
        }}
      >
        <div
          className="h-full bg-gradient-to-r from-[#0066FF] to-[#00D2FF] relative transition-all duration-100 group-hover:h-[4px]"
          style={{ width: `${progressPercent}%` }}
        >
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_8px_#00D2FF] opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-6">
        {/* Track Artwork & Info */}
        <div className="flex items-center gap-2.5 sm:gap-4 min-w-0 max-w-[45%] sm:max-w-[30%]">
          <Tooltip content="Ver Ficha e Letra Completa" position="top">
            <div 
              onClick={() => openTrackDetails(currentTrack)}
              className="relative cursor-pointer group shrink-0 w-11 h-11 sm:w-14 sm:h-14 rounded-xl overflow-hidden shadow-lg border border-[#2e2e3c]"
            >
              <img
                src={currentTrack.coverUrl}
                alt={currentTrack.title}
                className={`w-full h-full object-cover transition-transform duration-500 ${isPlaying ? 'scale-105' : 'group-hover:scale-105'}`}
                referrerPolicy="no-referrer"
              />
              {isPlaying && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <div className="flex items-end gap-0.5 h-4">
                    <span className="w-1 bg-[#00D2FF] animate-[pulse_0.6s_ease-in-out_infinite] h-3 rounded-full" />
                    <span className="w-1 bg-[#0066FF] animate-[pulse_0.4s_ease-in-out_infinite_0.2s] h-4 rounded-full" />
                    <span className="w-1 bg-[#FF2A54] animate-[pulse_0.8s_ease-in-out_infinite_0.4s] h-2.5 rounded-full" />
                  </div>
                </div>
              )}
            </div>
          </Tooltip>

          <div className="min-w-0 flex flex-col justify-center">
            <div className="flex items-center gap-1.5">
              <span className="hidden xs:inline-block px-1.5 py-0.2 text-[9px] font-extrabold uppercase rounded bg-[#0066FF]/20 text-[#00D2FF] border border-[#0066FF]/30">
                {currentTrack.genre}
              </span>
              <h4 
                onClick={() => openTrackDetails(currentTrack)}
                className="text-xs sm:text-sm font-bold text-white truncate cursor-pointer hover:text-[#00D2FF] transition-colors"
              >
                {currentTrack.title}
              </h4>
            </div>
            <p className="text-[11px] sm:text-xs text-zinc-400 truncate">
              {currentTrack.artist}
            </p>
          </div>
        </div>

        {/* Central Audio Controls & Progress */}
        <div className="flex flex-col items-center flex-1 max-w-xl">
          <div className="flex items-center gap-2 sm:gap-4">
            <Tooltip content="Música Anterior" position="top">
              <button
                onClick={playPrevious}
                aria-label="Faixa Anterior"
                className="p-1.5 text-zinc-400 hover:text-white hover:bg-[#1a1a24] rounded-full transition-colors"
              >
                <SkipBack className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </Tooltip>

            <Tooltip 
              content={isPlaying ? 'Pausar Reprodução' : 'Continuar a Tocar'} 
              subtext="Espaço no teclado ou clique para alternar"
              position="top"
            >
              <button
                id="player-toggle-play-btn"
                onClick={togglePlay}
                aria-label={isPlaying ? 'Pausar Áudio' : 'Tocar Áudio'}
                disabled={isLoading}
                className="relative flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gradient-to-r from-[#0066FF] to-[#00D2FF] text-white shadow-[0_0_20px_rgba(0,102,255,0.4)] hover:shadow-[0_0_25px_rgba(0,210,255,0.6)] hover:scale-105 active:scale-95 transition-all"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : isPlaying ? (
                  <Pause className="w-5 h-5 fill-white" />
                ) : (
                  <Play className="w-5 h-5 fill-white ml-0.5" />
                )}
              </button>
            </Tooltip>

            <Tooltip content="Próxima Música da Fila" position="top">
              <button
                onClick={playNext}
                aria-label="Próxima Faixa"
                className="p-1.5 text-zinc-400 hover:text-white hover:bg-[#1a1a24] rounded-full transition-colors"
              >
                <SkipForward className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </Tooltip>
          </div>

          {/* Desktop/Tablet Progress Bar with Timers */}
          <div className="hidden sm:flex items-center gap-3 w-full mt-1">
            <span className="text-[11px] font-mono text-zinc-400 min-w-[35px] text-right">
              {formatTime(currentTime)}
            </span>
            <div className="relative flex-1 flex items-center">
              <input
                type="range"
                min={0}
                max={duration || 100}
                value={currentTime}
                onChange={(e) => seekTo(parseFloat(e.target.value))}
                aria-label="Buscar posição no áudio"
                className="w-full h-1.5 bg-[#242430] rounded-lg appearance-none cursor-pointer accent-[#00D2FF] hover:h-2 transition-all"
              />
            </div>
            <span className="text-[11px] font-mono text-zinc-400 min-w-[35px]">
              {formatTime(duration)}
            </span>
          </div>
        </div>

        {/* Action Controls with Tooltips (Lyrics, Download MP3, Volume, Full Modal) */}
        <div className="flex items-center gap-1.5 sm:gap-3">
          {/* Download Button in Electric Blue */}
          {currentTrack.downloadAvailable && (
            <Tooltip 
              content="Download Direto MP3" 
              subtext="Baixar áudio masterizado 320kbps"
              position="top"
            >
              <button
                id="player-download-mp3-btn"
                onClick={() => downloadTrack(currentTrack)}
                className="flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1.5 bg-gradient-to-r from-[#0066FF] to-[#00D2FF] text-white hover:brightness-110 rounded-xl text-xs font-bold shadow-md shadow-blue-500/20 transition-all"
              >
                <Download className="w-3.5 h-3.5" />
                <span className="hidden md:inline">Download MP3</span>
              </button>
            </Tooltip>
          )}

          {/* Lyrics & Credits Toggle with Tooltips */}
          <Tooltip content="Ver Letra Oficial" position="top">
            <button
              onClick={() => openTrackDetails(currentTrack, true)}
              className="p-2 text-zinc-300 hover:text-white hover:bg-[#1e1e28] rounded-xl border border-transparent hover:border-[#2e2e3c] transition-all"
            >
              <FileText className="w-4 h-4 text-[#00D2FF]" />
            </button>
          </Tooltip>

          <Tooltip content="Ficha Técnica do Estúdio" position="top">
            <button
              onClick={() => openTrackDetails(currentTrack, false)}
              className="hidden sm:inline-flex p-2 text-zinc-300 hover:text-white hover:bg-[#1e1e28] rounded-xl border border-transparent hover:border-[#2e2e3c] transition-all"
            >
              <Sliders className="w-4 h-4 text-zinc-300" />
            </button>
          </Tooltip>

          {/* Volume Control with Tooltip */}
          <div className="hidden lg:flex items-center gap-1.5 relative">
            <Tooltip content={isMuted || volume === 0 ? "Ativar Áudio" : "Silenciar Áudio"} position="top">
              <button
                onClick={toggleMute}
                aria-label={isMuted ? 'Ativar Som' : 'Silenciar'}
                className="p-1.5 text-zinc-400 hover:text-white rounded-lg transition-colors"
              >
                {isMuted || volume === 0 ? (
                  <VolumeX className="w-4 h-4 text-[#FF2A54]" />
                ) : (
                  <Volume2 className="w-4 h-4 text-zinc-300" />
                )}
              </button>
            </Tooltip>

            <input
              type="range"
              min={0}
              max={1}
              step={0.02}
              value={isMuted ? 0 : volume}
              onChange={(e) => setVolumeLevel(parseFloat(e.target.value))}
              aria-label="Controle de Volume"
              className="w-16 h-1 bg-[#242430] rounded-lg appearance-none cursor-pointer accent-[#00D2FF]"
            />
          </div>

          {/* Expand Modal View with Tooltip */}
          <Tooltip content="Expandir Detalhes da Música" position="top">
            <button
              onClick={() => openTrackDetails(currentTrack)}
              className="p-2 text-zinc-400 hover:text-white hover:bg-[#1e1e28] rounded-xl transition-colors"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};
