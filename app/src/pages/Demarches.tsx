import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Search,
  FileText,
  Car,
  Home,
  CreditCard,
  Heart,
  GraduationCap,
  Briefcase,
  Clock,
  ArrowRight,
  Download,
  Phone,
  MapPin,
  ChevronDown,
  CheckCircle,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */

const quickAccessCards = [
  { title: 'Carte d\'identité', time: '~10 min', Icon: FileText },
  { title: 'Passeport', time: '~15 min', Icon: FileText },
  { title: 'Carte grise / Immatriculation', time: '~8 min', Icon: Car },
  { title: 'Aides au logement (APL)', time: '~8 min', Icon: Home },
  { title: 'Impôt sur le revenu', time: '~20 min', Icon: CreditCard },
  { title: 'Allocation Adulte Handicapé', time: '~12 min', Icon: Heart },
  { title: 'Recensement citoyen', time: '~5 min', Icon: GraduationCap },
  { title: 'Créer une association', time: '~15 min', Icon: Briefcase },
];

const steps = [
  {
    number: '1',
    title: 'PRÉPARER',
    description: 'Rassemblez les documents nécessaires : pièce d\'identité, justificatifs de domicile, formulaires pré-remplis. Notre assistant vous guide.',
    Icon: Search,
  },
  {
    number: '2',
    title: 'REMPLIR',
    description: 'Complétez votre dossier en ligne. Les champs sont pré-remplis lorsque c\'est possible grâce à FranceConnect.',
    Icon: FileText,
  },
  {
    number: '3',
    title: 'TRANSMETTRE',
    description: 'Envoyez votre dossier directement en ligne ou imprimez votre récapitulatif pour un dépôt en mairie.',
    Icon: (props: { size?: number; className?: string }) => (
      <svg width={props.size || 24} height={props.size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={props.className}>
        <line x1="22" y1="2" x2="11" y2="13" />
        <polygon points="22 2 15 22 11 13 2 9 22 2" />
      </svg>
    ),
  },
  {
    number: '4',
    title: 'SUIVRE',
    description: 'Suivez l\'avancement de votre dossier en temps réel. Recevez une notification dès qu\'une action est requise.',
    Icon: (props: { size?: number; className?: string }) => (
      <svg width={props.size || 24} height={props.size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={props.className}>
        <path d="M18 20V10" /><path d="M12 20V4" /><path d="M6 20v-6" />
      </svg>
    ),
  },
];

const forms = [
  { title: 'Formulaire de demande de CNI', format: 'PDF', size: '285 Ko', category: 'Carte d\'identité' },
  { title: 'Formulaire de renouvellement de passeport', format: 'PDF', size: '312 Ko', category: 'Passeport' },
  { title: 'Cerfa 13750 : Demande d\'allocation logement', format: 'PDF', size: '420 Ko', category: 'Aides sociales' },
  { title: 'Attestation d\'hébergement (modèle)', format: 'PDF', size: '125 Ko', category: 'Carte d\'identité' },
  { title: 'Déclaration de création d\'association', format: 'PDF', size: '580 Ko', category: 'Associations' },
  { title: 'Mandat de prélèvement SEPA', format: 'PDF', size: '198 Ko', category: 'Impôts' },
  { title: 'Attestation de recensement', format: 'PDF', size: '145 Ko', category: 'Autres' },
  { title: 'Formulaire de demande de DUPLICATA CNI', format: 'PDF', size: '220 Ko', category: 'Carte d\'identité' },
];

const faqCategories = [
  'Toutes',
  'Carte d\'identité',
  'Passeport',
  'Aides sociales',
  'Associations',
  'Numérique',
  'Impôts',
];

const faqItems = [
  {
    category: 'Carte d\'identité',
    question: 'Comment renouveler ma carte d\'identité en ligne ?',
    answer: 'Le renouvellement de votre CNI se fait en ligne via FranceConnect. Connectez-vous, remplissez le formulaire pré-rempli, choisissez votre mairie de retrait et suivez votre dossier en temps réel. Le délai moyen est de 2 à 3 semaines.',
  },
  {
    category: 'Passeport',
    question: 'Quels documents faut-il pour une demande de passeport ?',
    answer: 'Vous avez besoin d\'une pièce d\'identité valide, d\'un justificatif de domicile de moins de 3 mois, d\'une photo d\'identité aux normes ANTS, et du formulaire cerfa rempli. Les mineurs doivent également fournir l\'autorisation parentale.',
  },
  {
    category: 'Aides sociales',
    question: 'Comment suivre ma demande d\'APL ?',
    answer: 'Connectez-vous à votre espace personnel sur caf.fr avec FranceConnect. Vos paiements et l\'état de votre demande sont mis à jour en temps réel. Vous recevez également des notifications par email à chaque changement de statut.',
  },
  {
    category: 'Associations',
    question: 'Puis-je créer une association entièrement en ligne ?',
    answer: 'Oui, la création d\'association se fait désormais 100% en ligne sur le portail dédié. Vous remplissez le formulaire, téléchargez vos statuts, payez les frais de dépôt et recevez votre numéro RNA sous 48h.',
  },
  {
    category: 'Numérique',
    question: 'Comment activer mon identité numérique FranceConnect ?',
    answer: 'Rendez-vous sur franceconnect.gouv.fr, choisissez votre fournisseur d\'identité (Impots.gouv, Ameli, ou La Poste), authentifiez-vous avec vos identifiants existants. Votre identité FranceConnect est alors activée immédiatement.',
  },
  {
    category: 'Carte d\'identité',
    question: 'Où puis-je trouver un guichet France Services près de chez moi ?',
    answer: 'Utilisez notre carte interactive sur la page France Services. Saisissez votre code postal ou activez la géolocalisation pour voir les 2 600 guichets à proximité avec leurs horaires d\'ouverture et les services proposés.',
  },
  {
    category: 'Impôts',
    question: 'Comment déclarer mes revenus en ligne pour la première fois ?',
    answer: 'Créez votre espace sur impots.gouv.fr avec votre numéro fiscal. Votre déclaration est pré-remplie : vérifiez les informations, complétez si nécessaire, puis validez. Vous recevez un accusé de réception.',
  },
  {
    category: 'Aides sociales',
    question: 'Quel est le délai de traitement pour une demande d\'AAH ?',
    answer: 'Le délai moyen de traitement d\'une demande d\'Allocation Adulte Handicapé est de 2 à 4 mois. Ce délai peut varier selon la complexité de votre dossier et le délai de transmission des pièces justificatives par les organismes médicaux.',
  },
];

/* ------------------------------------------------------------------ */
/*  FAQ ACCORDION ITEM (isolated for GSAP / Framer Motion rules)      */
/* ------------------------------------------------------------------ */

function FaqAccordionItem({
  item,
  isOpen,
  onToggle,
}: {
  item: typeof faqItems[0];
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      style={{
        borderBottom: '1px solid #D6D6D0',
        padding: '24px 0',
      }}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 bg-transparent border-none cursor-pointer text-left p-0"
      >
        <span
          className="font-montserrat font-semibold"
          style={{
            fontSize: '16px',
            color: isOpen ? '#1E3A5F' : '#1A1A1A',
            transition: 'color 200ms ease',
            lineHeight: 1.4,
            flex: 1,
          }}
        >
          {item.question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] }}
          className="flex-shrink-0"
        >
          <ChevronDown size={20} style={{ color: '#1E3A5F' }} />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] }}
            className="overflow-hidden"
          >
            <p
              className="font-source-sans font-normal"
              style={{
                fontSize: '15px',
                color: '#666666',
                lineHeight: 1.65,
                paddingTop: '12px',
              }}
            >
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  MAIN PAGE COMPONENT                                                */
/* ------------------------------------------------------------------ */

