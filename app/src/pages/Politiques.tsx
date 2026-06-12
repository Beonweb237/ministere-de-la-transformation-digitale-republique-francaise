import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Zap,
  Monitor,
  Users,
  Landmark,
  FileText,
  Download,
  CheckCircle,
  Clock,
  AlertCircle,
  ChevronRight,
  ArrowRight,
} from 'lucide-react';
import type { ReactNode } from 'react';

gsap.registerPlugin(ScrollTrigger);

/* ───────────────────────── types ───────────────────────── */

interface Pillar {
  color: string;
  icon: ReactNode;
  title: string;
  description: string;
}

interface Program {
  name: string;
  pillar: string;
  start: string;
  end: string;
  color: string;
  description: string;
  milestones: { label: string; status: 'done' | 'progress' | 'pending' }[];
  status: 'EN COURS' | 'À VENIR' | 'TERMINÉ';
}

interface ProgramCard {
  color: string;
  tag: string;
  title: string;
  description: string;
  kpis: { number: string; label: string }[];
}

interface Report {
  title: string;
  type: string;
  size: string;
  description: string;
}

/* ───────────────────────── data ───────────────────────── */

const pillars: Pillar[] = [
  {
    color: '#E5B045',
    icon: <Zap size={40} strokeWidth={1.5} />,
    title: 'Simplifier l\'accès aux services publics',
    description: 'Réduire la complexité administrative. 100% des démarches accessibles en ligne d\'ici 2027.',
  },
  {
    color: '#A3C8D8',
    icon: <Monitor size={40} strokeWidth={1.5} />,
    title: 'Accélérer la transformation numérique',
    description: 'Cloud souverain, IA au service du public, identité numérique universelle d\'ici 2030.',
  },
  {
    color: '#4A7C6F',
    icon: <Users size={40} strokeWidth={1.5} />,
    title: 'Soutenir la vie associative et l\'ESS',
    description: '1,5 million d\'associations accompagnées. L\'économie sociale et solidaire au cœur du modèle français.',
  },
  {
    color: '#7A9E7E',
    icon: <Landmark size={40} strokeWidth={1.5} />,
    title: 'Accompagner les territoires',
    description: '35 000 communes connectées. Financements, outils et accompagnement pour chaque territoire.',
  },
];

