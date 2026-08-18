import React, { useState } from 'react';
import { X, Calendar, Clock, User, Share2, Check, Tag } from 'lucide-react';
import { NewsArticle } from '../types';

interface NewsModalProps {
  article: NewsArticle | null;
  isOpen: boolean;
  onClose: () => void;
}

export const NewsModal: React.FC<NewsModalProps> = ({ article, isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !article) return null;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: article.summary,
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
        {/* Header with Artwork Banner */}
        <div className="relative h-60 sm:h-72 w-full overflow-hidden shrink-0">
          <img
            src={article.coverUrl}
            alt={article.title}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#141418] via-[#141418]/50 to-black/30" />

          {/* Close button */}
          <button
            onClick={onClose}
            aria-label="Fechar Notícia"
            className="absolute top-4 right-4 z-20 p-2 text-zinc-300 hover:text-white bg-black/60 hover:bg-black/90 rounded-full border border-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Category & Title */}
          <div className="absolute bottom-4 left-6 right-6 z-10 space-y-2">
            <span className="inline-block px-3 py-1 text-xs font-black uppercase rounded-full bg-[#0066FF] text-white shadow-lg">
              {article.category}
            </span>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-white leading-tight">
              {article.title}
            </h2>
          </div>
        </div>

        {/* Metadata bar */}
        <div className="flex items-center justify-between px-6 py-3 bg-[#101014] border-b border-[#202028] text-xs text-zinc-400">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#00D2FF]" />
              {article.publishDate}
            </span>
            <span className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-zinc-400" />
              {article.author}
            </span>
            {article.readTimeMinutes && (
              <span className="hidden sm:flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#FF2A54]" />
                {article.readTimeMinutes} min de leitura
              </span>
            )}
          </div>

          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#181820] hover:bg-[#22222c] text-zinc-200 border border-[#2a2a36] transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
            <span>{copied ? 'Link Copiado!' : 'Compartilhar'}</span>
          </button>
        </div>

        {/* Body Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 text-zinc-300 custom-scrollbar text-sm sm:text-base leading-relaxed">
          {/* Summary Callout */}
          <div className="p-4 rounded-xl bg-[#0c0c0f] border-l-4 border-[#00D2FF] text-zinc-200 font-medium italic">
            "{article.summary}"
          </div>

          {/* Full content */}
          <div className="space-y-4 whitespace-pre-line text-zinc-300">
            {article.content}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#101014] border-t border-[#202028] flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-[#1e1e26] hover:bg-[#282834] text-zinc-300 hover:text-white text-xs font-bold transition-all"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
