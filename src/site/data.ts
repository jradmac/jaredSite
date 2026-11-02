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
    title: 'Metaphysical Field Survey',
    role: 'Author & builder',
    description:
      'An interactive 3D map of 63 philosophers, schools, and religions, plotted by whether mind or matter is fundamental, where the ultimate lies, and whether truth is found or made. A 22-question test places your own beliefs on the same map.',
    tags: ['Philosophy', '3D', 'Interactive'],
    flood: '#b9a7ff',
    ink: '#050507',
    href: 'https://metaphysics-map-production.up.railway.app/',
    cta: 'Explore the map',
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