export default function Demarches() {
  const [faqCategory, setFaqCategory] = useState('Toutes');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const headerContentRef = useRef<HTMLDivElement>(null);
  const quickAccessRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);
  const stepsLineRef = useRef<HTMLDivElement>(null);
  const formsRef = useRef<HTMLDivElement>(null);
  const faqRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  /* ---- Header entrance animation ---- */
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

  /* ---- Quick access scroll animation ---- */
  useEffect(() => {
    if (!quickAccessRef.current) return;
    const cards = quickAccessRef.current.querySelectorAll('.qa-card');
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: quickAccessRef.current,
        start: 'top 85%',
        once: true,
      },
    });
    tl.from(cards, {
      opacity: 0, y: 25,
      duration: 0.4, stagger: 0.06,
      ease: 'power2.out',
    });
    return () => { tl.kill(); };
  }, []);

  /* ---- Steps scroll animation ---- */
  useEffect(() => {
    if (!stepsRef.current || !stepsLineRef.current) return;
    const circles = stepsRef.current.querySelectorAll('.step-circle');
    const texts = stepsRef.current.querySelectorAll('.step-text');

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: stepsRef.current,
        start: 'top 75%',
        once: true,
      },
    });

    /* Dotted line draws first */
    tl.fromTo(
      stepsLineRef.current,
      { width: '0%' },
      { width: '100%', duration: 1.2, ease: 'power2.inOut' }
    );

    /* Then circles pop in */
    tl.from(circles, {
      scale: 0.5, opacity: 0,
      duration: 0.4, stagger: 0.15,
      ease: 'back.out(1.7)',
    }, '-=0.6');

    /* Then text fades in */
    tl.from(texts, {
      opacity: 0, y: 15,
      duration: 0.4, stagger: 0.1,
      ease: 'power2.out',
    }, '-=0.4');

    return () => { tl.kill(); };
  }, []);

  /* ---- Forms scroll animation ---- */
  useEffect(() => {
    if (!formsRef.current) return;
    const rows = formsRef.current.querySelectorAll('.form-row');
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: formsRef.current,
        start: 'top 80%',
        once: true,
      },
    });
    tl.from(rows, {
      opacity: 0, x: -15,
      duration: 0.4, stagger: 0.06,
      ease: 'power2.out',
    });
    return () => { tl.kill(); };
  }, []);

  /* ---- FAQ scroll animation ---- */
  useEffect(() => {
    if (!faqRef.current) return;
    const left = faqRef.current.querySelector('.faq-left');
    const right = faqRef.current.querySelector('.faq-right');
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: faqRef.current,
        start: 'top 80%',
        once: true,
      },
    });
    if (left) tl.from(left, { opacity: 0, x: -20, duration: 0.4, ease: 'power2.out' }, 0);
    if (right) tl.from(right, { opacity: 0, y: 15, duration: 0.4, ease: 'power2.out' }, 0.1);
    return () => { tl.kill(); };
  }, []);

  /* ---- CTA scroll animation ---- */
  useEffect(() => {
    if (!ctaRef.current) return;
    const content = ctaRef.current.querySelector('.cta-content');
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ctaRef.current,
        start: 'top 85%',
        once: true,
      },
    });
    tl.from(content, {
      opacity: 0, y: 20,
      duration: 0.5, ease: 'power2.out',
    });
    return () => { tl.kill(); };
  }, []);

  /* Filtered FAQ */
  const filteredFaq = faqCategory === 'Toutes'
    ? faqItems
    : faqItems.filter((f) => f.category === faqCategory);

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
              Démarches
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
            Guide des Démarches
          </h1>

          {/* Subtitle */}
          <p
            className="header-animate font-source-sans font-normal mt-4"
            style={{
              fontSize: '18px',
              color: 'rgba(255,255,255,0.8)',
              maxWidth: '600px',
              lineHeight: 1.5,
              opacity: 0,
            }}
          >
            Retrouvez toutes les démarches administratives expliquées étape par étape. Téléchargez les formulaires et suivez votre dossier en ligne.
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
              placeholder="Rechercher une démarche (ex: passeport, carte grise, APL)..."
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
      {/* SECTION 2 — QUICK ACCESS GRID                                 */}
      {/* ============================================================ */}
      <section style={{ background: '#FFFFFF', padding: '64px 0' }}>
        <div className="mx-auto" style={{ maxWidth: '1400px', padding: '0 24px' }}>
          {/* Header */}
          <span
            className="font-source-sans font-medium uppercase block"
            style={{ fontSize: '11px', letterSpacing: '0.1em', color: '#E5B045' }}
          >
            DÉMARCHES POPULAIRES
          </span>
          <h2
            className="font-montserrat font-semibold mt-2"
            style={{ fontSize: '30px', color: '#1A1A1A', lineHeight: 1.15 }}
          >
            Les démarches les plus fréquentes
          </h2>

          {/* Grid */}
          <div
            ref={quickAccessRef}
            className="grid mt-10"
            style={{
              gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
              gap: '20px',
            }}
          >
            {quickAccessCards.map((card) => (
              <motion.div
                key={card.title}
                className="qa-card group flex flex-col cursor-pointer"
                style={{
                  background: '#F5F5F0',
                  border: '1px solid #E8E8E3',
                  borderRadius: '2px',
                  padding: '28px',
                  transition: 'all 200ms ease',
                }}
                whileHover={{
                  y: -2,
                  background: '#FFFFFF',
                  borderColor: '#1E3A5F',
                  transition: { duration: 0.2 },
                }}
              >
                <div className="flex items-start justify-between">
                  <card.Icon
                    size={32}
                    style={{ color: '#1E3A5F' }}
                    strokeWidth={1.5}
                  />
                  <ArrowRight
                    size={20}
                    className="opacity-40 group-hover:opacity-100 transition-opacity duration-200"
                    style={{ color: '#1E3A5F' }}
                  />
                </div>
                <h4
                  className="font-montserrat font-semibold mt-4"
                  style={{ fontSize: '15px', color: '#1E3A5F', lineHeight: 1.3 }}
                >
                  {card.title}
                </h4>
                <div className="flex items-center gap-1 mt-2">
                  <Clock size={12} style={{ color: '#666666' }} />
                  <span className="font-source-sans font-normal" style={{ fontSize: '12px', color: '#666666' }}>
                    {card.time}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 3 — STEP BY STEP GUIDE                                */}
      {/* ============================================================ */}
      <section ref={stepsRef} style={{ background: '#F5F5F0', padding: '56px 0' }}>
        <div className="mx-auto" style={{ maxWidth: '1400px', padding: '0 24px' }}>
          {/* Header */}
          <span
            className="font-source-sans font-medium uppercase block"
            style={{ fontSize: '11px', letterSpacing: '0.1em', color: '#E5B045' }}
          >
            COMMENT FAIRE ?
          </span>
          <h2
            className="font-montserrat font-semibold mt-2"
            style={{ fontSize: 'clamp(26px, 4vw, 36px)', color: '#1E3A5F', lineHeight: 1.15 }}
          >
            Les étapes de votre démarche
          </h2>
          <p
            className="font-source-sans font-normal mt-2"
            style={{ fontSize: '16px', color: '#666666' }}
          >
            Quelle que soit votre démarche, suivez ces 4 étapes pour la mener à bien.
          </p>

          {/* Steps */}
          <div className="relative mt-16">
            {/* Dotted connector line */}
            <div
              className="hidden lg:block absolute"
              style={{
                top: '31px',
                left: '64px',
                right: '64px',
                height: '2px',
                borderTop: '2px dashed #D6D6D0',
                zIndex: 0,
              }}
            >
              <div
                ref={stepsLineRef}
                style={{
                  width: '0%',
                  height: '100%',
                  borderTop: '2px dashed #1E3A5F',
                  opacity: 0.3,
                }}
              />
            </div>

            <div
              className="grid relative"
              style={{
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '24px',
                zIndex: 1,
              }}
            >
              {steps.map((step) => (
                <div key={step.number} className="flex flex-col items-center text-center">
                  {/* Circle */}
                  <div
                    className="step-circle flex items-center justify-center"
                    style={{
                      width: '64px',
                      height: '64px',
                      borderRadius: '50%',
                      border: '2px solid #1E3A5F',
                      background: '#F5F5F0',
                    }}
                  >
                    <span
                      className="font-montserrat font-bold"
                      style={{ fontSize: '24px', color: '#1E3A5F' }}
                    >
                      {step.number}
                    </span>
                  </div>

                  {/* Text */}
                  <div className="step-text mt-5">
                    <h3
                      className="font-montserrat font-semibold"
                      style={{ fontSize: '18px', color: '#1A1A1A' }}
                    >
                      {step.title}
                    </h3>
                    <p
                      className="font-source-sans font-normal mt-2"
                      style={{ fontSize: '14px', color: '#666666', lineHeight: 1.6 }}
                    >
                      {step.description}
                    </p>
                    <div className="flex justify-center mt-3">
                      <step.Icon size={24} style={{ color: '#1E3A5F' }} strokeWidth={1.5} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 4 — DOWNLOADABLE FORMS                                */}
      {/* ============================================================ */}
      <section style={{ background: '#FFFFFF', padding: '48px 0' }}>
        <div className="mx-auto" style={{ maxWidth: '1400px', padding: '0 24px' }}>
          {/* Header */}
          <span
            className="font-source-sans font-medium uppercase block"
            style={{ fontSize: '11px', letterSpacing: '0.1em', color: '#E5B045' }}
          >
            DOCUMENTS
          </span>
          <h2
            className="font-montserrat font-semibold mt-2"
            style={{ fontSize: '30px', color: '#1A1A1A', lineHeight: 1.15 }}
          >
            Formulaires et documents utiles
          </h2>

          {/* Table */}
          <div
            ref={formsRef}
            className="mt-10"
            style={{
              border: '1px solid #E8E8E3',
              borderRadius: '2px',
              overflow: 'hidden',
            }}
          >
            {forms.map((form, index) => (
              <div
                key={index}
                className="form-row flex items-center justify-between gap-4 transition-colors duration-150 hover:bg-[#F5F5F0]"
                style={{
                  padding: '20px 24px',
                  borderBottom: index < forms.length - 1 ? '1px solid #E8E8E3' : 'none',
                }}
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <FileText size={18} style={{ color: '#1E3A5F', flexShrink: 0 }} />
                  <span
                    className="font-montserrat font-medium truncate"
                    style={{ fontSize: '15px', color: '#1A1A1A' }}
                  >
                    {form.title}
                  </span>
                  <span
                    className="font-source-sans font-medium uppercase flex-shrink-0"
                    style={{
                      fontSize: '10px',
                      background: '#F5F5F0',
                      color: '#666666',
                      padding: '2px 8px',
                      borderRadius: '2px',
                    }}
                  >
                    {form.format}
                  </span>
                </div>
                <div className="flex items-center gap-4 flex-shrink-0">
                  <span className="font-source-sans font-normal hidden sm:block" style={{ fontSize: '12px', color: '#666666' }}>
                    {form.size}
                  </span>
                  <button
                    className="flex items-center gap-2 bg-transparent border-none cursor-pointer font-montserrat font-semibold uppercase transition-all duration-150 hover:underline"
                    style={{
                      fontSize: '11px',
                      color: '#1E3A5F',
                      letterSpacing: '0.04em',
                    }}
                  >
                    <Download size={16} />
                    TÉLÉCHARGER
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 5 — FAQ ACCORDION                                     */}
      {/* ============================================================ */}
      <section ref={faqRef} style={{ background: '#F5F5F0', padding: '48px 0' }}>
        <div className="mx-auto" style={{ maxWidth: '1400px', padding: '0 24px' }}>
          {/* Header */}
          <span
            className="font-source-sans font-medium uppercase block"
            style={{ fontSize: '11px', letterSpacing: '0.1em', color: '#E5B045' }}
          >
            FAQ
          </span>
          <h2
            className="font-montserrat font-semibold mt-2"
            style={{ fontSize: '30px', color: '#1A1A1A', lineHeight: 1.15 }}
          >
            Questions fréquentes
          </h2>

          {/* 2-column layout */}
          <div
            className="flex flex-col lg:flex-row gap-8 mt-10"
          >
            {/* Left — Category filter */}
            <div className="faq-left flex flex-col gap-2" style={{ minWidth: '200px', width: '100%', maxWidth: '280px' }}>
              {faqCategories.map((cat) => {
                const isActive = faqCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => { setFaqCategory(cat); setOpenFaqIndex(null); }}
                    className="text-left cursor-pointer border-none font-montserrat font-medium transition-all duration-150"
                    style={{
                      padding: '12px 16px',
                      borderRadius: '2px',
                      fontSize: '13px',
                      background: isActive ? '#1E3A5F' : 'transparent',
                      color: isActive ? '#FFFFFF' : '#666666',
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        (e.currentTarget as HTMLElement).style.background = '#E8E8E3';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        (e.currentTarget as HTMLElement).style.background = 'transparent';
                      }
                    }}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            {/* Right — Accordion */}
            <div className="faq-right flex-1">
              <AnimatePresence mode="wait">
                <motion.div
                  key={faqCategory}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                >
                  {filteredFaq.map((item, index) => (
                    <FaqAccordionItem
                      key={`${item.question}-${index}`}
                      item={item}
                      isOpen={openFaqIndex === index}
                      onToggle={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                    />
                  ))}
                  {filteredFaq.length === 0 && (
                    <p className="font-source-sans font-normal" style={{ fontSize: '15px', color: '#666666', padding: '24px 0' }}>
                      Aucune question dans cette catégorie pour le moment.
                    </p>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 6 — HELP CTA                                          */}
      {/* ============================================================ */}
      <section
        ref={ctaRef}
        style={{ background: '#1E3A5F', padding: '64px 0' }}
      >
        <div
          className="cta-content mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
          style={{ maxWidth: '1400px', padding: '0 24px' }}
        >
          <div>
            <h2
              className="font-montserrat font-semibold"
              style={{ fontSize: '26px', color: '#FFFFFF', lineHeight: 1.2 }}
            >
              Une question sur votre démarche ?
            </h2>
            <p
              className="font-source-sans font-normal mt-2"
              style={{ fontSize: '15px', color: 'rgba(255,255,255,0.75)' }}
            >
              Nos agents France Services sont disponibles pour vous accompagner en présentiel ou par téléphone.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
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
              <MapPin size={14} className="mr-2" />
              TROUVER UN GUICHET
            </Link>
            <a
              href="tel:3939"
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
              <Phone size={14} className="mr-2" />
              APPELER LE 3939
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
