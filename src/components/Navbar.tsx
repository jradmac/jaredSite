import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../site/site.css';

interface NavbarProps {
  onNavigate?: (id: string) => void;
}

const links = [
  { id: 'work', label: 'Work' },
  { id: 'experience', label: 'Experience' },
  { id: 'ai', label: 'Thinking' },
  { id: 'toolkit', label: 'Library' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
];

const products = [
  { name: 'Outpilot', tagline: 'AI-powered outbound sales automation', href: '/products/outpilot' },
  { name: 'Custom AI Solutions', tagline: 'Custom AI builds and automation for business', href: '/products/custom-ai' },
];

/** Text that rolls up to a second copy of itself on hover. */
function Roll({ children }: { children: string }) {
  return (
    <span className="roll" aria-hidden="true">
      <span className="roll-inner">
        <span>{children}</span>
        <span>{children}</span>
      </span>
    </span>
  );
}

export default function Navbar({ onNavigate }: NavbarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [productsOpen, setProductsOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const productsRef = useRef<HTMLLIElement>(null);

  // Hide on scroll down, reveal on scroll up.
  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      if (Math.abs(y - lastY) < 6) return;
      setHidden(y > lastY && y > 200);
      lastY = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (productsRef.current && !productsRef.current.contains(e.target as Node)) setProductsOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setProductsOpen(false);
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('menu-open', menuOpen);
  }, [menuOpen]);

  const go = (id: string) => {
    setMenuOpen(false);
    if (onNavigate) return onNavigate(id);
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: id } });
      return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const goHome = () => {
    setMenuOpen(false);
    if (location.pathname !== '/') navigate('/');
    else window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openProduct = (href: string) => {
    setProductsOpen(false);
    setMenuOpen(false);
    navigate(href);
  };

  return (
    <>
      <header
        className={`nav ${hidden && !menuOpen && !productsOpen ? 'nav-hidden' : ''} ${scrolled ? 'nav-scrolled' : ''}`}
      >
        <nav className="nav-inner" aria-label="Main">
          <button onClick={goHome} className="nav-mark" aria-label="Jared Mackay, back to top">
            <span className="nav-mark-full">Jared Mackay</span>
            <span className="nav-mark-short">JM</span>
          </button>

          <ul className="nav-links">
            {links.map((l) => (
              <li key={l.id}>
                <button onClick={() => go(l.id)} className="nav-link" aria-label={l.label}>
                  <Roll>{l.label}</Roll>
                </button>
              </li>
            ))}
            <li className="nav-products" ref={productsRef}>
              <button
                onClick={() => setProductsOpen((o) => !o)}
                className="nav-link"
                aria-expanded={productsOpen}
                aria-haspopup="true"
                aria-label="Products"
              >
                <Roll>Products</Roll>
                <span className={`nav-plus ${productsOpen ? 'is-open' : ''}`} aria-hidden="true" />
              </button>
              <div className={`nav-drop ${productsOpen ? 'is-open' : ''}`}>
                {products.map((p) => (
                  <button
                    key={p.name}
                    className="nav-drop-item"
                    onClick={() => openProduct(p.href)}
                    tabIndex={productsOpen ? 0 : -1}
                  >
                    <span className="nav-drop-name">{p.name}</span>
                    <span className="nav-drop-tag">{p.tagline}</span>
                  </button>
                ))}
              </div>
            </li>
          </ul>

          <button
            className="nav-menu-btn"
            onClick={() => setMenuOpen((o) => !o)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            {menuOpen ? 'Close' : 'Menu'}
          </button>
        </nav>
      </header>

      <div id="mobile-menu" className={`menu ${menuOpen ? 'is-open' : ''}`} aria-hidden={!menuOpen}>
        <ul className="menu-list">
          {links.map((l, i) => (
            <li key={l.id} style={{ transitionDelay: menuOpen ? `${0.08 + i * 0.05}s` : '0s' }}>
              <button onClick={() => go(l.id)} tabIndex={menuOpen ? 0 : -1}>
                {l.label}
              </button>
            </li>
          ))}
        </ul>
        <div className="menu-products">
          {products.map((p) => (
            <button key={p.name} onClick={() => openProduct(p.href)} tabIndex={menuOpen ? 0 : -1}>
              <span>{p.name}</span>
              <span className="menu-products-tag">{p.tagline}</span>
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
