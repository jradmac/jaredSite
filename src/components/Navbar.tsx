import { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronDown, Send, Cpu } from 'lucide-react';

interface NavbarProps {
  onNavigate?: (id: string) => void;
}

const links = [
  { id: 'work', label: 'Work', show: '' },
  { id: 'experience', label: 'Experience', show: 'hidden sm:block' },
  { id: 'ai', label: 'AI', show: 'hidden sm:block' },
  { id: 'toolkit', label: 'Toolkit', show: 'hidden sm:block' },
  { id: 'about', label: 'About', show: '' },
  { id: 'contact', label: 'Contact', show: '' },
];

const products = [
  {
    name: 'Outpilot',
    tagline: 'AI-powered outbound sales automation',
    href: '/products/outpilot',
    icon: Send,
  },
  {
    name: 'Custom AI Solutions',
    tagline: 'Custom AI builds & automation for business',
    href: '/products/custom-ai',
    icon: Cpu,
  },
];

export default function Navbar({ onNavigate }: NavbarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const go = (id: string) => {
    if (onNavigate) return onNavigate(id);
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: id } });
      return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const goHome = () => {
    if (location.pathname !== '/') {
      navigate('/');
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-ink/60 border-b border-white/10">
      <nav className="max-w-6xl mx-auto flex items-center justify-between gap-2 px-4 sm:px-6 py-3 sm:py-4">
        <button
          onClick={goHome}
          className="font-display text-base sm:text-lg font-semibold tracking-tight shrink-0"
        >
          <span className="gradient-text">Jared</span>
          <span className="gradient-text hidden sm:inline"> Mackay</span>
        </button>
        <ul className="flex items-center gap-0.5 sm:gap-2 text-xs sm:text-sm">
          {links.map((l) => (
            <li key={l.id} className={l.show}>
              <button
                onClick={() => go(l.id)}
                className="px-2 sm:px-3 py-1.5 sm:py-2 rounded-full transition-colors text-white/70 hover:text-paper hover:bg-white/5"
              >
                {l.label}
              </button>
            </li>
          ))}

          {/* Products dropdown */}
          <li className="relative" ref={dropdownRef}>
            <button
              onClick={() => setOpen((o) => !o)}
              className="flex items-center gap-1 px-2 sm:px-3 py-1.5 sm:py-2 rounded-full transition-colors text-white/70 hover:text-paper hover:bg-white/5"
              aria-expanded={open}
              aria-haspopup="true"
            >
              Products
              <ChevronDown
                size={14}
                strokeWidth={2}
                className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
              />
            </button>

            {open && (
              <div className="absolute right-0 mt-2 w-[18rem] rounded-2xl border border-white/10 bg-ink/95 backdrop-blur-xl p-2 shadow-2xl shadow-black/50">
                {products.map((p) => {
                  const Icon = p.icon;
                  return (
                    <button
                      key={p.name}
                      onClick={() => {
                        setOpen(false);
                        navigate(p.href);
                      }}
                      className="group w-full flex items-start gap-3 rounded-xl p-3 text-left transition-colors hover:bg-white/5"
                    >
                      <span className="shrink-0 mt-0.5 flex h-9 w-9 items-center justify-center rounded-lg bg-accent/15 text-accent">
                        <Icon size={18} strokeWidth={1.75} />
                      </span>
                      <span className="min-w-0">
                        <span className="block font-display text-sm font-semibold text-paper">
                          {p.name}
                        </span>
                        <span className="block text-xs text-white/55 leading-snug mt-0.5">
                          {p.tagline}
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
}