const timelinePrograms: Program[] = [
  {
    name: 'FranceConnect+ universel',
    pillar: 'Numérique',
    start: 'Q1 2026',
    end: 'Q4 2027',
    color: '#A3C8D8',
    description: 'Déploiement universel de FranceConnect+ pour permettre l\'accès sécurisé à tous les services publics en ligne.',
    milestones: [
      { label: 'Phase pilote lancée', status: 'done' },
      { label: 'Intégration 100 services', status: 'progress' },
      { label: 'Déploiement national', status: 'pending' },
    ],
    status: 'EN COURS',
  },
  {
    name: 'Cloud souverain INTERCONNECT',
    pillar: 'Numérique',
    start: 'Q2 2026',
    end: 'Q4 2028',
    color: '#A3C8D8',
    description: 'Construction d\'un cloud de confiance souverain pour l\'État et les collectivités territoriales.',
    milestones: [
      { label: 'Infrastructure initiale', status: 'done' },
      { label: 'Certification SecNumCloud', status: 'progress' },
      { label: 'Migration 40 administrations', status: 'pending' },
    ],
    status: 'EN COURS',
  },
  {
    name: '100% démarches en ligne',
    pillar: 'Citoyens',
    start: 'Q1 2026',
    end: 'Q4 2027',
    color: '#E5B045',
    description: 'Objectif : 100% des démarches administratives accessibles en ligne, pour tous les citoyens.',
    milestones: [
      { label: 'Audit des démarches restantes', status: 'done' },
      { label: 'Dématérialisation en cours', status: 'progress' },
      { label: 'Accompagnement digital', status: 'pending' },
    ],
    status: 'EN COURS',
  },
  {
    name: 'Guichets France Services ×2',
    pillar: 'Citoyens',
    start: 'Q3 2026',
    end: 'Q4 2028',
    color: '#E5B045',
    description: 'Doublement du réseau France Services pour couvrir l\'intégralité du territoire national.',
    milestones: [
      { label: 'Sélection des communes', status: 'done' },
      { label: 'Recrutement agents', status: 'progress' },
      { label: 'Ouverture guichets', status: 'pending' },
    ],
    status: 'À VENIR',
  },
  {
    name: 'Plan ESS 2030',
    pillar: 'Associations',
    start: 'Q1 2026',
    end: 'Q4 2030',
    color: '#4A7C6F',
    description: 'Plan stratégique pour l\'économie sociale et solidaire : financement, simplification, visibilité.',
    milestones: [
      { label: 'Concertation nationale', status: 'done' },
      { label: 'Lancement des appels à projets', status: 'progress' },
      { label: 'Déploiement territorial', status: 'pending' },
    ],
    status: 'EN COURS',
  },
  {
    name: 'Plateforme associative unique',
    pillar: 'Associations',
    start: 'Q2 2026',
    end: 'Q2 2027',
    color: '#4A7C6F',
    description: 'Création d\'un portail unique pour toutes les démarches associatives : déclaration, financement, vie associative.',
    milestones: [
      { label: 'Cahier des charges', status: 'done' },
      { label: 'Développement MVP', status: 'progress' },
      { label: 'Ouverture grand public', status: 'pending' },
    ],
    status: 'EN COURS',
  },
  {
    name: 'France Numérique Collective',
    pillar: 'Collectivités',
    start: 'Q1 2026',
    end: 'Q4 2029',
    color: '#7A9E7E',
    description: 'Accompagnement personnalisé des collectivités territoriales dans leur transformation numérique responsable.',
    milestones: [
      { label: 'Diagnostic territorial', status: 'done' },
      { label: 'Déploiement des conseillers', status: 'progress' },
      { label: 'Mesure d\'impact', status: 'pending' },
    ],
    status: 'EN COURS',
  },
  {
    name: 'IA générative pilote ×50',
    pillar: 'Numérique',
    start: 'Q3 2026',
    end: 'Q4 2027',
    color: '#A3C8D8',
    description: '50 projets pilotes d\'IA générative dans l\'administration pour évaluer les cas d\'usage et l\'impact.',
    milestones: [
      { label: 'Sélection des 50 projets', status: 'progress' },
      { label: 'Formation des agents', status: 'pending' },
      { label: 'Bilan et recommandations', status: 'pending' },
    ],
    status: 'À VENIR',
  },
];

const programCards: ProgramCard[] = [
  {
    color: '#E5B045',
    tag: 'CITOYENS',
    title: 'Programme France Services 2026',
    description: 'Déploiement de 2 600 guichets France Services sur tout le territoire pour accompagner les citoyens dans leurs démarches numériques.',
    kpis: [
      { number: '2 600', label: 'guichets' },
      { number: '98%', label: 'satisfaction' },
      { number: '15M', label: 'usagers/an' },
    ],
  },
  {
    color: '#A3C8D8',
    tag: 'NUMÉRIQUE',
    title: 'Cloud Souverain INTERCONNECT',
    description: "Construction d\'un cloud de confiance pour l\'État et les collectivités, garantissant la souveraineté numérique et la protection des données.",
    kpis: [
      { number: '40', label: 'administrations' },
      { number: '12', label: 'régions' },
      { number: '100%', label: 'souverain' },
    ],
  },
  {
    color: '#4A7C6F',
    tag: 'ASSOCIATIONS',
    title: 'Plan Vie Associative 2030',
    description: "Accompagnement des 1,5 million d\'associations françaises : simplification des démarches, financement, formation des bénévoles.",
    kpis: [
      { number: '1,5M', label: 'associations' },
      { number: '€2,4Md', label: 'subventions' },
      { number: '12M', label: 'bénévoles' },
    ],
  },
  {
    color: '#7A9E7E',
    tag: 'COLLECTIVITÉS',
    title: 'France Numérique Collective',
    description: 'Accompagnement personnalisé des collectivités territoriales dans leur transformation numérique responsable.',
    kpis: [
      { number: '35 000', label: 'communes' },
      { number: '13', label: 'régions pilotes' },
      { number: '500', label: 'experts' },
    ],
  },
];

