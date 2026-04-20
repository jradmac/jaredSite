import { ArrowLeft, Download, Mail, Globe, Linkedin, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Resume() {
  const handleDownload = () => {
    window.print();
  };

  return (
    <>
      <style>{`
        @media print {
          @page { size: letter; margin: 0.3in 0.45in; }
          html, body { background: #ffffff !important; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .no-print { display: none !important; }
          .print-page {
            background: #ffffff !important;
            color: #111111 !important;
            box-shadow: none !important;
            padding: 0 !important;
            max-width: 100% !important;
            border-radius: 0 !important;
          }
          .print-page h1, .print-page h2, .print-page h3, .print-page h4, .print-page p, .print-page li, .print-page span, .print-page a {
            color: #111111 !important;
          }
          .print-page .accent-text { color: #ff6a3d !important; }
          .print-page .muted-text { color: #333333 !important; }
          .print-page .rule { border-color: #111111 !important; }
          .print-page .chip {
            background: #ffffff !important;
            border-color: #222222 !important;
            color: #111111 !important;
            padding: 4pt 6pt !important;
          }
          .avoid-break { break-inside: avoid; page-break-inside: avoid; }

          /* Tighten typography */
          .print-page h1 { font-size: 22pt !important; line-height: 1 !important; }
          .print-page h2 { font-size: 9pt !important; letter-spacing: 0.18em !important; padding-bottom: 2pt !important; }
          .print-page h3 { font-size: 10.5pt !important; line-height: 1.15 !important; }
          .print-page h4 { font-size: 10pt !important; }
          .print-page p, .print-page li, .print-page span { font-size: 9pt !important; line-height: 1.3 !important; }
          .print-page .meta-line { font-size: 8pt !important; }
          .print-page .stat-value { font-size: 13pt !important; line-height: 1 !important; }
          .print-page .stat-label { font-size: 7pt !important; }

          /* Tighten spacing */
          .print-page header { padding-bottom: 6pt !important; }
          .print-page .summary { margin-top: 6pt !important; }
          .print-page .summary p { font-size: 9pt !important; }
          .print-page section { margin-top: 8pt !important; }
          .print-page .role { margin-top: 4pt !important; }
          .print-page .role:first-child { margin-top: 0 !important; }
          .print-page ul { margin-top: 2pt !important; }
          .print-page li { margin-top: 0 !important; }
          .print-page .section-body { margin-top: 4pt !important; }
        }
      `}</style>

      <div className="min-h-screen bg-ink text-paper">
        {/* Top action bar — hidden in print */}
        <div className="no-print sticky top-0 z-50 backdrop-blur-md bg-ink/70 border-b border-white/10">
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
              className="flex items-center gap-2 rounded-full bg-accent text-ink font-medium px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm hover:scale-105 transition-transform"
            >
              <Download size={15} strokeWidth={2} />
              Download PDF
            </button>
          </div>
        </div>

        {/* Resume sheet */}
        <div className="py-6 sm:py-10 px-4 sm:px-6">
          <div
            className="print-page max-w-4xl mx-auto bg-paper text-ink rounded-xl sm:rounded-2xl shadow-2xl px-6 sm:px-12 py-8 sm:py-12"
            style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
          >
            {/* Header */}
            <header className="avoid-break pb-5 border-b-2 border-ink rule">
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
                <div>
                  <h1
                    className="text-4xl sm:text-5xl font-semibold tracking-tight leading-none"
                    style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif" }}
                  >
                    Jared Mackay
                  </h1>
                  <p className="mt-2 text-sm sm:text-base text-ink/80 muted-text">
                    Engineer · Operator · Sales — builds, ships, and sells end-to-end.
                  </p>
                </div>
                <div className="text-[11px] sm:text-xs space-y-1 text-ink/80 muted-text sm:text-right">
                  <p className="flex items-center gap-1.5 sm:justify-end">
                    <MapPin size={12} strokeWidth={1.8} /> Salt Lake City, UT
                  </p>
                  <p className="flex items-center gap-1.5 sm:justify-end">
                    <Mail size={12} strokeWidth={1.8} /> jaredhmackay@gmail.com
                  </p>
                  <p className="flex items-center gap-1.5 sm:justify-end">
                    <Globe size={12} strokeWidth={1.8} /> jaredmackay.com
                  </p>
                  <p className="flex items-center gap-1.5 sm:justify-end">
                    <Linkedin size={12} strokeWidth={1.8} /> linkedin.com/in/jaredmackay
                  </p>
                </div>
              </div>
            </header>

            {/* Summary */}
            <section className="summary mt-5 avoid-break">
              <p className="text-sm sm:text-[15px] leading-relaxed text-ink/85 muted-text">
                Technical founder and top-performing sales operator living at the intersection of building
                and selling. I write the code, architect the demo, run the technical sale, and onboard
                the customer — end to end. 6+ years across high-ticket consumer sales, enterprise deals,
                and shipping my own products to market.
              </p>
            </section>

            {/* Highlights strip */}
            <section className="mt-5 avoid-break">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { v: '6+', l: 'Years in Sales' },
                  { v: '$40M', l: 'Revenue Influenced' },
                  { v: '300%', l: 'Pipeline Growth' },
                  { v: '#1', l: 'Sales Rep · Sunrun 2023' },
                ].map((s) => (
                  <div
                    key={s.l}
                    className="chip rounded-lg border border-ink/20 bg-ink/[0.03] px-3 py-2.5 text-center"
                  >
                    <p
                      className="stat-value text-lg sm:text-xl font-semibold leading-none tracking-tight accent-text"
                      style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", color: '#ff6a3d' }}
                    >
                      {s.v}
                    </p>
                    <p className="stat-label mt-1.5 text-[9px] uppercase tracking-widest text-ink/60 muted-text">
                      {s.l}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Products & Ventures */}
            <Section title="Products & Ventures">
              {[
                {
                  title: 'Voley',
                  role: 'Founder & Builder',
                  meta: 'Active · letsvoley.com',
                  bullets: [
                    'Built and launched a communication platform for insurance agencies with deep AMS integration and agency-wide collaboration.',
                    'Designed architecture, UX, onboarding, and pricing; sell directly into agency owners and own the technical demo and close.',
                  ],
                },
                {
                  title: 'Index CRM',
                  role: 'Founder & Builder',
                  meta: 'React · TypeScript · Node.js',
                  bullets: [
                    'Cold-calling CRM with full pipeline management, streamlined workflows, and intermission games to keep reps sharp — built from the perspective of someone who has actually dialed for a living.',
                  ],
                },
                {
                  title: 'Junzi',
                  role: 'Founder & Builder',
                  meta: 'bejunzi.com',
                  bullets: [
                    'Social platform for long-format opinion sharing — designed to reward thinking well over thinking fast.',
                  ],
                },
                {
                  title: 'Analytics Pipeline',
                  role: 'Engineering + Revenue',
                  meta: 'Flink · Kafka · ClickHouse',
                  bullets: [
                    'Stream processing at 500K events/sec with exactly-once semantics; owned the full loop from product spec to signed contract.',
                  ],
                },
              ].map((r) => (
                <Role key={r.title} {...r} />
              ))}
            </Section>

            {/* Sales Experience */}
            <Section title="Sales Experience">
              <Role
                title="Sunrun"
                role="Top Sales Rep → Sales Manager"
                meta="2023 · Honolulu, HI"
                bullets={[
                  'Ranked #1 sales rep company-wide in 2023 before being promoted to Sales Manager.',
                  'Led multi-state teams of 18–30 year olds — built trainings, set goals, and organized housing, travel, and food for all teams.',
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
              <div className="grid sm:grid-cols-2 gap-x-6 gap-y-2">
                <CompactRole
                  title="Active Event Technology"
                  role="Technical Support"
                  meta="Nov 2022 – Dec 2023 · San Francisco, CA"
                  description="Installed and networked devices and security software for large-scale concerts at the AT&T Center."
                />
                <CompactRole
                  title="Brigham Young University"
                  role="Secretary"
                  meta="Oct 2022 – Apr 2023 · Provo, UT"
                  description="Coordinated meetings, travel, and student inquiries across departments."
                />
                <CompactRole
                  title="Men of Culture"
                  role="President"
                  meta="Jan 2023 – Present · Salt Lake City, UT"
                  description="Lead a men's club focused on personal growth, health, and intellectual development."
                />
                <CompactRole
                  title="Church of Jesus Christ of Latter-Day Saints"
                  role="Volunteer Representative"
                  meta="Belém, Brazil"
                  description="Two years of full-time volunteer service in northern Brazil — became fluent in Portuguese."
                />
              </div>
            </Section>

            {/* Education */}
            <Section title="Education">
              <Role
                title="Brigham Young University — Marriott School of Business"
                role="B.S. Pre-Business · Minor in Communications"
                meta="Apr 2026 · Provo, UT"
                bullets={[
                  'GPA 3.75 / 4.00 · Member, Association for Information Systems.',
                ]}
              />
            </Section>

            {/* Skills */}
            <section className="mt-6 avoid-break">
              <SectionTitle>Skills & Toolkit</SectionTitle>
              <div className="section-body mt-2 text-[13px] sm:text-sm space-y-1">
                <p className="text-ink/85 muted-text leading-snug">
                  <span className="font-semibold text-ink">Technical:</span>{' '}
                  TypeScript · React · Node.js · Python · PostgreSQL · AWS
                </p>
                <p className="text-ink/85 muted-text leading-snug">
                  <span className="font-semibold text-ink">Sales & GTM:</span>{' '}
                  Technical Sales · Solution Engineering · Go-to-Market · Pipeline Management · Enterprise Demos · Negotiation
                </p>
                <p className="text-ink/85 muted-text leading-snug">
                  <span className="font-semibold text-ink">Languages:</span>{' '}
                  English (native) · Portuguese (fluent)
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="text-[11px] uppercase tracking-[0.25em] font-semibold text-ink border-b border-ink/30 rule pb-1.5"
      style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif" }}
    >
      {children}
    </h2>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-6">
      <SectionTitle>{title}</SectionTitle>
      <div className="section-body mt-3 space-y-4">{children}</div>
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
    <div className="role avoid-break">
      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-0.5">
        <div>
          <h3
            className="text-[15px] sm:text-base font-semibold text-ink leading-tight"
            style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif" }}
          >
            {title}
          </h3>
          <p className="text-xs sm:text-sm text-ink/75 muted-text italic mt-0.5">{role}</p>
        </div>
        <p className="meta-line text-[11px] sm:text-xs text-ink/60 muted-text uppercase tracking-widest shrink-0">
          {meta}
        </p>
      </div>
      <ul className="mt-1.5 space-y-1 text-[13px] sm:text-sm">
        {bullets.map((b, i) => (
          <li key={i} className="flex gap-2 text-ink/85 muted-text leading-snug">
            <span className="text-accent accent-text mt-1" style={{ color: '#ff6a3d' }}>
              ▸
            </span>
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
}: {
  title: string;
  role: string;
  meta: string;
  description: string;
}) {
  return (
    <div className="role avoid-break">
      <div className="flex items-baseline justify-between gap-2">
        <h4
          className="text-[13px] sm:text-sm font-semibold text-ink leading-tight"
          style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif" }}
        >
          {title}
        </h4>
        <p className="meta-line text-[10px] sm:text-[11px] text-ink/60 muted-text uppercase tracking-widest shrink-0">
          {meta}
        </p>
      </div>
      <p className="text-[12px] sm:text-[13px] text-ink/75 muted-text italic leading-snug">
        {role}
      </p>
      <p className="mt-0.5 text-[12px] sm:text-[13px] text-ink/85 muted-text leading-snug">
        {description}
      </p>
    </div>
  );
}
