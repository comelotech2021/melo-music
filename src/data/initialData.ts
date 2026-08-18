import { Track, NewsArticle, ActivityEvent, StudioVideo, StudioService, StudioInfo, FeaturedArtist } from '../types';

export const INITIAL_STUDIO_INFO: StudioInfo = {
  name: 'MELO MUSIC-studio',
  slogan: 'Onde o Ritmo Ganha Alma & a Produção Atinge o Nível Máximo',
  description: 'O MELO MUSIC-studio é uma produtora e estúdio de gravação de referência internacional, especializado nos ritmos africanos contemporâneos — Kizomba, Kuduro, Semba, Afro House, Hip-Hop/Trap — combinando acústica tratada, captação analógica de ponta e masterização digital de alta fidelidade.',
  foundedYear: '2019',
  location: {
    city: 'Luanda',
    country: 'Angola',
    address: 'Av. Deolinda Rodrigues, Luanda / Suporte Internacional & Sessões Online',
  },
  contacts: {
    phone: '+244 923 591 571',
    whatsapp: '+24492 3591 571',
    email: 'andmelo222@gmail.com',
  },
  socials: {
    youtube: 'https://youtube.com/@melomusicstudio',
    instagram: 'https://instagram.com/melomusicstudio',
    facebook: 'https://facebook.com/melomusicstudio',
    tiktok: 'https://tiktok.com/@melomusicstudio',
    spotify: 'https://open.spotify.com',
  },
  gearHighlights: [
    'Microfones Valvulados Neumann U87 Ai & Telefunken TF47',
    'Conversores Universal Audio Apollo x8p Heritage Edition',
    'Monitores de Estúdio Genelec 8341A SAM & Yamaha NS-10M Studio',
    'Preamps Neve 1073 & Compressores Universal Audio 1176LN',
    'DAWs Pro Tools Ultimate HDX, Logic Pro & FL Studio Studio Suite',
    'Tratamento Acústico Flutuante com isolamento de 55dB',
  ],
};