const reports: Report[] = [
  { title: "Rapport d\'activité 2025", type: 'PDF', size: '4,2 Mo', description: 'Bilan annuel des actions et résultats du ministère' },
  { title: 'Feuille de route Numérique 2026–2030', type: 'PDF', size: '8,5 Mo', description: 'Stratégie nationale de transformation numérique' },
  { title: 'Évaluation du programme France Services', type: 'PDF', size: '2,1 Mo', description: 'Rapport d\'évaluation indépendant, juin 2025' },
  { title: 'Étude : L\'IA dans l\'action publique', type: 'PDF', size: '3,8 Mo', description: 'Prospective et recommandations' },
  { title: 'Baromètre de la confiance numérique 2025', type: 'PDF', size: '1,9 Mo', description: 'Enquête annuelle sur la perception des services numériques' },
];

/* ───────────────────────── helpers ───────────────────────── */

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      const items = ref.current!.querySelectorAll('.reveal-item');
      gsap.from(items, {
        opacity: 0,
        y: 40,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 80%',
          once: true,
        },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return ref;
}

function useSectionReveal() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.from(ref.current!, {
        opacity: 0,
        y: 30,
        duration: 0.5,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 85%',
          once: true,
        },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return ref;
}

function StatusBadge({ status }: { status: string }) {
  const colorMap: Record<string, string> = {
    'EN COURS': 'rgba(229,176,69,0.1)',
    'À VENIR': 'rgba(163,200,216,0.15)',
    'TERMINÉ': 'rgba(74,124,111,0.1)',
  };
  const textColorMap: Record<string, string> = {
    'EN COURS': '#C49A3A',
    'À VENIR': '#2B5C8F',
    'TERMINÉ': '#4A7C6F',
  };
  return (
    <span
      className="font-source-sans font-semibold uppercase"
      style={{
        fontSize: '10px',
        background: colorMap[status] || 'rgba(102,102,102,0.1)',
        color: textColorMap[status] || '#666666',
        padding: '4px 10px',
        borderRadius: '2px',
      }}
    >
      {status}
    </span>
  );
}

/* ───────────────────────── main component ───────────────────────── */

