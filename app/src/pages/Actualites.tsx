import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutGrid,
  List,
  Clock,
  MapPin,
  ChevronRight,
  FileText,
  Image,
  Video,
  Calendar,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

/* ──────────────────────────────────────────────
   DATA
   ────────────────────────────────────────────── */

const stats = [
  { number: 248, label: 'COMMUNIQU\u00c9S' },
  { number: 56, label: 'CONSULTATIONS' },
  { number: 12, label: '\u00c9V\u00c9NEMENTS' },
  { number: 1.2, label: 'ABONN\u00c9S', suffix: 'M' },
];

const filterTabs = ['TOUS', 'COMMUNIQU\u00c9S', 'CONSULTATIONS', '\u00c9V\u00c9NEMENTS', 'PRESSE', 'DOSSIER'];

const newsArticles = [
  { id: 1, image: '/news-1.jpg', category: 'CONSULTATION', date: '10 JANVIER 2026', title: "Consultation publique sur la Charte de l'Identit\u00e9 Num\u00e9rique : donnez votre avis" },
  { id: 2, image: '/news-2.jpg', category: '\u00c9V\u00c9NEMENT', date: '8 JANVIER 2026', title: 'Salon des Maires 2026 : le minist\u00e8re pr\u00e9sente ses nouveaux outils num\u00e9riques' },
  { id: 3, image: '/news-3.jpg', category: 'COMMUNIQU\u00c9', date: '5 JANVIER 2026', title: 'D\u00e9ploiement du cloud souverain INTERCONNECT dans 15 nouvelles administrations' },
  { id: 4, image: '/news-featured.jpg', category: 'PRESSE', date: '3 JANVIER 2026', title: 'Entretien : la feuille de route num\u00e9rique 2026\u20132030 du gouvernement' },
  { id: 5, image: '/news-1.jpg', category: 'COMMUNIQU\u00c9', date: '20 D\u00c9CEMBRE 2025', title: 'Extension de France Services : 500 nouveaux guichets d\u2019ici juin 2026' },
  { id: 6, image: '/news-2.jpg', category: 'CONSULTATION', date: '18 D\u00c9CEMBRE 2025', title: 'Projet de loi sur la cybers\u00e9curit\u00e9 : participez \u00e0 la consultation en ligne' },
  { id: 7, image: '/news-3.jpg', category: 'DOSSIER', date: '15 D\u00c9CEMBRE 2025', title: 'Dossier sp\u00e9cial : l\u2019administration num\u00e9rique en France, bilan et perspectives' },
  { id: 8, image: '/news-1.jpg', category: '\u00c9V\u00c9NEMENT', date: '12 D\u00c9CEMBRE 2025', title: 'Webinaire : Comment cr\u00e9er votre association en ligne en 15 minutes' },
  { id: 9, image: '/news-2.jpg', category: 'COMMUNIQU\u00c9', date: '8 D\u00c9CEMBRE 2025', title: 'Signature d\u2019un partenariat avec La Poste pour d\u00e9ployer l\u2019identit\u00e9 num\u00e9rique' },
];

const events = [
  { day: '28', month: 'JANV', title: 'Conf\u00e9rence de presse : Bilan 2025 et perspectives 2026', time: '14h00', location: 'H\u00f4tel de Matignon, Paris', description: 'Pr\u00e9sentation des grands chantiers du minist\u00e8re pour l\u2019ann\u00e9e 2026 par la ministre.' },
  { day: '15', month: 'F\u00c9V', title: 'Salon de l\u2019Association : Forum national de la vie associative', time: '9h00', location: 'Paris Expo Porte de Versailles', description: 'Rencontres, ateliers et conf\u00e9rences d\u00e9di\u00e9es au monde associatif. 5000 visiteurs attendus.' },
  { day: '5', month: 'MARS', title: 'Webinaire : Cybers\u00e9curit\u00e9 pour les collectivit\u00e9s territoriales', time: '10h00', location: 'En ligne', description: 'Comment s\u00e9curiser vos syst\u00e8mes d\u2019information ? Inscrivez-vous gratuitement.' },
];

