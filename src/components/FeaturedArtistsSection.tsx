import React, { useState } from 'react';
import { 
  Users, 
  ArrowRight, 
  Disc, 
  Mic2, 
  CheckCircle2, 
  UserCheck
} from 'lucide-react';
import { FeaturedArtist, StudioInfo } from '../types';
import { ArtistProfileModal } from './ArtistProfileModal';

interface FeaturedArtistsSectionProps {
  artists: FeaturedArtist[];
  studioInfo: StudioInfo;
}

export const FeaturedArtistsSection: React.FC<FeaturedArtistsSectionProps> = ({
  artists,
  studioInfo,
}) => {
  const [activeProfileArtist, setActiveProfileArtist] = useState<FeaturedArtist | null>(null);

  const getGenreColor = (genre: string) => {
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

  return (
    <section id="artistas" className="relative py-20 bg-[#0a0a0c] border-t border-[#1a1a24] overflow-hidden">
      {/* Background Ambience Glow */}
      <div className="absolute top-1/3 left-0 w-80 h-80 bg-[#0066FF]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-80 h-80 bg-[#FF2A54]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#14141c] border border-[#242432] text-xs font-bold text-[#00D2FF] mb-3">
              <Users className="w-3.5 h-3.5 text-[#FF2A54]" />
              <span>VOZES & TALENTOS DO ESTÚDIO</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Artistas em <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D2FF] via-[#0066FF] to-[#FF2A54]">Destaque</span>
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 max-w-xl mt-1.5">
              Conheça os cantores, músicos e MCs que gravam suas obras e definem o padrão sonoro do MELO MUSIC-studio.
            </p>
          </div>

          <a
            href={`https://wa.me/${studioInfo.contacts.whatsapp.replace(/[^0-9]/g, '')}?text=Ola,%20sou%20artista%20e%20quero%20gravar%20as%20minhas%20musicas%20no%20MELO%20MUSIC-studio`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#14141c] hover:bg-[#1e1e28] text-zinc-200 hover:text-white border border-[#262636] hover:border-[#00D2FF]/50 text-xs font-bold transition-all shadow-md self-start md:self-auto"
          >
            <Mic2 className="w-4 h-4 text-[#00D2FF]" />
            <span>Gravar no Estúdio</span>
          </a>
        </div>

        {/* Artists Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {artists.map((artist) => (
            <div
              key={artist.id}
              id={`artist-card-${artist.id}`}
              className="group relative bg-[#13131a] hover:bg-[#181822] border border-[#222230] hover:border-[#0066FF]/40 rounded-3xl overflow-hidden transition-all duration-300 shadow-xl flex flex-col justify-between"
            >
              {/* Top Headshot / Photo Container */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#1a1a24]">
                <img
                  src={artist.photoUrl}
                  alt={artist.name}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#13131a] via-[#13131a]/30 to-transparent" />

                {/* Genre Badge */}
                <div className="absolute top-4 left-4">
                  <span className={`px-2.5 py-1 rounded-full text-[11px] font-black uppercase tracking-wider border shadow-md ${getGenreColor(artist.primaryGenre)}`}>
                    {artist.primaryGenre}
                  </span>
                </div>

                {/* Verified Official Badge */}
                {artist.verified && (
                  <div className="absolute top-4 right-4">
                    <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-blue-400 text-[10px] font-bold border border-blue-500/30">
                      <CheckCircle2 className="w-3 h-3 text-blue-400" />
                      Oficial
                    </span>
                  </div>
                )}

                {/* Name Overlay at Bottom of Photo */}
                <div className="absolute bottom-3 left-4 right-4">
                  <h3 className="text-xl font-black text-white group-hover:text-[#00D2FF] transition-colors leading-tight">
                    {artist.name}
                  </h3>
                  {artist.stageName && (
                    <p className="text-xs font-semibold text-zinc-300">
                      "{artist.stageName}"
                    </p>
                  )}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 sm:p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-zinc-400">
                      {artist.role}
                    </span>
                    {artist.monthlyListenersOrStats && (
                      <span className="text-[11px] font-medium text-emerald-400 font-mono">
                        {artist.monthlyListenersOrStats}
                      </span>
                    )}
                  </div>

                  <p className="text-xs sm:text-sm text-zinc-400 line-clamp-3 leading-relaxed">
                    {artist.bio}
                  </p>
                </div>

                {/* Studio Hits Tag */}
                {artist.hitsRecordedAtStudio && artist.hitsRecordedAtStudio.length > 0 && (
                  <div className="pt-2 border-t border-[#20202c]">
                    <div className="flex items-center gap-1.5 text-[11px] font-bold text-zinc-300 mb-1.5">
                      <Disc className="w-3.5 h-3.5 text-[#FF2A54]" />
                      <span>Faixa Destaque:</span>
                    </div>
                    <p className="text-xs font-semibold text-[#00D2FF] truncate">
                      "{artist.hitsRecordedAtStudio[0]}"
                    </p>
                  </div>
                )}

                {/* Actions: View Profile Button */}
                <div className="pt-2">
                  <button
                    onClick={() => setActiveProfileArtist(artist)}
                    id={`view-profile-btn-${artist.id}`}
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#1c1c28] hover:bg-gradient-to-r hover:from-[#0066FF] hover:to-[#00D2FF] text-zinc-200 hover:text-white border border-[#2a2a3c] hover:border-transparent text-xs font-bold transition-all shadow-md active:scale-98 cursor-pointer"
                  >
                    <UserCheck className="w-4 h-4 text-[#00D2FF] group-hover:text-white" />
                    <span>Ver Perfil & Produções</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-auto" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Artist Profile Modal */}
      <ArtistProfileModal
        artist={activeProfileArtist}
        studioInfo={studioInfo}
        onClose={() => setActiveProfileArtist(null)}
      />
    </section>
  );
};
