// All copy for the home page lives here so the layout stays readable.

export type Project = {
  title: string;
  role: string;
  description: string;
  tags: string[];
  flood: string; // hover flood colour
  ink: string; // text colour on top of the flood
  href?: string;
  cta?: string;
};

export const projects: Project[] = [
  {
    title: 'Voley',
    role: 'Founder & builder',
    description:
      'A communication platform for insurance agencies. Deep AMS integration, agency-wide collaboration, evolving with the latest in messaging.',
    tags: ['Active', 'SaaS'],
    flood: '#ff6a3d',
    ink: '#050507',
    href: 'https://letsvoley.com',
    cta: 'letsvoley.com',
  },
  {
    title: 'Index CRM',
    role: 'Founder & builder',
    description:
      'A cold-calling CRM with full pipeline management, streamlined workflows, and intermission games to keep reps sharp.',
    tags: ['React', 'TypeScript', 'Node.js'],
    flood: '#7c5cff',
    ink: '#f5f3ee',
    href: 'https://empathetic-quietude-production.up.railway.app/login',
    cta: 'Try it',
  },
  {
    title: 'Junzi',
    role: 'Founder & builder',
    description:
      'Social media for long-format opinion sharing. A space where thinking well matters more than thinking fast.',
    tags: ['Social'],
    flood: '#f5f3ee',
    ink: '#050507',
    href: 'https://www.bejunzi.com',
    cta: 'bejunzi.com',
  },
  {
    title: 'The Forge Dev',
    role: 'Founder & builder',
    description:
      'A web design and management agency that rebuilds outdated websites for professional service businesses at no upfront cost. Design, SEO, hosting, and ongoing updates handled end to end.',
    tags: ['Agency', 'Web'],
    flood: '#ff6b6b',
    ink: '#050507',
    href: 'https://theforgedev.com/',
    cta: 'theforgedev.com',
  },
  {
    title: '4 Tomorrow',
    role: 'Builder, nonprofit',
    description:
      'An AI-powered supplemental learning tool for underserved communities. Deploys on existing computers and teaches reading, writing, English, and entrepreneurship, adapting to each child in real time.',
    tags: ['Nonprofit', 'AI'],
    flood: '#22d3ee',
    ink: '#050507',
    href: 'https://www.4tommorrow.org/',
    cta: '4tommorrow.org',
  },
  {
    title: 'Analytics Pipeline',
    role: 'Engineering + revenue',
    description:
      'Stream processing handling 500K events/sec with exactly-once semantics. Owned it from product spec to signed contract.',
    tags: ['Flink', 'Kafka', 'ClickHouse'],
    flood: '#1d1b26',
    ink: '#f5f3ee',
  },
];

export type SideProject = {
  title: string;
  /** Keep the title's own capitalisation instead of the usual all-caps (e.g. iTV). */
  keepCase?: boolean;
  kind: string;
  status?: string;
  description: string;
  /** Big figures shown under the title, e.g. lines of code. */
  stats?: { value: string; label: string }[];
  highlights?: { name: string; text: string }[];
  /** Short labelled paragraphs after the highlights, e.g. "What I learned". */
  notes?: { label: string; text: string }[];
  stack: string[];
  /** Path under /public, e.g. '/videos/the-red.mp4'. A project only shows on the site once it has one. */
  video?: string;
  poster?: string;
  /** 'wide' for game and desktop captures, 'tv' for 16:9 demos, 'phone' for iPhone screen recordings. */
  frame: 'wide' | 'tv' | 'phone';
  /** Exact aspect ratio of the recording when it differs from the frame's default, e.g. '1600 / 1046'. */
  aspect?: string;
  /** A scrolling strip of stills shown under the project. */
  gallery?: { images: string[]; caption: string };
  /** Link to the live project. */
  link?: { href: string; label: string };
};