const consultations = [
  { status: 'OUVERTE', statusColor: '#4A7C6F', title: 'Charte de l\u2019Identit\u00e9 Num\u00e9rique', description: 'Participez \u00e0 l\u2019\u00e9laboration de la charte qui encadrera l\u2019usage de l\u2019identit\u00e9 num\u00e9rique en France.', deadline: 'Jusqu\u2019au 28 f\u00e9vrier 2026', progress: 65 },
  { status: 'OUVERTE', statusColor: '#4A7C6F', title: 'Projet de loi sur la cybers\u00e9curit\u00e9', description: 'Consultez et contribuez au projet de loi visant \u00e0 renforcer la cybers\u00e9curit\u00e9 des services publics.', deadline: 'Jusqu\u2019au 15 mars 2026', progress: 40 },
  { status: 'BIENT\u00d4T', statusColor: '#E5B045', title: 'Budget Participatif Num\u00e9rique 2026', description: 'Proposez et votez pour les projets num\u00e9riques que vous souhaitez voir financ\u00e9s dans votre r\u00e9gion.', deadline: 'Ouverture le 1er mars 2026', progress: 0 },
];

const pressResources = [
  { icon: FileText, title: 'Dossiers de presse', description: 'Communiqu\u00e9s, discours, notes de cadrage', cta: 'T\u00c9L\u00c9CHARGER' },
  { icon: Image, title: 'Phototh\u00e8que institutionnelle', description: 'Photos HD du ministre et des \u00e9v\u00e9nements', cta: 'CONSULTER' },
  { icon: Video, title: 'Vid\u00e9os et interviews', description: 'Retransmissions et extraits vid\u00e9o', cta: 'REGARDER' },
];

/* ──────────────────────────────────────────────
   SECTION 1 — FEATURED HERO
   ────────────────────────────────────────────── */

function FeaturedHero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [counters, setCounters] = useState<number[]>([0, 0, 0, 0]);

  useEffect(() => {
    if (!imageRef.current || !textRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(imageRef.current, { scale: 1.03, opacity: 0, duration: 0.8, ease: 'power2.out' });
      const textEls = textRef.current?.querySelectorAll('.hero-text-item');
      if (textEls) {
        gsap.from(textEls, { y: 20, opacity: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out', delay: 0.3 });
      }
    }, heroRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const duration = 1000;
    const steps = 30;
    let frame = 0;
    const interval = setInterval(() => {
      frame++;
      const progress = frame / steps;
      setCounters(stats.map((s) => s.number === 1.2 ? Math.round(progress * s.number * 10) / 10 : Math.round(progress * s.number)));
      if (frame >= steps) clearInterval(interval);
    }, duration / steps);
    return () => clearInterval(interval);
  }, []);

  return (
    <div ref={heroRef} style={{ background: '#0F1F33', padding: '140px 0 0' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 24px' }}>
        <div ref={imageRef} className="relative overflow-hidden" style={{ borderRadius: '2px', height: '480px' }}>
          <img src="/news-featured.jpg" alt="Featured article" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(transparent 30%, rgba(15,31,51,0.9) 100%)' }} />
          <div ref={textRef} className="absolute bottom-0 left-0" style={{ padding: '40px' }}>
            <span className="hero-text-item inline-block" style={{ background: '#E5B045', color: '#1E3A5F', fontFamily: "'Source Sans 3', sans-serif", fontWeight: 600, fontSize: '10px', textTransform: 'uppercase', padding: '4px 12px', borderRadius: '2px', letterSpacing: '0.06em' }}>
              COMMUNIQU&Eacute; OFFICIEL
            </span>
            <p className="hero-text-item" style={{ fontFamily: "'Source Sans 3', sans-serif", fontWeight: 500, fontSize: '11px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', marginTop: '12px', letterSpacing: '0.06em' }}>
              15 JANVIER 2026
            </p>
            <h2 className="hero-text-item" style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 600, fontSize: '28px', color: '#FFFFFF', lineHeight: 1.2, maxWidth: '680px', marginTop: '12px' }}>
              Lancement de FranceConnect+ : l&apos;identit&eacute; num&eacute;rique de nouvelle g&eacute;n&eacute;ration pour tous les Fran&ccedil;ais
            </h2>
            <Link to="#" className="hero-text-item inline-flex items-center no-underline transition-all duration-200 hover:translate-y-[-1px]" style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 600, fontSize: '13px', letterSpacing: '0.05em', textTransform: 'uppercase', color: '#1E3A5F', background: '#FFFFFF', padding: '14px 28px', borderRadius: '2px', marginTop: '20px' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = '#F5F5F0'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = '#FFFFFF'; }}>
              LIRE L&apos;ARTICLE
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div style={{ background: '#1E3A5F', padding: '20px 0', marginTop: '0' }}>
        <div className="grid grid-cols-2 md:grid-cols-4" style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 24px', gap: '24px', textAlign: 'center' }}>
          {stats.map((stat, i) => (
            <div key={stat.label}>
              <span style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: '24px', color: '#FFFFFF' }}>
                {counters[i]}{stat.suffix || ''}
              </span>
              <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontWeight: 400, fontSize: '11px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', margin: 0, marginTop: '4px' }}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────
   SECTION 2 — FILTER BAR
   ────────────────────────────────────────────── */

