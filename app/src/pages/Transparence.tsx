import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Area,
  AreaChart,
} from 'recharts';
import {
  Globe,
  ExternalLink,
  ArrowUp,
  ArrowDown,
  FileText,
  Download,
  ChevronRight,
  ChevronDown,
} from 'lucide-react';
import type { ReactNode } from 'react';

gsap.registerPlugin(ScrollTrigger);

/* ───────────────────────── types ───────────────────────── */

interface KeyFigure {
  number: string;
  label: string;
  trend: number;
  trendLabel: string;
}

interface BudgetSegment {
  name: string;
  value: number;
  amount: string;
  color: string;
}

interface Contract {
  object: string;
  supplier: string;
  amount: string;
  date: string;
  status: 'Signé' | 'En cours' | 'Terminé';
}

interface OrgNode {
  title: string;
  subtitle?: string;
  level: number;
  color?: string;
  bg?: string;
  border?: string;
  children?: OrgNode[];
}

interface DocItem {
  title: string;
  format: string;
  size: string;
}

/* ───────────────────────── data ───────────────────────── */

const keyFigures: KeyFigure[] = [
  { number: '€5,2Md', label: 'BUDGET TOTAL', trend: 4.2, trendLabel: 'vs 2025' },
  { number: '1 847', label: 'AGENTS', trend: 3.1, trendLabel: 'vs 2025' },
  { number: '€892M', label: 'INVESTISSEMENTS NUMÉRIQUES', trend: 8.5, trendLabel: 'vs 2025' },
  { number: '12 450', label: 'CONTRATS PUBLICS', trend: 2.8, trendLabel: 'vs 2025' },
];

const budgetData: BudgetSegment[] = [
  { name: 'Transformation Numérique', value: 36, amount: '€1 890M', color: '#A3C8D8' },
  { name: 'Services aux Citoyens', value: 30, amount: '€1 560M', color: '#E5B045' },
  { name: 'Vie Associative & ESS', value: 17, amount: '€890M', color: '#4A7C6F' },
  { name: 'Collectivités Territoriales', value: 10, amount: '€520M', color: '#7A9E7E' },
  { name: 'Administration & Pilotage', value: 7, amount: '€340M', color: '#B85C6E' },
];

const evolutionData = [
  { year: '2022', budget: 3200 },
  { year: '2023', budget: 3800 },
  { year: '2024', budget: 4500 },
  { year: '2025', budget: 4980 },
  { year: '2026', budget: 5200 },
];

const contracts: Contract[] = [
  { object: 'Fourniture cloud souverain phase 2', supplier: 'Scalable/OVHcloud', amount: '€45,2M', date: '12/2025', status: 'Signé' },
  { object: 'Accompagnement transformation numérique collectivités', supplier: 'Capgemini', amount: '€28,7M', date: '11/2025', status: 'En cours' },
  { object: 'Plateforme FranceConnect+', supplier: 'IN Groupe', amount: '€19,4M', date: '10/2025', status: 'Signé' },
  { object: 'Étude évaluation programmes associatifs', supplier: 'BVA', amount: '€890K', date: '09/2025', status: 'Terminé' },
  { object: 'Infogérance cybersécurité SOC', supplier: 'Thalès', amount: '€12,1M', date: '08/2025', status: 'Signé' },
];

const orgData: OrgNode = {
  title: 'MINISTRE',
  level: 1,
  color: '#FFFFFF',
  bg: '#1E3A5F',
  children: [
    {
      title: 'CABINET MINISTÉRIEL',
      level: 2,
      color: '#FFFFFF',
      bg: '#2B5C8F',
      children: [
        {
          title: 'DIRECTION GÉNÉRALE',
          subtitle: 'DG',
          level: 3,
          bg: '#FFFFFF',
          border: '#1E3A5F',
          children: [
            { title: 'Sous-direction Ressources Humaines', level: 4 },
            { title: 'Sous-direction Finances', level: 4 },
            { title: 'Sous-direction Juridique', level: 4 },
          ],
        },
        {
          title: 'DIRECTION NUMÉRIQUE',
          subtitle: 'DNUM',
          level: 3,
          bg: '#FFFFFF',
          border: '#1E3A5F',
          children: [
            { title: 'Service Cloud Souverain', level: 4 },
            { title: 'Service Cybersécurité', level: 4 },
            { title: 'Service IA et Data', level: 4 },
          ],
        },
        {
          title: 'DIRECTION TERRITORIALE',
          subtitle: 'DT',
          level: 3,
          bg: '#FFFFFF',
          border: '#1E3A5F',
          children: [
            { title: 'Service Collectivités', level: 4 },
            { title: 'Service France Services', level: 4 },
          ],
        },
        {
          title: 'DIRECTION BUDGET',
          subtitle: 'DB',
          level: 3,
          bg: '#FFFFFF',
          border: '#1E3A5F',
          children: [
            { title: 'Service Programmation', level: 4 },
            { title: 'Service Contrôle de Gestion', level: 4 },
          ],
        },
      ],
    },
  ],
};

