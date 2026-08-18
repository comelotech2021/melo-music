import React, { useState } from 'react';
import { 
  Youtube, 
  Play, 
  X, 
  ExternalLink, 
  Film, 
  Sliders, 
  Sparkles, 
  PlusCircle, 
  Info 
} from 'lucide-react';
import { StudioVideo, VideoCategory } from '../types';

interface YouTubeSectionProps {
  videos: StudioVideo[];
  onOpenAdminToAddVideo: () => void;
}

export const YouTubeSection: React.FC<YouTubeSectionProps> = ({ videos, onOpenAdminToAddVideo }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('TODOS');
  const [activeVideo, setActiveVideo] = useState<StudioVideo | null>(null);

  const categories: (VideoCategory | 'TODOS')[] = [
    'TODOS',
    'Videoclipe',
    'Sessão de Estúdio',
    'Making Of',
    'Entrevista',
  ];

  // Helper to extract clean embed URL or YouTube ID
  const getEmbedUrl = (idOrUrl: string) => {
    if (!idOrUrl) return '';
    let videoId = idOrUrl.trim();

    if (videoId.includes('youtube.com/watch?v=')) {
      videoId = videoId.split('v=')[1]?.split('&')[0] || videoId;
    } else if (videoId.includes('youtu.be/')) {
      videoId = videoId.split('youtu.be/')[1]?.split('?')[0] || videoId;
    } else if (videoId.includes('youtube.com/embed/')) {
      videoId = videoId.split('youtube.com/embed/')[1]?.split('?')[0] || videoId;
    }

    return `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`;
  };

  const filteredVideos = videos.filter((vid) => {
    if (selectedCategory === 'TODOS') return true;
    return vid.category === selectedCategory;
  });

  return (
    <section id="videos" className="py-20 bg-[#0a0a0c] border-t border-[#1a1a24] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF0000]/10 text-[#FF2A54] text-xs font-bold border border-[#FF0000]/20">
              <Youtube className="w-3.5 h-3.5 fill-[#FF0000]" />
              <span>CANAL OFICIAL & CONTEÚDO AUDIOVISUAL</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Vídeos do <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2A54] to-[#00D2FF]">YouTube</span>
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 max-w-xl">
              Assista a videoclipes oficiais em 4K, sessões ao vivo gravadas na sala acústica, making of de produções e entrevistas com produtores.
            </p>
          </div>

          {/* Quick Buttons */}
          <div className="flex items-center gap-3">
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2.5 bg-[#FF0000]/20 hover:bg-[#FF0000]/30 text-[#FF2A54] border border-[#FF0000]/40 rounded-xl text-xs font-bold transition-all shadow-md"
            >
              <Youtube className="w-4 h-4 fill-current" />
              <span>Inscrever-se no Canal</span>
            </a>

            {/* Subtle owner trigger dot */}
            <button
              onClick={onOpenAdminToAddVideo}
              aria-label="Adicionar"
              className="w-2.5 h-2.5 rounded-full bg-[#FF2A54] opacity-30 hover:opacity-100 transition-opacity"
            />
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-thin scrollbar-thumb-zinc-800">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 text-xs font-bold rounded-xl transition-all whitespace-nowrap ${
                  isSelected
                    ? 'bg-gradient-to-r from-[#FF0000] to-[#FF2A54] text-white shadow-lg shadow-red-500/20'
                    : 'bg-[#141418] text-zinc-400 hover:text-white hover:bg-[#1c1c24] border border-[#24242c]'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Videos Grid */}
        {filteredVideos.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVideos.map((video) => (
              <div
                key={video.id}
                onClick={() => setActiveVideo(video)}
                className="group relative flex flex-col justify-between bg-[#141418] hover:bg-[#181820] border border-[#24242c] hover:border-[#FF0000]/40 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 shadow-xl hover:shadow-[0_10px_30px_rgba(255,0,0,0.15)] hover:-translate-y-1"
              >
                {/* Thumbnail with Overlay & Red Play Button */}
                <div className="relative aspect-video w-full overflow-hidden bg-black/80 group/thumb">
                  {video.thumbnailUrl ? (
                    <img
                      src={video.thumbnailUrl}
                      alt={video.title}
                      className="w-full h-full object-cover group-hover/thumb:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-[#101014]">
                      <Film className="w-12 h-12 text-zinc-700" />
                    </div>
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Red YouTube Center Play Button */}
                  <div className="absolute inset-0 m-auto w-14 h-14 rounded-full bg-[#FF0000] text-white flex items-center justify-center shadow-[0_0_25px_rgba(255,0,0,0.7)] group-hover/thumb:scale-110 active:scale-95 transition-all">
                    <Play className="w-6 h-6 fill-white ml-0.5" />
                  </div>

                  {/* Category Pill */}
                  <span className="absolute top-3 left-3 px-2.5 py-1 text-[10px] font-extrabold uppercase rounded-lg bg-black/80 backdrop-blur-md text-white border border-white/10">
                    {video.category}
                  </span>

                  {/* Duration Pill */}
                  {video.duration && (
                    <span className="absolute bottom-3 right-3 px-2 py-0.5 text-[11px] font-mono font-bold rounded bg-black/80 text-zinc-200 border border-white/10">
                      {video.duration}
                    </span>
                  )}
                </div>

                {/* Video Info */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div className="space-y-1.5">
                    <h3 className="text-base font-bold text-white group-hover:text-[#FF2A54] leading-snug line-clamp-2 transition-colors">
                      {video.title}
                    </h3>
                    <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                      {video.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-[#202028] text-xs font-bold text-[#FF2A54]">
                    <span className="flex items-center gap-1.5">
                      <Youtube className="w-3.5 h-3.5 fill-current" />
                      <span>Assistir Vídeo</span>
                    </span>
                    <ExternalLink className="w-3.5 h-3.5 text-zinc-500 group-hover:text-white transition-colors" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 px-4 rounded-3xl bg-[#141418] border border-[#24242c]">
            <Youtube className="w-12 h-12 text-zinc-600 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-white mb-1">Nenhum vídeo nesta categoria</h3>
            <p className="text-sm text-zinc-400 max-w-md mx-auto mb-6">
              Adicione vídeos usando o ID ou link do YouTube pelo painel administrativo.
            </p>
            <button
              onClick={() => setSelectedCategory('TODOS')}
              className="px-5 py-2.5 bg-[#1e1e26] hover:bg-[#282834] text-[#FF2A54] border border-[#2a2a36] rounded-xl text-xs font-bold transition-all"
            >
              Ver Todos os Vídeos
            </button>
          </div>
        )}

        {/* YouTube Architecture / API Guidance Card */}
        <div className="mt-12 p-5 sm:p-6 rounded-2xl bg-[#141418]/60 border border-[#22222a] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-[#0066FF]/20 text-[#00D2FF] border border-[#0066FF]/30 shrink-0">
              <Info className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white mb-1">
                Arquitetura de Vídeo & Integração Flexível do Canal
              </h4>
              <p className="text-xs text-zinc-400 max-w-2xl leading-relaxed">
                Os vídeos podem ser cadastrados instantaneamente fornecendo apenas o <strong>ID ou URL do YouTube</strong> (ex: <code className="text-zinc-300 font-mono bg-black/40 px-1 py-0.5 rounded">https://youtube.com/watch?v=...</code>). 
                Para sincronização automática de todo o canal via <strong>YouTube Data API v3</strong>, basta configurar a chave de API nos segredos do ambiente sem modificar o design da aplicação.
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* Video Modal Player */}
      {activeVideo && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setActiveVideo(null)}
        >
          <div 
            className="relative w-full max-w-4xl bg-[#141418] border border-[#24242c] rounded-2xl overflow-hidden shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-5 py-3.5 bg-[#0e0e12] border-b border-[#202028]">
              <div className="flex items-center gap-2">
                <Youtube className="w-5 h-5 text-[#FF0000] fill-current" />
                <h3 className="text-sm sm:text-base font-bold text-white truncate max-w-xl">
                  {activeVideo.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveVideo(null)}
                aria-label="Fechar Vídeo"
                className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-[#1e1e26] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Responsive 16:9 Video Iframe */}
            <div className="relative aspect-video w-full bg-black">
              <iframe
                src={getEmbedUrl(activeVideo.youtubeIdOrUrl)}
                title={activeVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full border-0"
              />
            </div>

            {/* Modal Info Footer */}
            <div className="p-4 sm:p-5 bg-[#101014] text-xs text-zinc-300 space-y-1">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded bg-[#FF0000]/20 text-[#FF2A54] font-bold uppercase text-[10px]">
                  {activeVideo.category}
                </span>
                <a
                  href={`https://youtube.com/watch?v=${activeVideo.youtubeIdOrUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-[#00D2FF] hover:underline font-semibold"
                >
                  <span>Abrir no YouTube</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              <p className="text-zinc-400 pt-1 leading-relaxed">
                {activeVideo.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
