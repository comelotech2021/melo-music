import React, { useState } from 'react';
import { 
  X, 
  Copy, 
  Check, 
  Code2, 
  FileText, 
  HelpCircle, 
  Download, 
  Play, 
  Music, 
  Sparkles, 
  ExternalLink,
  Layers,
  Tag,
  ChevronDown
} from 'lucide-react';
import { Track, MusicGenre, StudioInfo } from '../types';

interface BloggerGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  tracks: Track[];
  studioInfo: StudioInfo;
}

export const BloggerGuideModal: React.FC<BloggerGuideModalProps> = ({
  isOpen,
  onClose,
  tracks,
  studioInfo,
}) => {
  const [activeTab, setActiveTab] = useState<'menu' | 'post' | 'guide'>('menu');
  const [copiedMenu, setCopiedMenu] = useState(false);
  const [copiedPost, setCopiedPost] = useState(false);

  // Post Generator Custom State
  const [selectedTrackId, setSelectedTrackId] = useState<string>(tracks[0]?.id || 'custom');
  const [postTitle, setPostTitle] = useState<string>(tracks[0]?.title || 'Nova Faixa do Estúdio');
  const [postArtist, setPostArtist] = useState<string>(tracks[0]?.artist || 'Artista MELO');
  const [postGenre, setPostGenre] = useState<MusicGenre>(tracks[0]?.genre || 'Kizomba');
  const [postCoverUrl, setPostCoverUrl] = useState<string>(tracks[0]?.coverUrl || 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop&q=80');
  const [postAudioUrl, setPostAudioUrl] = useState<string>(tracks[0]?.audioUrl || 'https://actions.google.com/sounds/v1/ambiences/outdoor_evening_crickets.ogg');
  const [postDownloadUrl, setPostDownloadUrl] = useState<string>(tracks[0]?.downloadUrl || tracks[0]?.audioUrl || 'https://actions.google.com/sounds/v1/ambiences/outdoor_evening_crickets.ogg');
  const [postProducer, setPostProducer] = useState<string>(tracks[0]?.credits.producer || 'MELO Producer');
  const [postStudio, setPostStudio] = useState<string>(tracks[0]?.credits.recordingStudio || 'MELO MUSIC-studio');

  if (!isOpen) return null;

  const handleSelectTrack = (trackId: string) => {
    setSelectedTrackId(trackId);
    if (trackId === 'custom') {
      setPostTitle('Título da Nova Música');
      setPostArtist('Nome do Artista');
      setPostGenre('Kizomba');
      setPostCoverUrl('https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop&q=80');
      setPostAudioUrl('https://seusite.com/audio.mp3');
      setPostDownloadUrl('https://seusite.com/audio.mp3');
    } else {
      const found = tracks.find((t) => t.id === trackId);
      if (found) {
        setPostTitle(found.title);
        setPostArtist(found.artist);
        setPostGenre(found.genre);
        setPostCoverUrl(found.coverUrl);
        setPostAudioUrl(found.audioUrl);
        setPostDownloadUrl(found.downloadUrl || found.audioUrl);
        setPostProducer(found.credits.producer || 'MELO Producer');
        setPostStudio(found.credits.recordingStudio || 'MELO MUSIC-studio');
      }
    }
  };

  // 1. Menu Gadget HTML + CSS Code
  const bloggerMenuCode = `<!-- ========================================================
   MELO MUSIC-STUDIO - MENU SUPERIOR BLOGGER COM SUBMENU DE ESTILOS
   Cores: Vermelho (#FF2A54), Amarelo Torrado (#F59E0B), Azul (#0066FF)
   Instalação: Blogger > Layout > Top Navigation > Gadget HTML/JavaScript
   ======================================================== -->

<div id="melo-blogger-nav-container">
  <!-- Barra de Destaque Superior Vermelha -->
  <div class="melo-top-red-bar"></div>

  <nav class="melo-navbar">
    <!-- Logótipo / Marca -->
    <div class="melo-nav-brand">
      <a href="/" class="melo-logo-link">
        <span class="melo-logo-main">MELO <span class="melo-logo-accent">MUSIC</span></span>
        <span class="melo-badge-studio">STUDIO</span>
      </a>
    </div>

    <!-- Links de Navegação Principal -->
    <ul class="melo-nav-menu">
      <li class="melo-nav-item"><a href="/" class="melo-nav-link">Início</a></li>
      
      <!-- Item com Submenu de Estilos Musicais -->
      <li class="melo-nav-item melo-has-dropdown">
        <a href="/search/label/Músicas" class="melo-nav-link melo-dropdown-trigger">
          Músicas <span class="melo-arrow">&#9662;</span>
        </a>
        
        <!-- Submenu de Estilos (com linha superior Azul e fundo Vermelho no hover) -->
        <ul class="melo-submenu">
          <li><a href="/search/label/Kizomba" class="melo-submenu-link"><span class="melo-dot">●</span> Kizomba</a></li>
          <li><a href="/search/label/Kuduro" class="melo-submenu-link"><span class="melo-dot">●</span> Kuduro</a></li>
          <li><a href="/search/label/Semba" class="melo-submenu-link"><span class="melo-dot">●</span> Semba</a></li>
          <li><a href="/search/label/Afro House" class="melo-submenu-link"><span class="melo-dot">●</span> Afro House</a></li>
          <li><a href="/search/label/Hip-Hop" class="melo-submenu-link"><span class="melo-dot">●</span> Hip-Hop / Trap</a></li>
          <li><a href="/search/label/Outros" class="melo-submenu-link"><span class="melo-dot">●</span> Todos os Ritmos</a></li>
        </ul>
      </li>

      <li class="melo-nav-item"><a href="/search/label/Novidades" class="melo-nav-link">Novidades</a></li>
      <li class="melo-nav-item"><a href="/search/label/Atividades" class="melo-nav-link">Atividades</a></li>
      <li class="melo-nav-item"><a href="/search/label/Vídeos" class="melo-nav-link">Vídeos</a></li>
      <li class="melo-nav-item"><a href="/p/servicos.html" class="melo-nav-link">Serviços</a></li>
      <li class="melo-nav-item"><a href="/p/sobre.html" class="melo-nav-link">Sobre Nós</a></li>
    </ul>

    <!-- Botão de Contacto / WhatsApp -->
    <div class="melo-nav-cta">
      <a href="https://wa.me/${studioInfo.contacts.whatsapp.replace(/[^0-9]/g, '')}?text=Ola,%20contacto%20atraves%20do%20Blogger%20MELO%20MUSIC" target="_blank" class="melo-whatsapp-btn">
        <span>Agendar Estúdio</span>
      </a>
    </div>
  </nav>
</div>

<style>
  /* Reset e Container */
  #melo-blogger-nav-container {
    width: 100%;
    background-color: #0c0c10;
    font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    box-shadow: 0 4px 20px rgba(0,0,0,0.6);
    position: relative;
    z-index: 9999;
  }

  /* 🔴 1. Barra de destaque superior Vermelha */
  .melo-top-red-bar {
    height: 4px;
    width: 100%;
    background: linear-gradient(90deg, #DC2626, #FF2A54, #DC2626);
    box-shadow: 0 0 12px rgba(255, 42, 84, 0.7);
  }

  .melo-navbar {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 20px;
    position: relative;
  }

  /* Logótipo */
  .melo-logo-link {
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 6px;
  }
  .melo-logo-main {
    color: #ffffff;
    font-weight: 900;
    font-size: 18px;
    letter-spacing: 0.5px;
    text-transform: uppercase;
  }
  .melo-logo-accent {
    color: #00D2FF;
  }
  .melo-badge-studio {
    background: rgba(255, 42, 84, 0.2);
    color: #FF2A54;
    border: 1px solid rgba(255, 42, 84, 0.4);
    font-size: 10px;
    font-weight: 800;
    padding: 2px 6px;
    border-radius: 4px;
  }

  /* Menu Principal */
  .melo-nav-menu {
    display: flex;
    align-items: center;
    list-style: none;
    margin: 0;
    padding: 0;
    gap: 4px;
  }
  .melo-nav-item {
    position: relative;
  }

  /* 🟡 2. Amarelo Torrado no texto ao passar o rato (Hover) */
  .melo-nav-link {
    color: #d1d5db;
    text-decoration: none;
    font-size: 13px;
    font-weight: 600;
    padding: 8px 14px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    gap: 4px;
    transition: all 0.25s ease;
  }
  .melo-nav-link:hover {
    color: #F59E0B !important; /* Amarelo Torrado */
    background-color: #181820;
    text-shadow: 0 0 10px rgba(245, 158, 11, 0.3);
  }

  /* 🔵 3. Submenu com Linha Superior Azul */
  .melo-has-dropdown:hover .melo-submenu {
    display: block;
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }

  .melo-submenu {
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    min-width: 200px;
    background-color: #121216;
    border-radius: 0 0 12px 12px;
    list-style: none;
    margin: 0;
    padding: 6px 0;
    /* 🔵 Linha superior Azul */
    border-top: 3px solid #0066FF;
    border-left: 1px solid #22222a;
    border-right: 1px solid #22222a;
    border-bottom: 1px solid #22222a;
    box-shadow: 0 12px 30px rgba(0,0,0,0.8), 0 0 15px rgba(0, 102, 255, 0.2);
    z-index: 1000;
    transition: all 0.25s ease;
  }

  /* 🔴 4. Fundo Vermelho nos botões do submenu ao passar o rato */
  .melo-submenu-link {
    display: flex;
    align-items: center;
    gap: 8px;
    color: #e2e8f0;
    text-decoration: none;
    font-size: 12px;
    font-weight: 600;
    padding: 9px 16px;
    transition: all 0.2s ease;
  }
  .melo-submenu-link:hover {
    background-color: #FF2A54 !important; /* Vermelho vibrante */
    color: #ffffff !important;
    padding-left: 20px;
  }
  .melo-dot {
    font-size: 8px;
    color: #00D2FF;
  }
  .melo-submenu-link:hover .melo-dot {
    color: #ffffff;
  }

  /* Botão CTA WhatsApp */
  .melo-whatsapp-btn {
    background: linear-gradient(90deg, #0066FF, #00D2FF);
    color: #ffffff;
    text-decoration: none;
    font-size: 12px;
    font-weight: 700;
    padding: 8px 16px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 102, 255, 0.3);
    transition: all 0.2s ease;
    display: inline-block;
  }
  .melo-whatsapp-btn:hover {
    filter: brightness(1.15);
    box-shadow: 0 6px 18px rgba(0, 210, 255, 0.4);
  }

  /* Responsividade Básica */
  @media (max-width: 820px) {
    .melo-navbar { flex-wrap: wrap; }
    .melo-nav-menu { flex-wrap: wrap; justify-content: center; width: 100%; margin-top: 10px; }
    .melo-nav-cta { display: none; }
  }
</style>`;

  // 2. Post Template Code
  const bloggerPostCode = `<!-- ========================================================
   MELO MUSIC-STUDIO - CARD DE MÚSICA COM PLAYER & DOWNLOAD MP3
   Cole este código na VISTA HTML da sua nova postagem no Blogger.
   Marcador (Tag): ${postGenre}
   ======================================================== -->

<div class="melo-post-track-box">
  <!-- Imagem da Capa da Música -->
  <div class="melo-track-cover-wrapper">
    <img src="${postCoverUrl}" alt="${postTitle} - ${postArtist}" class="melo-track-cover" />
    <span class="melo-track-genre-badge">${postGenre}</span>
  </div>

  <!-- Informações Principais -->
  <div class="melo-track-info">
    <h2 class="melo-track-title">${postTitle}</h2>
    <p class="melo-track-artist">${postArtist}</p>
    <div class="melo-track-meta">
      <span><strong>Produção:</strong> ${postProducer}</span> • 
      <span><strong>Estúdio:</strong> ${postStudio}</span>
    </div>

    <!-- Reprodutor de Áudio HTML5 Oficial -->
    <div class="melo-audio-player-container">
      <audio controls controlsList="nodownload" class="melo-native-audio">
        <source src="${postAudioUrl}" type="audio/mpeg">
        O seu navegador não suporta reprodução de áudio.
      </audio>
    </div>

    <!-- 🔵 Botão de Download MP3 em Destaque Azul Elétrico -->
    <div class="melo-download-action-container">
      <a href="${postDownloadUrl}" download target="_blank" class="melo-btn-download-mp3">
        <svg class="melo-download-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
          <polyline points="7 10 12 15 17 10"></polyline>
          <line x1="12" y1="15" x2="12" y2="3"></line>
        </svg>
        <span>BAIXAR MÚSICA (MP3)</span>
      </a>
      <span class="melo-download-note">Áudio Masterizado em Alta Fidelidade (320kbps)</span>
    </div>
  </div>
</div>

<style>
  .melo-post-track-box {
    max-width: 650px;
    margin: 24px auto;
    background: #121217;
    border: 1px solid #262632;
    border-radius: 16px;
    padding: 24px;
    font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
    color: #f1f5f9;
    box-shadow: 0 10px 30px rgba(0,0,0,0.5);
  }

  .melo-track-cover-wrapper {
    position: relative;
    width: 100%;
    max-height: 360px;
    border-radius: 12px;
    overflow: hidden;
    margin-bottom: 18px;
    box-shadow: 0 8px 20px rgba(0,0,0,0.6);
  }

  .melo-track-cover {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .melo-track-genre-badge {
    position: absolute;
    top: 12px;
    right: 12px;
    background: rgba(0, 102, 255, 0.85);
    color: #ffffff;
    font-size: 11px;
    font-weight: 800;
    padding: 4px 10px;
    border-radius: 20px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    backdrop-filter: blur(6px);
  }

  .melo-track-title {
    font-size: 22px;
    font-weight: 800;
    color: #ffffff;
    margin: 0 0 4px 0;
  }

  .melo-track-artist {
    font-size: 15px;
    color: #00D2FF;
    font-weight: 600;
    margin: 0 0 12px 0;
  }

  .melo-track-meta {
    font-size: 12px;
    color: #94a3b8;
    margin-bottom: 18px;
    padding-bottom: 12px;
    border-bottom: 1px solid #20202a;
  }

  .melo-audio-player-container {
    margin: 16px 0;
  }

  .melo-native-audio {
    width: 100%;
    height: 44px;
    border-radius: 8px;
    outline: none;
  }

  /* 🔵 Destaque do Botão de Download MP3 */
  .melo-download-action-container {
    margin-top: 20px;
    text-align: center;
  }

  .melo-btn-download-mp3 {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    width: 100%;
    padding: 14px 20px;
    background: linear-gradient(135deg, #0066FF, #00D2FF);
    color: #ffffff !important;
    text-decoration: none !important;
    font-size: 14px;
    font-weight: 800;
    letter-spacing: 0.5px;
    border-radius: 12px;
    box-shadow: 0 6px 20px rgba(0, 102, 255, 0.4);
    transition: all 0.25s ease;
    box-sizing: border-box;
  }

  .melo-btn-download-mp3:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 210, 255, 0.6);
    filter: brightness(1.1);
  }

  .melo-download-icon {
    stroke: #ffffff;
  }

  .melo-download-note {
    display: block;
    font-size: 11px;
    color: #64748b;
    margin-top: 8px;
  }
</style>`;

  const copyToClipboard = (text: string, type: 'menu' | 'post') => {
    navigator.clipboard.writeText(text);
    if (type === 'menu') {
      setCopiedMenu(true);
      setTimeout(() => setCopiedMenu(false), 2500);
    } else {
      setCopiedPost(true);
      setTimeout(() => setCopiedPost(false), 2500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-5xl max-h-[92vh] bg-[#101015] border border-[#24242c] rounded-2xl shadow-[0_0_60px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#0a0a0d] border-b border-[#202028]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-to-r from-[#FF2A54] via-[#F59E0B] to-[#0066FF] text-white shadow-md">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black text-white uppercase tracking-wider flex items-center gap-2">
                Guia & Gerador Blogger
                <span className="text-[10px] px-2 py-0.5 rounded bg-[#00D2FF]/20 text-[#00D2FF] font-bold border border-[#00D2FF]/40">
                  HTML + CSS
                </span>
              </h2>
              <p className="text-xs text-zinc-400">
                Menu de Estilos com destaque Vermelho/Amarelo/Azul e gerador de post com Player e Download MP3.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Fechar Guia"
            className="p-2 text-zinc-400 hover:text-white hover:bg-[#1a1a22] rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Color Scheme Summary Banner */}
        <div className="px-6 py-2.5 bg-[#14141c] border-b border-[#22222e] flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-4">
            <span className="text-zinc-400 font-semibold">Paleta Aplicada:</span>
            <span className="flex items-center gap-1.5 text-zinc-200">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF2A54]" />
              <strong>Vermelho:</strong> Barra topo & hover submenu
            </span>
            <span className="flex items-center gap-1.5 text-zinc-200">
              <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" />
              <strong>Amarelo Torrado:</strong> Hover links principais
            </span>
            <span className="flex items-center gap-1.5 text-zinc-200">
              <span className="w-2.5 h-2.5 rounded-full bg-[#0066FF]" />
              <strong>Azul:</strong> Linha submenu & Botão Download
            </span>
          </div>

          <div className="text-[11px] text-zinc-400">
            Compatível com qualquer tema do Blogger
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-[#202028] bg-[#0c0c0f] px-6 overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveTab('menu')}
            className={`flex items-center gap-2 py-3 px-4 text-xs font-bold border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'menu'
                ? 'border-[#FF2A54] text-[#FF2A54]'
                : 'border-transparent text-zinc-400 hover:text-[#F59E0B]'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>1. Código do Menu de Estilos (Gadget)</span>
          </button>

          <button
            onClick={() => setActiveTab('post')}
            className={`flex items-center gap-2 py-3 px-4 text-xs font-bold border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'post'
                ? 'border-[#00D2FF] text-[#00D2FF]'
                : 'border-transparent text-zinc-400 hover:text-[#F59E0B]'
            }`}
          >
            <Music className="w-4 h-4" />
            <span>2. Gerador de Post (Player & Download MP3)</span>
          </button>

          <button
            onClick={() => setActiveTab('guide')}
            className={`flex items-center gap-2 py-3 px-4 text-xs font-bold border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'guide'
                ? 'border-[#F59E0B] text-[#F59E0B]'
                : 'border-transparent text-zinc-400 hover:text-[#F59E0B]'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            <span>3. Guia Prático Passo a Passo</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar bg-[#101015]">
          
          {/* === TAB 1: MENU GADGET CODE === */}
          {activeTab === 'menu' && (
            <div className="space-y-6">
              <div className="p-4 rounded-2xl bg-[#141418] border border-[#24242c] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#FF2A54]" />
                    Código HTML + CSS para o Menu Superior do Blogger
                  </h3>
                  <p className="text-xs text-zinc-400">
                    Inclui o menu com estilos musicais (Kizomba, Kuduro, Semba, Afro House, Hip-Hop), a barra vermelha, links amarelos no hover e linha azul.
                  </p>
                </div>

                <button
                  onClick={() => copyToClipboard(bloggerMenuCode, 'menu')}
                  className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#FF2A54] to-red-600 hover:brightness-110 text-white text-xs font-bold shadow-lg shadow-red-500/20 transition-all shrink-0"
                >
                  {copiedMenu ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedMenu ? 'Código Copiado!' : 'Copiar Código do Menu'}</span>
                </button>
              </div>

              {/* Code Box */}
              <div className="relative rounded-2xl bg-[#09090c] border border-[#22222c] overflow-hidden">
                <div className="flex items-center justify-between px-4 py-2 bg-[#121217] border-b border-[#1f1f28] text-xs text-zinc-400 font-mono">
                  <span>estrutura_blog_estudio.html</span>
                  <button
                    onClick={() => copyToClipboard(bloggerMenuCode, 'menu')}
                    className="text-xs text-[#00D2FF] hover:underline flex items-center gap-1 font-sans"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    Copiar
                  </button>
                </div>
                <pre className="p-4 text-xs font-mono text-zinc-300 overflow-x-auto max-h-[380px] custom-scrollbar leading-relaxed">
                  {bloggerMenuCode}
                </pre>
              </div>
            </div>
          )}

          {/* === TAB 2: POST GENERATOR === */}
          {activeTab === 'post' && (
            <div className="space-y-6">
              {/* Form Controls */}
              <div className="p-5 rounded-2xl bg-[#141418] border border-[#24242c] space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#202028]">
                  <div>
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <Music className="w-4 h-4 text-[#00D2FF]" />
                      Personalizar Publicação de Música para o Blogger
                    </h3>
                    <p className="text-xs text-zinc-400">
                      Selecione uma faixa existente no catálogo ou digite os dados da sua nova gravação.
                    </p>
                  </div>

                  {/* Selector of Existing Track */}
                  <select
                    value={selectedTrackId}
                    onChange={(e) => handleSelectTrack(e.target.value)}
                    aria-label="Selecionar Faixa"
                    className="bg-[#0a0a0d] border border-[#24242c] text-white text-xs font-bold rounded-xl px-3 py-2 focus:border-[#00D2FF] outline-none"
                  >
                    <option value="custom">-- Personalizado / Nova Música --</option>
                    {tracks.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.title} ({t.artist}) [{t.genre}]
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-zinc-300 mb-1">Título da Música</label>
                    <input
                      type="text"
                      value={postTitle}
                      onChange={(e) => setPostTitle(e.target.value)}
                      className="w-full px-3 py-2 bg-[#0a0a0d] border border-[#24242c] focus:border-[#00D2FF] text-xs text-white rounded-xl outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-zinc-300 mb-1">Nome do Artista</label>
                    <input
                      type="text"
                      value={postArtist}
                      onChange={(e) => setPostArtist(e.target.value)}
                      className="w-full px-3 py-2 bg-[#0a0a0d] border border-[#24242c] focus:border-[#00D2FF] text-xs text-white rounded-xl outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-zinc-300 mb-1 flex items-center justify-between">
                      <span>Marcador / Estilo</span>
                      <span className="text-[10px] text-[#00D2FF]">Campo Marcadores no Blogger</span>
                    </label>
                    <select
                      value={postGenre}
                      onChange={(e) => setPostGenre(e.target.value as MusicGenre)}
                      className="w-full px-3 py-2 bg-[#0a0a0d] border border-[#24242c] focus:border-[#00D2FF] text-xs text-white rounded-xl outline-none font-bold text-[#00D2FF]"
                    >
                      <option value="Kizomba">Kizomba</option>
                      <option value="Kuduro">Kuduro</option>
                      <option value="Semba">Semba</option>
                      <option value="Afro House">Afro House</option>
                      <option value="Hip-Hop/Trap">Hip-Hop / Trap</option>
                      <option value="Outros">Outros</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2 lg:col-span-2">
                    <label className="block text-[11px] font-bold text-zinc-300 mb-1">URL da Imagem de Capa</label>
                    <input
                      type="url"
                      value={postCoverUrl}
                      onChange={(e) => setPostCoverUrl(e.target.value)}
                      className="w-full px-3 py-2 bg-[#0a0a0d] border border-[#24242c] text-xs text-white rounded-xl font-mono outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-zinc-300 mb-1">Produtor</label>
                    <input
                      type="text"
                      value={postProducer}
                      onChange={(e) => setPostProducer(e.target.value)}
                      className="w-full px-3 py-2 bg-[#0a0a0d] border border-[#24242c] text-xs text-white rounded-xl outline-none"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-bold text-zinc-300 mb-1">URL do Ficheiro de Áudio / Download MP3</label>
                    <input
                      type="url"
                      value={postAudioUrl}
                      onChange={(e) => {
                        setPostAudioUrl(e.target.value);
                        setPostDownloadUrl(e.target.value);
                      }}
                      className="w-full px-3 py-2 bg-[#0a0a0d] border border-[#24242c] text-xs text-white rounded-xl font-mono outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-zinc-300 mb-1">Estúdio de Gravação</label>
                    <input
                      type="text"
                      value={postStudio}
                      onChange={(e) => setPostStudio(e.target.value)}
                      className="w-full px-3 py-2 bg-[#0a0a0d] border border-[#24242c] text-xs text-white rounded-xl outline-none"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-[#202028]">
                  <div className="flex items-center gap-2 text-xs text-zinc-400">
                    <Tag className="w-3.5 h-3.5 text-[#FF2A54]" />
                    <span>Lembrete: Ao postar no Blogger, use o marcador <strong className="text-white bg-[#FF2A54]/20 px-2 py-0.5 rounded border border-[#FF2A54]/40">{postGenre}</strong></span>
                  </div>

                  <button
                    onClick={() => copyToClipboard(bloggerPostCode, 'post')}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#0066FF] to-[#00D2FF] hover:brightness-110 text-white text-xs font-bold shadow-lg shadow-blue-500/25 transition-all"
                  >
                    {copiedPost ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    <span>{copiedPost ? 'Código do Post Copiado!' : 'Copiar Código do Post'}</span>
                  </button>
                </div>
              </div>

              {/* Code Box for Post */}
              <div className="relative rounded-2xl bg-[#09090c] border border-[#22222c] overflow-hidden">
                <div className="flex items-center justify-between px-4 py-2 bg-[#121217] border-b border-[#1f1f28] text-xs text-zinc-400 font-mono">
                  <span>codigo_post_blogger.html</span>
                  <button
                    onClick={() => copyToClipboard(bloggerPostCode, 'post')}
                    className="text-xs text-[#00D2FF] hover:underline flex items-center gap-1 font-sans"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    Copiar
                  </button>
                </div>
                <pre className="p-4 text-xs font-mono text-zinc-300 overflow-x-auto max-h-[300px] custom-scrollbar leading-relaxed">
                  {bloggerPostCode}
                </pre>
              </div>
            </div>
          )}

          {/* === TAB 3: STEP BY STEP GUIDE === */}
          {activeTab === 'guide' && (
            <div className="space-y-6">
              {/* Step 1 */}
              <div className="p-6 rounded-2xl bg-[#141418] border border-[#24242c] space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-[#FF2A54]/20 border border-[#FF2A54]/40 text-[#FF2A54] flex items-center justify-center font-black text-sm">
                    1
                  </div>
                  <h4 className="text-base font-black text-white">
                    Ativar o Menu de Estilos (Kizomba, Kuduro, Semba, etc.)
                  </h4>
                </div>

                <ol className="space-y-3 text-xs sm:text-sm text-zinc-300 pl-4 border-l-2 border-[#24242c] ml-4">
                  <li>
                    <strong>1. Aceda ao painel do seu Blogger:</strong> Abra o painel administrativo do blog.
                  </li>
                  <li>
                    <strong>2. Vá para Layout:</strong> No menu lateral esquerdo, clique em <strong>Layout</strong>.
                  </li>
                  <li>
                    <strong>3. Adicionar Gadget no Topo:</strong> Procure o bloco do topo (geralmente chamado <em>Header</em>, <em>Menu</em> ou <em>Top Navigation</em>) e clique em <strong>Adicionar um Gadget</strong>.
                  </li>
                  <li>
                    <strong>4. Escolher HTML/JavaScript:</strong> Na lista de opções que surgir, selecione <strong>HTML/JavaScript</strong>.
                  </li>
                  <li>
                    <strong>5. Colar e Guardar:</strong> Copie o código da aba <em>"1. Código do Menu de Estilos (Gadget)"</em>, cole-o na caixa de conteúdo e clique em <strong>Guardar</strong>.
                  </li>
                </ol>
              </div>

              {/* Step 2 */}
              <div className="p-6 rounded-2xl bg-[#141418] border border-[#24242c] space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-[#0066FF]/20 border border-[#0066FF]/40 text-[#00D2FF] flex items-center justify-center font-black text-sm">
                    2
                  </div>
                  <h4 className="text-base font-black text-white">
                    Como Publicar uma Música Nova com Player e Download
                  </h4>
                </div>

                <ol className="space-y-3 text-xs sm:text-sm text-zinc-300 pl-4 border-l-2 border-[#24242c] ml-4">
                  <li>
                    <strong>1. Criar Publicação:</strong> No painel do Blogger, clique em <strong>Nova postagem</strong>.
                  </li>
                  <li>
                    <strong>2. Mudar para Vista HTML:</strong> No canto superior esquerdo do editor de texto, clique no ícone do lápis e mude para a <strong>Vista HTML (&lt;&gt;)</strong>.
                  </li>
                  <li>
                    <strong>3. Colar o Código do Post:</strong> Gere e copie o código na aba <em>"2. Gerador de Post"</em> e cole-o diretamente no corpo da publicação.
                  </li>
                  <li>
                    <strong>4. Definir o Marcador (MUITO IMPORTANTE):</strong> No menu lateral direito da postagem, no campo <strong>Marcadores</strong>, escreva o estilo exato da música (por exemplo: <code className="text-[#00D2FF] font-mono">Kizomba</code>, <code className="text-[#00D2FF] font-mono">Kuduro</code> ou <code className="text-[#00D2FF] font-mono">Semba</code>).
                  </li>
                  <li>
                    <strong>5. Publicar:</strong> Clique em <strong>Publicar</strong>. A música aparecerá automaticamente na categoria certa quando os visitantes clicarem no menu suspenso!
                  </li>
                </ol>
              </div>

              {/* Visual Colors Explanation Box */}
              <div className="p-6 rounded-2xl bg-gradient-to-r from-[#141418] via-[#161622] to-[#141418] border border-[#262638] space-y-3">
                <h5 className="text-sm font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#F59E0B]" />
                  Porquê estas cores funcionam perfeitamente no Blogger?
                </h5>
                <ul className="space-y-2 text-xs text-zinc-300">
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#FF2A54] shrink-0 mt-1.5" />
                    <span><strong>Vermelho (#FF2A54):</strong> Transmite energia e autoridade de estúdio, garantindo que o topo do blog e o submenu sobressaiam imediatamente.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#F59E0B] shrink-0 mt-1.5" />
                    <span><strong>Amarelo Torrado (#F59E0B):</strong> Cria um contraste quente e vibrante sobre o fundo escuro (Dark Mode) ao passar o cursor pelos links principais.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#0066FF] shrink-0 mt-1.5" />
                    <span><strong>Azul Elétrico (#0066FF / #00D2FF):</strong> Conduz a ação do utilizador diretamente para a audição e o <strong>Botão de Download MP3</strong>.</span>
                  </li>
                </ul>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between px-6 py-3 bg-[#0a0a0d] border-t border-[#202028] text-xs">
          <span className="text-zinc-500">
            MELO MUSIC-studio • Integração Oficial Blogger
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-[#181820] hover:bg-[#22222c] text-zinc-200 rounded-xl font-bold transition-colors"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