const financialDocs: DocItem[] = [
  { title: 'Budget 2026 — LFI', format: 'PDF', size: '5,8 Mo' },
  { title: 'Compte financier 2025', format: 'PDF', size: '3,2 Mo' },
  { title: 'Rapport annuel de performance', format: 'PDF', size: '2,4 Mo' },
  { title: 'Liste des traitements indiciaires', format: 'PDF', size: '890 Ko' },
];

const openDataDocs: DocItem[] = [
  { title: 'Contrats publics 2025 (dataset)', format: 'CSV', size: '1,2 Mo' },
  { title: 'Subventions attribuées 2025', format: 'XLSX', size: '890 Ko' },
  { title: 'Effectifs par direction', format: 'CSV', size: '450 Ko' },
  { title: 'Indicateurs de performance', format: 'XLSX', size: '670 Ko' },
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
        scrollTrigger: { trigger: ref.current, start: 'top 80%', once: true },
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
        scrollTrigger: { trigger: ref.current, start: 'top 85%', once: true },
      });
    }, ref);
    return () => ctx.revert();
  }, []);
  return ref;
}

function StatusBadge({ status }: { status: string }) {
  const config: Record<string, { bg: string; color: string }> = {
    'Signé': { bg: 'rgba(74,124,111,0.1)', color: '#4A7C6F' },
    'En cours': { bg: 'rgba(229,176,69,0.1)', color: '#C49A3A' },
    'Terminé': { bg: 'rgba(102,102,102,0.1)', color: '#666666' },
  };
  const c = config[status] || { bg: 'rgba(102,102,102,0.1)', color: '#666666' };
  return (
    <span
      className="font-source-sans font-semibold uppercase"
      style={{ fontSize: '10px', background: c.bg, color: c.color, padding: '4px 10px', borderRadius: '2px' }}
    >
      {status}
    </span>
  );
}

/* ───────────────────────── custom tooltip for donut ───────────────────────── */

