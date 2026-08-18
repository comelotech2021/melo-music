import React from 'react';
import { 
  Youtube, 
  Instagram, 
  Facebook, 
  Phone, 
  Radio, 
  Music, 
  ShieldCheck, 
  ArrowUp, 
  Heart,
  Lock
} from 'lucide-react';
import { StudioInfo } from '../types';

interface FooterProps {
  studioInfo: StudioInfo;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ studioInfo, onOpenAdmin }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#070709] border-t border-[#1a1a24] pt-16 pb-28 sm:pb-24 text-zinc-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#181822]">
          
          {/* Col 1 & 2: Brand & Socials (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-[#0066FF] to-[#FF2A54] p-[1.5px] shadow-[0_0_20px_rgba(0,102,255,0.4)]">
                <div className="w-full h-full bg-[#0e0e12] rounded-[10px] flex items-center justify-center">
                  <Radio className="w-5 h-5 text-[#00D2FF]" />
                </div>
              </div>
              <span className="text-lg font-black text-white uppercase tracking-wider font-sans">
                MELO <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D2FF] to-[#0066FF]">MUSIC</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#FF2A54]/20 text-[#FF2A54] font-bold border border-[#FF2A54]/40 ml-1">
                  STUDIO
                </span>
              </span>
            </div>

            <p className="text-xs text-zinc-400 leading-relaxed max-w-sm">
              Plataforma e produtora musical especializada nos ritmos Kizomba, Semba, Kuduro, Afro House e Trap. Tecnologia de ponta, captação acústica tratada e identidade sonora autêntica.
            </p>

            {/* Social Media Icons with Tooltips */}
            <div className="flex items-center gap-2.5 pt-2">
              <a
                href={studioInfo.socials.youtube}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Canal do YouTube"
                className="w-9 h-9 rounded-xl bg-[#141418] hover:bg-[#FF0000]/20 text-zinc-300 hover:text-[#FF0000] border border-[#24242c] hover:border-[#FF0000]/40 flex items-center justify-center transition-all"
              >
                <Youtube className="w-4 h-4" />
              </a>

              <a
                href={studioInfo.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram do Estúdio"
                className="w-9 h-9 rounded-xl bg-[#141418] hover:bg-[#E1306C]/20 text-zinc-300 hover:text-[#E1306C] border border-[#24242c] hover:border-[#E1306C]/40 flex items-center justify-center transition-all"
              >
                <Instagram className="w-4 h-4" />
              </a>

              <a
                href={studioInfo.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook Oficial"
                className="w-9 h-9 rounded-xl bg-[#141418] hover:bg-[#1877F2]/20 text-zinc-300 hover:text-[#1877F2] border border-[#24242c] hover:border-[#1877F2]/40 flex items-center justify-center transition-all"
              >
                <Facebook className="w-4 h-4" />
              </a>

              <a
                href={`https://wa.me/${studioInfo.contacts.whatsapp.replace(/[^0-9]/g, '')}?text=Ola,%20contacto%20atraves%20do%20site%20MELO%20MUSIC`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp do Estúdio"
                className="w-9 h-9 rounded-xl bg-[#141418] hover:bg-[#25D366]/20 text-zinc-300 hover:text-[#25D366] border border-[#24242c] hover:border-[#25D366]/40 flex items-center justify-center transition-all"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 3: Navegação */}
          <div className="space-y-3">
            <h4 className="text-xs font-black text-white uppercase tracking-wider">
              Navegação
            </h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#inicio" className="hover:text-white transition-colors">Início</a></li>
              <li><a href="#musicas" className="hover:text-white transition-colors">Catálogo de Músicas</a></li>
              <li><a href="#novidades" className="hover:text-white transition-colors">Novidades & Notícias</a></li>
              <li><a href="#atividades" className="hover:text-white transition-colors">Próximas Atividades</a></li>
              <li><a href="#videos" className="hover:text-white transition-colors">Vídeos do YouTube</a></li>
            </ul>
          </div>

          {/* Col 4: Géneros Musicais */}
          <div className="space-y-3">
            <h4 className="text-xs font-black text-white uppercase tracking-wider">
              Ritmos & Géneros
            </h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#musicas" className="hover:text-[#00D2FF] transition-colors">Kizomba & Tarraxinha</a></li>
              <li><a href="#musicas" className="hover:text-[#00D2FF] transition-colors">Kuduro Contemporâneo</a></li>
              <li><a href="#musicas" className="hover:text-[#00D2FF] transition-colors">Semba Tradicional</a></li>
              <li><a href="#musicas" className="hover:text-[#00D2FF] transition-colors">Afro House & Deep</a></li>
              <li><a href="#musicas" className="hover:text-[#00D2FF] transition-colors">Hip-Hop / Trap Luanda</a></li>
            </ul>
          </div>

          {/* Col 5: Atendimento & Contactos */}
          <div className="space-y-3">
            <h4 className="text-xs font-black text-white uppercase tracking-wider">
              Localização & Contactos
            </h4>
            <div className="space-y-2 text-xs">
              <p className="text-zinc-300 font-semibold">{studioInfo.location.city}, {studioInfo.location.country}</p>
              <p className="text-zinc-400">{studioInfo.contacts.phone}</p>
              <p className="text-zinc-500">{studioInfo.contacts.email}</p>
              
              <div id="footer-admin-button-container" className="pt-2 flex items-center">
                {/* Secret Red Dot Access for Owner */}
                <button
                  id="footer-admin-btn"
                  onClick={onOpenAdmin}
                  aria-label="Painel"
                  className="w-2 h-2 rounded-full bg-red-600 opacity-50 hover:opacity-100 hover:scale-125 transition-all cursor-pointer"
                />
              </div>
            </div>
          </div>

        </div>

        {/* Subfooter */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <div className="flex items-center gap-1">
            <span>© {new Date().getFullYear()} MELO MUSIC-studio. Todos os direitos reservados.</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              Desenvolvido com tecnologia de alta fidelidade
            </span>
            <button
              onClick={scrollToTop}
              aria-label="Voltar ao topo"
              className="p-2 rounded-lg bg-[#141418] hover:bg-[#202028] text-zinc-300 hover:text-white transition-colors"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
