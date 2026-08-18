import React, { useState, useEffect, useRef } from 'react';
import { 
  Music, 
  Menu, 
  X, 
  Disc3, 
  Newspaper, 
  CalendarDays, 
  Youtube, 
  SlidersHorizontal, 
  Info, 
  Lock, 
  Phone,
  Radio,
  ChevronDown,
  Code2,
  Sparkles,
  Users
} from 'lucide-react';
import { contentService } from '../services/contentService';
import { StudioInfo, MusicGenre } from '../types';

interface NavbarProps {
  onOpenAdmin: () => void;
  onOpenBloggerGuide: () => void;
  onSelectGenre?: (genre: string) => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  onOpenAdmin, 
  onOpenBloggerGuide, 
  onSelectGenre,
  activeSection 
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [desktopDropdownOpen, setDesktopDropdownOpen] = useState(false);
  const [mobileGenresOpen, setMobileGenresOpen] = useState(false);
  const [studioInfo, setStudioInfo] = useState<StudioInfo>(contentService.getStudioInfo());
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const genres: { name: string; value: MusicGenre | 'TODOS'; desc: string }[] = [
    { name: 'Kizomba', value: 'Kizomba', desc: 'Romântico & Zouk' },
    { name: 'Kuduro', value: 'Kuduro', desc: 'Batida & Energia Pura' },
    { name: 'Semba', value: 'Semba', desc: 'Raízes & Tradição' },
    { name: 'Afro House', value: 'Afro House', desc: 'Club & Deep Vibes' },
    { name: 'Hip-Hop / Trap', value: 'Hip-Hop/Trap', desc: 'Flow, Beats & 808' },
    { name: 'Todos os Ritmos', value: 'TODOS', desc: 'Catálogo Geral do Estúdio' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    return contentService.subscribe(() => {
      setStudioInfo(contentService.getStudioInfo());
    });
  }, []);

