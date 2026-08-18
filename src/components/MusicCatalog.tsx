import React, { useState, useMemo } from 'react';
import { 
  Music, 
  Search, 
  Filter, 
  Grid, 
  List, 
  Disc3, 
  Sparkles, 
  SlidersHorizontal, 
  Flame, 
  Radio, 
  PlusCircle 
} from 'lucide-react';
import { Track, MusicGenre } from '../types';
import { TrackCard } from './TrackCard';
import { Code2 } from 'lucide-react';

interface MusicCatalogProps {
  tracks: Track[];
  selectedGenre?: string;
  onSelectGenre?: (genre: string) => void;
  onOpenAdminToAddTrack: () => void;
  onOpenBloggerGuide?: () => void;
}

export const MusicCatalog: React.FC<MusicCatalogProps> = ({ 
  tracks, 
  selectedGenre: externalSelectedGenre,
  onSelectGenre: externalOnSelectGenre,
  onOpenAdminToAddTrack,
  onOpenBloggerGuide
}) => {
  const [internalGenre, setInternalGenre] = useState<string>('TODOS');
  const selectedGenre = externalSelectedGenre !== undefined ? externalSelectedGenre : internalGenre;

  const handleSetGenre = (g: string) => {
    if (externalOnSelectGenre) {
      externalOnSelectGenre(g);
    } else {
      setInternalGenre(g);
    }
  };

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'recent' | 'popular' | 'title'>('recent');
  const [isListMode, setIsListMode] = useState<boolean>(false);

  const genres: (MusicGenre | 'TODOS')[] = [
    'TODOS',
    'Kizomba',
    'Kuduro',
    'Semba',
    'Afro House',
    'Hip-Hop/Trap',
    'Outros',
  ];

  const filteredTracks = useMemo(() => {
    return tracks
      .filter((track) => {
        const matchesGenre = selectedGenre === 'TODOS' || track.genre === selectedGenre;
        const query = searchQuery.toLowerCase();
        const matchesSearch =
          track.title.toLowerCase().includes(query) ||
          track.artist.toLowerCase().includes(query) ||
          (track.featuredArtists && track.featuredArtists.toLowerCase().includes(query)) ||
          track.genre.toLowerCase().includes(query) ||
          (track.credits.producer && track.credits.producer.toLowerCase().includes(query));

        return matchesGenre && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'popular') {
          return (b.playCount || 0) - (a.playCount || 0);
        }
        if (sortBy === 'title') {
          return a.title.localeCompare(b.title);
        }
        // recent
        return new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime();
      });
  }, [tracks, selectedGenre, searchQuery, sortBy]);

  return (
    <section id="musicas" className="py-20 bg-[#0c0c10] border-t border-[#1a1a24] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0066FF]/10 text-[#00D2FF] text-xs font-bold border border-[#0066FF]/20">
              <Disc3 className="w-3.5 h-3.5 animate-spin" />
              <span>DISCOGRAFIA & LANÇAMENTOS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Catálogo Musical do <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D2FF] to-[#0066FF]">Estúdio</span>
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 max-w-xl">
              Explore e baixe produções originais gravadas e masterizadas no MELO MUSIC-studio. Download direto de alta qualidade em formato MP3.
            </p>
          </div>

          {/* Subtle owner trigger dot */}
          <div className="flex items-center gap-2">
            {/* Secret dot button to trigger modal */}
            <button
              onClick={onOpenAdminToAddTrack}
              aria-label="Adicionar"
              className="w-2.5 h-2.5 rounded-full bg-[#FF2A54] opacity-30 hover:opacity-100 transition-opacity ml-1"
            />
          </div>
        </div>

        {/* Filters and Search Bar Container */}
        <div className="p-4 rounded-2xl bg-[#141418] border border-[#24242c] mb-8 shadow-xl">
          {/* Search, Sort and View Mode Row */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            {/* Search Input */}
            <div className="relative w-full sm:max-w-md">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
              <input
                type="text"
                placeholder="Pesquisar por título, artista, produtor..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-[#0a0a0d] border border-[#24242c] focus:border-[#00D2FF] rounded-xl text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-400 hover:text-white"
                >
                  Limpar
                </button>
              )}
            </div>

            {/* Sort Dropdown & View Mode Switcher */}
            <div className="flex items-center justify-between w-full sm:w-auto gap-3">
              <div className="flex items-center gap-2">
                <span className="text-xs text-zinc-500 font-medium">Ordenar:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  aria-label="Ordenar Músicas"
                  className="bg-[#0a0a0d] border border-[#24242c] text-zinc-300 text-xs font-medium rounded-xl px-3 py-2 focus:outline-none focus:border-[#00D2FF]"
                >
                  <option value="recent">Mais Recentes</option>
                  <option value="popular">Mais Ouvidas</option>
                  <option value="title">Título (A-Z)</option>
                </select>
              </div>

              {/* Grid vs List View */}
              <div className="flex items-center bg-[#0a0a0d] border border-[#24242c] rounded-xl p-1">
                <button
                  onClick={() => setIsListMode(false)}
                  aria-label="Visualização em Grade"
                  className={`p-1.5 rounded-lg transition-colors ${
                    !isListMode ? 'bg-[#0066FF] text-white' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsListMode(true)}
                  aria-label="Visualização em Lista"
                  className={`p-1.5 rounded-lg transition-colors ${
                    isListMode ? 'bg-[#0066FF] text-white' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tracks Counter */}
        <div className="flex items-center justify-between mb-6 px-1">
          <span className="text-xs font-semibold text-zinc-400">
            Exibindo <strong className="text-white">{filteredTracks.length}</strong> {filteredTracks.length === 1 ? 'música' : 'músicas'}
            {selectedGenre !== 'TODOS' && <span> em <span className="text-[#00D2FF]">{selectedGenre}</span></span>}
          </span>
        </div>

        {/* Tracks Rendering Grid / List */}
        {filteredTracks.length > 0 ? (
          isListMode ? (
            <div className="space-y-3">
              {filteredTracks.map((track) => (
                <TrackCard key={track.id} track={track} isListMode={true} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredTracks.map((track) => (
                <TrackCard key={track.id} track={track} isListMode={false} />
              ))}
            </div>
          )
        ) : (
          /* Empty state */
          <div className="text-center py-16 px-4 rounded-3xl bg-[#141418] border border-[#24242c]">
            <Music className="w-12 h-12 text-zinc-600 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-white mb-1">Nenhuma música encontrada</h3>
            <p className="text-sm text-zinc-400 max-w-md mx-auto mb-6">
              Não encontramos faixas correspondentes aos filtros selecionados. Tente ajustar sua busca ou adicione uma nova faixa no painel administrativo.
            </p>
            <button
              onClick={() => {
                handleSetGenre('TODOS');
                setSearchQuery('');
              }}
              className="px-5 py-2.5 bg-[#1e1e26] hover:bg-[#282834] text-[#00D2FF] border border-[#2a2a36] rounded-xl text-xs font-bold transition-all"
            >
              Redefinir Filtros
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