export const INITIAL_TRACKS: Track[] = [
  {
    id: 'track-01',
    title: 'Noite Quente (Kizomba Suave)',
    artist: 'Melo & Os Clássicos',
    featuredArtists: 'ft. Soraia Silva',
    genre: 'Kizomba',
    coverUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop&q=80',
    audioUrl: 'https://actions.google.com/sounds/v1/ambiences/outdoor_evening_crickets.ogg', // Fallback stream or audio
    releaseDate: '2025-05-10',
    duration: '03:42',
    description: 'Uma produção romântica com acordes suaves de guitarra acústica e a batida cadenciada marcante da Kizomba moderna de Luanda.',
    lyrics: `[Verso 1]
Quando o sol se põe na baía de Luanda
Sinto a brisa que me traz a tua lembrança
O teu toque suave no ritmo que balança
O compasso do amor que nunca se cansa...

[Refrão]
Noite quente, cola teu corpo no meu
Neste compasso que a melodia nos deu
Melo Music a tocar no coração
Kizomba pura, eterna paixão...

[Verso 2]
Passo a passo, o chão quase a derreter
Não há pressa, só queremos viver
O baixo rimbomba, a tarraxinha aperta
Na madrugada onde a alma desperta...`,
    credits: {
      producer: 'Melo Producer (MELO MUSIC-studio)',
      mixingMastering: 'Carlos D’Alva no MELO Studio A',
      recordingStudio: 'MELO MUSIC-studio Luanda',
      composer: 'Melo & Soraia Silva',
      additionalMusicians: ['Nelson Guitarra (Guitarras)', 'Djodje Baixo (Bass)'],
    },
    downloadAvailable: true,
    downloadUrl: 'https://actions.google.com/sounds/v1/ambiences/outdoor_evening_crickets.ogg',
    featured: true,
    playCount: 14200,
  },
  {
    id: 'track-02',
    title: 'Fogo na Pista (Kuduro Puro)',
    artist: 'Os Reis da Batida',
    featuredArtists: 'ft. MC Puto Zango',
    genre: 'Kuduro',
    coverUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&auto=format&fit=crop&q=80',
    audioUrl: 'https://actions.google.com/sounds/v1/sports/boxing_gym.ogg',
    releaseDate: '2025-06-01',
    duration: '02:58',
    description: 'Bateria rítmica explosiva, sintetizadores pesados e a energia autêntica dos guetos de Luanda gravada com masterização punchy.',
    lyrics: `[Intro]
Atenção Luanda! MELO MUSIC no comando!
Aquece o motor, que o chão vai tremer!

[Refrão]
Fogo na pista, ninguém fica parado
Bate com a perna, desce travado
Kuduro é nosso, poder e raiz
No estúdio do Melo a gente é feliz!

[Verso]
Do Rangel ao Cazenga, a batida espalhou
Corta o vento no passo que o mestre ensinou!`,
    credits: {
      producer: 'Melo Beatmaster',
      mixingMastering: 'MELO MUSIC Lab Pro',
      recordingStudio: 'Cabine de Gravação B',
      composer: 'MC Puto Zango',
      additionalMusicians: ['Bateria Eletrônica MPC 3000'],
    },
    downloadAvailable: true,
    downloadUrl: 'https://actions.google.com/sounds/v1/sports/boxing_gym.ogg',
    featured: true,
    playCount: 28900,
  },
  {
    id: 'track-03',
    title: 'Raízes de Semba (Tradição Viva)',
    artist: 'Tio Chico & Velha Guarda',
    genre: 'Semba',
    coverUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&auto=format&fit=crop&q=80',
    audioUrl: 'https://actions.google.com/sounds/v1/human_voices/applause_crowd_cheer.ogg',
    releaseDate: '2025-04-18',
    duration: '04:15',
    description: 'Guitarras sembistas gravadas em microfones valvulados Neumann com percussões orgânicas (dikanza e congas) captadas ao vivo.',
    lyrics: `[Verso 1]
Ai Luanda dos meus encantos
Onde o Semba chora a saudade
Vem dançar meu irmão, sem espantos
Esta música é nossa verdade...

[Refrão]
Dikanza toca no peito
Semba que não tem defeito
No estúdio Melo o som renasceu
Com o respeito que a tradição mereceu!`,
    credits: {
      producer: 'Melo & Tio Chico',
      mixingMastering: 'Melo Analogue Desk 4000',
      recordingStudio: 'Sala Live MELO MUSIC',
      composer: 'Tio Chico',
      additionalMusicians: ['Mestre Kikas (Dikanza & Conquilha)', 'Paulinho Viola (Solo D’Angola)'],
    },
    downloadAvailable: true,
    downloadUrl: 'https://actions.google.com/sounds/v1/human_voices/applause_crowd_cheer.ogg',
    featured: false,
    playCount: 9800,
  },
  {
    id: 'track-04',
    title: 'Sunset In Luanda (Afro House Deep)',
    artist: 'DJ Black Vortex',
    featuredArtists: 'ft. Amina Roots',
    genre: 'Afro House',
    coverUrl: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=800&auto=format&fit=crop&q=80',
    audioUrl: 'https://actions.google.com/sounds/v1/transportation/subway_ambient_drone.ogg',
    releaseDate: '2025-06-25',
    duration: '05:30',
    description: 'Linhas de baixo 3-step profundas, vocais em lingala e shona processados em reverbs analógicos com dinâmica para pistas mundiais.',
    lyrics: `[Vocal Loop]
Oya weh... Africa is calling
Under the sunset, the drums are talking
Feel the frequency in your spine
MELO MUSIC state of mind...`,
    credits: {
      producer: 'DJ Black Vortex & Melo',
      mixingMastering: 'MELO MUSIC Mastering Studio',
      recordingStudio: 'MELO Studio Suite',
      composer: 'DJ Black Vortex',
    },
    downloadAvailable: true,
    downloadUrl: 'https://actions.google.com/sounds/v1/transportation/subway_ambient_drone.ogg',
    featured: true,
    playCount: 35100,
  },
  {
    id: 'track-05',
    title: 'Visão Noturna (Trap Luanda)',
    artist: 'Young Kelson',
    featuredArtists: 'ft. Drill Boyz',
    genre: 'Hip-Hop/Trap',
    coverUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=800&auto=format&fit=crop&q=80',
    audioUrl: 'https://actions.google.com/sounds/v1/sports/stadium_horn.ogg',
    releaseDate: '2025-07-02',
    duration: '03:10',
    description: '808s distorcidos com precisão cirúrgica, hi-hat rolls rápidos e vocais captados no lendário Shure SM7B com preamp Neve.',
    lyrics: `[Intro]
Yeah, Melo na produção...
Sem desculpas, foco na visão.

[Verso]
Saí do escuro, trouxe a luz
Cada rima que eu solto conduz
Trabalho no estúdio até o dia raiar
Com a família Melo a gente vai triunfar!`,
    credits: {
      producer: 'Melo Trap Division',
      mixingMastering: 'MELO HDX Hybrid Mix',
      recordingStudio: 'Vocal Booth Alpha',
      composer: 'Young Kelson',
    },
    downloadAvailable: true,
    downloadUrl: 'https://actions.google.com/sounds/v1/sports/stadium_horn.ogg',
    featured: false,
    playCount: 18400,
  },
  {
    id: 'track-06',
    title: 'Abraço de Mãe (Kizomba Acústica)',
    artist: 'Neusa Marisa',
    genre: 'Kizomba',
    coverUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&auto=format&fit=crop&q=80',
    audioUrl: 'https://actions.google.com/sounds/v1/ambiences/outdoor_evening_crickets.ogg',
    releaseDate: '2025-07-15',
    duration: '03:55',
    description: 'Piano de cauda acústico e voz doce gravados em uma única tomada com reverberação natural da sala de gravação.',
    lyrics: `[Verso 1]
Mãe querida, tua canção é o meu norte
Teu carinho sempre me fez mais forte...`,
    credits: {
      producer: 'Melo Producer',
      mixingMastering: 'MELO Studio Master',
      recordingStudio: 'Sala Live Piano',
      composer: 'Neusa Marisa',
    },
    downloadAvailable: true,
    downloadUrl: 'https://actions.google.com/sounds/v1/ambiences/outdoor_evening_crickets.ogg',
    featured: false,
    playCount: 11200,
  },
  {
    id: 'track-07',
    title: 'Kilamba Night Drive (Afro Beat Melódico)',
    artist: 'Melo Instrumental Project',
    featuredArtists: 'ft. Saxophone Dan',
    genre: 'Afro House',
    coverUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&auto=format&fit=crop&q=80',
    audioUrl: 'https://actions.google.com/sounds/v1/transportation/subway_ambient_drone.ogg',
    releaseDate: '2025-08-01',
    duration: '04:02',
    description: 'Arranjo sofisticado de sopros e sintetizadores analógicos com groove contagiante para viagens noturnas.',
    lyrics: `[Instrumental] Solo de saxofone com percussões angolanas gravadas em estúdio acústico.`,
    credits: {
      producer: 'Melo Producer',
      mixingMastering: 'MELO Master Suite',
      recordingStudio: 'Sala Principal',
      composer: 'Melo & Dan Sax',
    },
    downloadAvailable: true,
    downloadUrl: 'https://actions.google.com/sounds/v1/transportation/subway_ambient_drone.ogg',
    featured: false,
    playCount: 22400,
  },
  {
    id: 'track-08',
    title: 'Energia de Cazenga (Kuduro 140 BPM)',
    artist: 'Os Dançarinos do Asfalto',
    genre: 'Kuduro',
    coverUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&auto=format&fit=crop&q=80',
    audioUrl: 'https://actions.google.com/sounds/v1/sports/boxing_gym.ogg',
    releaseDate: '2025-08-10',
    duration: '02:45',
    description: 'Batida acelerada com timbres industriais e refrão com resposta em coro.',
    lyrics: `[Refrão]
Bate no peito, marca o compasso!
Kuduro é a força de cada passo!`,
    credits: {
      producer: 'Melo Beatmaster',
      mixingMastering: 'MELO Studio B',
      recordingStudio: 'Cabine B',
      composer: 'Os Dançarinos do Asfalto',
    },
    downloadAvailable: true,
    downloadUrl: 'https://actions.google.com/sounds/v1/sports/boxing_gym.ogg',
    featured: false,
    playCount: 16700,
  },
];