function FilterBar({ activeFilter, setActiveFilter, viewMode, setViewMode }: { activeFilter: number; setActiveFilter: (i: number) => void; viewMode: 'grid' | 'list'; setViewMode: (v: 'grid' | 'list') => void; }) {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }}
      style={{ background: '#FFFFFF', borderBottom: '1px solid #E8E8E3', position: 'sticky', top: '80px', zIndex: 40 }}>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between" style={{ maxWidth: '1400px', margin: '0 auto', padding: '16px 24px' }}>
        <div className="flex gap-1 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
          {filterTabs.map((tab, i) => (
            <motion.button key={tab} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3, delay: 0.04 * i }}
              onClick={() => setActiveFilter(i)} className="whitespace-nowrap cursor-pointer transition-all duration-150"
              style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 600, fontSize: '12px', letterSpacing: '0.06em', textTransform: 'uppercase', padding: '10px 18px', borderRadius: '2px', border: 'none', background: activeFilter === i ? '#1E3A5F' : 'transparent', color: activeFilter === i ? '#FFFFFF' : '#666666' }}
              onMouseEnter={(e) => { if (activeFilter !== i) (e.currentTarget as HTMLElement).style.background = '#F5F5F0'; }}
              onMouseLeave={(e) => { if (activeFilter !== i) (e.currentTarget as HTMLElement).style.background = 'transparent'; }}>
              {tab}
            </motion.button>
          ))}
        </div>
        <div className="flex items-center gap-2 mt-2 sm:mt-0">
          <button onClick={() => setViewMode('grid')} className="cursor-pointer bg-transparent border-none p-1" aria-label="Grid view">
            <LayoutGrid size={16} color={viewMode === 'grid' ? '#1E3A5F' : '#D6D6D0'} strokeWidth={viewMode === 'grid' ? 2.5 : 1.5} />
          </button>
          <button onClick={() => setViewMode('list')} className="cursor-pointer bg-transparent border-none p-1" aria-label="List view">
            <List size={16} color={viewMode === 'list' ? '#1E3A5F' : '#D6D6D0'} strokeWidth={viewMode === 'list' ? 2.5 : 1.5} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

/* ──────────────────────────────────────────────
   SECTION 3 — NEWS GRID / LIST
   ────────────────────────────────────────────── */