export const sideProjects: SideProject[] = [
  {
    title: 'iTV',
    keepCase: true,
    kind: 'TV interface + iPhone app',
    description:
      'A calm, voice-driven home screen for the living room, controlled from your phone. Streaming TVs bury what you want under ads and menus, so I turned an old HP Chromebox into a dedicated TV computer and built my own interface for it. It runs fully on the box, with no cloud dependency.',
    highlights: [
      {
        name: 'Phone as the remote',
        text: 'A native SwiftUI iPhone app and a web remote with a touchpad, Play/Pause, and Quick Adds for pinning any site as an app.',
      },
      {
        name: 'Voice and AI search',
        text: 'Say "play the new episode of…" and an AI agent finds it and drives the TV, showing each step on screen as it works.',
      },
      {
        name: 'Living themes',
        text: 'Animated Rain, Snow, Beach and Aurora backgrounds, each with its own ambient sound.',
      },
      {
        name: 'Games',
        text: 'Nintendo DS games split across the screens: the top screen on the TV, the touch screen on the phone.',
      },
    ],
    notes: [
      {
        label: 'What I learned',
        text: 'Designing for ten feet away, making two devices feel like one product in real time, and pointing AI agents at real hardware in a way that stays safe and visible to the user.',
      },
    ],
    stack: ['Node.js', 'WebSockets', 'SwiftUI', 'AI agents', 'Kiosk UI'],
    video: '/videos/itv.mp4',
    poster: '/videos/itv-poster.jpg',
    frame: 'tv',
  },
  {
    title: 'The Red',
    kind: 'Horror game',
    stats: [
      { value: '30K', label: 'Lines of code' },
      { value: '10 hrs', label: 'Of gameplay' },
      { value: '40+', label: 'Creatures' },
    ],
    description:
      "A horror game about being lost in the dark with only a small, failing light. You play Red, a girl in a red hood who wakes in a labyrinth with a dying lantern and a flame spirit called Lume. Your light is your life, and in the dark something is hunting you. Find the purple key, open the gate at the labyrinth's heart, and discover what lies beyond.",
    highlights: [
      {
        name: 'A new labyrinth every run',
        text: 'Generated from a seed across six lands (crypts, forest, mire, mountains, river, sunken court), plus rare lands like volcanic lava rivers, snowfields and a gold vault found in about 1 in 25 runs.',
      },
      {
        name: 'Light as the core mechanic',
        text: 'The lantern burns down and wind threatens it, while matches, flares and glowing mushrooms push back the dark.',
      },
      {
        name: 'The Wolf Man',
        text: 'A stalker that speeds up the longer you stay unlit, until it outruns your sprint. Light drives it back, and escape is tuned to feel possible but never certain.',
      },
      {
        name: 'Turn-based battles',
        text: 'Secret, simultaneous choices of attack, defend or dodge against 40+ creatures, each with its own behaviour.',
      },
      {
        name: 'A full world',
        text: 'Doors and keys, chests, timed riddles, villages you can walk into, gear, a discovery journal and an outfit market.',
      },
      {
        name: 'Two-player co-op',
        text: "A fallen player's spirit lingers until their partner revives them.",
      },
      {
        name: 'An endgame',
        text: 'A portal beyond the purple gate opens onto a sunlit alpine meadow where the Demon King waits.',
      },
    ],
    notes: [
      {
        label: 'Art and tech',
        text: 'All the art is generated with custom Python scripts that render pixel art from lit 3D shapes. The labyrinth is rebuilt as a 3D scene with custom shaders for banded lantern light, ink outlines, swaying grass and visible wind, while keeping sprites pixel-perfect. I profiled and optimized performance on real hardware, and prototyped a cel-shaded toon 3D art direction for the next phase.',
      },
    ],
    stack: ['Godot 4', 'GDScript', 'Python art pipeline', 'Custom shaders'],
    video: '/videos/the-red.mp4',
    poster: '/videos/the-red-poster.jpg',
    frame: 'wide',
    aspect: '1600 / 1042',
    gallery: {
      images: Array.from({ length: 28 }, (_, i) => `/the-red/land-${String(i + 1).padStart(2, '0')}.jpg`),
      caption: 'Every land in The Red, each shown in full light and then by lantern light.',
    },
  },
  {
    title: 'Metaphysical Field Survey',
    kind: 'Interactive research site',
    description:
      'What you believe about reality shapes how you live. This project maps that connection. An interactive map places more than 60 philosophers and religions, from Plato and the Buddha to Nietzsche and the Latter-day Saints, by what they believe about mind, the universe and truth. Each is colored by its "highest good." A 22-question test then shows visitors where their own beliefs, and their actual decision-making, land among them.',
    highlights: [
      {
        name: 'A 3D map',
        text: '60+ thinkers, filterable by era and tradition.',
      },
      {
        name: 'A validated test',
        text: 'Answered as each thinker would, it places 50 of 61 in their correct region and recovers the right highest good for all 56 that name one.',
      },
      {
        name: 'A live research backend',
        text: 'Node.js and PostgreSQL on Railway, with a public map of all responses. Privacy is built in: no IP addresses stored, and groups under 5 people are hidden.',
      },
      {
        name: 'Shareable results',
        text: 'Custom link previews, like "Jared is an Eternal-Law Materialist."',
      },
      {
        name: 'Summum Bonum',
        text: 'A 2,500-year timeline of how humanity\'s answer to "what is the highest good?" has shifted.',
      },
    ],
    notes: [
      {
        label: 'Where it led',
        text: 'An academic study with a BYU professor on whether modern culture weakens our judgment of what is good. I designed and built its mobile survey, with randomized question order to measure priming and a private results dashboard.',
      },
    ],
    stack: ['Node.js', 'PostgreSQL', 'Railway', '3D'],
    video: '/videos/metaphysical-field-survey.mp4',
    poster: '/videos/metaphysical-field-survey-poster.jpg',
    frame: 'wide',
    aspect: '1600 / 938',
    link: { href: 'https://metaphysics-map-production.up.railway.app/', label: 'Explore the map' },
  },
  {
    title: 'Jacob',
    kind: 'AI agent',
    status: 'Personal tool',
    description:
      'My personal AI agent: a Mac app with an iMessage-style chat that can also operate my computer and browser for me. It runs an open-source model locally through Ollama, so nothing leaves my machine.',
    stack: ['Ollama', 'Local LLM', 'macOS', 'Automation'],
    frame: 'wide',
  },
  {
    title: 'Focus',
    kind: 'iPhone + Mac app',
    status: 'In development',
    description:
      'The goal tracker I use every day, on iPhone and Mac with iCloud sync. It tracks count goals and timed focus sessions, plus tasks with checkable subtasks and a calendar. Days run from wake-up to wake-up instead of midnight.',
    stack: ['iOS', 'macOS', 'iCloud sync'],
    frame: 'phone',
  },
];

