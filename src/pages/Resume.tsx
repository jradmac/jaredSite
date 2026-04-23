import { useRef, useState } from 'react';
import { ArrowLeft, Download, Mail, Globe, Linkedin, MapPin, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import html2canvas from 'html2canvas-pro';
import jsPDF from 'jspdf';

export default function Resume() {
  const sheetRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);
  const [pdfMode, setPdfMode] = useState(false);

  const handleDownload = async () => {
    if (!sheetRef.current || downloading) return;
    setDownloading(true);
    setPdfMode(true);
    await new Promise<void>((r) =>
      requestAnimationFrame(() => requestAnimationFrame(() => r())),
    );
    try {
      if (document.fonts?.ready) await document.fonts.ready;

      const canvas = await html2canvas(sheetRef.current, {
        scale: 2.5,
        backgroundColor: '#faf8f2',
        useCORS: true,
        logging: false,
        windowWidth: sheetRef.current.scrollWidth,
        windowHeight: sheetRef.current.scrollHeight,
      });

      const pdf = new jsPDF({ unit: 'in', format: 'letter', orientation: 'portrait' });
      const pageW = pdf.internal.pageSize.getWidth();
      const pageH = pdf.internal.pageSize.getHeight();

      const imgW = pageW;
      const imgH = imgW * (canvas.height / canvas.width);

      const imgData = canvas.toDataURL('image/jpeg', 0.95);

      if (imgH <= pageH) {
        pdf.addImage(imgData, 'JPEG', 0, 0, imgW, imgH);
      } else {
        let remaining = imgH;
        let offsetY = 0;
        while (remaining > 0) {
          pdf.addImage(imgData, 'JPEG', 0, offsetY, imgW, imgH);
          remaining -= pageH;
          offsetY -= pageH;
          if (remaining > 0) pdf.addPage();
        }
      }
      pdf.save('Jared_Mackay_Resume.pdf');
    } finally {
      setPdfMode(false);
      setDownloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-ink text-paper">
      {/* Top action bar */}
      <div className="sticky top-0 z-50 backdrop-blur-md bg-ink/70 border-b border-white/10">
        <div className="max-w-4xl mx-auto flex items-center justify-between px-5 py-3 sm:py-4">
          <Link
            to="/"
            className="flex items-center gap-2 text-xs sm:text-sm text-white/70 hover:text-paper transition-colors"
          >
            <ArrowLeft size={16} strokeWidth={1.5} />
            Back to site
          </Link>
          <button
            onClick={handleDownload}
            disabled={downloading}
            className="flex items-center gap-2 rounded-full bg-accent text-ink font-medium px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm hover:scale-105 transition-transform disabled:opacity-70 disabled:hover:scale-100"
          >
            {downloading ? (
              <>
                <Loader2 size={15} strokeWidth={2} className="animate-spin" />
                Generating…
              </>
            ) : (
              <>
                <Download size={15} strokeWidth={2} />
                Download PDF
              </>
            )}
          </button>
        </div>
      </div>

      {/* Resume sheet wrapper */}
      <div className="py-8 sm:py-12 px-4 sm:px-6 overflow-x-auto">
        <div className="mx-auto" style={{ width: '816px' }}>
          <div
            ref={sheetRef}
            className="bg-[#faf8f2] text-[#111111] shadow-2xl"
            style={{
              width: '816px',
              minHeight: '1056px',
              padding: '40px 56px',
              fontFamily: "'Inter', system-ui, sans-serif",
            }}
          >
            {/* Header */}
            <header className="pb-3 border-b-2" style={{ borderColor: '#111111' }}>
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
                <div>
                  <h1
                    className="text-[38px] sm:text-[44px] font-semibold tracking-tight leading-none text-[#111]"
                    style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif" }}
                  >
                    Jared Mackay
                  </h1>
                  <p className="mt-1.5 text-[13px] sm:text-sm" style={{ color: '#3a3a3a' }}>
                    Engineer · Operator · Sales — builds, ships, and sells end-to-end.
                  </p>
                </div>
                <div className="text-[10.5px] sm:text-[11px] space-y-0.5 sm:text-right" style={{ color: '#3a3a3a' }}>
                  <p className="flex items-center gap-1.5 sm:justify-end">
                    <MapPin size={11} strokeWidth={1.8} /> Salt Lake City, UT
                  </p>
                  <p className="flex items-center gap-1.5 sm:justify-end">
                    <Mail size={11} strokeWidth={1.8} /> jaredhmackay@gmail.com
                  </p>
                  <p className="flex items-center gap-1.5 sm:justify-end">
                    <Globe size={11} strokeWidth={1.8} /> jaredmackay.com
                  </p>
                  <p className="flex items-center gap-1.5 sm:justify-end">
                    <Linkedin size={11} strokeWidth={1.8} /> linkedin.com/in/jaredmackay
                  </p>
                </div>
              </div>
            </header>

            {/* Summary */}
            <section className="mt-2.5">
              <p className="text-[12px] leading-snug" style={{ color: '#2a2a2a' }}>
                Technical founder and top-performing sales operator living at the intersection of building
                and selling. I write the code, architect the demo, run the technical sale, and onboard
                the customer — end to end, no translation layer.
              </p>
            </section>

            {/* Highlights strip */}
            <section className="mt-3">
              <div className="grid grid-cols-4 gap-2">
                {[
                  { v: '6+', l: 'Years in Sales' },
                  { v: '$40M', l: 'Revenue Influenced' },
                  { v: '300%', l: 'Pipeline Growth' },
                  { v: '#1', l: 'Rep · Sunrun 2023' },
                ].map((s) => (
                  <div
                    key={s.l}
                    className="rounded-md px-2 py-1.5 text-center"
                    style={{ border: '1px solid #d8d2c4', background: '#f2ede0' }}
                  >
                    <p
                      className="text-[15px] font-semibold leading-none tracking-tight"
                      style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", color: '#ff6a3d' }}
                    >
                      {s.v}
                    </p>
                    <p className="mt-1 text-[7.5px] uppercase tracking-widest" style={{ color: '#555' }}>
                      {s.l}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Products & Ventures */}
            <Section title="Products & Ventures">
              <Role
                title="Voley"
                role="Founder & Builder"
                meta="Active · letsvoley.com"
                bullets={[
                  'Built and launched a communication platform for insurance agencies with deep AMS integration and agency-wide collaboration.',
                  'Own architecture, UX, pricing, and sell directly into agency owners — running the technical demo and closing the deal.',
                ]}
              />
              <Role
                title="Index CRM"
                role="Founder & Builder"
                meta="React · TypeScript · Node.js"
                bullets={[
                  'Cold-calling CRM with full pipeline management, streamlined workflows, and intermission games to keep reps sharp — built from the perspective of someone who has actually dialed for a living.',
                ]}
              />
              <Role
                title="Junzi"
                role="Founder & Builder"
                meta="bejunzi.com"
                bullets={[
                  'Social platform for long-form opinion sharing — designed to reward thinking well over thinking fast.',
                ]}
              />
              <Role
                title="4 Tomorrow"
                role="Founder · Nonprofit"
                meta="4tommorrow.org"
                bullets={[
                  'Built an AI-powered supplemental learning tool that deploys on existing community computers — no new infrastructure required.',
                  'Children attend 30-minute adaptive sessions covering reading, writing, English, and entrepreneurship; the system adjusts to each learner in real time.',
                  'Equipping underserved kids with literacy, language, and business thinking — the tools to build a different future.',
                ]}
              />
              <Role
                title="The Forge Dev"
                role="Founder & Builder"
                meta="theforgedev.com"
                bullets={[
                  'Web design and management agency rebuilding outdated sites for professional service businesses at no upfront cost — design, SEO, hosting, and ongoing updates handled end-to-end.',
                ]}
              />
            </Section>

            {/* Sales Experience */}
            <Section title="Sales Experience">
              <Role
                title="Sunrun"
                role="Top Sales Rep → Sales Manager"
                meta="2023 · Honolulu, HI"
                bullets={[
                  'Ranked #1 sales rep company-wide in 2023; promoted to Sales Manager.',
                  'Led multi-state teams of 18–30 year olds — built trainings, set goals, and ran housing, travel, and food logistics.',
                  'Analyzed territory data for market trends and expansion opportunities; negotiated win-win customer contracts.',
                ]}
              />
              <Role
                title="Estella Rose"
                role="Luxury Jewelry · Phone Sales"
                meta="High-Ticket Remote Sales"
                bullets={[
                  'Closed $10K–$25K luxury jewelry pieces entirely over the phone — high-ticket sales built on voice, trust, and timing.',
                ]}
              />
            </Section>

            {/* Other Experience & Service */}
            <Section title="Other Experience & Service">
              <div
                className={
                  pdfMode
                    ? 'grid grid-cols-2 gap-x-5 gap-y-0.5'
                    : 'grid grid-cols-2 gap-x-6 gap-y-2'
                }
              >
                <CompactRole
                  title="Active Event Technology"
                  role="Technical Support"
                  meta="Nov 2022 – Dec 2023 · San Francisco, CA"
                  description="Installed and networked devices and security software for large-scale concerts at the AT&T Center."
                  compact={pdfMode}
                />
                <CompactRole
                  title="Brigham Young University"
                  role="Secretary"
                  meta="Oct 2022 – Apr 2023 · Provo, UT"
                  description="Coordinated meetings, faculty travel, and student inquiries across departments."
                  compact={pdfMode}
                />
                <CompactRole
                  title="Men of Culture"
                  role="President"
                  meta="Jan 2023 – Present · Salt Lake City, UT"
                  description="Lead a men's club focused on personal growth, health, and intellectual development."
                  compact={pdfMode}
                />
                <CompactRole
                  title="Church of Jesus Christ of Latter-Day Saints"
                  role="Volunteer Representative"
                  meta="Belém, Brazil"
                  description="Two years of full-time volunteer service in northern Brazil — became fluent in Portuguese."
                  compact={pdfMode}
                />
              </div>
            </Section>

            {/* Education */}
            <section className="mt-3">
              <SectionTitle>Education</SectionTitle>
              {pdfMode ? (
                <p className="mt-1 text-[11.5px] leading-snug" style={{ color: '#2a2a2a' }}>
                  <span className="font-semibold" style={{ color: '#111' }}>
                    Brigham Young University — Marriott School of Business
                  </span>
                  <span style={{ color: '#444' }}> · B.S. Information Systems · Minor in Communications</span>
                  <span> — GPA 3.75 / 4.00 · Member, Association for Information Systems.</span>
                </p>
              ) : (
                <div className="mt-1.5 space-y-2">
                  <Role
                    title="Brigham Young University — Marriott School of Business"
                    role="B.S. Information Systems · Minor in Communications"
                    meta="Apr 2026 · Provo, UT"
                    bullets={[
                      'GPA 3.75 / 4.00 · Member, Association for Information Systems.',
                    ]}
                  />
                </div>
              )}
            </section>

            {/* Skills */}
            <section className="mt-3">
              <SectionTitle>Skills & Toolkit</SectionTitle>
              <div
                className={
                  pdfMode
                    ? 'mt-1 text-[10.5px] leading-snug space-y-0'
                    : 'mt-1.5 text-[11.5px] space-y-0.5'
                }
                style={{ color: '#2a2a2a' }}
              >
                <p>
                  <span className="font-semibold" style={{ color: '#111' }}>Technical:</span>{' '}
                  TypeScript · React · Node.js · Python · PostgreSQL · AWS
                </p>
                <p>
                  <span className="font-semibold" style={{ color: '#111' }}>Sales & GTM:</span>{' '}
                  Technical Sales · Solution Engineering · Go-to-Market · Pipeline Management · Enterprise Demos · Negotiation
                </p>
                <p>
                  <span className="font-semibold" style={{ color: '#111' }}>Languages:</span>{' '}
                  English (native) · Portuguese (fluent)
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="text-[10px] uppercase font-semibold pb-1"
      style={{
        fontFamily: "'Space Grotesk', system-ui, sans-serif",
        letterSpacing: '0.22em',
        color: '#111',
        borderBottom: '1px solid #444',
      }}
    >
      {children}
    </h2>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-3">
      <SectionTitle>{title}</SectionTitle>
      <div className="mt-1.5 space-y-2">{children}</div>
    </section>
  );
}

function Role({
  title,
  role,
  meta,
  bullets,
}: {
  title: string;
  role: string;
  meta: string;
  bullets: string[];
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-3">
        <div>
          <h3
            className="text-[13.5px] font-semibold leading-tight"
            style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", color: '#111' }}
          >
            {title}
          </h3>
          <p className="text-[11.5px] italic leading-tight mt-0.5" style={{ color: '#444' }}>
            {role}
          </p>
        </div>
        <p
          className="text-[9.5px] uppercase tracking-widest shrink-0"
          style={{ color: '#555' }}
        >
          {meta}
        </p>
      </div>
      <ul className="mt-1 space-y-0.5">
        {bullets.map((b, i) => (
          <li key={i} className="flex gap-2 text-[11.5px] leading-snug" style={{ color: '#2a2a2a' }}>
            <span className="mt-0.5" style={{ color: '#ff6a3d' }}>▸</span>
            <span>{b}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function CompactRole({
  title,
  role,
  meta,
  description,
  compact = false,
}: {
  title: string;
  role: string;
  meta: string;
  description: string;
  compact?: boolean;
}) {
  if (compact) {
    return (
      <p className="text-[10.5px] leading-snug" style={{ color: '#2a2a2a' }}>
        <span className="font-semibold" style={{ color: '#111' }}>{title}</span>
        <span style={{ color: '#444' }}> · {role}</span>
        <span> — {description}</span>
      </p>
    );
  }
  return (
    <div>
      <div className="flex items-baseline justify-between gap-2">
        <h4
          className="text-[12px] font-semibold leading-tight"
          style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", color: '#111' }}
        >
          {title}
        </h4>
        <p className="text-[9px] uppercase tracking-widest shrink-0" style={{ color: '#555' }}>
          {meta}
        </p>
      </div>
      <p className="text-[11px] italic leading-tight" style={{ color: '#444' }}>
        {role}
      </p>
      <p className="mt-0.5 text-[11px] leading-snug" style={{ color: '#2a2a2a' }}>
        {description}
      </p>
    </div>
  );
}
