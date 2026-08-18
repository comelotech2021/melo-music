import React from 'react';
import { 
  Mic, 
  Music, 
  Sliders, 
  Sparkles, 
  Video, 
  Radio, 
  Disc, 
  Headphones, 
  Check, 
  Phone, 
  ArrowRight,
  ShieldCheck 
} from 'lucide-react';
import { StudioService, StudioInfo } from '../types';

interface ServicesSectionProps {
  services: StudioService[];
  studioInfo: StudioInfo;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ services, studioInfo }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Mic': return Mic;
      case 'Music': return Music;
      case 'Sliders': return Sliders;
      case 'Sparkles': return Sparkles;
      case 'Video': return Video;
      case 'Radio': return Radio;
      case 'Disc': return Disc;
      default: return Headphones;
    }
  };

  return (
    <section id="servicos" className="py-20 bg-[#0c0c10] border-t border-[#1a1a24] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0066FF]/10 text-[#00D2FF] text-xs font-bold border border-[#0066FF]/20">
            <Sliders className="w-3.5 h-3.5" />
            <span>SOLUÇÕES EM ÁUDIO & PRODUÇÃO</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Nossos <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D2FF] via-[#0066FF] to-[#FF2A54]">Serviços Profissionais</span>
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
            Do primeiro acorde à masterização final, entregamos excelência acústica e direção artística de alto nível para alavancar a sua carreira musical.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => {
            const Icon = getIcon(service.iconName);

            return (
              <div
                key={service.id}
                className="group relative flex flex-col justify-between p-6 sm:p-7 rounded-3xl bg-[#141418] hover:bg-[#181820] border border-[#24242c] hover:border-[#0066FF]/50 transition-all duration-300 shadow-xl hover:shadow-[0_10px_30px_rgba(0,102,255,0.15)] hover:-translate-y-1.5"
              >
                <div className="space-y-4">
                  {/* Icon & Title */}
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#0066FF]/30 to-[#00D2FF]/20 border border-[#0066FF]/40 flex items-center justify-center text-[#00D2FF] group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-black text-white group-hover:text-[#00D2FF] transition-colors leading-snug">
                      {service.title}
                    </h3>
                  </div>

                  {/* Short Description */}
                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                    {service.shortDescription}
                  </p>

                  {/* Features Bullet Points */}
                  <div className="pt-2 space-y-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-500">
                      O que está incluído:
                    </span>
                    <ul className="space-y-1.5 text-xs text-zinc-300">
                      {service.features.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-[#00D2FF] shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card CTA & Recommended Tag */}
                <div className="pt-6 mt-4 border-t border-[#202028] space-y-3">
                  <div className="text-[11px] text-zinc-400 italic">
                    <strong className="text-zinc-300 not-italic">Ideal para:</strong> {service.recommendedFor}
                  </div>

                  <a
                    href={`https://wa.me/${studioInfo.contacts.whatsapp.replace(/[^0-9]/g, '')}?text=Ola,%20gostaria%20de%20um%20orcamento%20para%20o%20servico%20de%20${encodeURIComponent(service.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#1e1e26] hover:bg-gradient-to-r hover:from-[#0066FF] hover:to-[#00D2FF] text-zinc-200 hover:text-white border border-[#2a2a36] hover:border-transparent text-xs font-bold transition-all shadow-md"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#00D2FF] group-hover:text-white" />
                    <span>Pedir Orçamento / Agendar</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Studio Guarantee Banner */}
        <div className="mt-14 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#141418] via-[#161622] to-[#141418] border border-[#262638] flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#FF2A54]/20 border border-[#FF2A54]/30 flex items-center justify-center text-[#FF2A54] shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white">
                Garantia de Qualidade & Padrão de Exportação
              </h4>
              <p className="text-xs sm:text-sm text-zinc-400">
                Todas as sessões de áudio são entregues com stems separados, arquivos sem perdas (WAV 24-bit 96kHz) e metadados ISRC prontos para registro e monetização.
              </p>
            </div>
          </div>

          <a
            href={`https://wa.me/${studioInfo.contacts.whatsapp.replace(/[^0-9]/g, '')}?text=Ola,%20quero%20conhecer%20os%20pacotes%20do%20estudio`}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 px-6 py-3 rounded-xl bg-gradient-to-r from-[#0066FF] to-[#00D2FF] text-white text-xs font-extrabold shadow-lg shadow-blue-500/25 hover:brightness-110 transition-all whitespace-nowrap"
          >
            Falar com a Produção
          </a>
        </div>

      </div>
    </section>
  );
};
