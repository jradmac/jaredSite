interface NavbarProps {
  onNavigate?: (id: string) => void;
}

const links = [
  { id: 'work', label: 'Work' },
  { id: 'ai', label: 'AI' },
  { id: 'toolkit', label: 'Toolkit' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
];

export default function Navbar({ onNavigate }: NavbarProps) {
  const go = (id: string) => {
    if (onNavigate) return onNavigate(id);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-ink/60 border-b border-white/10">
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="font-display text-lg font-semibold tracking-tight"
        >
          <span className="gradient-text">Jared Mackay</span>
        </button>
        <ul className="flex gap-1 sm:gap-2 text-sm">
          {links.map((l) => (
            <li key={l.id}>
              <button
                onClick={() => go(l.id)}
                className="px-3 py-2 rounded-full transition-colors text-white/70 hover:text-paper hover:bg-white/5"
              >
                {l.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
