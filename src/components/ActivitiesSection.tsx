import React, { useState } from 'react';
import { 
  CalendarDays, 
  Clock, 
  MapPin, 
  ExternalLink, 
  CheckCircle2, 
  Clock4, 
  AlertCircle, 
  CheckCheck,
  PlusCircle
} from 'lucide-react';
import { ActivityEvent, ActivityStatus } from '../types';

interface ActivitiesSectionProps {
  activities: ActivityEvent[];
  onOpenAdminToAddActivity: () => void;
}

export const ActivitiesSection: React.FC<ActivitiesSectionProps> = ({ activities, onOpenAdminToAddActivity }) => {
  const [selectedStatus, setSelectedStatus] = useState<string>('TODOS');

  const statuses: (ActivityStatus | 'TODOS')[] = [
    'TODOS',
    'CONFIRMADO',
    'PRÓXIMO',
    'EM BREVE',
    'REALIZADO',
  ];

  const getStatusBadge = (status: ActivityStatus) => {
    switch (status) {
      case 'CONFIRMADO':
        return {
          bg: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
          icon: CheckCircle2,
          label: 'CONFIRMADO',
        };
      case 'PRÓXIMO':
        return {
          bg: 'bg-[#0066FF]/25 text-[#00D2FF] border-[#0066FF]/40',
          icon: Clock4,
          label: 'PRÓXIMO',
        };
      case 'EM BREVE':
        return {
          bg: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
          icon: AlertCircle,
          label: 'EM BREVE',
        };
      case 'REALIZADO':
        return {
          bg: 'bg-zinc-700/40 text-zinc-400 border-zinc-600/40',
          icon: CheckCheck,
          label: 'REALIZADO',
        };
      default:
        return {
          bg: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
          icon: Clock4,
          label: status,
        };
    }
  };

  const filteredActivities = activities.filter((act) => {
    if (selectedStatus === 'TODOS') return true;
    return act.status === selectedStatus;
  });

  return (
    <section id="atividades" className="py-20 bg-[#0c0c10] border-t border-[#1a1a24] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00D2FF]/10 text-[#00D2FF] text-xs font-bold border border-[#00D2FF]/20">
              <CalendarDays className="w-3.5 h-3.5" />
              <span>AGENDA, EVENTOS & LANÇAMENTOS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Próximas <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D2FF] via-[#0066FF] to-[#FF2A54]">Atividades</span>
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 max-w-xl">
              Acompanhe a programação de sessões de estúdio, gravações de videoclipes, workshops e concertos ao vivo com os artistas do MELO MUSIC-studio.
            </p>
          </div>

          {/* Subtle owner trigger dot */}
          <div className="flex items-center">
            <button
              onClick={onOpenAdminToAddActivity}
              aria-label="Adicionar"
              className="w-2.5 h-2.5 rounded-full bg-[#FF2A54] opacity-30 hover:opacity-100 transition-opacity"
            />
          </div>
        </div>

        {/* Status Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-thin scrollbar-thumb-zinc-800">
          {statuses.map((st) => {
            const isSelected = selectedStatus === st;
            return (
              <button
                key={st}
                onClick={() => setSelectedStatus(st)}
                className={`px-4 py-2 text-xs font-extrabold rounded-xl transition-all whitespace-nowrap ${
                  isSelected
                    ? 'bg-gradient-to-r from-[#0066FF] to-[#00D2FF] text-white shadow-lg shadow-blue-500/25'
                    : 'bg-[#141418] text-zinc-400 hover:text-white hover:bg-[#1c1c24] border border-[#24242c]'
                }`}
              >
                {st}
              </button>
            );
          })}
        </div>

        {/* Activities Timeline / Cards */}
        {filteredActivities.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredActivities.map((event) => {
              const badge = getStatusBadge(event.status);
              const StatusIcon = badge.icon;

              return (
                <div
                  key={event.id}
                  className="group relative flex flex-col justify-between bg-[#141418] hover:bg-[#181820] border border-[#24242c] hover:border-[#00D2FF]/40 rounded-2xl overflow-hidden transition-all duration-300 shadow-xl hover:shadow-[0_10px_30px_rgba(0,102,255,0.1)] hover:-translate-y-1"
                >
                  {/* Event Artwork Banner */}
                  <div className="relative h-44 w-full overflow-hidden bg-black/60">
                    <img
                      src={event.coverUrl}
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#141418] via-transparent to-transparent opacity-80" />

                    {/* Status Badge */}
                    <div className="absolute top-3 right-3">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-[11px] font-extrabold uppercase rounded-full border backdrop-blur-md shadow-md ${badge.bg}`}>
                        <StatusIcon className="w-3.5 h-3.5" />
                        {badge.label}
                      </span>
                    </div>

                    {/* Event Type Badge */}
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 text-[10px] font-extrabold uppercase rounded-md bg-black/80 backdrop-blur-md text-white border border-white/10">
                        {event.type}
                      </span>
                    </div>
                  </div>

                  {/* Event Details Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-3">
                      <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-[#00D2FF] leading-snug transition-colors">
                        {event.title}
                      </h3>

                      {/* Meta Info (Date, Time, Location) */}
                      <div className="space-y-1.5 text-xs text-zinc-300">
                        <div className="flex items-center gap-2">
                          <CalendarDays className="w-3.5 h-3.5 text-[#00D2FF]" />
                          <span className="font-semibold text-white">{event.date}</span>
                          <span className="text-zinc-500">•</span>
                          <Clock className="w-3.5 h-3.5 text-zinc-400" />
                          <span>{event.time}</span>
                        </div>

                        <div className="flex items-start gap-2 text-zinc-400">
                          <MapPin className="w-3.5 h-3.5 text-[#FF2A54] shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{event.location}</span>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-xs sm:text-sm text-zinc-400 line-clamp-3 leading-relaxed">
                        {event.description}
                      </p>
                    </div>

                    {/* Action Button */}
                    <div className="pt-3 border-t border-[#202028]">
                      {event.link ? (
                        <a
                          href={event.link}
                          target={event.link.startsWith('http') ? '_blank' : '_self'}
                          rel="noopener noreferrer"
                          className="w-full flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-[#1e1e26] hover:bg-gradient-to-r hover:from-[#0066FF] hover:to-[#00D2FF] text-zinc-200 hover:text-white border border-[#2a2a36] hover:border-transparent text-xs font-bold transition-all shadow-md"
                        >
                          <span>{event.linkLabel || 'Saber Mais / Participar'}</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      ) : (
                        <button
                          disabled
                          className="w-full py-2.5 px-4 rounded-xl bg-[#141418] text-zinc-500 border border-[#22222a] text-xs font-semibold"
                        >
                          Mais informações em breve
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16 px-4 rounded-3xl bg-[#141418] border border-[#24242c]">
            <CalendarDays className="w-12 h-12 text-zinc-600 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-white mb-1">Nenhuma atividade com este estado</h3>
            <p className="text-sm text-zinc-400 max-w-md mx-auto mb-6">
              Altere o filtro acima para ver outras datas e programações do estúdio.
            </p>
            <button
              onClick={() => setSelectedStatus('TODOS')}
              className="px-5 py-2.5 bg-[#1e1e26] hover:bg-[#282834] text-[#00D2FF] border border-[#2a2a36] rounded-xl text-xs font-bold transition-all"
            >
              Exibir Todas as Atividades
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
