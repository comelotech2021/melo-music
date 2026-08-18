import React, { useState, useEffect } from 'react';
import { 
  Download, 
  Sparkles, 
  Sliders, 
  Flame,
  ChevronLeft,
  ChevronRight,
  Disc,
  Play,
  Pause
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { usePlayer } from '../context/PlayerContext';
import { Track, StudioInfo } from '../types';
import { Tooltip } from './Tooltip';

interface HeroProps {
  tracks: Track[];
  studioInfo: StudioInfo;
}

export const Hero: React.FC<HeroProps> = ({ tracks, studioInfo }) => {
  const { openTrackDetails, downloadTrack } = usePlayer();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Available tracks to cycle through
  const displayTracks = tracks.length > 0 ? tracks : [];

  // Auto-cycle through tracks every 4.5 seconds
  useEffect(() => {
    if (!isAutoPlaying || displayTracks.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % displayTracks.length);
    }, 4500);

    return () => clearInterval(interval);
  }, [isAutoPlaying, displayTracks.length]);

  const currentTrack = displayTracks[currentIndex] || displayTracks[0];

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + displayTracks.length) % displayTracks.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % displayTracks.length);
  };

  const getGenreColor = (genre: string) => {
    switch (genre) {
      case 'Kizomba':
        return 'text-[#00D2FF] bg-[#00D2FF]/20 border-[#00D2FF]/40';
      case 'Kuduro':
        return 'text-[#FF2A54] bg-[#FF2A54]/20 border-[#FF2A54]/40';
      case 'Semba':
        return 'text-[#F59E0B] bg-[#F59E0B]/20 border-[#F59E0B]/40';
      case 'Afro House':
        return 'text-[#10B981] bg-[#10B981]/20 border-[#10B981]/40';
      case 'Hip-Hop/Trap':
        return 'text-[#8B5CF6] bg-[#8B5CF6]/20 border-[#8B5CF6]/40';
      default:
        return 'text-zinc-300 bg-zinc-800 border-zinc-700';
    }
  };

  return (
    <section 
      id="hero"
      className="relative pt-24 pb-12 sm:pt-28 sm:pb-16 overflow-hidden bg-[#0a0a0c]"
    >
      {/* Studio Ambient Glows */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-80 sm:w-96 h-80 sm:h-96 bg-[#0066FF]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-80 sm:w-96 h-80 sm:h-96 bg-[#FF2A54]/10 rounded-full blur-3xl pointer-events-none" />
      
      {/* Soundwave Grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          
          {/* Left Column: Brand Statement */}
          <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
            {/* Studio Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#141418] border border-[#24242c] text-xs font-semibold text-zinc-300 shadow-md">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF2A54] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF2A54]"></span>
              </span>
              <span className="text-[#00D2FF] font-bold">ESTÚDIO DE GRAVAÇÃO OFICIAL</span>
              <span className="text-zinc-500">•</span>
              <span className="text-zinc-300">Luanda / Angola</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.15]">
              Onde o Ritmo Ganha <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D2FF] via-[#0066FF] to-[#FF2A54]">Alma</span> & a Produção o Nível Máximo.
            </h1>

            {/* Slogan & Description */}
            <p className="text-sm sm:text-base text-zinc-300 max-w-2xl font-normal leading-relaxed">
              Produção musical de elite com equipamento analógico de classe mundial, captação acústica tratada e masterização digital para palcos e streaming global.
            </p>

            {/* Trust metrics */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-[#1c1c24] max-w-md mx-auto lg:mx-0">
              <div>
                <span className="block text-lg sm:text-xl font-black text-white font-mono">192kHz</span>
                <span className="text-[11px] font-medium text-zinc-400">Hi-Res 32-bit</span>
              </div>
              <div>
                <span className="block text-lg sm:text-xl font-black text-[#00D2FF] font-mono">55dB</span>
                <span className="text-[11px] font-medium text-zinc-400">Isolamento</span>
              </div>
              <div>
                <span className="block text-lg sm:text-xl font-black text-[#FF2A54] font-mono">100%</span>
                <span className="text-[11px] font-medium text-zinc-400">Autonomia</span>
              </div>
            </div>
          </div>

          {/* Right Column: Compact & Dynamic Featured Card */}
          <div className="lg:col-span-5 flex justify-center">
            {currentTrack ? (
              <div 
                id="hero-dynamic-featured-card"
                onMouseEnter={() => setIsAutoPlaying(false)}
                onMouseLeave={() => setIsAutoPlaying(true)}
                className="relative w-full max-w-[320px] sm:max-w-[340px] bg-[#121218]/95 border border-[#262634] rounded-2xl p-4 shadow-2xl backdrop-blur-xl group hover:border-[#0066FF]/60 transition-all duration-300"
              >
                {/* Glow behind the card */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[#0066FF]/25 to-[#FF2A54]/25 rounded-2xl blur-lg opacity-60 group-hover:opacity-100 transition-opacity -z-10" />

                {/* Card Top Pill & Controls */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1.5">
                    <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#FF2A54]/15 text-[#FF2A54] text-[10px] font-extrabold border border-[#FF2A54]/30">
                      <Flame className="w-2.5 h-2.5 animate-pulse" />
                      DESTAQUE
                    </span>
                    <span className="text-[10px] font-mono text-zinc-400 font-bold">
                      {currentIndex + 1}/{displayTracks.length}
                    </span>
                  </div>

                  {/* Manual Carousel Navigation Controls with Tooltips */}
                  <div className="flex items-center gap-1">
                    <Tooltip content="Destaque Anterior" position="top">
                      <button
                        onClick={handlePrev}
                        aria-label="Destaque anterior"
                        className="w-6 h-6 rounded-lg bg-[#1c1c26] hover:bg-[#282836] text-zinc-300 hover:text-white flex items-center justify-center border border-[#2e2e40] transition-colors"
                      >
                        <ChevronLeft className="w-3.5 h-3.5" />
                      </button>
                    </Tooltip>
                    
                    <Tooltip 
                      content={isAutoPlaying ? "Pausar Rotação Automática" : "Retomar Rotação Automática"} 
                      position="top"
                    >
                      <button
                        onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                        aria-label={isAutoPlaying ? "Pausar rotação automática" : "Iniciar rotação automática"}
                        className={`w-6 h-6 rounded-lg flex items-center justify-center border transition-colors ${
                          isAutoPlaying 
                            ? 'bg-[#0066FF]/20 border-[#0066FF]/40 text-[#00D2FF]' 
                            : 'bg-[#1c1c26] border-[#2e2e40] text-zinc-400'
                        }`}
                      >
                        {isAutoPlaying ? <Pause className="w-2.5 h-2.5" /> : <Play className="w-2.5 h-2.5" />}
                      </button>
                    </Tooltip>

                    <Tooltip content="Próximo Destaque" position="top">
                      <button
                        onClick={handleNext}
                        aria-label="Próximo destaque"
                        className="w-6 h-6 rounded-lg bg-[#1c1c26] hover:bg-[#282836] text-zinc-300 hover:text-white flex items-center justify-center border border-[#2e2e40] transition-colors"
                      >
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </Tooltip>
                  </div>
                </div>

                {/* Animated Carousel Track Item Content */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentTrack.id}
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.35, ease: 'easeInOut' }}
                    className="space-y-3"
                  >
                    {/* Compact Artwork */}
                    <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden shadow-lg border border-white/10 group/cover">
                      <img
                        src={currentTrack.coverUrl}
                        alt={currentTrack.title}
                        className="w-full h-full object-cover group-hover/cover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

                      {/* Genre Tag on Artwork */}
                      <div className="absolute top-2 left-2">
                        <span className={`px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider border shadow-md ${getGenreColor(currentTrack.genre)}`}>
                          {currentTrack.genre}
                        </span>
                      </div>

                      {/* Quick Download Overlay Center with Tooltip */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Tooltip 
                          content="Download Direto MP3"
                          subtext="Ficheiro masterizado em 320kbps"
                          position="top"
                        >
                          <button
                            onClick={() => downloadTrack(currentTrack)}
                            aria-label="Baixar Música"
                            className="w-11 h-11 rounded-full bg-gradient-to-r from-[#0066FF] to-[#00D2FF] text-white flex items-center justify-center shadow-[0_0_20px_rgba(0,102,255,0.8)] group-hover/cover:scale-110 active:scale-95 transition-all"
                          >
                            <Download className="w-5 h-5 text-white" />
                          </button>
                        </Tooltip>
                      </div>

                      <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-[10px] text-[#00D2FF] font-mono font-bold bg-black/70 backdrop-blur-md px-2 py-1 rounded-md border border-white/10">
                        <span className="flex items-center gap-1 truncate">
                          <Disc className="w-3 h-3 text-[#00D2FF] shrink-0" />
                          <span>MP3 320KBPS</span>
                        </span>
                        <span className="text-zinc-300 shrink-0">
                          {currentTrack.duration || '03:45'}
                        </span>
                      </div>
                    </div>

                    {/* Track Info */}
                    <div className="space-y-0.5">
                      <h3 className="text-sm sm:text-base font-bold text-white leading-tight truncate">
                        {currentTrack.title}
                      </h3>
                      <p className="text-xs text-zinc-300 font-medium truncate">
                        {currentTrack.artist} {currentTrack.featuredArtists && <span className="text-zinc-400">feat. {currentTrack.featuredArtists}</span>}
                      </p>
                    </div>

                    {/* Compact Card Action Buttons with Tooltips */}
                    <div className="grid grid-cols-2 gap-2 pt-1 border-t border-[#222230]">
                      <Tooltip 
                        content="Ver Ficha Técnica & Letra"
                        subtext="Créditos e transcrição oficial"
                        position="top"
                        className="w-full"
                      >
                        <button
                          onClick={() => openTrackDetails(currentTrack, true)}
                          className="w-full flex items-center justify-center gap-1.5 py-2 px-2.5 bg-[#1a1a24] hover:bg-[#242434] text-zinc-200 text-xs font-semibold rounded-lg border border-[#2a2a3c] transition-colors"
                        >
                          <Sliders className="w-3 h-3 text-[#00D2FF]" />
                          <span>Letra & Ficha</span>
                        </button>
                      </Tooltip>

                      <Tooltip 
                        content="Download do MP3"
                        subtext="Baixar áudio de alta qualidade"
                        position="top"
                        className="w-full"
                      >
                        <button
                          onClick={() => downloadTrack(currentTrack)}
                          className="w-full flex items-center justify-center gap-1.5 py-2 px-2.5 bg-gradient-to-r from-[#0066FF] to-[#00D2FF] text-white hover:brightness-110 shadow-md shadow-blue-500/20 text-xs font-semibold rounded-lg transition-all"
                        >
                          <Download className="w-3 h-3" />
                          <span>Baixar MP3</span>
                        </button>
                      </Tooltip>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Bottom Carousel Dot Indicators */}
                <div className="flex items-center justify-center gap-1.5 pt-3">
                  {displayTracks.slice(0, 8).map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentIndex(idx)}
                      aria-label={`Ir para destaque ${idx + 1}`}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        currentIndex === idx
                          ? 'w-5 bg-[#00D2FF]'
                          : 'w-1.5 bg-[#2a2a3a] hover:bg-[#444458]'
                      }`}
                    />
                  ))}
                </div>
              </div>
            ) : null}
          </div>

        </div>
      </div>
    </section>
  );
};
