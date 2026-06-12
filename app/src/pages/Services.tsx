import { useState, useRef, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Search,
  ChevronRight,
  ChevronDown,
  Clock,
  CheckCircle,
  ArrowRight,
  FileText,
  Home,
  CreditCard,
  Shield,
  Globe,
  Users,
  Car,
  GraduationCap,
  Briefcase,
  Zap,
  BarChart3,
  Heart,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */

const tabs = [
  { label: 'TOUS', count: 18, accent: '#1E3A5F' },
  { label: 'PARTICULIERS', count: 8, accent: '#E5B045' },
  { label: 'ASSOCIATIONS', count: 5, accent: '#4A7C6F' },
  { label: 'ÉCONOMIE SOCIALE', count: 4, accent: '#B85C6E' },
  { label: 'NUMÉRIQUE & DATA', count: 4, accent: '#A3C8D8' },
  { label: 'COLLECTIVITÉS', count: 3, accent: '#7A9E7E' },
];

interface ServiceItem {
  id: number;
  category: string;
  accent: string;
  title: string;
  description: string;
  time: string;
  online: boolean;
  Icon: React.ComponentType<{ size?: number; className?: string; strokeWidth?: number }>;
}

const services: ServiceItem[] = [
  {
    id: 1, category: 'PARTICULIERS', accent: '#E5B045',
    title: 'Carte Nationale d\'Identité',
    description: 'Demandez ou renouvelez votre CNI en ligne. Suivi en temps réel de votre dossier.',
    time: '~10 min', online: true, Icon: FileText,
  },
  {
    id: 2, category: 'PARTICULIERS', accent: '#E5B045',
    title: 'Passeport',
    description: 'Formulaire de demande de passeport biométrique. Prise de rendez-vous dans votre mairie.',
    time: '~15 min', online: true, Icon: Globe,
  },
  {
    id: 3, category: 'PARTICULIERS', accent: '#E5B045',
    title: 'Aides au Logement',
    description: 'Simulez et demandez vos APL, ALS ou ALF. Calcul personnalisé selon votre situation.',
    time: '~8 min', online: true, Icon: Home,
  },
  {
    id: 4, category: 'PARTICULIERS', accent: '#E5B045',
    title: 'Impôt sur le Revenus',
    description: 'Déclarez vos revenus en ligne, consultez votre avis d\'imposition, payez en ligne.',
    time: '~20 min', online: true, Icon: CreditCard,
  },
  {
    id: 5, category: 'PARTICULIERS', accent: '#E5B045',
    title: 'Allocation Adulte Handicapé',
    description: 'Faites votre demande d\'AAH, suivez votre dossier, déclarez vos changements de situation.',
    time: '~12 min', online: true, Icon: Heart,
  },
  {
    id: 6, category: 'PARTICULIERS', accent: '#E5B045',
    title: 'Livret de Famille',
    description: 'Demandez un livret de famille, un duplicata ou une modification suite à un événement.',
    time: '~5 min', online: true, Icon: FileText,
  },
  {
    id: 7, category: 'PARTICULIERS', accent: '#E5B045',
    title: 'Permis de Conduire',
    description: 'Renouvellement, duplicata, ajout de catégorie, consultation des points restants.',
    time: '~8 min', online: true, Icon: Car,
  },
  {
    id: 8, category: 'PARTICULIERS', accent: '#E5B045',
    title: 'Recensement Citoyen',
    description: 'Effectuez votre recensement obligatoire en ligne dès 16 ans. Attestation immédiate.',
    time: '~5 min', online: true, Icon: GraduationCap,
  },
  {
    id: 9, category: 'ASSOCIATIONS', accent: '#4A7C6F',
    title: 'Créer une Association',
    description: 'Déclarez votre association en préfecture. Recevez votre numéro RNA sous 48h.',
    time: '~15 min', online: true, Icon: Briefcase,
  },
  {
    id: 10, category: 'ASSOCIATIONS', accent: '#4A7C6F',
    title: 'Demande de Subvention',
    description: 'Postulez aux aides financières de l\'État et des collectivités territoriales.',
    time: '~20 min', online: true, Icon: CreditCard,
  },
  {
    id: 11, category: 'ASSOCIATIONS', accent: '#4A7C6F',
    title: 'Comptes Annuelles',
    description: 'Déposez vos comptes annuels obligatoires en ligne. Modèle de document fourni.',
    time: '~10 min', online: true, Icon: FileText,
  },
  {
    id: 12, category: 'ASSOCIATIONS', accent: '#4A7C6F',
    title: 'Bénévolat & Mécénat',
    description: 'Inscrivez votre association dans le répertoire national des associations.',
    time: '~8 min', online: true, Icon: Users,
  },
  {
    id: 13, category: 'ÉCONOMIE SOCIALE', accent: '#B85C6E',
    title: 'Agencement Coopératif',
    description: 'Créez votre coopérative : statuts, immatriculation, accompagnement juridique.',
    time: '~25 min', online: true, Icon: Users,
  },
  {
    id: 14, category: 'ÉCONOMIE SOCIALE', accent: '#B85C6E',
    title: 'Agrément ESUS',
    description: 'Demandez l\'agrément Entreprise Solidaire d\'Utilité Sociale pour vos avantages fiscaux.',
    time: '~15 min', online: true, Icon: Shield,
  },
  {
    id: 15, category: 'NUMÉRIQUE & DATA', accent: '#A3C8D8',
    title: 'FranceConnect',
    description: 'Créez votre identité numérique sécurisée pour accéder à 1000+ services publics.',
    time: '~5 min', online: true, Icon: Zap,
  },
  {
    id: 16, category: 'NUMÉRIQUE & DATA', accent: '#A3C8D8',
    title: 'Ma Sécurité',
    description: 'Signalement de cybermalveillance, conseils de cybersécurité pour les citoyens.',
    time: '~3 min', online: true, Icon: Shield,
  },
  {
    id: 17, category: 'COLLECTIVITÉS', accent: '#7A9E7E',
    title: 'Dotation d\'Équipement',
    description: 'Demandez votre DETR ou DSIL pour financer vos projets d\'infrastructure.',
    time: '~30 min', online: true, Icon: BarChart3,
  },
  {
    id: 18, category: 'COLLECTIVITÉS', accent: '#7A9E7E',
    title: 'France Numérique Collective',
    description: 'Accompagnement au numérique responsable pour les collectivités. Portail de ressources.',
    time: '~10 min', online: true, Icon: Globe,
  },
];

const topServices = [
  { rank: 1, title: 'Carte Nationale d\'Identité', accent: '#E5B045', Icon: FileText },
  { rank: 2, title: 'Aides au Logement', accent: '#E5B045', Icon: Home },
  { rank: 3, title: 'Impôt sur le Revenus', accent: '#E5B045', Icon: CreditCard },
  { rank: 4, title: 'FranceConnect', accent: '#A3C8D8', Icon: Zap },
  { rank: 5, title: 'Permis de Conduire', accent: '#E5B045', Icon: Car },
];

/* ------------------------------------------------------------------ */
/*  SERVICE CARD                                                       */
/* ------------------------------------------------------------------ */

function ServiceCard({ service }: { service: ServiceItem }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] }}
      className="group flex flex-col"
      style={{
        background: '#FFFFFF',
        border: '1px solid #E8E8E3',
        borderRadius: '2px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
        overflow: 'hidden',
      }}
      whileHover={{
        y: -3,
        boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
        transition: { duration: 0.3 },
      }}
    >
      {/* Top accent strip */}
      <div style={{ height: '4px', background: service.accent, width: '100%' }} />

      <div className="flex flex-col flex-1" style={{ padding: '24px 32px 32px' }}>
        {/* Category tag */}
        <span
          className="font-source-sans font-medium uppercase"
          style={{
            fontSize: '10px',
            letterSpacing: '0.06em',
            color: service.accent,
          }}
        >
          {service.category}
        </span>

        {/* Icon circle */}
        <div
          className="flex items-center justify-center mt-4"
          style={{
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            background: `${service.accent}1A`,
          }}
        >
          <span style={{ color: service.accent }}><service.Icon size={24} strokeWidth={1.5} /></span>
        </div>

        {/* Title */}
        <h3
          className="font-montserrat font-semibold mt-4"
          style={{ fontSize: '18px', color: '#1E3A5F', lineHeight: 1.2 }}
        >
          {service.title}
        </h3>

        {/* Description */}
        <p
          className="font-source-sans font-normal mt-2"
          style={{
            fontSize: '14px',
            color: '#666666',
            lineHeight: 1.6,
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {service.description}
        </p>

        {/* Meta row */}
        <div className="flex items-center gap-3 mt-4">
          <div className="flex items-center gap-1">
            <Clock size={12} style={{ color: '#666666' }} />
            <span className="font-source-sans font-normal" style={{ fontSize: '12px', color: '#666666' }}>
              {service.time}
            </span>
          </div>
          {service.online && (
            <div className="flex items-center gap-1">
              <CheckCircle size={12} style={{ color: '#4A7C6F' }} />
              <span className="font-source-sans font-normal" style={{ fontSize: '12px', color: '#4A7C6F' }}>
                En ligne
              </span>
            </div>
          )}
        </div>

        {/* CTA */}
        <div className="mt-5 flex items-center gap-1 group/link cursor-pointer">
          <span
            className="font-montserrat font-semibold uppercase"
            style={{ fontSize: '12px', color: service.accent, letterSpacing: '0.04em' }}
          >
            ACCÉDER
          </span>
          <ArrowRight size={14} style={{ color: service.accent }} className="transition-transform duration-200 group-hover/link:translate-x-1" />
        </div>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  MAIN PAGE COMPONENT                                                */
/* ------------------------------------------------------------------ */

export default function Services() {
  const [activeTab, setActiveTab] = useState('TOUS');
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(9);

  const topSectionRef = useRef<HTMLDivElement>(null);
  const topCardsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const headerContentRef = useRef<HTMLDivElement>(null);

  /* Header entrance animation */
  useEffect(() => {
    if (!headerContentRef.current) return;
    const els = headerContentRef.current.querySelectorAll('.header-animate');
    gsap.fromTo(
      els,
      { opacity: 0, y: 20 },
      {
        opacity: 1, y: 0, duration: 0.5, stagger: 0.1,
        ease: 'power2.out',
      }
    );
  }, []);

  /* Scroll-triggered: Top Services */
  useEffect(() => {
    if (!topCardsRef.current) return;
    const cards = topCardsRef.current.querySelectorAll('.top-card');
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: topSectionRef.current,
        start: 'top 80%',
        once: true,
      },
    });
    tl.from(cards, {
      opacity: 0, x: 40,
      duration: 0.5, stagger: 0.1,
      ease: 'power2.out',
    });
    return () => { tl.kill(); };
  }, []);

  /* Scroll-triggered: CTA */
  useEffect(() => {
    if (!ctaRef.current) return;
    const left = ctaRef.current.querySelector('.cta-left');
    const right = ctaRef.current.querySelector('.cta-right');
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ctaRef.current,
        start: 'top 85%',
        once: true,
      },
    });
    if (left) tl.from(left, { opacity: 0, x: -20, duration: 0.5, ease: 'power2.out' }, 0);
    if (right) tl.from(right, { opacity: 0, x: 20, duration: 0.5, ease: 'power2.out' }, 0);
    return () => { tl.kill(); };
  }, []);

  /* Filtered services */
  const filteredServices = services.filter((s) => {
    const matchesTab = activeTab === 'TOUS' || s.category === activeTab;
    const matchesSearch = searchQuery === '' ||
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const visibleServices = filteredServices.slice(0, visibleCount);

  const handleTabChange = useCallback((tab: string) => {
    setActiveTab(tab);
    setVisibleCount(9);
  }, []);

  return (
    <div>
      {/* ============================================================ */}
      {/* SECTION 1 — PAGE HEADER                                       */}
      {/* ============================================================ */}
      <section style={{ background: '#1E3A5F', padding: '100px 0 80px' }}>
        <div
          ref={headerContentRef}
          className="mx-auto"
          style={{ maxWidth: '1400px', padding: '0 24px' }}
        >
          {/* Breadcrumb */}
          <nav className="header-animate flex items-center gap-2 mb-6" style={{ opacity: 0 }}>
            <Link
              to="/"
              className="font-source-sans font-normal no-underline transition-opacity duration-150 hover:opacity-100"
              style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)' }}
            >
              Accueil
            </Link>
            <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '12px' }}>&gt;</span>
            <span className="font-source-sans font-normal" style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)' }}>
              Services
            </span>
          </nav>

          {/* Title */}
          <h1
            className="header-animate font-montserrat font-semibold"
            style={{
              fontSize: 'clamp(36px, 5vw, 48px)',
              color: '#FFFFFF',
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
              opacity: 0,
            }}
          >
            Nos Services Publics
          </h1>

          {/* Subtitle */}
          <p
            className="header-animate font-source-sans font-normal mt-4"
            style={{
              fontSize: '18px',
              color: 'rgba(255,255,255,0.8)',
              maxWidth: '640px',
              lineHeight: 1.5,
              opacity: 0,
            }}
          >
            Retrouvez l'ensemble des services en ligne proposés par le ministère pour accompagner les citoyens, les associations, les entreprises de l'économie sociale et les collectivités territoriales.
          </p>

          {/* Search bar */}
          <div
            className="header-animate flex items-center mt-10"
            style={{
              maxWidth: '640px',
              background: 'rgba(255,255,255,0.95)',
              borderRadius: '2px',
              padding: '6px',
              opacity: 0,
            }}
          >
            <Search size={18} style={{ color: '#666666', marginLeft: '12px', flexShrink: 0 }} />
            <input
              type="text"
              placeholder="Rechercher par mot-clé (ex: passeport, subvention, numérique)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent border-none outline-none font-source-sans font-normal"
              style={{
                fontSize: '14px',
                color: '#1A1A1A',
                padding: '10px 12px',
              }}
            />
            <button
              className="flex items-center gap-2 font-montserrat font-semibold uppercase text-white border-none cursor-pointer transition-all duration-200 hover:opacity-90"
              style={{
                fontSize: '12px',
                letterSpacing: '0.05em',
                background: '#1E3A5F',
                padding: '10px 20px',
                borderRadius: '2px',
              }}
            >
              <Search size={14} />
              RECHERCHER
            </button>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 2 — STICKY TABS                                       */}
      {/* ============================================================ */}
      <div
        className="sticky"
        style={{
          top: '80px',
          zIndex: 40,
          background: '#FFFFFF',
          borderBottom: '1px solid #E8E8E3',
        }}
      >
        <div
          className="mx-auto"
          style={{ maxWidth: '1400px', padding: '0 24px' }}
        >
          <div className="flex items-center overflow-x-auto" style={{ gap: '0' }}>
            {tabs.map((tab) => {
              const isActive = activeTab === tab.label;
              return (
                <motion.button
                  key={tab.label}
                  onClick={() => handleTabChange(tab.label)}
                  className="relative flex-shrink-0 flex items-center cursor-pointer bg-transparent border-none transition-colors duration-150"
                  style={{
                    padding: '20px 24px',
                    color: isActive ? '#1E3A5F' : '#666666',
                    fontFamily: 'Montserrat, sans-serif',
                    fontWeight: 600,
                    fontSize: '13px',
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase' as const,
                    whiteSpace: 'nowrap',
                  }}
                  whileHover={{ color: isActive ? '#1E3A5F' : '#1A1A1A' }}
                  transition={{ duration: 0.15 }}
                >
                  {tab.label}
                  <span
                    className="font-source-sans font-medium"
                    style={{
                      fontSize: '11px',
                      background: '#F5F5F0',
                      color: '#666666',
                      borderRadius: '10px',
                      padding: '2px 8px',
                      marginLeft: '8px',
                    }}
                  >
                    {tab.count}
                  </span>
                  {isActive && (
                    <motion.div
                      layoutId="activeTabIndicator"
                      className="absolute bottom-0 left-0 right-0"
                      style={{
                        height: '3px',
                        background: '#1E3A5F',
                      }}
                      transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] }}
                    />
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* SECTION 3 — SERVICE GRID                                      */}
      {/* ============================================================ */}
      <section style={{ background: '#F5F5F0', padding: '64px 0 56px' }}>
        <div className="mx-auto" style={{ maxWidth: '1400px', padding: '0 24px' }}>
          <motion.div
            layout
            className="grid gap-6"
            style={{
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            }}
          >
            <AnimatePresence mode="popLayout">
              {visibleServices.map((service, index) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.06,
                    ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
                  }}
                >
                  <ServiceCard service={service} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Load more */}
          {visibleCount < filteredServices.length && (
            <motion.div
              className="flex justify-center"
              style={{ marginTop: '32px' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <button
                onClick={() => setVisibleCount((c) => c + 9)}
                className="font-montserrat font-semibold uppercase cursor-pointer transition-all duration-200 hover:bg-[#1E3A5F] hover:text-white"
                style={{
                  fontSize: '13px',
                  letterSpacing: '0.05em',
                  background: 'transparent',
                  border: '1.5px solid #1E3A5F',
                  color: '#1E3A5F',
                  padding: '14px 28px',
                  borderRadius: '2px',
                }}
              >
                AFFICHER PLUS DE SERVICES
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 4 — MOST REQUESTED                                    */}
      {/* ============================================================ */}
      <section ref={topSectionRef} style={{ background: '#FFFFFF', padding: '48px 0' }}>
        <div className="mx-auto" style={{ maxWidth: '1400px', padding: '0 24px' }}>
          {/* Header */}
          <span
            className="font-source-sans font-medium uppercase block"
            style={{ fontSize: '11px', letterSpacing: '0.1em', color: '#E5B045' }}
          >
            LES PLUS CONSULTÉS
          </span>
          <h2
            className="font-montserrat font-semibold mt-2"
            style={{ fontSize: '30px', color: '#1A1A1A', lineHeight: 1.15 }}
          >
            Services les plus demandés
          </h2>

          {/* Horizontal scrollable cards */}
          <div
            ref={topCardsRef}
            className="flex overflow-x-auto"
            style={{
              gap: '20px',
              marginTop: '40px',
              paddingBottom: '16px',
            }}
          >
            {topServices.map((ts) => (
              <div
                key={ts.rank}
                className="top-card flex-shrink-0 flex flex-col group cursor-pointer transition-all duration-200 hover:bg-white"
                style={{
                  minWidth: '240px',
                  background: '#F5F5F0',
                  border: '1px solid #E8E8E3',
                  borderRadius: '2px',
                  padding: '24px',
                }}
              >
                {/* Rank */}
                <span
                  className="font-montserrat font-bold"
                  style={{
                    fontSize: '36px',
                    color: 'rgba(30,58,95,0.08)',
                    lineHeight: 1,
                  }}
                >
                  {String(ts.rank).padStart(2, '0')}
                </span>

                {/* Icon */}
                <div
                  className="flex items-center justify-center mt-3"
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    background: `${ts.accent}1A`,
                  }}
                >
                  <ts.Icon size={20} style={{ color: ts.accent }} strokeWidth={1.5} />
                </div>

                {/* Title */}
                <h4
                  className="font-montserrat font-semibold mt-3"
                  style={{ fontSize: '15px', color: '#1E3A5F', lineHeight: 1.3 }}
                >
                  {ts.title}
                </h4>

                {/* CTA */}
                <div className="mt-auto pt-4 flex items-center gap-1">
                  <span
                    className="font-montserrat font-semibold uppercase"
                    style={{ fontSize: '11px', color: ts.accent, letterSpacing: '0.04em' }}
                  >
                    Y ALLER
                  </span>
                  <ArrowRight size={12} style={{ color: ts.accent }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 5 — HELP CTA BANNER                                   */}
      {/* ============================================================ */}
      <section
        ref={ctaRef}
        style={{
          background: 'linear-gradient(135deg, #1E3A5F 0%, #2B5C8F 100%)',
          padding: '64px 0',
        }}
      >
        <div
          className="mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
          style={{ maxWidth: '1400px', padding: '0 24px' }}
        >
          <div className="cta-left">
            <h2
              className="font-montserrat font-semibold"
              style={{ fontSize: '26px', color: '#FFFFFF', lineHeight: 1.2 }}
            >
              Vous ne trouvez pas le service recherché ?
            </h2>
            <p
              className="font-source-sans font-normal mt-2"
              style={{ fontSize: '15px', color: 'rgba(255,255,255,0.75)' }}
            >
              Notre équipe d'assistance est disponible du lundi au vendredi, 9h–18h.
            </p>
          </div>
          <div className="cta-right flex flex-wrap items-center gap-4">
            <Link
              to="/contact"
              className="font-montserrat font-semibold uppercase no-underline inline-flex items-center transition-all duration-200 hover:translate-y-[-1px]"
              style={{
                fontSize: '13px',
                letterSpacing: '0.05em',
                background: '#FFFFFF',
                color: '#1E3A5F',
                padding: '14px 28px',
                borderRadius: '2px',
              }}
            >
              NOUS CONTACTER
            </Link>
            <Link
              to="/contact"
              className="font-montserrat font-semibold uppercase no-underline inline-flex items-center transition-all duration-200 hover:bg-white/10"
              style={{
                fontSize: '13px',
                letterSpacing: '0.05em',
                background: 'transparent',
                color: '#FFFFFF',
                padding: '14px 28px',
                borderRadius: '2px',
                border: '1px solid rgba(255,255,255,0.5)',
              }}
            >
              CONSULTER LA FAQ
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
