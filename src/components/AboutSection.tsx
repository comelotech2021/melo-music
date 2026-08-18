import React from 'react';
import { 
  Info, 
  MapPin, 
  Phone, 
  Mail, 
  Award, 
  Cpu, 
  Sparkles, 
  Building2, 
  Music4, 
  ExternalLink 
} from 'lucide-react';
import { StudioInfo } from '../types';

interface AboutSectionProps {
  studioInfo: StudioInfo;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ studioInfo }) => {
  return (
    <section id="sobre" className="py-20 bg-[#0a0a0c] border-t border-[#1a1a24] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00D2FF]/10 text-[#00D2FF] text-xs font-bold border border-[#00D2FF]/20">
              <Info className="w-3.5 h-3.5" />
              <span>NOSSA HISTÓRIA, EQUIPA & ESTRUTURA</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Sobre o <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D2FF] to-[#0066FF]">MELO MUSIC-studio</span>
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 max-w-xl">
              Conheça a visão artística, os equipamentos de alta fidelidade e as pessoas por trás das maiores produções musicais.
            </p>
          </div>
        </div>

        {/* Grid: Story / Mission + Gear Rack */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          
          {/* Left Column: History & Mission (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-[#141418] border border-[#24242c] space-y-4 shadow-xl">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Music4 className="w-5 h-5 text-[#00D2FF]" />
                Nossa Missão & Paixão Musical
              </h3>
              <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
                Fundado em {studioInfo.foundedYear}, o <strong>{studioInfo.name}</strong> nasceu com o propósito de fornecer aos criadores e artistas angolanos e internacionais a mais sofisticada infraestrutura de captação e produção de som.
              </p>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Acreditamos na força dos ritmos de raiz — <em>Kizomba, Semba, Kuduro, Afro House e Hip-Hop</em> — combinados com a pureza harmônica dos equipamentos valvulados analógicos e o poder cirúrgico do processamento digital moderno.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#202028]">
                <div className="p-3.5 rounded-xl bg-[#0e0e12] border border-[#22222c]">
                  <div className="text-xs font-bold text-[#00D2FF] uppercase tracking-wider mb-1">
                    Visão Artística
                  </div>
                  <p className="text-xs text-zinc-400">
                    Posicionar as sonoridades africanas no topo dos charts mundiais com identidade e qualidade cristalina.
                  </p>
                </div>
                <div className="p-3.5 rounded-xl bg-[#0e0e12] border border-[#22222c]">
                  <div className="text-xs font-bold text-[#FF2A54] uppercase tracking-wider mb-1">
                    Compromisso Técnico
                  </div>
                  <p className="text-xs text-zinc-400">
                    Tratamento acústico certificado, microfonação de topo e monitoramento neutro para decisões perfeitas de mix.
                  </p>
                </div>
              </div>
            </div>

            {/* Contacts & Location Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#141418] border border-[#24242c] space-y-4 shadow-xl">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Building2 className="w-5 h-5 text-[#FF2A54]" />
                Localização & Atendimento
              </h3>

              <div className="space-y-3 text-xs sm:text-sm text-zinc-300">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#00D2FF] shrink-0 mt-1" />
                  <div>
                    <span className="font-bold text-white block">{studioInfo.location.city}, {studioInfo.location.country}</span>
                    <span className="text-zinc-400">{studioInfo.location.address}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-[#FF2A54] shrink-0" />
                  <div>
                    <span className="text-zinc-400">Telemóvel / WhatsApp: </span>
                    <a 
                      href={`https://wa.me/${studioInfo.contacts.whatsapp.replace(/[^0-9]/g, '')}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-white font-bold hover:text-[#00D2FF] transition-colors"
                    >
                      {studioInfo.contacts.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                  <div>
                    <span className="text-zinc-400">Email Oficial: </span>
                    <a 
                      href={`mailto:${studioInfo.contacts.email}`} 
                      className="text-white font-bold hover:text-[#00D2FF] transition-colors"
                    >
                      {studioInfo.contacts.email}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Studio Gear Highlights (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#141418] to-[#101015] border border-[#24242c] shadow-xl space-y-5">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Cpu className="w-5 h-5 text-[#00D2FF]" />
                  Equipamentos & Hardware de Estúdio
                </h3>
                <span className="px-2 py-0.5 rounded bg-[#0066FF]/20 text-[#00D2FF] text-[10px] font-bold">
                  PRO RACK
                </span>
              </div>

              <p className="text-xs text-zinc-400 leading-relaxed">
                Nosso estúdio é equipado com a combinação perfeita entre hardware analógico clássico e as tecnologias digitais mais avançadas do mercado musical:
              </p>

              <div className="space-y-2.5">
                {studioInfo.gearHighlights.map((gear, idx) => (
                  <div 
                    key={idx} 
                    className="flex items-start gap-2.5 p-3 rounded-xl bg-[#0a0a0d] border border-[#1e1e26]"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00D2FF] shrink-0 mt-1.5" />
                    <span className="text-xs font-medium text-zinc-200">{gear}</span>
                  </div>
                ))}
              </div>

              {/* Booking Button in Gear Box */}
              <div className="pt-2">
                <a
                  href={`https://wa.me/${studioInfo.contacts.whatsapp.replace(/[^0-9]/g, '')}?text=Ola,%20gostaria%20de%20visitar%20as%20instalacoes%20do%20MELO%20MUSIC-studio`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-[#0066FF] to-[#00D2FF] text-white font-bold text-xs shadow-lg shadow-blue-500/20 hover:brightness-110 transition-all"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Agendar Visita ao Estúdio</span>
                </a>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