function DonutTooltip({ active, payload }: { active?: boolean; payload?: Array<{ payload: BudgetSegment }> }) {
  if (active && payload && payload.length) {
    const d = payload[0].payload;
    return (
      <div
        style={{
          background: '#FFFFFF',
          border: '1px solid #E8E8E3',
          borderRadius: '2px',
          padding: '8px 12px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        }}
      >
        <div className="font-montserrat font-semibold" style={{ fontSize: '13px', color: '#1E3A5F' }}>
          {d.name}
        </div>
        <div className="font-source-sans font-normal" style={{ fontSize: '12px', color: '#666666' }}>
          {d.amount} ({d.value}%)
        </div>
      </div>
    );
  }
  return null;
}

/* ───────────────────────── org chart node ───────────────────────── */

function OrgChartNode({ node }: { node: OrgNode }) {
  const [expanded, setExpanded] = useState(false);
  const hasChildren = node.children && node.children.length > 0;

  const isExpandable = node.level === 3 && hasChildren;

  return (
    <div className="flex flex-col items-center">
      {/* Node box */}
      <motion.div
        className="relative flex flex-col items-center justify-center cursor-pointer"
        style={{
          padding: node.level === 1 ? '16px 24px' : '12px 20px',
          minWidth: node.level === 1 ? '200px' : node.level === 2 ? '240px' : '180px',
          minHeight: node.level === 1 ? '56px' : node.level === 2 ? '48px' : '40px',
          background: node.bg || '#FFFFFF',
          color: node.color || '#1E3A5F',
          border: node.border ? `2px solid ${node.border}` : '2px solid transparent',
          borderRadius: '2px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
          textAlign: 'center',
        }}
        whileHover={{
          boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
          y: -1,
        }}
        onClick={() => isExpandable && setExpanded(!expanded)}
        transition={{ duration: 0.2 }}
      >
        <span
          className="font-montserrat font-semibold uppercase"
          style={{ fontSize: node.level === 1 ? '14px' : node.level === 2 ? '13px' : '12px' }}
        >
          {node.title}
        </span>
        {node.subtitle && (
          <span className="font-source-sans font-normal" style={{ fontSize: '11px', opacity: 0.7, marginTop: '2px' }}>
            {node.subtitle}
          </span>
        )}
        {isExpandable && (
          <motion.div
            className="absolute flex items-center justify-center"
            style={{
              bottom: '-10px',
              width: '20px',
              height: '20px',
              background: '#1E3A5F',
              borderRadius: '50%',
              color: '#FFFFFF',
            }}
            animate={{ rotate: expanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronDown size={12} />
          </motion.div>
        )}
      </motion.div>

      {/* Connector line + children */}
      {hasChildren && (
        <>
          {/* Vertical connector */}
          <div style={{ width: '2px', height: '24px', background: '#D6D6D0' }} />

          {/* Horizontal line for level 3 children */}
          {node.level === 2 && (
            <div style={{ width: '100%', height: '2px', background: '#D6D6D0', maxWidth: '800px' }} />
          )}

          {/* Children container */}
          {node.level === 2 ? (
            <div className="flex flex-wrap justify-center" style={{ gap: '24px' }}>
              {node.children!.map((child, i) => (
                <div key={child.title} className="flex flex-col items-center">
                  <div style={{ width: '2px', height: '24px', background: '#D6D6D0' }} />
                  <OrgChartNode node={child} />
                  {/* Expandable children */}
                  <AnimatePresence>
                    {child.children && child.children.length > 0 && (
                      <>
                        <div style={{ width: '2px', height: '16px', background: '#D6D6D0' }} />
                        <motion.div
                          initial={false}
                          animate={{
                            height: expanded ? 'auto' : 0,
                            opacity: expanded ? 1 : 0,
                            overflow: 'hidden',
                          }}
                          transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] }}
                          className="flex flex-col items-center"
                          style={{ gap: '8px' }}
                        >
                          {child.children.map((sub) => (
                            <motion.div
                              key={sub.title}
                              initial={{ opacity: 0, y: -5 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.25 }}
                              style={{
                                padding: '8px 16px',
                                background: '#F5F5F0',
                                border: '1px solid #E8E8E3',
                                borderRadius: '2px',
                                textAlign: 'center',
                                minWidth: '160px',
                              }}
                            >
                              <span className="font-source-sans font-medium" style={{ fontSize: '12px', color: '#1A1A1A' }}>
                                {sub.title}
                              </span>
                            </motion.div>
                          ))}
                        </motion.div>
                      </>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center">
              {node.children!.map((child) => (
                <OrgChartNode key={child.title} node={child} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

/* ───────────────────────── main component ───────────────────────── */

export default function Transparence() {
  const [activeBudgetView, setActiveBudgetView] = useState<'répartition' | 'évolution'>('répartition');
  const [hoveredSegment, setHoveredSegment] = useState<number | null>(null);
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());

  const heroRef = useSectionReveal();
  const figuresRef = useScrollReveal();
  const budgetRef = useScrollReveal();
  const contractsRef = useScrollReveal();
  const orgRef = useScrollReveal();
  const downloadsRef = useScrollReveal();
  const ctaRef = useSectionReveal();

  const heroAnimRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!heroAnimRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from('.hero-title', { opacity: 0, y: 25, duration: 0.5, ease: 'power2.out' });
      gsap.from('.hero-subtitle', { opacity: 0, y: 25, duration: 0.5, ease: 'power2.out', delay: 0.1 });
      gsap.from('.hero-badge', { opacity: 0, y: 25, duration: 0.5, ease: 'power2.out', delay: 0.3 });
    }, heroAnimRef);
    return () => ctx.revert();
  }, []);

  const toggleNode = (title: string) => {
    setExpandedNodes((prev) => {
      const next = new Set(prev);
      if (next.has(title)) next.delete(title);
      else next.add(title);
      return next;
    });
  };

  const renderOrgLevel3 = (node: OrgNode) => {
    const isExpanded = expandedNodes.has(node.title);
    const hasChildren = node.children && node.children.length > 0;

    return (
      <div key={node.title} className="flex flex-col items-center">
        {/* Vertical connector from horizontal line */}
        <div style={{ width: '2px', height: '20px', background: '#D6D6D0' }} />

        {/* Level 3 box */}
        <motion.div
          className="relative flex flex-col items-center justify-center cursor-pointer"
          style={{
            padding: '12px 20px',
            minWidth: '180px',
            minHeight: '44px',
            background: node.bg || '#FFFFFF',
            color: '#1E3A5F',
            border: node.border ? `2px solid ${node.border}` : '2px solid transparent',
            borderRadius: '2px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
            textAlign: 'center',
          }}
          whileHover={{ boxShadow: '0 4px 16px rgba(0,0,0,0.1)', y: -1 }}
          onClick={() => hasChildren && toggleNode(node.title)}
          transition={{ duration: 0.2 }}
        >
          <span className="font-montserrat font-semibold uppercase" style={{ fontSize: '12px' }}>
            {node.title}
          </span>
          {node.subtitle && (
            <span className="font-source-sans font-normal" style={{ fontSize: '11px', opacity: 0.7, marginTop: '2px' }}>
              {node.subtitle}
            </span>
          )}
          {hasChildren && (
            <motion.div
              className="absolute flex items-center justify-center"
              style={{
                bottom: '-10px',
                width: '20px',
                height: '20px',
                background: '#1E3A5F',
                borderRadius: '50%',
                color: '#FFFFFF',
                zIndex: 2,
              }}
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronDown size={12} />
            </motion.div>
          )}
        </motion.div>

        {/* Children */}
        <AnimatePresence>
          {hasChildren && isExpanded && (
            <>
              <div style={{ width: '2px', height: '16px', background: '#D6D6D0' }} />
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] }}
                className="flex flex-col items-center"
                style={{ gap: '6px', overflow: 'hidden' }}
              >
                {node.children!.map((sub, idx) => (
                  <motion.div
                    key={sub.title}
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.25, delay: idx * 0.05 }}
                    style={{
                      padding: '8px 16px',
                      background: '#F5F5F0',
                      border: '1px solid #E8E8E3',
                      borderRadius: '2px',
                      textAlign: 'center',
                      minWidth: '180px',
                    }}
                  >
                    <span className="font-source-sans font-medium" style={{ fontSize: '12px', color: '#1A1A1A' }}>
                      {sub.title}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <div>
      {/* ======== SECTION 1: PAGE HEADER ======== */}
      <section
        className="relative"
        style={{
          backgroundImage: 'url(/transparence-hero.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          padding: '100px 0 60px',
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, rgba(15,31,51,0.93) 0%, rgba(30,58,95,0.88) 100%)',
          }}
        />
        <div ref={heroAnimRef} className="relative mx-auto" style={{ maxWidth: '1400px', padding: '0 24px' }}>
          {/* Breadcrumb */}
          <div className="flex items-center gap-2" style={{ marginBottom: '24px' }}>
            <Link
              to="/"
              className="no-underline font-source-sans font-normal"
              style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)' }}
            >
              Accueil
            </Link>
            <ChevronRight size={14} style={{ color: 'rgba(255,255,255,0.3)' }} />
            <span className="font-source-sans font-normal" style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)' }}>
              Transparence
            </span>
          </div>

          <h1
            className="hero-title font-montserrat font-semibold"
            style={{ fontSize: '52px', color: '#FFFFFF', letterSpacing: '-0.02em', lineHeight: 1.1 }}
          >
            Transparence Publique
          </h1>
          <p
            className="hero-subtitle font-source-sans font-normal"
            style={{
              fontSize: '18px',
              color: 'rgba(255,255,255,0.8)',
              maxWidth: '680px',
              marginTop: '16px',
              lineHeight: 1.6,
            }}
          >
            Le ministère s\'engage pour une administration transparente et ouverte. Retrouvez ici l\'ensemble des données publiques : budget, contrats, organigramme et indicateurs de performance.
          </p>

          {/* Open Data badge */}
          <motion.div
            className="hero-badge inline-flex items-center"
            style={{
              marginTop: '28px',
              background: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '2px',
              padding: '12px 20px',
              gap: '12px',
            }}
            whileHover={{ background: 'rgba(255,255,255,0.15)' }}
          >
            <Globe size={20} style={{ color: '#FFFFFF', flexShrink: 0 }} />
            <span className="font-source-sans font-medium" style={{ fontSize: '13px', color: '#FFFFFF' }}>
              Données disponibles sur data.gouv.fr
            </span>
            <ExternalLink size={14} style={{ color: 'rgba(255,255,255,0.6)', flexShrink: 0 }} />
          </motion.div>
        </div>
      </section>

      {/* ======== SECTION 2: KEY FIGURES ======== */}
      <section style={{ background: '#FFFFFF', padding: '48px 0' }}>
        <div ref={figuresRef} className="mx-auto" style={{ maxWidth: '1400px', padding: '0 24px' }}>
          {/* Header */}
          <div className="reveal-item text-center" style={{ marginBottom: '32px' }}>
            <span
              className="font-source-sans font-medium uppercase"
              style={{ fontSize: '11px', letterSpacing: '0.12em', color: '#E5B045' }}
            >
              BUDGET 2026
            </span>
            <h2
              className="font-montserrat font-semibold"
              style={{ fontSize: '36px', color: '#1E3A5F', lineHeight: 1.15, letterSpacing: '-0.01em', marginTop: '12px' }}
            >
              Le ministère en chiffres
            </h2>
          </div>

          {/* Cards grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" style={{ gap: '24px' }}>
            {keyFigures.map((fig, i) => (
              <motion.div
                key={fig.label}
                className="reveal-item flex flex-col items-center"
                style={{
                  background: '#F5F5F0',
                  border: '1px solid #E8E8E3',
                  borderRadius: '2px',
                  padding: '36px 28px',
                  textAlign: 'center',
                }}
                whileHover={{
                  boxShadow: '0 6px 20px rgba(0,0,0,0.1)',
                  y: -2,
                }}
                transition={{ duration: 0.25 }}
              >
                <div
                  className="font-montserrat font-bold"
                  style={{ fontSize: '48px', color: '#1E3A5F', letterSpacing: '-0.02em', lineHeight: 1.1 }}
                >
                  {fig.number}
                </div>
                <div
                  className="font-source-sans font-normal uppercase"
                  style={{ fontSize: '12px', color: '#666666', letterSpacing: '0.06em', marginTop: '8px' }}
                >
                  {fig.label}
                </div>
                {/* Trend */}
                <div className="flex items-center justify-center" style={{ marginTop: '12px', gap: '4px' }}>
                  <ArrowUp size={14} style={{ color: '#4A7C6F' }} />
                  <span className="font-montserrat font-semibold" style={{ fontSize: '13px', color: '#4A7C6F' }}>
                    +{fig.trend}%
                  </span>
                  <span className="font-source-sans font-normal" style={{ fontSize: '11px', color: '#999999' }}>
                    {fig.trendLabel}
                  </span>
                </div>
                {/* Decorative line */}
                <div
                  style={{
                    width: '32px',
                    height: '2px',
                    background: '#E5B045',
                    marginTop: '14px',
                  }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ======== SECTION 3: BUDGET VISUALIZATION ======== */}
      <section style={{ background: '#F5F5F0', padding: '56px 0' }}>
        <div ref={budgetRef} className="mx-auto" style={{ maxWidth: '1400px', padding: '0 24px' }}>
          {/* Header */}
          <div className="reveal-item flex flex-col md:flex-row md:items-end justify-between" style={{ gap: '16px', marginBottom: '32px' }}>
            <div>
              <span
                className="font-source-sans font-medium uppercase"
                style={{ fontSize: '11px', letterSpacing: '0.1em', color: '#E5B045' }}
              >
                BUDGET
              </span>
              <h2
                className="font-montserrat font-semibold"
                style={{ fontSize: '30px', color: '#1A1A1A', lineHeight: 1.15, marginTop: '8px' }}
              >
                Répartition du budget 2026
              </h2>
            </div>
            {/* View toggle */}
            <div className="flex items-center" style={{ gap: '4px' }}>
              {(['répartition', 'évolution'] as const).map((view) => (
                <button
                  key={view}
                  onClick={() => setActiveBudgetView(view)}
                  className="cursor-pointer font-montserrat font-semibold uppercase border-none transition-all duration-200"
                  style={{
                    fontSize: '12px',
                    padding: '8px 16px',
                    borderRadius: '2px',
                    background: activeBudgetView === view ? '#1E3A5F' : 'transparent',
                    color: activeBudgetView === view ? '#FFFFFF' : '#666666',
                  }}
                >
                  {view}
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="reveal-item">
            <AnimatePresence mode="wait">
              {activeBudgetView === 'répartition' ? (
                <motion.div
                  key="repartition"
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 15 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col lg:flex-row items-center"
                  style={{ gap: '24px' }}
                >
                  {/* Donut chart */}
                  <div className="flex-shrink-0" style={{ width: '280px', height: '280px', position: 'relative' }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={budgetData}
                          cx="50%"
                          cy="50%"
                          innerRadius={80}
                          outerRadius={120}
                          strokeWidth={0}
                          dataKey="value"
                          onMouseEnter={(_, index) => setHoveredSegment(index)}
                          onMouseLeave={() => setHoveredSegment(null)}
                          onClick={(_, index) => setHoveredSegment(hoveredSegment === index ? null : index)}
                          style={{ cursor: 'pointer', outline: 'none' }}
                        >
                          {budgetData.map((entry, index) => (
                            <Cell
                              key={entry.name}
                              fill={entry.color}
                              style={{
                                filter: hoveredSegment === index ? 'brightness(1.08)' : 'none',
                                transform: hoveredSegment === index ? 'scale(1.04)' : 'scale(1)',
                                transformOrigin: 'center',
                                transition: 'all 0.2s ease',
                              }}
                            />
                          ))}
                        </Pie>
                        <Tooltip content={<DonutTooltip />} />
                      </PieChart>
                    </ResponsiveContainer>
                    {/* Center label */}
                    <div
                      className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
                      style={{ marginTop: '-4px' }}
                    >
                      <span className="font-montserrat font-bold" style={{ fontSize: '20px', color: '#1E3A5F' }}>
                        €5,2Md
                      </span>
                      <span className="font-source-sans font-normal uppercase" style={{ fontSize: '10px', color: '#666666' }}>
                        TOTAL
                      </span>
                    </div>
                  </div>

                  {/* Breakdown list */}
                  <div className="flex-1 w-full" style={{ maxWidth: '500px' }}>
                    {budgetData.map((item, i) => (
                      <motion.div
                        key={item.name}
                        className="flex items-center justify-between cursor-pointer transition-all duration-150"
                        style={{
                          padding: '14px 0',
                          borderBottom: '1px solid #E8E8E3',
                        }}
                        whileHover={{ background: '#FFFFFF', paddingLeft: 8, paddingRight: 8 }}
                      >
                        <div className="flex items-center" style={{ gap: '10px' }}>
                          <div style={{ width: '12px', height: '12px', background: item.color, borderRadius: '2px' }} />
                          <span className="font-montserrat font-medium" style={{ fontSize: '14px', color: '#1A1A1A' }}>
                            {item.name}
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="font-montserrat font-semibold" style={{ fontSize: '14px', color: '#1A1A1A' }}>
                            {item.amount}
                          </span>
                          <div
                            style={{
                              width: '120px',
                              height: '4px',
                              background: '#E8E8E3',
                              borderRadius: '2px',
                              marginTop: '4px',
                              overflow: 'hidden',
                            }}
                          >
                            <div
                              style={{
                                width: `${item.value}%`,
                                height: '100%',
                                background: item.color,
                                borderRadius: '2px',
                                transition: 'width 0.6s ease',
                              }}
                            />
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="evolution"
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -15 }}
                  transition={{ duration: 0.3 }}
                  style={{ width: '100%', height: '350px' }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={evolutionData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                      <defs>
                        <linearGradient id="budgetGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#1E3A5F" stopOpacity={0.08} />
                          <stop offset="95%" stopColor="#1E3A5F" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#E8E8E3" />
                      <XAxis
                        dataKey="year"
                        tick={{ fontSize: 13, fill: '#666666', fontFamily: 'Source Sans 3' }}
                        axisLine={{ stroke: '#D6D6D0' }}
                        tickLine={false}
                      />
                      <YAxis
                        tick={{ fontSize: 12, fill: '#666666', fontFamily: 'Source Sans 3' }}
                        axisLine={{ stroke: '#D6D6D0' }}
                        tickLine={false}
                        tickFormatter={(v: number) => `${v}M€`}
                      />
                      <Tooltip
                        formatter={(value: number) => [`${value.toLocaleString()} M€`, 'Budget']}
                        contentStyle={{
                          background: '#FFFFFF',
                          border: '1px solid #E8E8E3',
                          borderRadius: '2px',
                          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                          fontSize: '13px',
                          fontFamily: 'Source Sans 3',
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="budget"
                        stroke="#1E3A5F"
                        strokeWidth={2}
                        fill="url(#budgetGradient)"
                        dot={{ r: 5, fill: '#1E3A5F', strokeWidth: 0 }}
                        activeDot={{ r: 7, fill: '#1E3A5F', strokeWidth: 0 }}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ======== SECTION 4: PUBLIC CONTRACTS ======== */}
      <section style={{ background: '#FFFFFF', padding: '48px 0' }}>
        <div ref={contractsRef} className="mx-auto" style={{ maxWidth: '1400px', padding: '0 24px' }}>
          {/* Header */}
          <div className="reveal-item" style={{ marginBottom: '36px' }}>
            <span
              className="font-source-sans font-medium uppercase"
              style={{ fontSize: '11px', letterSpacing: '0.1em', color: '#E5B045' }}
            >
              MARCHÉS PUBLICS
            </span>
            <h2
              className="font-montserrat font-semibold"
              style={{ fontSize: '30px', color: '#1A1A1A', lineHeight: 1.15, marginTop: '8px' }}
            >
              Contrats publics récents
            </h2>
            <p
              className="font-source-sans font-normal"
              style={{ fontSize: '15px', color: '#666666', marginTop: '8px', lineHeight: 1.6 }}
            >
              Consultez les marchés publics attribués par le ministère, conformément aux obligations de transparence.
            </p>
          </div>

          {/* Table */}
          <div
            className="reveal-item overflow-x-auto"
            style={{
              border: '1px solid #E8E8E3',
              borderRadius: '2px',
              overflow: 'hidden',
            }}
          >
            <table className="w-full" style={{ minWidth: '700px' }}>
              <thead>
                <tr style={{ background: '#F5F5F0' }}>
                  {['OBJET', 'ATTRIBUTAIRE', 'MONTANT', 'DATE', 'STATUT'].map((col) => (
                    <th
                      key={col}
                      className="text-left font-montserrat font-semibold uppercase"
                      style={{
                        fontSize: '11px',
                        color: '#666666',
                        letterSpacing: '0.06em',
                        padding: '14px 24px',
                      }}
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {contracts.map((contract, i) => (
                  <motion.tr
                    key={contract.object}
                    style={{ borderBottom: '1px solid #E8E8E3' }}
                    whileHover={{ background: '#F5F5F0' }}
                  >
                    <td
                      className="font-source-sans font-normal"
                      style={{ fontSize: '14px', color: '#1A1A1A', padding: '16px 24px', maxWidth: '350px' }}
                    >
                      {contract.object}
                    </td>
                    <td
                      className="font-source-sans font-normal"
                      style={{ fontSize: '14px', color: '#1A1A1A', padding: '16px 24px', whiteSpace: 'nowrap' }}
                    >
                      {contract.supplier}
                    </td>
                    <td
                      className="font-source-sans font-semibold"
                      style={{ fontSize: '14px', color: '#1A1A1A', padding: '16px 24px', whiteSpace: 'nowrap' }}
                    >
                      {contract.amount}
                    </td>
                    <td
                      className="font-source-sans font-normal"
                      style={{ fontSize: '14px', color: '#666666', padding: '16px 24px', whiteSpace: 'nowrap' }}
                    >
                      {contract.date}
                    </td>
                    <td style={{ padding: '16px 24px' }}>
                      <StatusBadge status={contract.status} />
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="reveal-item" style={{ marginTop: '24px' }}>
            <Link
              to="#"
              className="inline-flex items-center gap-1 no-underline font-montserrat font-semibold uppercase transition-colors duration-200"
              style={{ fontSize: '12px', color: '#1E3A5F' }}
            >
              CONSULTER L\'ENSEMBLE DES MARCHÉS <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* ======== SECTION 5: ORG CHART ======== */}
      <section style={{ background: '#F5F5F0', padding: '56px 0' }}>
        <div ref={orgRef} className="mx-auto" style={{ maxWidth: '1000px', padding: '0 24px' }}>
          {/* Header */}
          <div className="reveal-item text-center" style={{ marginBottom: '32px' }}>
            <span
              className="font-source-sans font-medium uppercase"
              style={{ fontSize: '11px', letterSpacing: '0.1em', color: '#E5B045' }}
            >
              ORGANISATION
            </span>
            <h2
              className="font-montserrat font-semibold"
              style={{ fontSize: '30px', color: '#1A1A1A', lineHeight: 1.15, marginTop: '8px' }}
            >
              Organigramme du ministère
            </h2>
          </div>

          {/* Org Chart Tree */}
          <div className="reveal-item flex flex-col items-center">
            {/* Level 1 - MINISTRE */}
            <motion.div
              className="flex flex-col items-center justify-center"
              style={{
                width: '200px',
                height: '56px',
                background: '#1E3A5F',
                color: '#FFFFFF',
                borderRadius: '2px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
              }}
              whileHover={{ boxShadow: '0 4px 16px rgba(0,0,0,0.1)', y: -1 }}
            >
              <span className="font-montserrat font-semibold uppercase" style={{ fontSize: '14px' }}>
                MINISTRE
              </span>
            </motion.div>

            {/* Connector to Level 2 */}
            <div style={{ width: '2px', height: '28px', background: '#D6D6D0' }} />

            {/* Level 2 - CABINET */}
            <motion.div
              className="flex flex-col items-center justify-center"
              style={{
                width: '240px',
                height: '48px',
                background: '#2B5C8F',
                color: '#FFFFFF',
                borderRadius: '2px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
              }}
              whileHover={{ boxShadow: '0 4px 16px rgba(0,0,0,0.1)', y: -1 }}
            >
              <span className="font-montserrat font-semibold uppercase" style={{ fontSize: '13px' }}>
                CABINET MINISTÉRIEL
              </span>
            </motion.div>

            {/* Connector to Level 3 */}
            <div style={{ width: '2px', height: '28px', background: '#D6D6D0' }} />

            {/* Horizontal connector line */}
            <div style={{ width: '100%', maxWidth: '800px', height: '2px', background: '#D6D6D0' }} />

            {/* Level 3 - 4 Directions */}
            <div className="flex flex-wrap justify-center w-full" style={{ gap: '0' }}>
              {orgData.children![0].children!.map((node) => renderOrgLevel3(node))}
            </div>
          </div>
        </div>
      </section>

      {/* ======== SECTION 6: DOCUMENT DOWNLOADS ======== */}
      <section style={{ background: '#FFFFFF', padding: '48px 0' }}>
        <div ref={downloadsRef} className="mx-auto" style={{ maxWidth: '1400px', padding: '0 24px' }}>
          {/* Header */}
          <div className="reveal-item" style={{ marginBottom: '40px' }}>
            <span
              className="font-source-sans font-medium uppercase"
              style={{ fontSize: '11px', letterSpacing: '0.1em', color: '#E5B045' }}
            >
              DOCUMENTS
            </span>
            <h2
              className="font-montserrat font-semibold"
              style={{ fontSize: '30px', color: '#1A1A1A', lineHeight: 1.15, marginTop: '8px' }}
            >
              Documents de transparence
            </h2>
          </div>

          {/* 2-column layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2" style={{ gap: '32px' }}>
            {/* Left - Financial reports */}
            <div className="reveal-item">
              <div
                className="font-montserrat font-semibold uppercase"
                style={{
                  fontSize: '14px',
                  color: '#1E3A5F',
                  letterSpacing: '0.06em',
                  marginBottom: '20px',
                  paddingBottom: '10px',
                  borderBottom: '2px solid #E5B045',
                }}
              >
                Rapports financiers
              </div>
              <div className="flex flex-col" style={{ gap: '8px' }}>
                {financialDocs.map((doc) => (
                  <motion.div
                    key={doc.title}
                    className="flex items-center justify-between cursor-pointer transition-all duration-150"
                    style={{
                      background: '#F5F5F0',
                      border: '1px solid #E8E8E3',
                      borderRadius: '2px',
                      padding: '16px 20px',
                    }}
                    whileHover={{ background: '#FFFFFF', borderColor: '#1E3A5F' }}
                  >
                    <div className="flex items-center" style={{ gap: '10px' }}>
                      <FileText size={16} style={{ color: '#1E3A5F', flexShrink: 0 }} />
                      <span className="font-montserrat font-medium" style={{ fontSize: '13px', color: '#1A1A1A' }}>
                        {doc.title}
                      </span>
                      <span
                        className="font-source-sans font-medium uppercase"
                        style={{
                          fontSize: '9px',
                          color: '#1E3A5F',
                          background: 'rgba(30,58,95,0.08)',
                          padding: '2px 6px',
                          borderRadius: '2px',
                        }}
                      >
                        {doc.format}
                      </span>
                    </div>
                    <div className="flex items-center" style={{ gap: '12px' }}>
                      <span className="font-source-sans font-normal" style={{ fontSize: '11px', color: '#666666' }}>
                        {doc.size}
                      </span>
                      <motion.div
                        whileHover={{ color: '#2B5C8F' }}
                        transition={{ duration: 0.15 }}
                        style={{ color: '#1E3A5F', cursor: 'pointer' }}
                      >
                        <Download size={16} />
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right - Open data */}
            <div className="reveal-item">
              <div
                className="font-montserrat font-semibold uppercase"
                style={{
                  fontSize: '14px',
                  color: '#1E3A5F',
                  letterSpacing: '0.06em',
                  marginBottom: '20px',
                  paddingBottom: '10px',
                  borderBottom: '2px solid #E5B045',
                }}
              >
                Données ouvertes
              </div>
              <div className="flex flex-col" style={{ gap: '8px' }}>
                {openDataDocs.map((doc) => (
                  <motion.div
                    key={doc.title}
                    className="flex items-center justify-between cursor-pointer transition-all duration-150"
                    style={{
                      background: '#F5F5F0',
                      border: '1px solid #E8E8E3',
                      borderRadius: '2px',
                      padding: '16px 20px',
                    }}
                    whileHover={{ background: '#FFFFFF', borderColor: '#1E3A5F' }}
                  >
                    <div className="flex items-center" style={{ gap: '10px' }}>
                      <FileText size={16} style={{ color: '#1E3A5F', flexShrink: 0 }} />
                      <span className="font-montserrat font-medium" style={{ fontSize: '13px', color: '#1A1A1A' }}>
                        {doc.title}
                      </span>
                      <span
                        className="font-source-sans font-medium uppercase"
                        style={{
                          fontSize: '9px',
                          color: '#1E3A5F',
                          background: 'rgba(30,58,95,0.08)',
                          padding: '2px 6px',
                          borderRadius: '2px',
                        }}
                      >
                        {doc.format}
                      </span>
                    </div>
                    <div className="flex items-center" style={{ gap: '12px' }}>
                      <span className="font-source-sans font-normal" style={{ fontSize: '11px', color: '#666666' }}>
                        {doc.size}
                      </span>
                      <motion.div
                        whileHover={{ color: '#2B5C8F' }}
                        transition={{ duration: 0.15 }}
                        style={{ color: '#1E3A5F', cursor: 'pointer' }}
                      >
                        <Download size={16} />
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======== SECTION 7: OPEN DATA CTA ======== */}
      <section
        ref={ctaRef}
        style={{ background: '#1E3A5F', padding: '64px 0' }}
      >
        <div className="mx-auto" style={{ maxWidth: '1400px', padding: '0 24px' }}>
          <div className="flex flex-col md:flex-row items-center justify-between" style={{ gap: '24px' }}>
            <div>
              <Globe size={28} style={{ color: '#E5B045' }} />
              <h2
                className="font-montserrat font-semibold"
                style={{ fontSize: '24px', color: '#FFFFFF', marginTop: '12px' }}
              >
                Toutes les données sur data.gouv.fr
              </h2>
              <p
                className="font-source-sans font-normal"
                style={{ fontSize: '15px', color: 'rgba(255,255,255,0.75)', marginTop: '8px' }}
              >
                Le ministère publie l\'intégralité de ses jeux de données sur la plateforme nationale d\'open data.
              </p>
            </div>
            <a
              href="https://data.gouv.fr"
              target="_blank"
              rel="noopener noreferrer"
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
              ACCÉDER À DATA.GOUV.FR
              <ExternalLink size={14} />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