export const INITIAL_NEWS: NewsArticle[] = [
  {
    id: 'news-01',
    title: 'MELO MUSIC-studio expande suas instalações com nova mesa analógica Neve & Sala de Masterização Dolby Atmos',
    slug: 'expansao-melo-music-studio-neve-dolby-atmos',
    category: 'Estúdio',
    coverUrl: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=1000&auto=format&fit=crop&q=80',
    summary: 'Com foco em entregar padrões de áudio mundiais para artistas de Kizomba, Semba e Afro Urban, o estúdio inaugurou sua nova suíte acústica.',
    content: `O **MELO MUSIC-studio** continua seu compromisso em elevar a música angolana e africana para o cenário global. 

Neste mês, finalizamos a instalação completa do nosso novo sistema de monitoramento espacial e uma lendária mesa analógica Neve Classic, proporcionando um calor harmônico inigualável para gravações de vocais e instrumentos acústicos.

### Principais atualizações técnicas:
- Sistema de acústica tratada com difusores QRD de madeira maciça.
- Captação multipista de até 32 canais simultâneos em 192kHz/32-bit float.
- Cabine de voz dedicada com visibilidade total para a sala de controle.

Artistas parceiros já estão agendando suas sessões de gravação para a próxima temporada de lançamentos. Venha nos visitar ou agende sua sessão pelo nosso canal de atendimento!`,
    publishDate: '2025-07-20',
    author: 'Equipa de Comunicação MELO',
    readTimeMinutes: 3,
  },
  {
    id: 'news-02',
    title: 'Hit "Noite Quente" ultrapassa 1 milhão de reproduções e ganha versão com orquestra ao vivo',
    slug: 'noite-quente-ultrapassa-1-milhao-streams',
    category: 'Lançamento',
    coverUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1000&auto=format&fit=crop&q=80',
    summary: 'A produção assinada por Melo Producer conquistou as pistas de dança em Luanda, Lisboa e Paris, consolidando o som único do estúdio.',
    content: `O single "Noite Quente", gravado e masterizado inteiramente nas dependências do **MELO MUSIC-studio**, atingiu a impressionante marca de mais de 1 milhão de reproduções digitais em todas as plataformas e rádios.

Para celebrar este marco, a equipa reuniu 8 instrumentistas de cordas e sopros para gravar um videoclipe ao vivo e uma versão acústica especial que será lançada em breve em nosso canal oficial do YouTube.`,
    publishDate: '2025-07-10',
    author: 'Redação Musical MELO',
    readTimeMinutes: 2,
  },
  {
    id: 'news-03',
    title: 'Bastidores: Como gravamos as percussões autênticas de Semba com microfonação binaural',
    slug: 'bastidores-gravacao-percussoes-semba-melo-studio',
    category: 'Bastidores',
    coverUrl: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=1000&auto=format&fit=crop&q=80',
    summary: 'Confira os segredos de mixagem e captação utilizados pelos nossos engenheiros de som para captar a dikanza e o batuque com clareza cristalina.',
    content: `Gravar ritmos tradicionais com a fidelidade que eles merecem exige tanto respeito cultural quanto precisão técnica.

Em nossa mais recente sessão, utilizamos um par estéreo de microfones valvulados em configuração Blumlein para registrar o ambiente natural da sala, somados a microfones dinâmicos de contato próximo. O resultado é um Semba encorpado, que faz o ouvinte se sentir dentro da roda de batuque.`,
    publishDate: '2025-06-28',
    author: 'Engenharia de Áudio MELO',
    readTimeMinutes: 4,
  },
  {
    id: 'news-04',
    title: 'Inscrições Abertas: Workshop de Beatmaking & Mixagem de Ritmos Africanos',
    slug: 'workshop-beatmaking-mixagem-melo-studio-2025',
    category: 'Comunicado',
    coverUrl: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=1000&auto=format&fit=crop&q=80',
    summary: 'Três dias intensivos de imersão prática no estúdio aprendendo arranjos, equalização cirúrgica e compressão para produtores musicais.',
    content: `Quer aprender como os grandes sucessos de Kizomba, Afro House e Kuduro são produzidos do zero?

O MELO MUSIC-studio abre 15 vagas exclusivas para produtores iniciantes e intermediários. As aulas serão presenciais na nossa sala de controle A com direito a certificado e pack de samples exclusivo de ritmos de Luanda.`,
    publishDate: '2025-06-15',
    author: 'Diretoria MELO MUSIC',
    readTimeMinutes: 2,
  },
];