function NewsCard({ article, viewMode }: { article: typeof newsArticles[0]; viewMode: 'grid' | 'list' }) {
  if (viewMode === 'list') {
    return (
      <motion.div className="flex items-center gap-6 cursor-pointer" style={{ borderBottom: '1px solid #E8E8E3', padding: '20px 0' }}
        whileHover={{ backgroundColor: '#FFFFFF', paddingLeft: 8 }} transition={{ duration: 0.2 }}>
        <div className="overflow-hidden flex-shrink-0" style={{ width: '200px', height: '120px', borderRadius: '2px' }}>
          <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span style={{ background: 'rgba(30,58,95,0.08)', color: '#1E3A5F', fontFamily: "'Source Sans 3', sans-serif", fontWeight: 500, fontSize: '10px', textTransform: 'uppercase', padding: '3px 10px', borderRadius: '2px', letterSpacing: '0.06em' }}>
              {article.category}
            </span>
            <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontWeight: 400, fontSize: '11px', color: '#666666' }}>{article.date}</span>
          </div>
          <h3 style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 500, fontSize: '16px', color: '#1A1A1A', lineHeight: 1.3, marginTop: '10px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
            {article.title}
          </h3>
        </div>
        <ChevronRight size={20} color="#1E3A5F" className="flex-shrink-0" />
      </motion.div>
    );
  }

  return (
    <motion.div className="cursor-pointer overflow-hidden"
      style={{ background: '#FFFFFF', borderRadius: '2px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}
      whileHover={{ boxShadow: '0 8px 24px rgba(0,0,0,0.1)', y: -2 }} transition={{ duration: 0.3 }}>
      <div className="overflow-hidden" style={{ aspectRatio: '16/9', borderRadius: '2px 2px 0 0' }}>
        <motion.img src={article.image} alt={article.title} className="w-full h-full object-cover" whileHover={{ scale: 1.04 }} transition={{ duration: 0.3 }} />
      </div>
      <div style={{ padding: '20px', background: '#FFFFFF' }}>
        <div className="flex items-center gap-2">
          <span style={{ background: 'rgba(30,58,95,0.08)', color: '#1E3A5F', fontFamily: "'Source Sans 3', sans-serif", fontWeight: 500, fontSize: '10px', textTransform: 'uppercase', padding: '3px 10px', borderRadius: '2px', letterSpacing: '0.06em' }}>
            {article.category}
          </span>
          <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontWeight: 400, fontSize: '11px', color: '#666666' }}>{article.date}</span>
        </div>
        <h3 style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 600, fontSize: '15px', color: '#1A1A1A', lineHeight: 1.3, marginTop: '10px', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {article.title}
        </h3>
      </div>
    </motion.div>
  );
}