  const handleGenreClick = (genreValue: string) => {
    if (onSelectGenre) {
      onSelectGenre(genreValue);
    }
    setDesktopDropdownOpen(false);
    setMobileMenuOpen(false);
    const musicSection = document.getElementById('musicas');
    if (musicSection) {
      musicSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navLinks = [
    { name: 'Início', href: '#inicio', icon: Disc3, hasDropdown: false },
    { name: 'Músicas', href: '#musicas', icon: Music, hasDropdown: true },
    { name: 'Artistas', href: '#artistas', icon: Users, hasDropdown: false },
    { name: 'Novidades', href: '#novidades', icon: Newspaper, hasDropdown: false },
    { name: 'Atividades', href: '#atividades', icon: CalendarDays, hasDropdown: false },
    { name: 'Vídeos', href: '#videos', icon: Youtube, hasDropdown: false },
    { name: 'Serviços', href: '#servicos', icon: SlidersHorizontal, hasDropdown: false },
    { name: 'Sobre Nós', href: '#sobre', icon: Info, hasDropdown: false },
  ];

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0a0a0c]/95 backdrop-blur-md border-b border-[#24242c]/80 shadow-2xl py-2.5'
          : 'bg-gradient-to-b from-[#0a0a0c] via-[#0a0a0c]/90 to-transparent py-4'
      }`}
    >
      {/* 🔴 1. BARRA DE DESTAQUE PRINCIPAL SUPERIOR (VERMELHO VIBRANTE) */}
      <div 
        id="navbar-top-red-highlight-bar"
        className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#DC2626] via-[#FF2A54] to-[#DC2626] shadow-[0_0_12px_rgba(255,42,84,0.8)]"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo */}
          <a
            href="#inicio"
            id="brand-logo-link"
            className="flex items-center gap-3 group focus:outline-none"
          >
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-[#0066FF] to-[#FF2A54] p-[1.5px] shadow-[0_0_20px_rgba(0,102,255,0.4)] group-hover:shadow-[0_0_25px_rgba(255,42,84,0.6)] transition-all">
              <div className="w-full h-full bg-[#0e0e12] rounded-[10px] flex items-center justify-center">
                <Radio className="w-5 h-5 text-[#00D2FF] group-hover:text-[#FF2A54] transition-colors animate-pulse" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-lg sm:text-xl font-black tracking-wider text-white uppercase flex items-center gap-1.5 font-sans">
                MELO <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D2FF] to-[#0066FF]">MUSIC</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#FF2A54]/20 text-[#FF2A54] font-bold border border-[#FF2A54]/40 ml-0.5 tracking-normal">
                  STUDIO
                </span>
              </span>
              <span className="text-[10px] text-zinc-400 font-medium tracking-widest uppercase">
                Luanda • Som & Produção
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-[#141418]/90 border border-[#24242c] p-1.5 rounded-full backdrop-blur-md shadow-lg">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = activeSection === link.href.replace('#', '');
              
              if (link.hasDropdown) {
                return (
                  <div
                    key={link.name}
                    className="relative"
                    onMouseEnter={() => {
                      if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
                      setDesktopDropdownOpen(true);
                    }}
                    onMouseLeave={() => {
                      dropdownTimeoutRef.current = setTimeout(() => {
                        setDesktopDropdownOpen(false);
                      }, 200);
                    }}
                  >
                    <button
                      id="nav-link-musicas-dropdown-trigger"
                      onClick={() => handleGenreClick('TODOS')}
                      className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-full transition-all whitespace-nowrap ${
                        isActive
                          ? 'bg-gradient-to-r from-[#0066FF] to-[#00D2FF] text-white shadow-lg shadow-blue-500/25 font-bold'
                          : 'text-zinc-300 hover:text-[#FBBF24] hover:bg-[#202028]'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span>{link.name}</span>
                      <ChevronDown className={`w-3 h-3 text-zinc-400 transition-transform duration-200 ${desktopDropdownOpen ? 'rotate-180 text-[#FBBF24]' : ''}`} />
                    </button>

                    {/* 🔵 3. SUBMENU DE ESTILOS COM LINHA SUPERIOR AZUL E FUNDO VERMELHO NO HOVER */}
                    {desktopDropdownOpen && (
                      <div
                        id="nav-genres-dropdown-menu"
                        className="absolute top-full left-0 mt-2 w-64 bg-[#101016] border-x border-b border-[#242432] rounded-b-2xl shadow-[0_15px_40px_rgba(0,0,0,0.85),0_0_20px_rgba(0,102,255,0.25)] overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                        style={{
                          borderTop: '4px solid #0066FF', /* 🔵 Linha superior Azul */
                        }}
                      >
                        <div className="px-4 py-2 bg-[#0a0a0e] border-b border-[#1c1c24] flex items-center justify-between">
                          <span className="text-[10px] font-extrabold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
                            <Sparkles className="w-3 h-3 text-[#00D2FF]" />
                            Estilos & Ritmos
                          </span>
                          <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#0066FF]/20 text-[#00D2FF] font-bold">
                            Filtro Rápido
                          </span>
                        </div>

                        <div className="py-1">
                          {genres.map((genre) => (
                            <button
                              key={genre.name}
                              id={`dropdown-genre-${genre.name.toLowerCase().replace(/[^a-z0-9]/g, '')}`}
                              onClick={() => handleGenreClick(genre.value)}
                              className="w-full flex items-center justify-between px-4 py-2.5 text-left text-xs font-semibold text-zinc-200 transition-all duration-200 hover:bg-[#FF2A54] hover:text-white group"
                            >
                              <div className="flex items-center gap-2.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#00D2FF] group-hover:bg-white group-hover:scale-125 transition-all" />
                                <div>
                                  <div className="font-bold">{genre.name}</div>
                                  <div className="text-[10px] text-zinc-400 group-hover:text-white/90 font-normal">
                                    {genre.desc}
                                  </div>
                                </div>
                              </div>
                              <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#1a1a24] text-zinc-400 group-hover:bg-white/20 group-hover:text-white font-mono">
                                &rarr;
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <a
                  key={link.name}
                  id={`nav-link-${link.name.toLowerCase()}`}
                  href={link.href}
                  /* 🟡 2. AMARELO TORRADO (#FBBF24 / #F59E0B) NO TEXTO AO PASSAR O RATO */
                  className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-full transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-gradient-to-r from-[#0066FF] to-[#00D2FF] text-white shadow-lg shadow-blue-500/25 font-bold'
                      : 'text-zinc-300 hover:text-[#FBBF24] hover:bg-[#202028]'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {link.name}
                </a>
              );
            })}
          </nav>

          {/* Header Action Buttons */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* WhatsApp Booking CTA */}
            <a
              id="header-whatsapp-cta"
              href={`https://wa.me/${studioInfo.contacts.whatsapp.replace(/[^0-9]/g, '')}?text=Ola,%20gostaria%20de%20agendar%20uma%20sessao%20no%20MELO%20MUSIC-studio`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-[#1a1a22] hover:bg-[#242430] border border-[#2e2e3c] rounded-xl transition-all hover:border-[#00D2FF]/50 hover:shadow-[0_0_15px_rgba(0,210,255,0.2)]"
            >
              <Phone className="w-3.5 h-3.5 text-[#00D2FF]" />
              <span>Agendar Estúdio</span>
            </a>

            {/* Admin Access Secret Red Dot Button */}
            <div id="admin-button-container" className="flex items-center ml-1">
              <button
                id="header-admin-btn"
                onClick={onOpenAdmin}
                aria-label="Painel de Controle"
                className="w-2 h-2 rounded-full bg-red-600 hover:scale-125 transition-all cursor-pointer opacity-60 hover:opacity-100"
                title=""
              />
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center gap-2.5 lg:hidden">
            {/* Secret Red Dot on Mobile */}
            <div className="flex items-center mx-1">
              <button
                id="mobile-admin-btn"
                onClick={onOpenAdmin}
                aria-label="Painel"
                className="w-2 h-2 rounded-full bg-red-600 opacity-60 hover:opacity-100 hover:scale-125 transition-all cursor-pointer"
              />
            </div>

            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-zinc-200 hover:text-white bg-[#141418] border border-[#24242c] rounded-lg focus:outline-none"
              aria-label="Alternar Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0e0e12]/98 border-b border-[#24242c] px-4 pt-3 pb-6 space-y-2 backdrop-blur-xl animate-in slide-in-from-top-4 duration-200">
          <div className="grid grid-cols-2 gap-2 pt-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = activeSection === link.href.replace('#', '');
              
              if (link.hasDropdown) {
                return (
                  <div key={link.name} className="col-span-2 space-y-2">
                    <button
                      onClick={() => setMobileGenresOpen(!mobileGenresOpen)}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                        isActive
                          ? 'bg-gradient-to-r from-[#0066FF] to-[#00D2FF] text-white font-bold'
                          : 'bg-[#141418] text-zinc-300 hover:text-[#FBBF24] border border-[#24242c]'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className="w-4 h-4 text-[#00D2FF]" />
                        <span>{link.name} (Estilos)</span>
                      </div>
                      <ChevronDown className={`w-4 h-4 transition-transform ${mobileGenresOpen ? 'rotate-180 text-[#FBBF24]' : ''}`} />
                    </button>

                    {mobileGenresOpen && (
                      <div 
                        className="grid grid-cols-2 gap-1.5 p-2 bg-[#0c0c10] rounded-xl border border-[#202028]"
                        style={{ borderTop: '3px solid #0066FF' }}
                      >
                        {genres.map((genre) => (
                          <button
                            key={genre.name}
                            onClick={() => handleGenreClick(genre.value)}
                            className="flex items-center gap-2 p-2 rounded-lg text-xs font-semibold text-zinc-300 hover:bg-[#FF2A54] hover:text-white transition-all text-left"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-[#00D2FF]" />
                            <span className="truncate">{genre.name}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-[#0066FF] to-[#00D2FF] text-white font-bold'
                      : 'bg-[#141418] text-zinc-300 hover:text-[#FBBF24] border border-[#24242c]'
                  }`}
                >
                  <Icon className="w-4 h-4 text-[#00D2FF]" />
                  <span>{link.name}</span>
                </a>
              );
            })}
          </div>

          <div className="pt-3 border-t border-[#24242c] flex flex-col gap-2">
            <a
              href={`https://wa.me/${studioInfo.contacts.whatsapp.replace(/[^0-9]/g, '')}?text=Ola,%20gostaria%20de%20agendar%20uma%20sessao%20no%20MELO%20MUSIC-studio`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-[#0066FF] to-[#00D2FF] text-white font-bold text-sm shadow-lg shadow-blue-500/20"
            >
              <Phone className="w-4 h-4" />
              <span>Agendar Sessão no WhatsApp</span>
            </a>

            <div className="flex justify-center pt-1">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdmin();
                }}
                className="w-2.5 h-2.5 rounded-full bg-[#FF2A54] opacity-30 hover:opacity-100 transition-opacity p-0"
                aria-label="Painel"
              />
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