export const INITIAL_ACTIVITIES: ActivityEvent[] = [
  {
    id: 'act-01',
    title: 'Gravação da Sessão Especial "MELO Live Sessions Vol. 2"',
    type: 'Sessão de Gravação',
    status: 'CONFIRMADO',
    date: '2025-08-25',
    time: '18:30',
    location: 'Estúdio Principal MELO MUSIC (Sala A)',
    coverUrl: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&auto=format&fit=crop&q=80',
    description: 'Sessão ao vivo com 4 artistas convidados cantando Kizomba e Semba em formato intimista com captação multicâmera 4K.',
    link: 'https://wa.me/244923000111?text=Ola,%20gostaria%20de%20saber%20sobre%20as%20Live%20Sessions',
    linkLabel: 'Reservar Lugar / Assistir',
  },
  {
    id: 'act-02',
    title: 'Lançamento Oficial do Álbum "Afro House Luanda Vibe"',
    type: 'Lançamento',
    status: 'PRÓXIMO',
    date: '2025-09-05',
    time: '20:00',
    location: 'Transmissão Mundial + Streaming no Site Oficial',
    coverUrl: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=800&auto=format&fit=crop&q=80',
    description: 'O aguardado álbum colaborativo com 10 faixas produzidas inteiramente no MELO MUSIC-studio estará disponível para streaming e download.',
    link: '#musicas',
    linkLabel: 'Ouvir Prévia no Site',
  },
  {
    id: 'act-03',
    title: 'Workshop de Produção & Mixagem Urbana',
    type: 'Workshop',
    status: 'EM BREVE',
    date: '2025-09-18',
    time: '14:00 - 19:00',
    location: 'Auditório MELO MUSIC & Online via Zoom',
    coverUrl: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&auto=format&fit=crop&q=80',
    description: 'Masterclass com demonstração em tempo real de mixagem e masterização de faixas de Kizomba, Kuduro e Hip-Hop.',
    link: 'https://wa.me/244923000111?text=Quero%20me%20inscrever%20no%20Workshop%20de%20Mixagem',
    linkLabel: 'Garantir Inscrição',
  },
  {
    id: 'act-04',
    title: 'Gravação do Videoclipe Oficial "Fogo na Pista"',
    type: 'Videoclipe',
    status: 'CONFIRMADO',
    date: '2025-10-02',
    time: '09:00',
    location: 'Baía de Luanda & Cenário Urbano',
    coverUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&auto=format&fit=crop&q=80',
    description: 'Produção visual cinematográfica com dançarinos de Kuduro e direção assinada pela equipe de vídeo do MELO Studio.',
    link: 'https://youtube.com/@melomusicstudio',
    linkLabel: 'Ver Teaser no YouTube',
  },
  {
    id: 'act-05',
    title: 'Festival Sons de Angola 2025 (Palco Principal)',
    type: 'Concerto',
    status: 'REALIZADO',
    date: '2025-05-30',
    time: '21:00',
    location: 'Estádio dos Coqueiros, Luanda',
    coverUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&auto=format&fit=crop&q=80',
    description: 'Apresentação dos artistas residentes do MELO MUSIC-studio para mais de 15.000 pessoas.',
    link: '#videos',
    linkLabel: 'Assistir aos Melhores Momentos',
  },
];

