import React, { useState } from 'react';
import { Newspaper, Calendar, ArrowRight, Sparkles, Tag, PlusCircle } from 'lucide-react';
import { NewsArticle, NewsCategory } from '../types';
import { NewsModal } from './NewsModal';

interface NewsSectionProps {
  news: NewsArticle[];
  onOpenAdminToAddNews: () => void;
}

export const NewsSection: React.FC<NewsSectionProps> = ({ news, onOpenAdminToAddNews }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('TODAS');
  const [activeArticle, setActiveArticle] = useState<NewsArticle | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const categories: (NewsCategory | 'TODAS')[] = [
    'TODAS',
    'Lançamento',
    'Estúdio',
    'Artistas',
    'Bastidores',
    'Comunicado',
  ];

  const filteredNews = news.filter((item) => {
    if (selectedCategory === 'TODAS') return true;
    return item.category === selectedCategory;
  });

  const handleOpenArticle = (article: NewsArticle) => {
    setActiveArticle(article);
    setIsModalOpen(true);
  };

  return (
    <section id="novidades" className="py-20 bg-[#0a0a0c] border-t border-[#1a1a24] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF2A54]/10 text-[#FF2A54] text-xs font-bold border border-[#FF2A54]/20">
              <Newspaper className="w-3.5 h-3.5" />
              <span>REVISTA & COMUNICADOS DO ESTÚDIO</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Últimas <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2A54] to-[#00D2FF]">Novidades</span>
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 max-w-xl">
              Fique por dentro dos novos lançamentos, bastidores de gravação, entrevistas e expansões do MELO MUSIC-studio.
            </p>
          </div>

          {/* Subtle owner trigger dot */}
          <div className="flex items-center">
            <button
              onClick={onOpenAdminToAddNews}
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
                    ? 'bg-gradient-to-r from-[#FF2A54] to-[#0066FF] text-white shadow-lg shadow-red-500/20'
                    : 'bg-[#141418] text-zinc-400 hover:text-white hover:bg-[#1c1c24] border border-[#24242c]'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* News Grid (Editorial Magazine Layout) */}
        {filteredNews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNews.map((article) => (
              <article
                key={article.id}
                onClick={() => handleOpenArticle(article)}
                className="group relative flex flex-col justify-between bg-[#141418] hover:bg-[#181820] border border-[#24242c] hover:border-[#FF2A54]/40 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 shadow-xl hover:shadow-[0_10px_30px_rgba(0,0,0,0.6)] hover:-translate-y-1"
              >
                {/* Article Cover Image */}
                <div className="relative h-48 w-full overflow-hidden bg-black/50">
                  <img
                    src={article.coverUrl}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#141418] via-transparent to-transparent opacity-80" />

                  <span className="absolute top-3 left-3 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider rounded-lg bg-black/70 backdrop-blur-md text-[#FF2A54] border border-white/10 shadow-lg">
                    {article.category}
                  </span>

                  <span className="absolute bottom-3 left-3 flex items-center gap-1.5 text-[11px] font-medium text-zinc-300 bg-black/60 backdrop-blur-md px-2.5 py-0.5 rounded-md border border-white/10">
                    <Calendar className="w-3 h-3 text-[#00D2FF]" />
                    {article.publishDate}
                  </span>
                </div>

                {/* Article Info */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-[#00D2FF] leading-snug line-clamp-2 transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-400 line-clamp-3 leading-relaxed">
                      {article.summary}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-[#202028] text-xs font-bold">
                    <span className="text-zinc-500 font-medium text-[11px]">
                      Por {article.author}
                    </span>
                    <span className="flex items-center gap-1 text-[#00D2FF] group-hover:translate-x-1 transition-transform">
                      <span>Ler mais</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 px-4 rounded-3xl bg-[#141418] border border-[#24242c]">
            <Newspaper className="w-12 h-12 text-zinc-600 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-white mb-1">Nenhuma novidade encontrada</h3>
            <p className="text-sm text-zinc-400 max-w-md mx-auto mb-6">
              Ainda não há artigos cadastrados nesta categoria.
            </p>
            <button
              onClick={() => setSelectedCategory('TODAS')}
              className="px-5 py-2.5 bg-[#1e1e26] hover:bg-[#282834] text-[#FF2A54] border border-[#2a2a36] rounded-xl text-xs font-bold transition-all"
            >
              Exibir Todas as Notícias
            </button>
          </div>
        )}
      </div>

      {/* Article Full Modal */}
      <NewsModal
        article={activeArticle}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setActiveArticle(null);
        }}
      />
    </section>
  );
};