export const metrics = [
  { value: 6, prefix: '', suffix: '+', text: 'years carrying a quota.' },
  { value: 40, prefix: '$', suffix: 'M', text: 'in revenue influenced.' },
  { value: 300, prefix: '', suffix: '%', text: 'pipeline growth.' },
  { value: 3, prefix: '', suffix: '', text: 'products taken to market.' },
];

export const salesJobs = [
  {
    title: 'Sunrun',
    role: 'Top sales rep, then sales manager',
    when: '2023',
    where: 'Honolulu, HI',
    description:
      'Number one sales rep company-wide in 2023, then promoted to sales manager. Led multi-state teams of 18–30 year olds: built trainings, set goals, organized housing, travel, and food, analyzed territory data for market trends, and negotiated win-win customer contracts.',
    stat: '#1',
    statLabel: 'rep company-wide',
  },
  {
    title: 'Estella Rose',
    role: 'Luxury jewelry, phone sales',
    when: 'High-ticket',
    where: 'By phone',
    description:
      'Closed $10K–$25K luxury jewelry pieces entirely over the phone. No product in hand. Every deal built on voice, trust, and timing.',
    stat: '$25K',
    statLabel: 'top-end pieces, closed by phone',
  },
];

export const otherWork = [
  {
    title: 'Ollin Ventures',
    role: 'Private equity analyst',
    when: 'Private equity',
    where: 'AI startups',
    description: 'Analyst at a private equity firm that invests in AI startups.',
  },
  {
    title: 'Active Event Technology',
    role: 'Technical support',
    when: 'Nov 2022 – Dec 2023',
    where: 'San Francisco, CA',
    description: 'Installed and networked devices and security software for large-scale concerts at the AT&T Center.',
  },
  {
    title: 'BYU',
    role: 'Secretary',
    when: 'Oct 2022 – Apr 2023',
    where: 'Provo, UT',
    description:
      'Coordinated meetings, faculty travel, and student inquiries across departments. The operations layer behind the academic day.',
  },
  {
    title: 'Men of Culture',
    role: 'President',
    when: 'Jan 2023 – present',
    where: 'Salt Lake City, UT',
    description:
      "Lead a men's club focused on personal growth and intellectual development. Organize events and speak on health and wellness.",
  },
  {
    title: 'The Church of Jesus Christ of Latter-day Saints',
    role: 'Volunteer representative',
    when: 'Two years',
    where: 'Belém, Brazil',
    description:
      'Full-time volunteer service in northern Brazil, where I picked up Portuguese and learned that trust is built in patience.',
  },
];

export const principles = [
  'Architect the system, then sell the vision to the customer.',
  'Ship fast, demo early, iterate on real feedback.',
  'Own the full loop, from technical decisions to closed deals.',
  'Delegate execution, never judgment or strategy.',
  'Build where stakes are high and shortcuts cost trust.',
];

export const books = [
  { author: 'Plato', work: 'The Republic' },
  { author: 'Plato', work: 'Symposium' },
  { author: 'Confucius', work: 'The Analects' },
  { author: 'Epictetus', work: 'The Discourses' },
  { author: 'Furr & Ahlstrom', work: 'Nail It Then Scale It' },
  { author: 'Og Mandino', work: 'The Greatest Salesman in the World' },
  { author: 'James Allen', work: 'As a Man Thinketh' },
  { author: 'Martin Fowler', work: 'Patterns of Enterprise Application Architecture' },
  { author: 'Various', work: 'Software as a Science' },
];

export const facts = [
  { label: 'Based in', value: 'Salt Lake City' },
  { label: 'From', value: 'Paradise, California' },
  { label: 'Languages', value: 'English, Portuguese' },
  { label: 'Focus', value: 'Build + sell' },
];

export const engineeringSkills = ['TypeScript', 'React', 'Node.js', 'Python', 'PostgreSQL', 'AWS'];
export const sellingSkills = [
  'Technical sales',
  'Solution engineering',
  'Go-to-market',
  'Pipeline management',
  'Enterprise demos',
  'Negotiation',
];

export const quote =
  "The engineer who can sell doesn't just build features. They build revenue. The salesperson who can build doesn't just close deals. They close the right ones.";