export const INITIAL_VIDEOS: StudioVideo[] = [
  {
    id: 'video-01',
    title: 'MELO Live Sessions: Acústico Kizomba & Semba no Estúdio',
    youtubeIdOrUrl: 'dQw4w9WgXcQ', // Clean sample ID or standard embed
    category: 'Sessão de Estúdio',
    description: 'Assista à captação ao vivo de vozes e guitarras em nosso estúdio principal, com som puro direto da mesa de som.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop&q=80',
    duration: '14:20',
    featured: true,
  },
  {
    id: 'video-02',
    title: 'Videoclipe Oficial: "Noite Quente" (4K Ultra HD)',
    youtubeIdOrUrl: 'kJQP7kiw5Fk',
    category: 'Videoclipe',
    description: 'Clipe gravado nas ruas e praias de Luanda com produção musical e cinematográfica completa assinada pela MELO MUSIC.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&auto=format&fit=crop&q=80',
    duration: '03:48',
    featured: true,
  },
  {
    id: 'video-03',
    title: 'Making Of: Bastidores da Criação da Batida de Kuduro "Fogo na Pista"',
    youtubeIdOrUrl: 'fJ9rUzIMcZQ',
    category: 'Making Of',
    description: 'Veja o produtor Melo construindo a linha de percussão, selecionando samples de caixa e ajustando o compressor.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&auto=format&fit=crop&q=80',
    duration: '08:15',
    featured: false,
  },
  {
    id: 'video-04',
    title: 'Entrevista Exclusiva: O Futuro da Música Urbana em Angola',
    youtubeIdOrUrl: '3JZ_D3ELwOQ',
    category: 'Entrevista',
    description: 'Conversa franca com produtores e músicos sobre técnicas de estúdio, exportação da Kizomba e tecnologia musical.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&auto=format&fit=crop&q=80',
    duration: '22:40',
    featured: false,
  },
];

