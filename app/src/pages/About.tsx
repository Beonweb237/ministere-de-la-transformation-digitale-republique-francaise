import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import {
  Shield,
  Zap,
  Users,
  Eye,
  Accessibility,
  Lock,
  HandHeart,
  CheckCircle,
  ChevronRight,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

/* ──────────────────────────────────────────────
   Helper: get CSS variable values
   ────────────────────────────────────────────── */
const cssVar = (name: string) => getComputedStyle(document.documentElement).getPropertyValue(name).trim();

/* ──────────────────────────────────────────────
   Section 1 — Hero (GSAP for parallax + reveal)
   ────────────────────────────────────────────── */
function PageHero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const mottoRef = useRef<HTMLParagraphElement>(null);
  const breadcrumbRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!heroRef.current) return;
    const ctx = gsap.context(() => {
      // Parallax on background
      gsap.to('.hero-bg', {
        yPercent: -10,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      // Entrance animations
      const tl = gsap.timeline({ delay: 0.2 });
      tl.fromTo(
        breadcrumbRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }
      )
        .fromTo(
          titleRef.current,
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
          '-=0.2'
        )
        .fromTo(
          subtitleRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
          '-=0.35'
        )
        .fromTo(
          mottoRef.current,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' },
          '-=0.3'
        );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative overflow-hidden"
      style={{ padding: '100px 0 60px' }}
    >
      {/* Background image */}
      <div
        className="hero-bg absolute inset-0 z-0"
        style={{
          backgroundImage: 'url(/about-hero.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          willChange: 'transform',
        }}
      />
      {/* Gradient overlay */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background:
            'linear-gradient(135deg, rgba(15,31,51,0.9) 0%, rgba(30,58,95,0.75) 100%)',
        }}
      />
      {/* Content */}
      <div
        className="relative z-[2] mx-auto"
        style={{ maxWidth: '1400px', padding: '0 24px' }}
      >
        {/* Breadcrumb */}
        <div
          ref={breadcrumbRef}
          className="font-source-sans opacity-0"
          style={{
            fontSize: '13px',
            fontWeight: 400,
            color: 'rgba(255,255,255,0.5)',
            marginBottom: '24px',
          }}
        >
          <Link
            to="/"
            className="no-underline hover:underline"
            style={{ color: 'rgba(255,255,255,0.5)' }}
          >
            Accueil
          </Link>
          {' > '}
          <span>À Propos</span>
        </div>

        {/* Title */}
        <h1
          ref={titleRef}
          className="font-montserrat opacity-0"
          style={{
            fontSize: '52px',
            fontWeight: 600,
            color: '#FFFFFF',
            letterSpacing: '-0.02em',
            lineHeight: 1.05,
          }}
        >
          Le Ministère
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="font-source-sans opacity-0"
          style={{
            fontSize: '18px',
            fontWeight: 400,
            color: 'rgba(255,255,255,0.8)',
            maxWidth: '640px',
            marginTop: '16px',
            lineHeight: 1.6,
          }}
        >
          Depuis 2017, le Ministère de la Transformation Digitale et de
          l'Innovation Publique œuvre pour une administration moderne, accessible
          et au service de tous les Français.
        </p>

        {/* Marianne motto */}
        <p
          ref={mottoRef}
          className="font-source-sans italic opacity-0"
          style={{
            fontSize: '13px',
            fontWeight: 400,
            color: 'rgba(255,255,255,0.5)',
            letterSpacing: '0.15em',
            marginTop: '32px',
          }}
        >
          Liberté, Égalité, Fraternité
        </p>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────
   Section 2 — Mission Pillars
   GSAP for scroll entrance, Framer Motion ISOLATED
   in child hover components.
   ────────────────────────────────────────────── */

const pillars = [
  {
    icon: Shield,
    title: 'Simplifier',
    description:
      'Réduire la complexité administrative pour que chaque citoyen puisse accéder facilement aux services publics.',
    items: [
      '100% des démarches en ligne',
      'France Services pour tous',
      'Identité numérique universelle',
    ],
  },
  {
    icon: Zap,
    title: 'Innover',
    description:
      'Placer le numérique au service de l\'action publique pour gagner en efficacité et en qualité de service.',
    items: ['Cloud souverain', 'IA au service du public', 'Données ouvertes'],
  },
  {
    icon: Users,
    title: 'Accompagner',
    description:
      'Être présent sur tous les territoires pour accompagner les citoyens, les associations et les collectivités.',
    items: [
      '2 600 guichets France Services',
      'Accompagnement territorial',
      'Vie associative',
    ],
  },
];

// Framer Motion hover wrapper — ISOLATED from GSAP
function PillarCard({
  pillar,
  index,
}: {
  pillar: (typeof pillars)[number];
  index: number;
}) {
  const Icon = pillar.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.22 }}
      transition={{
        duration: 0.6,
        delay: index * 0.12,
        ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
      }}
      whileHover={{ y: -2 }}
      className="flex flex-col"
      style={{
        background: '#F5F5F0',
        border: '1px solid #E8E8E3',
        borderRadius: '2px',
        padding: '40px 32px',
      }}
    >
      {/* Icon with scale animation */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.4,
          delay: index * 0.12 + 0.2,
          ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
        }}
      >
        <Icon size={36} color="#1E3A5F" strokeWidth={1.5} />
      </motion.div>

      <h3
        className="font-montserrat"
        style={{
          fontSize: '20px',
          fontWeight: 600,
          color: '#1E3A5F',
          marginTop: '20px',
        }}
      >
        {pillar.title}
      </h3>

      <p
        className="font-source-sans"
        style={{
          fontSize: '15px',
          fontWeight: 400,
          color: '#666666',
          lineHeight: 1.65,
          marginTop: '12px',
        }}
      >
        {pillar.description}
      </p>

      {/* Separator */}
      <div
        style={{
          width: '32px',
          height: '1px',
          background: '#D6D6D0',
          marginTop: '20px',
        }}
      />

      {/* Sub-items */}
      <ul className="flex flex-col" style={{ marginTop: '12px', gap: '8px' }}>
        {pillar.items.map((item) => (
          <li
            key={item}
            className="flex items-center gap-2 font-source-sans"
            style={{
              fontSize: '13px',
              fontWeight: 400,
              color: '#666666',
            }}
          >
            <CheckCircle size={12} color="#4A7C6F" />
            {item}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

function MissionSection() {
  return (
    <section style={{ background: '#FFFFFF', padding: '56px 0' }}>
      <div
        className="mx-auto"
        style={{ maxWidth: '1400px', padding: '0 24px' }}
      >
        {/* Header */}
        <div className="text-center" style={{ marginBottom: '40px' }}>
          <span
            className="font-source-sans uppercase"
            style={{
              fontSize: '11px',
              fontWeight: 500,
              letterSpacing: '0.12em',
              color: '#E5B045',
            }}
          >
            NOTRE MISSION
          </span>
          <h2
            className="font-montserrat"
            style={{
              fontSize: '36px',
              fontWeight: 600,
              color: '#1E3A5F',
              maxWidth: '800px',
              margin: '16px auto 0',
              lineHeight: 1.15,
              letterSpacing: '-0.01em',
            }}
          >
            Au service des Français, des territoires et de la République
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

        {/* Pillars grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-3"
          style={{ gap: '24px' }}
        >
          {pillars.map((pillar, i) => (
            <PillarCard key={pillar.title} pillar={pillar} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────
   Section 3 — History Timeline (pure GSAP)
   ────────────────────────────────────────────── */

const milestones = [
  {
    year: '2017',
    title: 'Création du ministère',
    description:
      'Création de la première administration dédiée au numérique et à la transformation publique.',
    side: 'left' as const,
  },
  {
    year: '2018',
    title: 'Lancement de FranceConnect',
    description:
      'Déploiement de l\'identité numérique sécurisée, aujourd\'hui utilisée par 38 millions de Français.',
    side: 'right' as const,
  },
  {
    year: '2019',
    title: 'Plan France Services',
    description:
      'Lancement du programme de déploiement des guichets France Services sur tout le territoire.',
    side: 'left' as const,
  },
  {
    year: '2021',
    title: 'Cloud au centre',
    description:
      'Adoption de la doctrine "cloud au centre" pour moderniser les systèmes d\'information de l\'État.',
    side: 'right' as const,
  },
  {
    year: '2023',
    title: 'FranceConnect+',
    description:
      'Lancement de l\'identité numérique de nouvelle génération avec authentification renforcée.',
    side: 'left' as const,
  },
  {
    year: '2026',
    title: 'Objectif 100% numérique',
    description:
      'Feuille de route pour une administration entièrement dématérialisée d\'ici 2030.',
    side: 'right' as const,
  },
];

function TimelineSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<(HTMLDivElement | null)[]>([]);
  const leftBlocksRef = useRef<(HTMLDivElement | null)[]>([]);
  const rightBlocksRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Vertical line draws from top to bottom
      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            duration: 1.5,
            ease: 'power2.inOut',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
              once: true,
            },
          }
        );
      }

      // Dots pop in
      const validDots = dotsRef.current.filter(Boolean);
      if (validDots.length) {
        gsap.fromTo(
          validDots,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.3,
            stagger: 0.2,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
              once: true,
            },
            delay: 0.5,
          }
        );
      }

      // Left blocks slide in from left
      const validLeft = leftBlocksRef.current.filter(Boolean);
      if (validLeft.length) {
        gsap.fromTo(
          validLeft,
          { x: -25, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.4,
            stagger: 0.15,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
              once: true,
            },
            delay: 0.8,
          }
        );
      }

      // Right blocks slide in from right
      const validRight = rightBlocksRef.current.filter(Boolean);
      if (validRight.length) {
        gsap.fromTo(
          validRight,
          { x: 25, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.4,
            stagger: 0.15,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
              once: true,
            },
            delay: 0.95,
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  let leftIndex = 0;
  let rightIndex = 0;

  return (
    <section
      ref={sectionRef}
      style={{ background: '#F5F5F0', padding: '56px 0' }}
    >
      <div
        className="mx-auto"
        style={{ maxWidth: '1400px', padding: '0 24px' }}
      >
        {/* Header */}
        <div style={{ marginBottom: '40px' }}>
          <span
            className="font-source-sans uppercase"
            style={{
              fontSize: '11px',
              fontWeight: 500,
              letterSpacing: '0.1em',
              color: '#E5B045',
            }}
          >
            NOTRE HISTOIRE
          </span>
          <h2
            className="font-montserrat"
            style={{
              fontSize: '30px',
              fontWeight: 600,
              color: '#1A1A1A',
              marginTop: '16px',
              lineHeight: 1.15,
            }}
          >
            Les grandes dates
          </h2>
        </div>

        {/* Timeline container */}
        <div className="relative">
          {/* Center vertical line */}
          <div
            ref={lineRef}
            className="absolute left-1/2 top-0 bottom-0 hidden md:block"
            style={{
              width: '2px',
              background: '#D6D6D0',
              transform: 'translateX(-50%)',
              transformOrigin: 'top',
            }}
          />

          {/* Milestones */}
          <div className="flex flex-col" style={{ gap: '24px' }}>
            {milestones.map((m, i) => {
              const isLeft = m.side === 'left';
              const blockRef = isLeft
                ? (el: HTMLDivElement | null) => {
                    leftBlocksRef.current[leftIndex] = el;
                  }
                : (el: HTMLDivElement | null) => {
                    rightBlocksRef.current[rightIndex] = el;
                  };
              // Capture current index for this milestone
              const currentLeftIdx = leftIndex;
              const currentRightIdx = rightIndex;
              if (isLeft) leftIndex++;
              else rightIndex++;

              return (
                <div
                  key={m.year}
                  className="relative flex items-start"
                >
                  {/* Desktop layout */}
                  <div className="hidden md:grid md:grid-cols-2 md:w-full" style={{ gap: '48px' }}>
                    {/* Left column */}
                    <div
                      className="flex justify-end"
                      ref={isLeft ? blockRef : undefined}
                      style={{
                        opacity: 0,
                        textAlign: 'right',
                        maxWidth: '360px',
                        marginLeft: 'auto',
                      }}
                    >
                      {isLeft ? (
                        <div>
                          <span
                            className="font-montserrat"
                            style={{
                              fontSize: '28px',
                              fontWeight: 700,
                              color: '#1E3A5F',
                            }}
                          >
                            {m.year}
                          </span>
                          <h4
                            className="font-montserrat"
                            style={{
                              fontSize: '15px',
                              fontWeight: 600,
                              color: '#1A1A1A',
                              marginTop: '4px',
                            }}
                          >
                            {m.title}
                          </h4>
                          <p
                            className="font-source-sans"
                            style={{
                              fontSize: '13px',
                              fontWeight: 400,
                              color: '#666666',
                              marginTop: '4px',
                              lineHeight: 1.6,
                            }}
                          >
                            {m.description}
                          </p>
                        </div>
                      ) : (
                        <div /> /* spacer */
                      )}
                    </div>

                    {/* Right column */}
                    <div
                      className="flex justify-start"
                      ref={!isLeft ? blockRef : undefined}
                      style={{
                        opacity: 0,
                        textAlign: 'left',
                        maxWidth: '360px',
                      }}
                    >
                      {!isLeft ? (
                        <div>
                          <span
                            className="font-montserrat"
                            style={{
                              fontSize: '28px',
                              fontWeight: 700,
                              color: '#1E3A5F',
                            }}
                          >
                            {m.year}
                          </span>
                          <h4
                            className="font-montserrat"
                            style={{
                              fontSize: '15px',
                              fontWeight: 600,
                              color: '#1A1A1A',
                              marginTop: '4px',
                            }}
                          >
                            {m.title}
                          </h4>
                          <p
                            className="font-source-sans"
                            style={{
                              fontSize: '13px',
                              fontWeight: 400,
                              color: '#666666',
                              marginTop: '4px',
                              lineHeight: 1.6,
                            }}
                          >
                            {m.description}
                          </p>
                        </div>
                      ) : (
                        <div /> /* spacer */
                      )}
                    </div>
                  </div>

                  {/* Mobile layout */}
                  <div
                    className="md:hidden flex flex-col"
                    ref={isLeft
                      ? (el) => { leftBlocksRef.current[currentLeftIdx] = el; }
                      : (el) => { rightBlocksRef.current[currentRightIdx] = el; }
                    }
                    style={{
                      opacity: 0,
                      paddingLeft: '32px',
                      borderLeft: '2px solid #D6D6D0',
                    }}
                  >
                    <span
                      className="font-montserrat"
                      style={{
                        fontSize: '28px',
                        fontWeight: 700,
                        color: '#1E3A5F',
                      }}
                    >
                      {m.year}
                    </span>
                    <h4
                      className="font-montserrat"
                      style={{
                        fontSize: '15px',
                        fontWeight: 600,
                        color: '#1A1A1A',
                        marginTop: '4px',
                      }}
                    >
                      {m.title}
                    </h4>
                    <p
                      className="font-source-sans"
                      style={{
                        fontSize: '13px',
                        fontWeight: 400,
                        color: '#666666',
                        marginTop: '4px',
                        lineHeight: 1.6,
                      }}
                    >
                      {m.description}
                    </p>
                  </div>

                  {/* Dot on timeline — desktop only */}
                  <div
                    className="absolute left-1/2 top-1 hidden md:block"
                    ref={(el) => {
                      dotsRef.current[i] = el;
                    }}
                    style={{
                      width: '16px',
                      height: '16px',
                      borderRadius: '50%',
                      background: '#1E3A5F',
                      border: '3px solid #FFFFFF',
                      boxShadow: '0 0 0 2px #1E3A5F',
                      transform: 'translateX(-50%)',
                      opacity: 0,
                    }}
                  />

                  {/* Mobile dot */}
                  <div
                    className="md:hidden absolute left-0 top-2"
                    style={{
                      width: '12px',
                      height: '12px',
                      borderRadius: '50%',
                      background: '#1E3A5F',
                      border: '2px solid #FFFFFF',
                      boxShadow: '0 0 0 2px #1E3A5F',
                      transform: 'translateX(-50%)',
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────
   Section 4 — Values (dark blue bg)
   ────────────────────────────────────────────── */

const values = [
  {
    icon: Eye,
    title: 'Transparence',
    description:
      'Publier, rendre compte, permettre à chaque citoyen de comprendre et de contrôler l\'action publique.',
  },
  {
    icon: Accessibility,
    title: 'Accessibilité',
    description:
      'Concevoir des services numériques accessibles à tous, conformes au référentiel RGAA.',
  },
  {
    icon: Lock,
    title: 'Sécurité',
    description:
      'Protéger les données personnelles des citoyens et garantir la souveraineté numérique de la nation.',
  },
  {
    icon: HandHeart,
    title: 'Service public',
    description:
      'Placer l\'intérêt général au cœur de chaque décision, au service de la République et des Français.',
  },
];

// Framer Motion value card — ISOLATED
function ValueCard({
  value,
  index,
}: {
  value: (typeof values)[number];
  index: number;
}) {
  const Icon = value.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.4,
        delay: index * 0.08,
        ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
      }}
      whileHover={{
        y: -2,
        background: 'rgba(255,255,255,0.1)',
        borderColor: 'rgba(255,255,255,0.2)',
      }}
      className="flex flex-col items-center text-center"
      style={{
        background: 'rgba(255,255,255,0.06)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '2px',
        padding: '32px 24px',
        transition: 'background 200ms, border-color 200ms',
      }}
    >
      <Icon size={28} color="#E5B045" strokeWidth={1.5} />
      <h4
        className="font-montserrat"
        style={{
          fontSize: '16px',
          fontWeight: 600,
          color: '#FFFFFF',
          marginTop: '16px',
        }}
      >
        {value.title}
      </h4>
      <p
        className="font-source-sans"
        style={{
          fontSize: '13px',
          fontWeight: 400,
          color: 'rgba(255,255,255,0.7)',
          lineHeight: 1.6,
          marginTop: '8px',
        }}
      >
        {value.description}
      </p>
    </motion.div>
  );
}

function ValuesSection() {
  return (
    <section style={{ background: '#1E3A5F', padding: '48px 0' }}>
      <div
        className="mx-auto"
        style={{ maxWidth: '1400px', padding: '0 24px' }}
      >
        {/* Header */}
        <div className="text-center" style={{ marginBottom: '48px' }}>
          <span
            className="font-source-sans uppercase"
            style={{
              fontSize: '11px',
              fontWeight: 500,
              letterSpacing: '0.12em',
              color: '#E5B045',
            }}
          >
            NOS VALEURS
          </span>
          <h2
            className="font-montserrat"
            style={{
              fontSize: '30px',
              fontWeight: 600,
              color: '#FFFFFF',
              marginTop: '16px',
              lineHeight: 1.15,
            }}
          >
            Les principes qui guident notre action
          </h2>
        </div>

        {/* Values grid - 4 columns on desktop, 2 on tablet, 1 on mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" style={{ gap: '24px' }}>
          {values.map((v, i) => (
            <ValueCard key={v.title} value={v} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────
   Section 5 — Team (GSAP scroll + Framer Motion hover)
   ────────────────────────────────────────────── */

// Use HandHeart as substitute for HandHelping (not in lucide-react)

const minister = {
  name: 'Marie DUPONT',
  role: 'Ministre de la Transformation Digitale et de l\'Innovation Publique',
  bio: 'Depuis 2024, Marie conduit la transformation numérique de l\'administration française. Ingénieure de formation, elle a consacré sa carrière à l\'innovation au service de l\'intérêt général.',
};

const teamMembers = [
  { initials: 'MD', name: 'Marie Dupont', role: 'Directrice Générale' },
  { initials: 'JL', name: 'Jean Lefebvre', role: 'Directeur du Numérique' },
  { initials: 'SM', name: 'Sophie Martin', role: 'Directrice Territoriale' },
  { initials: 'PB', name: 'Pierre Bernard', role: 'Directeur du Budget' },
  { initials: 'CT', name: 'Claire Thomas', role: 'Cheffe de Cabinet' },
  { initials: 'AR', name: 'Antoine Robert', role: 'Délégué aux Associations' },
  { initials: 'ER', name: 'Émilie Richard', role: 'Déléguée à l\'ESS' },
  { initials: 'NM', name: 'Nicolas Moreau', role: 'Délégué à la Cybersécurité' },
];

const accentColors = [
  '#1E3A5F',
  '#2B5C8F',
  '#4A7C6F',
  '#B85C6E',
  '#A3C8D8',
  '#7A9E7E',
  '#E5B045',
  '#0F1F33',
];

// Framer Motion team card — ISOLATED
function TeamMemberCard({
  member,
  index,
}: {
  member: (typeof teamMembers)[number];
  index: number;
}) {
  const accent = accentColors[index % accentColors.length];
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.4,
        delay: index * 0.06,
        ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
      }}
      whileHover={{
        boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
        borderColor: accent,
      }}
      className="flex flex-col items-center text-center"
      style={{
        background: '#F5F5F0',
        border: '1px solid #E8E8E3',
        borderRadius: '2px',
        padding: '28px',
        transition: 'border-color 200ms',
      }}
    >
      {/* Avatar placeholder */}
      <div
        className="flex items-center justify-center rounded-full"
        style={{
          width: '72px',
          height: '72px',
          background: '#E8E8E3',
        }}
      >
        <span
          className="font-montserrat"
          style={{
            fontSize: '22px',
            fontWeight: 700,
            color: '#1E3A5F',
          }}
        >
          {member.initials}
        </span>
      </div>
      <h4
        className="font-montserrat"
        style={{
          fontSize: '15px',
          fontWeight: 600,
          color: '#1A1A1A',
          marginTop: '16px',
        }}
      >
        {member.name}
      </h4>
      <p
        className="font-source-sans"
        style={{
          fontSize: '12px',
          fontWeight: 400,
          color: '#666666',
          marginTop: '4px',
        }}
      >
        {member.role}
      </p>
    </motion.div>
  );
}

function TeamSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Featured image slides from left
      if (imageRef.current) {
        gsap.fromTo(
          imageRef.current,
          { x: -30, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
              once: true,
            },
          }
        );
      }

      // Text elements stagger from right
      const validTexts = textRefs.current.filter(Boolean);
      if (validTexts.length) {
        gsap.fromTo(
          validTexts,
          { x: 20, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
              once: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  let textIdx = 0;

  return (
    <section
      ref={sectionRef}
      style={{ background: '#FFFFFF', padding: '56px 0' }}
    >
      <div
        className="mx-auto"
        style={{ maxWidth: '1400px', padding: '0 24px' }}
      >
        {/* Header */}
        <div style={{ marginBottom: '40px' }}>
          <span
            className="font-source-sans uppercase"
            style={{
              fontSize: '11px',
              fontWeight: 500,
              letterSpacing: '0.1em',
              color: '#E5B045',
            }}
          >
            L&apos;ÉQUIPE
          </span>
          <h2
            className="font-montserrat"
            style={{
              fontSize: '30px',
              fontWeight: 600,
              color: '#1A1A1A',
              marginTop: '16px',
              lineHeight: 1.15,
            }}
          >
            La direction du ministère
          </h2>
        </div>

        {/* Featured minister row */}
        <div
          className="grid grid-cols-1 md:grid-cols-5"
          style={{ gap: '24px' }}
        >
          {/* Image — 40% = 2/5 cols */}
          <div
            ref={imageRef}
            className="md:col-span-2"
            style={{ opacity: 0 }}
          >
            <div
              className="w-full overflow-hidden"
              style={{
                borderRadius: '2px',
                aspectRatio: '3/4',
              }}
            >
              <img
                src="/about-mission.jpg"
                alt="Portrait ministre"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Text — 60% = 3/5 cols */}
          <div
            className="md:col-span-3 flex flex-col justify-center"
          >
            <div
              ref={(el) => { textRefs.current[textIdx++] = el; }}
              style={{ opacity: 0 }}
            >
              <span
                className="font-source-sans uppercase"
                style={{
                  fontSize: '10px',
                  fontWeight: 500,
                  letterSpacing: '0.12em',
                  color: '#E5B045',
                }}
              >
                MINISTRE
              </span>
            </div>
            <div
              ref={(el) => { textRefs.current[textIdx++] = el; }}
              style={{ opacity: 0, marginTop: '8px' }}
            >
              <h3
                className="font-montserrat"
                style={{
                  fontSize: '28px',
                  fontWeight: 600,
                  color: '#1E3A5F',
                }}
              >
                {minister.name}
              </h3>
            </div>
            <div
              ref={(el) => { textRefs.current[textIdx++] = el; }}
              style={{ opacity: 0, marginTop: '4px' }}
            >
              <p
                className="font-source-sans"
                style={{
                  fontSize: '15px',
                  fontWeight: 400,
                  color: '#666666',
                }}
              >
                {minister.role}
              </p>
            </div>
            <div
              ref={(el) => { textRefs.current[textIdx++] = el; }}
              style={{ opacity: 0, marginTop: '16px', maxWidth: '480px' }}
            >
              <p
                className="font-source-sans"
                style={{
                  fontSize: '15px',
                  fontWeight: 400,
                  color: '#1A1A1A',
                  lineHeight: 1.65,
                }}
              >
                {minister.bio}
              </p>
            </div>
            <div
              ref={(el) => { textRefs.current[textIdx++] = el; }}
              style={{ opacity: 0, marginTop: '20px' }}
              className="flex items-center gap-1 cursor-pointer group"
            >
              <span
                className="font-montserrat uppercase"
                style={{
                  fontSize: '11px',
                  fontWeight: 600,
                  color: '#1E3A5F',
                  letterSpacing: '0.05em',
                }}
              >
                SA BIOGRAPHIE COMPLÈTE
              </span>
              <ChevronRight
                size={14}
                color="#1E3A5F"
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </div>
          </div>
        </div>

        {/* Team grid */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
          style={{ gap: '20px', marginTop: '40px' }}
        >
          {teamMembers.map((member, i) => (
            <TeamMemberCard key={member.initials} member={member} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────
   Section 6 — Contact CTA (GSAP)
   ────────────────────────────────────────────── */

function ContactCTA() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section style={{ background: '#F5F5F0', padding: '64px 0' }}>
      <div
        ref={sectionRef}
        className="mx-auto flex flex-col md:flex-row md:items-center md:justify-between"
        style={{
          maxWidth: '1400px',
          padding: '0 24px',
          opacity: 0,
          gap: '32px',
        }}
      >
        <div>
          <h3
            className="font-montserrat"
            style={{
              fontSize: '24px',
              fontWeight: 600,
              color: '#1A1A1A',
              lineHeight: 1.2,
            }}
          >
            Vous souhaitez en savoir plus sur le ministère ?
          </h3>
          <p
            className="font-source-sans"
            style={{
              fontSize: '15px',
              fontWeight: 400,
              color: '#666666',
              marginTop: '8px',
            }}
          >
            Retrouvez nos coordonnées, nos horaires d&apos;ouverture et notre
            formulaire de contact.
          </p>
        </div>
        <div className="flex flex-wrap items-center" style={{ gap: '16px' }}>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center font-montserrat font-semibold uppercase no-underline transition-all duration-200 hover:translate-y-[-1px]"
            style={{
              fontSize: '13px',
              letterSpacing: '0.05em',
              padding: '14px 28px',
              borderRadius: '2px',
              background: '#1E3A5F',
              color: '#FFFFFF',
            }}
          >
            NOUS CONTACTER
          </Link>
          <Link
            to="/a-propos"
            className="inline-flex items-center justify-center font-montserrat font-semibold uppercase no-underline transition-all duration-200 hover:translate-y-[-1px]"
            style={{
              fontSize: '13px',
              letterSpacing: '0.05em',
              padding: '14px 28px',
              borderRadius: '2px',
              background: 'transparent',
              border: '1.5px solid #1E3A5F',
              color: '#1E3A5F',
            }}
          >
            ORGANIGRAMME
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────
   Main Page Component
   ────────────────────────────────────────────── */

export default function About() {
  return (
    <div>
      <PageHero />
      <MissionSection />
      <TimelineSection />
      <ValuesSection />
      <TeamSection />
      <ContactCTA />
    </div>
  );
}
