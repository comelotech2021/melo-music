import React from 'react';
import { 
  X, 
  Sparkles, 
  Music, 
  Instagram, 
  ExternalLink, 
  Mic2, 
  Disc, 
  CheckCircle2, 
  Flame,
  Phone
} from 'lucide-react';
import { FeaturedArtist, StudioInfo } from '../types';

interface ArtistProfileModalProps {
  artist: FeaturedArtist | null;
  studioInfo: StudioInfo;
  onClose: () => void;
}

export const ArtistProfileModal: React.FC<ArtistProfileModalProps> = ({
  artist,
  studioInfo,
  onClose,
}) => {
  if (!artist) return null;

  const getGenreColor = (genre: string) => {
    switch (genre) {
      case 'Kizomba':
        return 'text-[#00D2FF] bg-[#00D2FF]/10 border-[#00D2FF]/30';
      case 'Kuduro':
        return 'text-[#FF2A54] bg-[#FF2A54]/10 border-[#FF2A54]/30';
      case 'Semba':
        return 'text-[#F59E0B] bg-[#F59E0B]/10 border-[#F59E0B]/30';
      case 'Afro House':
        return 'text-[#10B981] bg-[#10B981]/10 border-[#10B981]/30';
      case 'Hip-Hop/Trap':
        return 'text-[#8B5CF6] bg-[#8B5CF6]/10 border-[#8B5CF6]/30';
      default:
        return 'text-zinc-300 bg-zinc-800 border-zinc-700';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div 
        id={`artist-profile-modal-${artist.id}`}
        className="relative w-full max-w-2xl bg-[#121218] border border-[#262634] rounded-3xl overflow-hidden shadow-2xl z-10 my-8 animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Fechar"
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/60 hover:bg-black text-zinc-300 hover:text-white flex items-center justify-center border border-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header with Photo Banner */}
        <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-gradient-to-b from-[#1a1a24] to-[#121218]">
          <img
            src={artist.photoUrl}
            alt={artist.name}
            className="w-full h-full object-cover object-top"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#121218] via-[#121218]/40 to-transparent" />

          {/* Floating Badges */}
          <div className="absolute bottom-4 left-6 right-6 flex flex-wrap items-center justify-between gap-2">
            <div>
              <div className="flex items-center gap-2">
                <span className={`px-2.5 py-1 rounded-full text-xs font-black uppercase border ${getGenreColor(artist.primaryGenre)}`}>
                  {artist.primaryGenre}
                </span>
                {artist.verified && (
                  <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-500/20 text-blue-400 text-xs font-bold border border-blue-500/30">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Artista Oficial MELO
                  </span>
                )}
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white mt-1.5 flex items-center gap-2">
                {artist.name}
              </h2>
              {artist.stageName && (
                <p className="text-sm font-semibold text-[#00D2FF]">
                  "{artist.stageName}" • <span className="text-zinc-300 font-normal">{artist.role}</span>
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Biografia */}
          <div>
            <h3 className="text-xs font-black uppercase tracking-wider text-zinc-400 mb-2 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#FF2A54]" />
              Biografia & Trajetória Artística
            </h3>
            <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-normal">
              {artist.bio}
            </p>
          </div>

          {/* Ritmos & Especialidades */}
          {artist.secondaryGenres && artist.secondaryGenres.length > 0 && (
            <div>
              <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">
                Ritmos & Vertentes
              </h4>
              <div className="flex flex-wrap gap-2">
                <span className={`px-2.5 py-1 rounded-lg text-xs font-bold border ${getGenreColor(artist.primaryGenre)}`}>
                  {artist.primaryGenre} (Principal)
                </span>
                {artist.secondaryGenres.map((g) => (
                  <span key={g} className="px-2.5 py-1 rounded-lg text-xs font-medium bg-[#1a1a24] text-zinc-300 border border-[#2a2a38]">
                    {g}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Faixas Gravadas no Estúdio */}
          {artist.hitsRecordedAtStudio && artist.hitsRecordedAtStudio.length > 0 && (
            <div className="bg-[#181822] border border-[#262636] rounded-2xl p-4 sm:p-5">
              <h4 className="text-xs font-black uppercase tracking-wider text-white mb-3 flex items-center gap-2">
                <Disc className="w-4 h-4 text-[#00D2FF]" />
                Faixas & Produções no MELO MUSIC-studio
              </h4>
              <div className="space-y-2">
                {artist.hitsRecordedAtStudio.map((hit, idx) => (
                  <div 
                    key={idx}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-[#12121a] border border-[#222230]"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="w-6 h-6 rounded-full bg-[#0066FF]/20 text-[#00D2FF] text-xs font-bold flex items-center justify-center font-mono">
                        {idx + 1}
                      </span>
                      <span className="text-sm font-semibold text-white">
                        {hit}
                      </span>
                    </div>
                    <span className="text-[11px] text-zinc-400 font-mono font-medium">
                      Masterizado no Studio
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Socials and Connect */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#222230]">
            <div className="flex items-center gap-3">
              {artist.instagram && (
                <a
                  href={artist.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#1c1c28] hover:bg-[#262636] text-zinc-300 hover:text-white text-xs font-bold border border-[#2e2e40] transition-colors"
                >
                  <Instagram className="w-4 h-4 text-[#FF2A54]" />
                  <span>Instagram</span>
                </a>
              )}
              {artist.monthlyListenersOrStats && (
                <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-2 rounded-xl">
                  {artist.monthlyListenersOrStats}
                </span>
              )}
            </div>

            <a
              href={`https://wa.me/${studioInfo.contacts.whatsapp.replace(/[^0-9]/g, '')}?text=Ola,%20gostaria%20de%20agendar%20uma%20producao%20musical%20com%20o%20mesmo%20padrao%20do%20artista%20${encodeURIComponent(artist.name)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#0066FF] to-[#00D2FF] text-white text-xs font-bold shadow-lg shadow-blue-500/20 hover:brightness-110 active:scale-98 transition-all"
            >
              <Mic2 className="w-4 h-4" />
              <span>Gravar Faixa com este Padrão</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