export const INITIAL_SERVICES: StudioService[] = [
  {
    id: 'serv-01',
    title: 'Gravação em Alta Fidelidade',
    iconName: 'Mic',
    shortDescription: 'Captação de voz, guitarras, teclados, sopros e percussões em salas tratadas acusticamente com microfones Neumann e pré-amplificadores analógicos Neve.',
    features: ['Sala Live tratada com 55dB de isolamento', 'Microfones valvulados & condensadores de referência', 'Gravação multipista em 32-bit float / 192kHz', 'Engenheiro de som dedicado'],
    recommendedFor: 'Solistas, Grupos, Bandas, Instrumentistas e Locuções',
  },
  {
    id: 'serv-02',
    title: 'Produção Musical & Beatmaking',
    iconName: 'Music',
    shortDescription: 'Criação completa de arranjos e instrumentais personalizados para Kizomba, Kuduro, Semba, Afro House, Trap e R&B, do conceito ao produto final.',
    features: ['Composição harmônica e melódica', 'Linhas de baixo e baterias autênticas', 'Arranjos de cordas e sintetizadores analógicos', 'Direção artística de voz'],
    recommendedFor: 'Artistas em busca de identidade sonora única e singles de sucesso',
  },
  {
    id: 'serv-03',
    title: 'Mixagem Profissional Híbrida',
    iconName: 'Sliders',
    shortDescription: 'Equilíbrio cirúrgico de frequências, espacialidade estéreo/3D, compressão harmônica e clareza para fazer cada elemento da música respirar.',
    features: ['Processamento híbrido (Plugins Analogue Modeling + Hardware)', 'Ajuste e afinação natural de vocais (Melodyne/AutoTune Pro)', 'Profundidade tridimensional e controle de transientes', 'Revisões inclusas até aprovação final'],
    recommendedFor: 'Faixas gravadas no nosso estúdio ou enviadas online (Stems)',
  },
  {
    id: 'serv-04',
    title: 'Masterização para Streaming & Clubes',
    iconName: 'Sparkles',
    shortDescription: 'A etapa final que garante volume comercial competitivo, equilíbrio tonal impecável e impacto em Spotify, Apple Music, Rádio e Sons de Pista.',
    features: ['Padrão de loudness internacional (-14 LUFS a -8 LUFS)', 'Compatibilidade mono/estéreo sem cancelamento de fase', 'Entrega em WAV 24-bit Hi-Res e MP3 320kbps com metadados e tags ISRC', 'Otimização para sistemas de som de alta potência'],
    recommendedFor: 'Singles, EPs e Álbuns prontos para lançamento oficial',
  },
  {
    id: 'serv-05',
    title: 'Produção de Videoclipes & Live Sessions',
    iconName: 'Video',
    shortDescription: 'Gravação audiovisual com câmeras 4K/6K cinema, iluminação de estúdio profissional, direção de arte e edição cinematográfica.',
    features: ['Roteiro e direção de cena', 'Gravação em estúdio com fundo infinito ou locações externas', 'Color grading profissional de cinema', 'Teasers e formatos verticais (Reels/TikTok) inclusos'],
    recommendedFor: 'Artistas que desejam lançar singles com forte apelo visual',
  },
  {
    id: 'serv-06',
    title: 'Distribuição Digital & Assessoria',
    iconName: 'Radio',
    shortDescription: 'Envio para mais de 150 plataformas de streaming mundiais, proteção de direitos autorais e consultoria de estratégia de lançamento.',
    features: ['Distribuição para Spotify, Apple Music, Deezer, TikTok e YouTube Music', 'Geração de códigos ISRC e UPC oficiais', 'Pitch para playlists editoriais de Afro Beats', 'Página oficial de pré-save inteligente'],
    recommendedFor: 'Artistas independentes que desejam monetizar suas obras',
  },
];

