import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { PlayerProvider } from './context/PlayerContext';
import { contentService } from './services/contentService';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { LiveStudioTicker } from './components/LiveStudioTicker';
import { MusicCatalog } from './components/MusicCatalog';
import { FeaturedArtistsSection } from './components/FeaturedArtistsSection';
import { NewsSection } from './components/NewsSection';
import { ActivitiesSection } from './components/ActivitiesSection';
import { YouTubeSection } from './components/YouTubeSection';
import { ServicesSection } from './components/ServicesSection';
import { AboutSection } from './components/AboutSection';
import { Footer } from './components/Footer';
import { AudioPlayerDock } from './components/AudioPlayerDock';
import { TrackDetailsModal } from './components/TrackDetailsModal';
import { AdminModal } from './components/AdminModal';
import { BloggerGuideModal } from './components/BloggerGuideModal';
import { Track, NewsArticle, ActivityEvent, StudioVideo, StudioInfo, StudioService, FeaturedArtist } from './types';

export default function App() {
  const [tracks, setTracks] = useState<Track[]>(contentService.getTracks());
  const [artists, setArtists] = useState<FeaturedArtist[]>(contentService.getArtists());
  const [news, setNews] = useState<NewsArticle[]>(contentService.getNews());
  const [activities, setActivities] = useState<ActivityEvent[]>(contentService.getActivities());
  const [videos, setVideos] = useState<StudioVideo[]>(contentService.getVideos());
  const [studioInfo, setStudioInfo] = useState<StudioInfo>(contentService.getStudioInfo());
  const [services] = useState<StudioService[]>(contentService.getServices());

  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [adminInitialTab, setAdminInitialTab] = useState<'tracks' | 'news' | 'activities' | 'videos' | 'settings' | 'backup' | 'blogger'>('tracks');
  const [isBloggerGuideOpen, setIsBloggerGuideOpen] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState<string>('TODOS');
  const [activeSection, setActiveSection] = useState('inicio');

  // Reactive subscription to content updates
  useEffect(() => {
    return contentService.subscribe(() => {
      setTracks(contentService.getTracks());
      setArtists(contentService.getArtists());
      setNews(contentService.getNews());
      setActivities(contentService.getActivities());
      setVideos(contentService.getVideos());
      setStudioInfo(contentService.getStudioInfo());
    });
  }, []);

  // Scroll spy to detect active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['inicio', 'musicas', 'artistas', 'novidades', 'atividades', 'videos', 'servicos', 'sobre'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const featuredTrack = tracks.find((t) => t.featured) || tracks[0] || null;

  const handleOpenAdminWithTab = (tab: 'tracks' | 'news' | 'activities' | 'videos' | 'settings' | 'backup' | 'blogger') => {
    setAdminInitialTab(tab);
    setIsAdminOpen(true);
  };

  const handleSelectGenreFromNav = (genre: string) => {
    setSelectedGenre(genre);
  };

  return (
    <PlayerProvider>
      <div className="min-h-screen bg-[#0a0a0c] text-zinc-100 selection:bg-[#0066FF] selection:text-white font-sans antialiased overflow-x-hidden">
        {/* Navigation Bar with Color Accents: Red Highlight, Warm Yellow Hover, Blue Dropdown Border */}
        <Navbar
          onOpenAdmin={() => handleOpenAdminWithTab('tracks')}
          onOpenBloggerGuide={() => setIsBloggerGuideOpen(true)}
          onSelectGenre={handleSelectGenreFromNav}
          activeSection={activeSection}
        />

        {/* Main Content Sections with Scroll Fade-In & Vertical Offset */}
        <main className="pb-16 sm:pb-20">
          {/* 1. Início / Hero (Initial smooth entry) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <Hero
              tracks={tracks}
              studioInfo={studioInfo}
            />
          </motion.div>

          {/* Dynamic Rolling Content Marquee & Track Stream */}
          <LiveStudioTicker tracks={tracks} />

          {/* 2. Catálogo de Músicas */}
          <motion.div
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.08, margin: '0px 0px -40px 0px' }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <MusicCatalog
              tracks={tracks}
              selectedGenre={selectedGenre}
              onSelectGenre={setSelectedGenre}
              onOpenAdminToAddTrack={() => handleOpenAdminWithTab('tracks')}
              onOpenBloggerGuide={() => setIsBloggerGuideOpen(true)}
            />
          </motion.div>

          {/* 3. Artistas em Destaque (Featured Artists) */}
          <motion.div
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.08, margin: '0px 0px -40px 0px' }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <FeaturedArtistsSection
              artists={artists}
              studioInfo={studioInfo}
            />
          </motion.div>

          {/* 4. Novidades & Revista Musical */}
          <motion.div
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.08, margin: '0px 0px -40px 0px' }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <NewsSection
              news={news}
              onOpenAdminToAddNews={() => handleOpenAdminWithTab('news')}
            />
          </motion.div>

          {/* 4. Próximas Atividades & Eventos */}
          <motion.div
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.08, margin: '0px 0px -40px 0px' }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <ActivitiesSection
              activities={activities}
              onOpenAdminToAddActivity={() => handleOpenAdminWithTab('activities')}
            />
          </motion.div>

          {/* 5. Galeria de Vídeos do YouTube */}
          <motion.div
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.08, margin: '0px 0px -40px 0px' }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <YouTubeSection
              videos={videos}
              onOpenAdminToAddVideo={() => handleOpenAdminWithTab('videos')}
            />
          </motion.div>

          {/* 6. Serviços Profissionais */}
          <motion.div
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.08, margin: '0px 0px -40px 0px' }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <ServicesSection
              services={services}
              studioInfo={studioInfo}
            />
          </motion.div>

          {/* 7. Sobre o Estúdio & Equipamentos */}
          <motion.div
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.08, margin: '0px 0px -40px 0px' }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <AboutSection
              studioInfo={studioInfo}
            />
          </motion.div>
        </main>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <Footer
            studioInfo={studioInfo}
            onOpenAdmin={() => handleOpenAdminWithTab('settings')}
          />
        </motion.div>

        {/* Persistent Floating Audio Player Dock */}
        <AudioPlayerDock />

        {/* Modals */}
        <TrackDetailsModal />

        <AdminModal
          isOpen={isAdminOpen}
          initialTab={adminInitialTab}
          onClose={() => setIsAdminOpen(false)}
        />

        {/* Blogger Hub & Code Generator Modal */}
        <BloggerGuideModal
          isOpen={isBloggerGuideOpen}
          onClose={() => setIsBloggerGuideOpen(false)}
          tracks={tracks}
          studioInfo={studioInfo}
        />
      </div>
    </PlayerProvider>
  );
}
