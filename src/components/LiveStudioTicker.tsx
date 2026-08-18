import React from 'react';
import { 
  Flame, 
  Sparkles, 
  Download, 
  Mic2, 
  Disc3, 
  Sliders, 
  Volume2, 
  Radio,
  Music,
  CheckCircle2
} from 'lucide-react';
import { Track } from '../types';
import { usePlayer } from '../context/PlayerContext';

interface LiveStudioTickerProps {
  tracks: Track[];
}

export const LiveStudioTicker: React.FC<LiveStudioTickerProps> = ({ tracks }) => {
  const { downloadTrack, openTrackDetails } = usePlayer();

  const studioHighlights = [
    { label: 'KIZOMBA', color: 'text-[#00D2FF] bg-[#00D2FF]/10 border-[#00D2FF]/30' },
    { label: 'KUDURO DA PESADA', color: 'text-[#FF2A54] bg-[#FF2A54]/10 border-[#FF2A54]/30' },
    { label: 'SEMBA TRADICIONAL', color: 'text-[#F59E0B] bg-[#F59E0B]/10 border-[#F59E0B]/30' },
    { label: 'AFRO HOUSE & AMAPIANO', color: 'text-[#10B981] bg-[#10B981]/10 border-[#10B981]/30' },
    { label: 'HIP-HOP / DRILL / TRAP', color: 'text-[#8B5CF6] bg-[#8B5CF6]/10 border-[#8B5CF6]/30' },
    { label: 'DOWNLOAD DIRETO 320 KBPS', color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30' },
    { label: 'MASTERIZAÇÃO ANALÓGICA', color: 'text-[#0066FF] bg-[#0066FF]/10 border-[#0066FF]/30' },
    { label: 'CAPTAÇÃO NEUMANN & AVALON', color: 'text-amber-400 bg-amber-500/10 border-amber-500/30' },
  ];

  // Repeat for continuous marquee
  const repeatedHighlights = [...studioHighlights, ...studioHighlights, ...studioHighlights];
  const repeatedTracks = [...tracks, ...tracks, ...tracks];

  return (
    <div className="w-full bg-[#0d0d12] border-y border-[#1c1c26] overflow-hidden py-4 space-y-4">
      {/* Top Fast Marquee: Studio & Genre Highlights */}
      <div className="relative flex items-center overflow-hidden">
        {/* Left and Right Fade Gradients */}
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#0d0d12] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#0d0d12] to-transparent z-10 pointer-events-none" />

        <div className="animate-marquee flex items-center gap-4 whitespace-nowrap">
          {repeatedHighlights.map((item, idx) => (
            <div
              key={`highlight-${idx}`}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#14141c] border border-[#242432] shadow-sm text-xs font-bold font-mono"
            >
              <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-black border ${item.color}`}>
                {item.label}
              </span>
              <span className="text-zinc-400 text-[11px] font-sans font-medium flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-[#FF2A54]" />
                MELO MUSIC-studio
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Track Releases Carousel Marquee */}
      <div className="relative flex items-center overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#0d0d12] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#0d0d12] to-transparent z-10 pointer-events-none" />

        <div className="animate-marquee-reverse flex items-center gap-3.5 whitespace-nowrap py-1">
          {repeatedTracks.map((track, idx) => (
            <div
              key={`track-tape-${track.id}-${idx}`}
              onClick={() => openTrackDetails(track)}
              className="group inline-flex items-center gap-3 px-3 py-2 rounded-2xl bg-[#14141a] hover:bg-[#1c1c24] border border-[#22222e] hover:border-[#0066FF]/60 transition-all cursor-pointer shadow-md hover:shadow-blue-500/10 shrink-0"
            >
              {/* Cover Art */}
              <div className="relative w-11 h-11 rounded-xl overflow-hidden shadow-sm shrink-0 border border-white/5">
                <img
                  src={track.coverUrl}
                  alt={track.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
              </div>

              {/* Info */}
              <div className="text-left">
                <div className="flex items-center gap-1.5">
                  <span className="px-1.5 py-0.5 text-[9px] font-black uppercase rounded bg-[#0066FF]/20 text-[#00D2FF] border border-[#0066FF]/30">
                    {track.genre}
                  </span>
                  {track.featured && (
                    <span className="flex items-center gap-0.5 text-[9px] font-extrabold text-[#FF2A54]">
                      <Flame className="w-2.5 h-2.5" />
                      TOP
                    </span>
                  )}
                </div>
                <h4 className="text-xs font-bold text-white group-hover:text-[#00D2FF] truncate max-w-[140px] transition-colors">
                  {track.title}
                </h4>
                <p className="text-[11px] text-zinc-400 truncate max-w-[140px]">
                  {track.artist}
                </p>
              </div>

              {/* Direct Download Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  downloadTrack(track);
                }}
                aria-label={`Baixar ${track.title} MP3`}
                title="Baixar MP3"
                className="w-8 h-8 rounded-xl bg-[#1e1e28] group-hover:bg-gradient-to-r group-hover:from-[#0066FF] group-hover:to-[#00D2FF] text-zinc-300 group-hover:text-white flex items-center justify-center transition-all border border-[#2e2e3c] group-hover:border-transparent shrink-0 shadow-sm"
              >
                <Download className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