export const INITIAL_ARTISTS: FeaturedArtist[] = [
  {
    id: 'artist-01',
    name: 'Soraia Silva',
    stageName: 'A Voz Dourada',
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=80',
    primaryGenre: 'Kizomba',
    secondaryGenres: ['Zouk', 'Semba Romântico'],
    role: 'Cantora & Compositora',
    bio: 'Uma das vozes femininas mais expressivas da nova geração da Kizomba em Luanda. Conhecida pela sua afinação aveludada e interpretações cheias de sentimento gravadas no MELO MUSIC-studio.',
    instagram: 'https://instagram.com/soraiasilvamusic',
    spotifyOrYoutube: 'https://youtube.com',
    hitsRecordedAtStudio: ['Noite Quente (Kizomba Suave)', 'Sentimento Puro', 'Amor Sem Fronteiras'],
    monthlyListenersOrStats: '+180K Ouvintes Mensais',
    verified: true,
  },
  {
    id: 'artist-02',
    name: 'MC Puto Zango',
    stageName: 'O Furacão do Cazenga',
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=80',
    primaryGenre: 'Kuduro',
    secondaryGenres: ['Afro Urban', 'Batida'],
    role: 'MC, Rapper & Performer',
    bio: 'Ícone das pistas e rodas de dança nos bairros de Luanda. Traz a energia crua do Kuduro aliada à masterização de alta precisão do estúdio Melo.',
    instagram: 'https://instagram.com/mcputozango',
    spotifyOrYoutube: 'https://youtube.com',
    hitsRecordedAtStudio: ['Fogo na Pista (Kuduro Puro)', 'Pisão da Madrugada', 'Toque de Mestre'],
    monthlyListenersOrStats: '+350K Plays no YouTube',
    verified: true,
  },
  {
    id: 'artist-03',
    name: 'Tio Chico & Velha Guarda',
    stageName: 'Mestres do Compasso',
    photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&auto=format&fit=crop&q=80',
    primaryGenre: 'Semba',
    secondaryGenres: ['Música Tradicional Angolana', 'Rumba'],
    role: 'Guitarrista & Intérprete Tradicional',
    bio: 'Com mais de 30 anos de dedicação ao Semba de raiz, Tio Chico gravou suas guitarras lendárias e arranjos de dikanza na acústica valvulada do MELO MUSIC-studio.',
    instagram: 'https://instagram.com/velhaguardasemba',
    spotifyOrYoutube: 'https://youtube.com',
    hitsRecordedAtStudio: ['Raízes de Semba (Tradição Viva)', 'Memórias da Ilha', 'Saudade de Luanda'],
    monthlyListenersOrStats: 'Património Vivo do Semba',
    verified: true,
  },
  {
    id: 'artist-04',
    name: 'DJ Black Vortex',
    stageName: 'O Feiticeiro do Beat',
    photoUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=800&auto=format&fit=crop&q=80',
    primaryGenre: 'Afro House',
    secondaryGenres: ['Amapiano', 'Deep Tribal'],
    role: 'DJ & Produtor Eletrónico',
    bio: 'Pioneiro em misturar instrumentos tribais angolanos com sintetizadores analógicos Moog e baterias 3-step, com músicas tocadas em festivais internacionais.',
    instagram: 'https://instagram.com/djblackvortex',
    spotifyOrYoutube: 'https://youtube.com',
    hitsRecordedAtStudio: ['Sunset In Luanda', 'Tribal Ritual EP', 'Kilamba Night Drive'],
    monthlyListenersOrStats: '+220K Streams Internacionais',
    verified: true,
  },
  {
    id: 'artist-05',
    name: 'Young Kelson',
    stageName: 'Drill Boyz Leader',
    photoUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&auto=format&fit=crop&q=80',
    primaryGenre: 'Hip-Hop/Trap',
    secondaryGenres: ['Drill Luanda', 'R&B'],
    role: 'Rapper, Letrista & Produtor',
    bio: 'Representante da vanguarda do Trap em Angola, com rimas afiadas, flow dinâmico e produção de 808s com pegada pesada na cabine de gravação Alpha.',
    instagram: 'https://instagram.com/youngkelson',
    spotifyOrYoutube: 'https://youtube.com',
    hitsRecordedAtStudio: ['Visão Noturna (Trap Luanda)', 'Noites de Glória', 'Caminho do Topo'],
    monthlyListenersOrStats: '+140K Ouvintes',
    verified: true,
  },
  {
    id: 'artist-06',
    name: 'Neusa Marisa',
    stageName: 'A Voz das Emoções',
    photoUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&auto=format&fit=crop&q=80',
    primaryGenre: 'Kizomba',
    secondaryGenres: ['Soul Acústico', 'Gospel Angolano'],
    role: 'Cantora & Pianista',
    bio: 'Cantora e instrumentista com formação clássica que combina a sensibilidade do piano acústico com melodias inesquecíveis da Kizomba moderna.',
    instagram: 'https://instagram.com/neusamarisamusic',
    spotifyOrYoutube: 'https://youtube.com',
    hitsRecordedAtStudio: ['Abraço de Mãe', 'Promessa ao Luar', 'Coração Aberto'],
    monthlyListenersOrStats: '+95K Plays',
    verified: true,
  },
];