function NewsGridSection({ activeFilter, viewMode }: { activeFilter: number; viewMode: 'grid' | 'list' }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const filteredArticles = activeFilter === 0 ? newsArticles : newsArticles.filter((a) => a.category === filterTabs[activeFilter]);

  useEffect(() => {
    if (!sectionRef.current) return;
    const cards = sectionRef.current.querySelectorAll('.news-card-wrapper');
    const ctx = gsap.context(() => {
      gsap.from(cards, { opacity: 0, y: 30, duration: 0.4, stagger: 0.06, ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [activeFilter, viewMode]);

  return (
    <div style={{ background: '#F5F5F0', padding: '64px 0 56px' }}>
      <div ref={sectionRef} style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 24px' }}>
        <AnimatePresence mode="wait">
          <motion.div key={viewMode + activeFilter} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
            className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'flex flex-col'} style={{ gap: viewMode === 'grid' ? '24px' : '0' }}>
            {filteredArticles.map((article) => (
              <div key={article.id} className="news-card-wrapper">
                <NewsCard article={article} viewMode={viewMode} />
              </div>
            ))}
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-center" style={{ marginTop: '40px' }}>
          <button className="cursor-pointer transition-all duration-200 hover:bg-[#1E3A5F] hover:text-white"
            style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 600, fontSize: '13px', letterSpacing: '0.05em', textTransform: 'uppercase', color: '#1E3A5F', background: 'transparent', border: '1.5px solid #1E3A5F', padding: '14px 28px', borderRadius: '2px' }}>
            CHARGER PLUS D&apos;ARTICLES
          </button>
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────
   SECTION 4 — EVENTS TIMELINE
   ────────────────────────────────────────────── */

function EventsTimeline() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      if (lineRef.current) {
        gsap.from(lineRef.current, { scaleY: 0, duration: 0.8, ease: 'power2.inOut',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true },
        });
      }
      const dots = sectionRef.current?.querySelectorAll('.timeline-dot');
      if (dots) {
        gsap.from(dots, { scale: 0, duration: 0.3, stagger: 0.2, ease: 'back.out(1.7)',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true }, delay: 0.4,
        });
      }
      const cards = sectionRef.current?.querySelectorAll('.timeline-card');
      if (cards) {
        gsap.from(cards, { x: 30, opacity: 0, duration: 0.5, stagger: 0.15, ease: 'power2.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true }, delay: 0.6,
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <div style={{ background: '#FFFFFF', padding: '48px 0' }}>
      <div ref={sectionRef} style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 24px' }}>
        <div>
          <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontWeight: 500, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#E5B045' }}>AGENDA</span>
          <h2 style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 600, fontSize: '30px', color: '#1A1A1A', marginTop: '8px' }}>&Eacute;v&Eacute;nements &agrave; venir</h2>
        </div>

        <div className="relative" style={{ marginTop: '40px' }}>
          <div ref={lineRef} className="absolute left-[40px] top-0 bottom-0 origin-top hidden md:block" style={{ width: '2px', background: '#E8E8E3' }} />
          <div className="flex flex-col" style={{ gap: '32px' }}>
            {events.map((event) => (
              <div key={event.day + event.month} className="flex items-start gap-8">
                <div className="relative flex-shrink-0 text-center hidden md:block" style={{ width: '80px' }}>
                  <span style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: '36px', color: '#1E3A5F', display: 'block' }}>{event.day}</span>
                  <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontWeight: 500, fontSize: '11px', textTransform: 'uppercase', color: '#666666' }}>{event.month}</span>
                  <div className="timeline-dot absolute left-1/2 -translate-x-1/2" style={{ width: '12px', height: '12px', background: '#1E3A5F', borderRadius: '50%', top: '50%', marginTop: '-6px' }} />
                </div>
                <div className="md:hidden flex-shrink-0 flex items-center gap-2">
                  <span style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: '24px', color: '#1E3A5F' }}>{event.day}</span>
                  <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontWeight: 500, fontSize: '11px', textTransform: 'uppercase', color: '#666666' }}>{event.month}</span>
                </div>
                <motion.div className="timeline-card flex-1 cursor-pointer" style={{ background: '#F5F5F0', border: '1px solid #E8E8E3', borderRadius: '2px', padding: '28px' }}
                  whileHover={{ borderColor: '#1E3A5F', background: '#FFFFFF' }} transition={{ duration: 0.2 }}>
                  <h3 style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 600, fontSize: '17px', color: '#1E3A5F' }}>{event.title}</h3>
                  <div className="flex flex-wrap items-center gap-4" style={{ marginTop: '8px' }}>
                    <div className="flex items-center gap-1"><Clock size={12} color="#666666" />
                      <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontWeight: 400, fontSize: '12px', color: '#666666' }}>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-1"><MapPin size={12} color="#666666" />
                      <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontWeight: 400, fontSize: '12px', color: '#666666' }}>{event.location}</span>
                    </div>
                  </div>
                  <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontWeight: 400, fontSize: '14px', color: '#666666', marginTop: '8px', lineHeight: 1.6, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {event.description}
                  </p>
                  <span className="inline-flex items-center gap-1 cursor-pointer" style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', color: '#1E3A5F', marginTop: '12px' }}>
                    EN SAVOIR PLUS <ChevronRight size={14} />
                  </span>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────
   SECTION 5 — PUBLIC CONSULTATIONS
   ────────────────────────────────────────────── */

function ConsultationsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const cards = sectionRef.current.querySelectorAll('.consultation-card');
    const ctx = gsap.context(() => {
      gsap.from(cards, { opacity: 0, y: 30, duration: 0.5, stagger: 0.1, ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <div style={{ background: '#1E3A5F', padding: '48px 0' }}>
      <div ref={sectionRef} style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 24px' }}>
        <div>
          <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontWeight: 500, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#E5B045' }}>CONSULTATIONS</span>
          <h2 style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 600, fontSize: '30px', color: '#FFFFFF', marginTop: '8px' }}>Donnez votre avis</h2>
          <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontWeight: 400, fontSize: '15px', color: 'rgba(255,255,255,0.75)', marginTop: '8px', maxWidth: '560px', lineHeight: 1.6 }}>
            Participez aux consultations publiques en cours. Votre contribution aide &agrave; fa&ccedil;onner les politiques publiques.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3" style={{ gap: '24px', marginTop: '40px' }}>
          {consultations.map((c) => (
            <motion.div key={c.title} className="consultation-card" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '2px', padding: '32px' }}
              whileHover={{ background: 'rgba(255,255,255,0.1)', borderColor: 'rgba(255,255,255,0.25)', y: -2 }} transition={{ duration: 0.2 }}>
              <span style={{ background: c.statusColor, color: c.status === 'OUVERTE' ? '#FFFFFF' : '#1E3A5F', fontFamily: "'Source Sans 3', sans-serif", fontWeight: 600, fontSize: '10px', textTransform: 'uppercase', padding: '3px 10px', borderRadius: '2px' }}>{c.status}</span>
              <h3 style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 600, fontSize: '17px', color: '#FFFFFF', marginTop: '12px' }}>{c.title}</h3>
              <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontWeight: 400, fontSize: '14px', color: 'rgba(255,255,255,0.7)', marginTop: '8px', lineHeight: 1.6, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                {c.description}
              </p>
              <div className="flex items-center gap-2" style={{ marginTop: '16px' }}>
                <Calendar size={14} color="rgba(255,255,255,0.5)" />
                <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontWeight: 400, fontSize: '12px', color: 'rgba(255,255,255,0.5)' }}>{c.deadline}</span>
              </div>
              {c.progress > 0 && (
                <div style={{ marginTop: '12px' }}>
                  <div style={{ height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', background: '#E5B045', width: `${c.progress}%`, borderRadius: '2px', transition: 'width 1s ease' }} />
                  </div>
                </div>
              )}
              <Link to="#" className="inline-flex items-center no-underline transition-all duration-200" style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 600, fontSize: '13px', letterSpacing: '0.05em', textTransform: 'uppercase', color: '#1E3A5F', background: '#FFFFFF', padding: '10px 20px', borderRadius: '2px', marginTop: '16px' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = '#F5F5F0'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = '#FFFFFF'; }}>
                PARTICIPER
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────
   SECTION 6 — PRESS RESOURCES
   ────────────────────────────────────────────── */

function PressResources() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const cards = sectionRef.current.querySelectorAll('.press-card');
    const ctx = gsap.context(() => {
      gsap.from(cards, { opacity: 0, y: 25, duration: 0.4, stagger: 0.08, ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 85%', once: true },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <div style={{ background: '#F5F5F0', padding: '48px 0' }}>
      <div ref={sectionRef} style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 24px' }}>
        <div>
          <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontWeight: 500, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#666666' }}>ESPACE PRESSE</span>
          <h2 style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 600, fontSize: '30px', color: '#1A1A1A', marginTop: '8px' }}>Ressources presse</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: '24px', marginTop: '40px' }}>
          {pressResources.map((resource) => {
            const Icon = resource.icon;
            return (
              <motion.div key={resource.title} className="press-card" style={{ background: '#FFFFFF', border: '1px solid #E8E8E3', borderRadius: '2px', padding: '32px', textAlign: 'center' }}
                whileHover={{ boxShadow: '0 6px 20px rgba(0,0,0,0.06)', y: -2 }} transition={{ duration: 0.2 }}>
                <Icon size={36} color="#1E3A5F" strokeWidth={1.5} style={{ margin: '0 auto' }} />
                <h3 style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 600, fontSize: '16px', color: '#1E3A5F', marginTop: '16px' }}>{resource.title}</h3>
                <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontWeight: 400, fontSize: '13px', color: '#666666', marginTop: '8px', lineHeight: 1.5 }}>{resource.description}</p>
                <span className="inline-flex items-center gap-1 cursor-pointer" style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', color: '#1E3A5F', marginTop: '16px' }}>
                  {resource.cta} <ChevronRight size={14} />
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────
   MAIN PAGE
   ────────────────────────────────────────────── */

export default function Actualites() {
  const [activeFilter, setActiveFilter] = useState(0);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <FeaturedHero />
      <FilterBar activeFilter={activeFilter} setActiveFilter={setActiveFilter} viewMode={viewMode} setViewMode={setViewMode} />
      <NewsGridSection activeFilter={activeFilter} viewMode={viewMode} />
      <EventsTimeline />
      <ConsultationsSection />
      <PressResources />
    </div>
  );
}