export default function Politiques() {
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
  const heroRef = useSectionReveal();
  const pillarsRef = useScrollReveal();
  const timelineRef = useScrollReveal();
  const programsRef = useScrollReveal();
  const reportsRef = useScrollReveal();
  const ctaRef = useSectionReveal();

  const heroAnimRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!heroAnimRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from('.hero-title', {
        opacity: 0, y: 25, duration: 0.6, ease: 'power3.out',
      });
      gsap.from('.hero-subtitle', {
        opacity: 0, y: 25, duration: 0.6, ease: 'power3.out', delay: 0.15,
      });
      gsap.from('.hero-cta', {
        opacity: 0, y: 25, duration: 0.6, ease: 'power3.out', delay: 0.3,
      });
    }, heroAnimRef);
    return () => ctx.revert();
  }, []);

  return (
    <div>
      {/* ======== SECTION 1: PAGE HERO ======== */}
      <section
        className="relative"
        style={{
          backgroundImage: 'url(/politiques-hero.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          padding: '100px 0 60px',
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, rgba(15,31,51,0.92) 0%, rgba(30,58,95,0.85) 100%)',
          }}
        />
        <div ref={heroAnimRef} className="relative mx-auto" style={{ maxWidth: '1400px', padding: '0 24px' }}>
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-6" style={{ marginBottom: '24px' }}>
            <Link
              to="/"
              className="no-underline font-source-sans font-normal"
              style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)' }}
            >
              Accueil
            </Link>
            <ChevronRight size={14} style={{ color: 'rgba(255,255,255,0.3)' }} />
            <span className="font-source-sans font-normal" style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)' }}>
              Politiques Publiques
            </span>
          </div>

          <h1
            className="hero-title font-montserrat font-semibold"
            style={{
              fontSize: '52px',
              color: '#FFFFFF',
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
            }}
          >
            Politiques Publiques
          </h1>
          <p
            className="hero-subtitle font-source-sans font-normal"
            style={{
              fontSize: '18px',
              color: 'rgba(255,255,255,0.8)',
              maxWidth: '640px',
              marginTop: '16px',
              lineHeight: 1.6,
            }}
          >
            Découvrez les grandes orientations, programmes et feuilles de route du ministère pour transformer l\'action publique au service des Français.
          </p>
          <div className="hero-cta flex flex-wrap items-center" style={{ marginTop: '36px', gap: '16px' }}>
            <Link
              to="#timeline"
              className="inline-flex items-center gap-2 no-underline font-montserrat font-semibold uppercase transition-all duration-200"
              style={{
                fontSize: '13px',
                letterSpacing: '0.05em',
                background: '#FFFFFF',
                color: '#1E3A5F',
                padding: '14px 28px',
                borderRadius: '2px',
              }}
            >
              CONSULTER LA FEUILLE DE ROUTE
            </Link>
            <Link
              to="#rapports"
              className="inline-flex items-center gap-2 no-underline font-montserrat font-semibold uppercase transition-all duration-200"
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
              RAPPORTS ET ÉVALUATIONS
            </Link>
          </div>
        </div>
      </section>

      {/* ======== SECTION 2: VISION & MISSIONS ======== */}
      <section style={{ background: '#FFFFFF', padding: '56px 0' }}>
        <div ref={pillarsRef} className="mx-auto" style={{ maxWidth: '1400px', padding: '0 24px' }}>
          {/* Header */}
          <div className="text-center reveal-item" style={{ marginBottom: '32px' }}>
            <span
              className="font-source-sans font-medium uppercase"
              style={{ fontSize: '11px', letterSpacing: '0.12em', color: '#E5B045' }}
            >
              NOTRE VISION
            </span>
            <h2
              className="font-montserrat font-semibold"
              style={{
                fontSize: '36px',
                color: '#1E3A5F',
                lineHeight: 1.15,
                letterSpacing: '-0.01em',
                marginTop: '12px',
              }}
            >
              Quatre missions pour transformer l\'action publique
            </h2>
            <div
              className="mx-auto"
              style={{
                width: '40px',
                height: '2px',
                background: '#E5B045',
                marginTop: '16px',
              }}
            />
          </div>

          {/* Pillar cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" style={{ gap: '32px' }}>
            {pillars.map((pillar, i) => (
              <motion.div
                key={pillar.title}
                className="reveal-item relative flex flex-col items-center overflow-hidden transition-all duration-300"
                style={{
                  background: '#F5F5F0',
                  border: `1px solid #E8E8E3`,
                  borderRadius: '2px',
                  padding: '40px 32px',
                  textAlign: 'center',
                }}
                whileHover={{
                  boxShadow: '0 8px 24px rgba(0,0,0,0.06)',
                  y: -3,
                  borderColor: pillar.color + '66',
                }}
              >
                {/* Top accent */}
                <div
                  className="absolute top-0 left-0 right-0"
                  style={{ height: '4px', background: pillar.color }}
                />
                {/* Icon circle */}
                <div
                  className="flex items-center justify-center"
                  style={{
                    width: '72px',
                    height: '72px',
                    borderRadius: '50%',
                    background: pillar.color + '14',
                    color: pillar.color,
                  }}
                >
                  {pillar.icon}
                </div>
                <h3
                  className="font-montserrat font-semibold"
                  style={{
                    fontSize: '18px',
                    color: '#1E3A5F',
                    marginTop: '20px',
                  }}
                >
                  {pillar.title}
                </h3>
                <p
                  className="font-source-sans font-normal"
                  style={{
                    fontSize: '14px',
                    color: '#666666',
                    lineHeight: 1.65,
                    marginTop: '12px',
                  }}
                >
                  {pillar.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ======== SECTION 3: INTERACTIVE TIMELINE ======== */}
      <section id="timeline" style={{ background: '#F5F5F0', padding: '56px 0' }}>
        <div ref={timelineRef} className="mx-auto" style={{ maxWidth: '1400px', padding: '0 24px' }}>
          {/* Header */}
          <div className="reveal-item" style={{ marginBottom: '32px' }}>
            <span
              className="font-source-sans font-medium uppercase"
              style={{ fontSize: '11px', letterSpacing: '0.1em', color: '#E5B045' }}
            >
              FEUILLE DE ROUTE 2026–2030
            </span>
            <h2
              className="font-montserrat font-semibold"
              style={{
                fontSize: '36px',
                color: '#1E3A5F',
                lineHeight: 1.15,
                letterSpacing: '-0.01em',
                marginTop: '12px',
              }}
            >
              Nos chantiers prioritaires
            </h2>
          </div>

          {/* Timeline Grid */}
          <div className="reveal-item overflow-x-auto" style={{ marginBottom: '32px' }}>
            <div style={{ minWidth: '900px' }}>
              {/* Year labels */}
              <div className="flex" style={{ marginBottom: '16px', paddingLeft: '200px' }}>
                {['2026', '2027', '2028', '2029', '2030'].map((year) => (
                  <div key={year} className="flex-1 text-center">
                    <span
                      className="font-montserrat font-semibold"
                      style={{ fontSize: '14px', color: '#1E3A5F' }}
                    >
                      {year}
                    </span>
                  </div>
                ))}
              </div>

              {/* Quarter grid lines */}
              <div className="relative" style={{ paddingLeft: '200px' }}>
                <div className="absolute inset-0 flex">
                  {Array.from({ length: 20 }).map((_, i) => (
                    <div
                      key={i}
                      className="flex-1"
                      style={{
                        borderLeft: i % 4 === 0 ? '1px solid #D6D6D0' : '1px dashed #E8E8E3',
                        height: '100%',
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Program bars */}
              <div style={{ paddingLeft: '200px' }}>
                {timelinePrograms.map((prog, idx) => {
                  const qStart = parseInt(prog.start.match(/Q(\d)/)?.[1] || '1');
                  const yearStart = parseInt(prog.start.match(/(\d{4})/)?.[1] || '2026');
                  const qEnd = parseInt(prog.end.match(/Q(\d)/)?.[1] || '4');
                  const yearEnd = parseInt(prog.end.match(/(\d{4})/)?.[1] || '2030');

                  const startUnit = (yearStart - 2026) * 4 + (qStart - 1);
                  const endUnit = (yearEnd - 2026) * 4 + (qEnd - 1);
                  const leftPct = (startUnit / 20) * 100;
                  const widthPct = ((endUnit - startUnit + 1) / 20) * 100;

                  return (
                    <div
                      key={prog.name}
                      className="relative flex items-center"
                      style={{ height: '48px', marginBottom: '6px' }}
                    >
                      {/* Program label */}
                      <div
                        className="absolute left-0 flex items-center"
                        style={{ width: '190px', height: '40px' }}
                      >
                        <span
                          className="font-source-sans font-medium truncate"
                          style={{ fontSize: '12px', color: '#1A1A1A' }}
                        >
                          {prog.name}
                        </span>
                      </div>
                      {/* Bar */}
                      <motion.div
                        className="absolute cursor-pointer flex items-center justify-center overflow-hidden"
                        style={{
                          left: `${leftPct}%`,
                          width: `${widthPct}%`,
                          height: '36px',
                          background: prog.color,
                          borderRadius: '4px',
                        }}
                        whileHover={{ height: 48 }}
                        onClick={() => setSelectedProgram(prog)}
                        transition={{ duration: 0.2 }}
                      >
                        <span
                          className="font-montserrat font-medium truncate px-2"
                          style={{ fontSize: '11px', color: '#FFFFFF' }}
                        >
                          {prog.name}
                        </span>
                      </motion.div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="reveal-item flex flex-wrap items-center justify-center" style={{ gap: '16px', marginBottom: '32px' }}>
            {[
              { label: 'Citoyens', color: '#E5B045' },
              { label: 'Numérique', color: '#A3C8D8' },
              { label: 'Associations', color: '#4A7C6F' },
              { label: 'Collectivités', color: '#7A9E7E' },
            ].map((item) => (
              <div key={item.label} className="flex items-center" style={{ gap: '8px' }}>
                <div style={{ width: '12px', height: '12px', background: item.color, borderRadius: '2px' }} />
                <span className="font-source-sans font-normal" style={{ fontSize: '12px', color: '#666666' }}>
                  {item.label}
                </span>
              </div>
            ))}
          </div>

          {/* Detail panel */}
          <AnimatePresence>
            {selectedProgram && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] }}
                style={{
                  background: '#FFFFFF',
                  border: '1px solid #E8E8E3',
                  borderRadius: '2px',
                  overflow: 'hidden',
                }}
              >
                <div style={{ padding: '32px' }}>
                  <div className="flex items-center justify-between flex-wrap" style={{ gap: '12px', marginBottom: '20px' }}>
                    <h3 className="font-montserrat font-semibold" style={{ fontSize: '20px', color: '#1E3A5F' }}>
                      {selectedProgram.name}
                    </h3>
                    <StatusBadge status={selectedProgram.status} />
                  </div>
                  <p
                    className="font-source-sans font-normal"
                    style={{ fontSize: '14px', color: '#666666', lineHeight: 1.65, marginBottom: '20px' }}
                  >
                    {selectedProgram.description}
                  </p>
                  <div className="flex flex-col" style={{ gap: '10px' }}>
                    {selectedProgram.milestones.map((m) => (
                      <div key={m.label} className="flex items-center" style={{ gap: '10px' }}>
                        {m.status === 'done' && <CheckCircle size={16} style={{ color: '#4A7C6F', flexShrink: 0 }} />}
                        {m.status === 'progress' && <Clock size={16} style={{ color: '#E5B045', flexShrink: 0 }} />}
                        {m.status === 'pending' && <AlertCircle size={16} style={{ color: '#999999', flexShrink: 0 }} />}
                        <span className="font-montserrat font-medium" style={{ fontSize: '14px', color: '#1A1A1A' }}>
                          {m.label}
                        </span>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => setSelectedProgram(null)}
                    className="mt-4 font-source-sans font-medium cursor-pointer bg-transparent border-none"
                    style={{ fontSize: '13px', color: '#1E3A5F', textDecoration: 'underline' }}
                  >
                    Fermer
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ======== SECTION 4: PROGRAM CARDS ======== */}
      <section style={{ background: '#FFFFFF', padding: '48px 0' }}>
        <div ref={programsRef} className="mx-auto" style={{ maxWidth: '1400px', padding: '0 24px' }}>
          {/* Header */}
          <div className="reveal-item" style={{ marginBottom: '40px' }}>
            <span
              className="font-source-sans font-medium uppercase"
              style={{ fontSize: '11px', letterSpacing: '0.1em', color: '#E5B045' }}
            >
              PROGRAMMES
            </span>
            <h2
              className="font-montserrat font-semibold"
              style={{
                fontSize: '30px',
                color: '#1A1A1A',
                lineHeight: 1.15,
                marginTop: '8px',
              }}
            >
              Nos programmes en détail
            </h2>
          </div>

          {/* Cards grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2" style={{ gap: '24px' }}>
            {programCards.map((card, i) => (
              <motion.div
                key={card.title}
                className="reveal-item overflow-hidden transition-all duration-300"
                style={{
                  background: '#F5F5F0',
                  border: '1px solid #E8E8E3',
                  borderRadius: '2px',
                }}
                whileHover={{
                  boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
                  y: -2,
                }}
              >
                {/* Color header */}
                <div style={{ height: '60px', background: card.color }} />
                <div style={{ padding: '32px' }}>
                  <span
                    className="font-source-sans font-medium uppercase"
                    style={{ fontSize: '10px', color: card.color, letterSpacing: '0.06em' }}
                  >
                    {card.tag}
                  </span>
                  <h3
                    className="font-montserrat font-semibold"
                    style={{ fontSize: '20px', color: '#1E3A5F', marginTop: '8px' }}
                  >
                    {card.title}
                  </h3>
                  <p
                    className="font-source-sans font-normal"
                    style={{ fontSize: '14px', color: '#666666', lineHeight: 1.65, marginTop: '12px' }}
                  >
                    {card.description}
                  </p>
                  {/* KPIs */}
                  <div className="flex flex-wrap" style={{ gap: '24px', marginTop: '20px' }}>
                    {card.kpis.map((kpi) => (
                      <div key={kpi.label}>
                        <div className="font-montserrat font-bold" style={{ fontSize: '22px', color: '#1E3A5F' }}>
                          {kpi.number}
                        </div>
                        <div
                          className="font-source-sans font-normal uppercase"
                          style={{ fontSize: '11px', color: '#666666', letterSpacing: '0.04em' }}
                        >
                          {kpi.label}
                        </div>
                      </div>
                    ))}
                  </div>
                  <Link
                    to="#"
                    className="inline-flex items-center gap-1 no-underline font-montserrat font-semibold uppercase transition-colors duration-200"
                    style={{ fontSize: '12px', color: '#1E3A5F', marginTop: '20px' }}
                  >
                    DÉCOUVRIR LE PROGRAMME <ArrowRight size={14} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ======== SECTION 5: RAPPORTS ET ÉVALUATIONS ======== */}
      <section id="rapports" style={{ background: '#F5F5F0', padding: '48px 0' }}>
        <div ref={reportsRef} className="mx-auto" style={{ maxWidth: '1400px', padding: '0 24px' }}>
          {/* Header */}
          <div className="reveal-item" style={{ marginBottom: '36px' }}>
            <span
              className="font-source-sans font-medium uppercase"
              style={{ fontSize: '11px', letterSpacing: '0.1em', color: '#666666' }}
            >
              DOCUMENTS STRATÉGIQUES
            </span>
            <h2
              className="font-montserrat font-semibold"
              style={{
                fontSize: '30px',
                color: '#1A1A1A',
                lineHeight: 1.15,
                marginTop: '8px',
              }}
            >
              Rapports et évaluations
            </h2>
            <p
              className="font-source-sans font-normal"
              style={{ fontSize: '15px', color: '#666666', marginTop: '8px', lineHeight: 1.6 }}
            >
              Consultez les rapports d\'activité, les évaluations des programmes et les études stratégiques du ministère.
            </p>
          </div>

          {/* Reports table */}
          <div
            className="reveal-item"
            style={{
              background: '#FFFFFF',
              border: '1px solid #E8E8E3',
              borderRadius: '2px',
              overflow: 'hidden',
            }}
          >
            {reports.map((report, i) => (
              <motion.div
                key={report.title}
                className="flex flex-wrap items-center justify-between transition-colors duration-150 cursor-pointer"
                style={{
                  padding: '18px 24px',
                  borderBottom: i < reports.length - 1 ? '1px solid #E8E8E3' : 'none',
                  gap: '12px',
                }}
                whileHover={{ background: '#F5F5F0' }}
              >
                <div className="flex items-center flex-1" style={{ gap: '12px', minWidth: '250px' }}>
                  <FileText size={20} style={{ color: '#1E3A5F', flexShrink: 0 }} />
                  <div>
                    <div className="font-montserrat font-medium" style={{ fontSize: '14px', color: '#1A1A1A' }}>
                      {report.title}
                    </div>
                    <div className="font-source-sans font-normal" style={{ fontSize: '12px', color: '#666666' }}>
                      {report.description}
                    </div>
                  </div>
                </div>
                <div className="flex items-center" style={{ gap: '20px' }}>
                  <span
                    className="font-source-sans font-medium uppercase"
                    style={{
                      fontSize: '10px',
                      color: '#1E3A5F',
                      background: 'rgba(30,58,95,0.08)',
                      padding: '4px 10px',
                      borderRadius: '2px',
                    }}
                  >
                    {report.type}
                  </span>
                  <span className="font-source-sans font-normal" style={{ fontSize: '12px', color: '#666666', minWidth: '55px' }}>
                    {report.size}
                  </span>
                  <motion.button
                    className="flex items-center justify-center bg-transparent border-none cursor-pointer"
                    style={{ color: '#1E3A5F', padding: '4px' }}
                    whileHover={{ color: '#2B5C8F', scale: 1.1 }}
                    transition={{ duration: 0.15 }}
                    aria-label={`Télécharger ${report.title}`}
                  >
                    <Download size={18} />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ======== SECTION 6: CONTACT CTA ======== */}
      <section
        ref={ctaRef}
        style={{
          background: 'linear-gradient(135deg, #1E3A5F 0%, #0F1F33 100%)',
          padding: '64px 0',
        }}
      >
        <div className="mx-auto" style={{ maxWidth: '1400px', padding: '0 24px' }}>
          <div className="flex flex-col md:flex-row items-center justify-between" style={{ gap: '24px' }}>
            <div>
              <h2
                className="font-montserrat font-semibold"
                style={{ fontSize: '26px', color: '#FFFFFF' }}
              >
                Vous souhaitez en savoir plus sur nos politiques ?
              </h2>
              <p
                className="font-source-sans font-normal"
                style={{ fontSize: '15px', color: 'rgba(255,255,255,0.75)', marginTop: '8px' }}
              >
                La Direction de l\'Information Légale et Administrative est à votre disposition.
              </p>
            </div>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 no-underline font-montserrat font-semibold uppercase transition-all duration-200 shrink-0"
              style={{
                fontSize: '13px',
                letterSpacing: '0.05em',
                background: '#FFFFFF',
                color: '#1E3A5F',
                padding: '14px 28px',
                borderRadius: '2px',
              }}
            >
              CONTACTER LA DILA
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
