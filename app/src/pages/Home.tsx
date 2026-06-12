import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import {
  Search, ArrowRight, FileText, Users, Calendar, BarChart3, Globe,
  Mail, CheckCircle, UsersRound, HeartHandshake, Monitor, Landmark
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

/* ─── Section 1: Hero ─── */
function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const title1Ref = useRef<HTMLDivElement>(null);
  const title2Ref = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.2 });
    if (labelRef.current) tl.to(labelRef.current, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, 0);
    if (title1Ref.current) tl.to(title1Ref.current, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, 0.15);
    if (title2Ref.current) tl.to(title2Ref.current, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, 0.25);
    if (subtitleRef.current) tl.to(subtitleRef.current, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, 0.45);
    if (ctaRef.current) tl.to(ctaRef.current, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }, 0.6);
    if (searchRef.current) tl.to(searchRef.current, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }, 0.7);
    return () => { tl.kill(); };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100dvh] flex items-center overflow-hidden"
    >
      {/* Background image with Ken Burns */}
      <div className="absolute inset-0 animate-ken-burns">
        <img
          src="/hero-paris-aerial.jpg"
          alt="Paris aerial view"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Gradient overlay */}
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(90deg, rgba(30,58,95,0.92) 0%, rgba(30,58,95,0.6) 45%, transparent 80%)' }}
      />

      {/* Content */}
      <div className="relative z-10 mx-auto w-full" style={{ maxWidth: '1400px', padding: '0 24px' }}>
        <div style={{ maxWidth: '680px' }}>
          {/* Label */}
          <div
            ref={labelRef}
            className="font-source-sans font-medium uppercase"
            style={{
              fontSize: '12px',
              letterSpacing: '0.12em',
              color: 'rgba(255,255,255,0.7)',
              marginBottom: '16px',
              opacity: 0,
              transform: 'translateY(15px)',
            }}
          >
            MINISTÈRE DE LA TRANSFORMATION DIGITALE
          </div>

          {/* Title Line 1 */}
          <div
            ref={title1Ref}
            className="font-montserrat font-semibold text-white"
            style={{
              fontSize: 'clamp(36px, 5vw, 60px)',
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              opacity: 0,
              transform: 'translateY(30px)',
            }}
          >
            Services publics:
          </div>

          {/* Title Line 2 */}
          <div
            ref={title2Ref}
            className="font-montserrat font-semibold text-white"
            style={{
              fontSize: 'clamp(36px, 5vw, 60px)',
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              opacity: 0,
              transform: 'translateY(30px)',
            }}
          >
            modernes & <span className="border-b-4 border-[#E5B045]">accessibles</span>
          </div>

          {/* Subtitle */}
          <p
            ref={subtitleRef}
            className="font-source-sans font-normal"
            style={{
              fontSize: '20px',
              lineHeight: 1.6,
              color: 'rgba(255,255,255,0.85)',
              maxWidth: '520px',
              marginTop: '24px',
              opacity: 0,
              transform: 'translateY(20px)',
            }}
          >
            Simplifiez vos démarches administratives. Accédez aux services publics en ligne, 24h/24, pour tous les Français.
          </p>

          {/* CTA Group */}
          <div
            ref={ctaRef}
            className="flex flex-wrap items-center"
            style={{ gap: '24px', marginTop: '40px', opacity: 0, transform: 'translateY(15px)' }}
          >
            <Link
              to="/services"
              className="inline-flex items-center font-montserrat font-semibold uppercase no-underline transition-all duration-200 hover:translate-y-[-1px]"
              style={{
                background: '#FFFFFF',
                color: '#1E3A5F',
                padding: '16px 32px',
                fontSize: '13px',
                letterSpacing: '0.05em',
                borderRadius: '2px',
                boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
              }}
            >
              ACCÉDER AUX SERVICES
            </Link>
            <Link
              to="/a-propos"
              className="inline-flex items-center gap-2 font-source-sans font-medium uppercase no-underline transition-colors duration-150 group"
              style={{
                fontSize: '13px',
                letterSpacing: '0.06em',
                color: 'rgba(255,255,255,0.7)',
              }}
            >
              EN SAVOIR PLUS
              <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Search bar */}
          <div
            ref={searchRef}
            className="flex"
            style={{
              background: 'rgba(255,255,255,0.95)',
              borderRadius: '2px',
              padding: '6px',
              maxWidth: '560px',
              marginTop: '48px',
              boxShadow: '0 4px 24px rgba(0,0,0,0.12)',
              opacity: 0,
              transform: 'translateY(15px)',
            }}
          >
            <input
              type="text"
              placeholder="Rechercher un service, une démarche..."
              className="flex-1 border-none bg-transparent font-source-sans font-normal outline-none"
              style={{ padding: '14px 18px', fontSize: '16px', color: '#1A1A1A' }}
            />
            <button
              className="flex items-center gap-2 font-montserrat font-semibold uppercase text-white border-none cursor-pointer transition-colors duration-200 hover:bg-[#2B5C8F]"
              style={{ background: '#1E3A5F', padding: '14px 24px', borderRadius: '2px', fontSize: '12px' }}
            >
              <Search size={18} />
              RECHERCHER
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Section 2: Quick Services ─── */
const quickServices = [
  { icon: FileText, label: 'DÉMARCHES', sub: 'Papiers, permis, aides' },
  { icon: Users, label: 'PARTICULIERS', sub: 'Services aux citoyens' },
  { icon: Calendar, label: 'RÉUNIONS', sub: 'Consultations publiques' },
  { icon: BarChart3, label: 'BUDGET', sub: 'Données budgétaires' },
  { icon: Globe, label: 'FRANCE SERVICES', sub: 'Trouver un guichet' },
];

function QuickServicesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const items = sectionRef.current.querySelectorAll('.quick-item');
    const tl = gsap.timeline({
      scrollTrigger: { trigger: sectionRef.current, start: 'top 85%', once: true },
    });
    tl.from(items, { opacity: 0, y: 20, duration: 0.5, stagger: 0.08, ease: 'power2.out' });
    return () => { tl.kill(); };
  }, []);

  return (
    <section ref={sectionRef} style={{ background: '#1E3A5F', padding: '48px 0' }}>
      <div className="mx-auto grid grid-cols-2 md:grid-cols-5" style={{ maxWidth: '1400px', padding: '0 24px', gap: '32px' }}>
        {quickServices.map((service) => (
          <div
            key={service.label}
            className="quick-item flex flex-col items-center text-center cursor-pointer group"
          >
            <div
              className="flex items-center justify-center transition-all duration-200 group-hover:border-white group-hover:bg-white/10"
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                border: '1.5px solid rgba(255,255,255,0.3)',
              }}
            >
              <service.icon size={32} className="text-white" />
            </div>
            <span
              className="font-montserrat font-semibold uppercase text-white mt-3 transition-opacity duration-200 group-hover:opacity-100"
              style={{ fontSize: '13px', letterSpacing: '0.06em', opacity: 0.9 }}
            >
              {service.label}
            </span>
            <span
              className="font-source-sans font-normal text-white"
              style={{ fontSize: '12px', opacity: 0.6, marginTop: '4px' }}
            >
              {service.sub}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─── Editorial Modules ─── */
const modules = [
  {
    index: '01',
    label: 'CITOYENS',
    color: '#E5B045',
    title: 'Un État au service de chaque citoyen',
    body: 'Du renouvellement de vos papiers d\'identité à l\'accès aux aides sociales, découvrez les services conçus pour simplifier votre quotidien. La transformation numérique place le citoyen au cœur de l\'action publique.',
    cta: 'DÉCOUVRIR NOS SERVICES',
    ctaLink: '/services',
    image: '/module-citoyens.jpg',
    dark: false,
  },
  {
    index: '02',
    label: 'ASSOCIATIONS',
    color: '#4A7C6F',
    title: 'Soutenir la vie associative et l\'engagement civique',
    body: 'Les associations sont le tissu vivant de notre démocratie. Découvrez les dispositifs de financement, les démarches de création et les outils numériques à destination des 1,5 million d\'associations françaises.',
    cta: 'ESPACE ASSOCIATIONS',
    ctaLink: '/services',
    image: '/module-associations.jpg',
    dark: false,
  },
  {
    index: '03',
    label: 'NUMÉRIQUE & DATA',
    color: '#A3C8D8',
    title: 'Transformer l\'État par le numérique',
    body: 'L\'administration numérique est notre priorité. Identité numérique, cloud souverain, données ouvertes, cybersécurité : construisons ensemble l\'État de demain.',
    cta: 'PROGRAMME NUMÉRIQUE',
    ctaLink: '/politiques-publiques',
    image: '/module-numerique.jpg',
    dark: true,
  },
  {
    index: '04',
    label: 'COLLECTIVITÉS',
    color: '#7A9E7E',
    title: 'Accompagner les territoires dans leur transformation',
    body: 'De la petite commune à la grande métropole, chaque territoire est unique. Accédez aux financements, outils et accompagnements dédiés aux collectivités locales.',
    cta: 'ESPACE COLLECTIVITÉS',
    ctaLink: '/services',
    image: '/module-collectivites.jpg',
    dark: false,
  },
];

function EditorialModule({ mod }: { mod: typeof modules[0] }) {
  const modRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!modRef.current) return;
    const els = modRef.current.querySelectorAll('.mod-anim');
    const tl = gsap.timeline({
      scrollTrigger: { trigger: modRef.current, start: 'top 80%', once: true },
    });
    tl.from(els, { opacity: 0, y: 25, duration: 0.6, stagger: 0.1, ease: 'power2.out' });
    return () => { tl.kill(); };
  }, []);

  return (
    <div ref={modRef} className="grid grid-cols-1 lg:grid-cols-2 min-h-[60dvh]" style={{ maxHeight: '800px' }}>
      {/* Left panel */}
      <div
        className="flex flex-col justify-center"
        style={{
          background: mod.dark ? '#1A1A1A' : '#F5F5F0',
          padding: 'clamp(48px, 8vw, 80px) clamp(32px, 6vw, 64px)',
        }}
      >
        <div className="mod-anim" style={{ opacity: 0, transform: 'translateY(25px)' }}>
          <span
            className="font-source-sans font-medium uppercase"
            style={{
              fontSize: '11px',
              letterSpacing: '0.1em',
              color: mod.color,
            }}
          >
            {mod.index} / {mod.label}
          </span>
        </div>

        <div
          className="mod-anim"
          style={{
            width: '60px',
            height: '1px',
            background: mod.dark ? 'rgba(255,255,255,0.15)' : '#D6D6D0',
            margin: '20px 0 32px',
            opacity: 0,
            transform: 'translateY(25px)',
          }}
        />

        <div className="mod-anim" style={{ opacity: 0, transform: 'translateY(25px)' }}>
          <h2
            className="font-montserrat font-bold"
            style={{
              fontSize: 'clamp(28px, 3.5vw, 45px)',
              lineHeight: 1.05,
              letterSpacing: '-0.01em',
              color: mod.dark ? '#FFFFFF' : '#1E3A5F',
              maxWidth: '480px',
            }}
          >
            {mod.title}
          </h2>
        </div>

        <div className="mod-anim" style={{ opacity: 0, transform: 'translateY(25px)' }}>
          <p
            className="font-source-sans font-normal"
            style={{
              fontSize: '16px',
              lineHeight: 1.65,
              color: mod.dark ? 'rgba(255,255,255,0.8)' : '#1A1A1A',
              maxWidth: '420px',
              marginTop: '24px',
            }}
          >
            {mod.body}
          </p>
        </div>

        <div className="mod-anim" style={{ opacity: 0, transform: 'translateY(25px)' }}>
          <Link
            to={mod.ctaLink}
            className="inline-block font-montserrat font-semibold uppercase no-underline transition-all duration-200 mt-8"
            style={{
              fontSize: '12px',
              padding: '14px 28px',
              borderRadius: '2px',
              border: mod.dark ? '1.5px solid #FFFFFF' : '1.5px solid #1E3A5F',
              color: mod.dark ? '#FFFFFF' : '#1E3A5F',
              background: 'transparent',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = mod.dark ? '#FFFFFF' : '#1E3A5F';
              e.currentTarget.style.color = mod.dark ? '#1A1A1A' : '#FFFFFF';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = mod.dark ? '#FFFFFF' : '#1E3A5F';
            }}
          >
            {mod.cta}
          </Link>
        </div>
      </div>

      {/* Right panel */}
      <div className="relative overflow-hidden min-h-[400px] lg:min-h-0">
        <img
          src={mod.image}
          alt={mod.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
    </div>
  );
}

function EditorialSection() {
  return (
    <section>
      {modules.map((mod) => (
        <EditorialModule key={mod.index} mod={mod} />
      ))}
    </section>
  );
}

/* ─── Section 4: Key Figures ─── */
const keyFigures = [
  { number: '38M+', label: "D'IDENTITÉS NUMÉRIQUES ACTIVÉES" },
  { number: '1,5M', label: 'ASSOCIATIONS ACCOMPAGNÉES' },
  { number: '35K', label: 'COMMUNES CONNECTÉES' },
  { number: '98%', label: 'DE DÉMARCHES DÉMATÉRIALISÉES' },
];

function KeyFiguresSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const badges = sectionRef.current.querySelectorAll('.key-badge');
    const tl = gsap.timeline({
      scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true },
    });
    tl.from(badges, { opacity: 0, y: 30, duration: 0.6, stagger: 0.1, ease: 'power2.out' });
    return () => { tl.kill(); };
  }, []);

  return (
    <section ref={sectionRef} style={{ background: '#FFFFFF', padding: '56px 0' }}>
      <div className="mx-auto" style={{ maxWidth: '1400px', padding: '0 24px' }}>
        {/* Header */}
        <span
          className="font-source-sans font-medium uppercase block"
          style={{ fontSize: '11px', letterSpacing: '0.12em', color: '#E5B045', marginBottom: '12px' }}
        >
          EN BREF
        </span>
        <h2
          className="font-montserrat font-semibold"
          style={{ fontSize: 'clamp(26px, 3vw, 36px)', color: '#1E3A5F' }}
        >
          Le Ministère en chiffres
        </h2>
        <div style={{ width: '40px', height: '2px', background: '#E5B045', marginTop: '16px' }} />

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" style={{ gap: '32px', marginTop: '32px' }}>
          {keyFigures.map((fig) => (
            <div
              key={fig.label}
              className="key-badge flex flex-col items-center text-center transition-all duration-250 hover:translate-y-[-2px]"
              style={{
                background: '#FFFFFF',
                border: '1px solid #E8E8E3',
                borderRadius: '2px',
                padding: '28px 24px',
                boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                cursor: 'default',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.08)';
                e.currentTarget.style.borderColor = '#1E3A5F';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.06)';
                e.currentTarget.style.borderColor = '#E8E8E3';
              }}
            >
              <span
                className="font-montserrat font-bold"
                style={{ fontSize: '52px', color: '#1E3A5F', letterSpacing: '-0.02em' }}
              >
                {fig.number}
              </span>
              <span
                className="font-source-sans font-normal uppercase"
                style={{ fontSize: '12px', color: '#666666', letterSpacing: '0.06em', marginTop: '12px' }}
              >
                {fig.label}
              </span>
              <div style={{ width: '36px', height: '2px', background: '#E5B045', marginTop: '16px' }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Section 5: News ─── */
const featuredNews = {
  image: '/news-featured.jpg',
  title: 'Lancement de la nouvelle identité numérique FranceConnect+ pour tous les services publics',
  date: '15 JANVIER 2026',
  category: 'TRANSFORMATION NUMÉRIQUE',
};

const sideNews = [
  {
    image: '/news-1.jpg',
    title: 'Nouveau portail en ligne pour les démarches administratives des collectivités',
    date: '12 JANVIER 2026',
    category: 'COLLECTIVITÉS',
  },
  {
    image: '/news-2.jpg',
    title: 'Le ministère renforce son programme d\'accompagnement des associations',
    date: '8 JANVIER 2026',
    category: 'ASSOCIATIONS',
  },
];

function NewsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const featured = sectionRef.current.querySelector('.news-featured');
    const side = sectionRef.current.querySelectorAll('.news-side');
    const tl = gsap.timeline({
      scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true },
    });
    if (featured) tl.from(featured, { opacity: 0, x: -30, duration: 0.6, ease: 'power2.out' });
    if (side.length) tl.from(side, { opacity: 0, y: 30, duration: 0.6, stagger: 0.15, ease: 'power2.out' }, '-=0.4');
    return () => { tl.kill(); };
  }, []);

  return (
    <section ref={sectionRef} style={{ background: '#F5F5F0', padding: '56px 0' }}>
      <div className="mx-auto" style={{ maxWidth: '1400px', padding: '0 24px' }}>
        {/* Header */}
        <div className="flex flex-wrap items-end justify-between" style={{ marginBottom: '48px' }}>
          <div>
            <span
              className="font-source-sans font-medium uppercase block"
              style={{ fontSize: '11px', letterSpacing: '0.12em', color: '#1E3A5F', marginBottom: '8px' }}
            >
              ACTUALITÉS
            </span>
            <h2
              className="font-montserrat font-semibold"
              style={{ fontSize: 'clamp(26px, 3vw, 36px)', color: '#1A1A1A' }}
            >
              Dernières informations
            </h2>
          </div>
          <Link
            to="/actualites"
            className="inline-flex items-center gap-2 font-montserrat font-semibold uppercase no-underline"
            style={{ fontSize: '12px', color: '#1E3A5F' }}
          >
            TOUTE L'ACTUALITÉ
            <ArrowRight size={16} />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Featured */}
          <div className="news-featured lg:col-span-2 relative group cursor-pointer overflow-hidden" style={{ borderRadius: '2px' }}>
            <div className="relative" style={{ aspectRatio: '16/9' }}>
              <img
                src={featuredNews.image}
                alt={featuredNews.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.04]"
              />
              <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(transparent 40%, rgba(15,31,51,0.85) 100%)' }}
              />
              <div className="absolute bottom-0 left-0 p-6 lg:p-8">
                <span
                  className="inline-block font-source-sans font-medium uppercase"
                  style={{
                    fontSize: '11px',
                    background: '#E5B045',
                    color: '#1E3A5F',
                    padding: '4px 12px',
                    borderRadius: '2px',
                    marginBottom: '12px',
                  }}
                >
                  {featuredNews.category}
                </span>
                <h3
                  className="font-montserrat font-semibold text-white"
                  style={{ fontSize: 'clamp(18px, 2vw, 24px)', lineHeight: 1.3, maxWidth: '600px' }}
                >
                  {featuredNews.title}
                </h3>
                <span
                  className="font-source-sans font-medium uppercase block mt-2"
                  style={{ fontSize: '11px', color: 'rgba(255,255,255,0.7)', letterSpacing: '0.06em' }}
                >
                  {featuredNews.date}
                </span>
              </div>
            </div>
          </div>

          {/* Side news */}
          <div className="flex flex-col gap-6">
            {sideNews.map((news) => (
              <div
                key={news.title}
                className="news-side bg-white overflow-hidden cursor-pointer group transition-shadow duration-300 hover:shadow-lg"
                style={{ borderRadius: '2px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}
              >
                <div className="overflow-hidden" style={{ aspectRatio: '16/9' }}>
                  <img
                    src={news.image}
                    alt={news.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.04]"
                  />
                </div>
                <div style={{ padding: '20px' }}>
                  <span
                    className="font-source-sans font-medium uppercase"
                    style={{ fontSize: '11px', color: '#666666', letterSpacing: '0.06em' }}
                  >
                    {news.date}
                  </span>
                  <h4
                    className="font-montserrat font-semibold mt-1"
                    style={{ fontSize: '16px', color: '#1A1A1A', lineHeight: 1.4, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}
                  >
                    {news.title}
                  </h4>
                  <span
                    className="inline-block mt-2 font-source-sans font-medium uppercase"
                    style={{
                      fontSize: '11px',
                      background: 'rgba(30,58,95,0.08)',
                      color: '#1E3A5F',
                      padding: '4px 12px',
                      borderRadius: '2px',
                    }}
                  >
                    {news.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Section 6: Newsletter ─── */
function NewsletterSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const els = sectionRef.current.querySelectorAll('.news-anim');
    const tl = gsap.timeline({
      scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true },
    });
    tl.from(els, { opacity: 0, y: 30, duration: 0.6, stagger: 0.1, ease: 'power2.out' });
    return () => { tl.kill(); };
  }, []);

  return (
    <section ref={sectionRef} style={{ background: '#1E3A5F', padding: '48px 0' }}>
      <div className="mx-auto text-center" style={{ maxWidth: '640px', padding: '0 24px' }}>
        <div className="news-anim flex justify-center" style={{ opacity: 0 }}>
          <Mail size={32} style={{ color: '#E5B045' }} />
        </div>
        <h2
          className="news-anim font-montserrat font-semibold text-white"
          style={{ fontSize: 'clamp(24px, 3vw, 32px)', lineHeight: 1.2, marginTop: '16px', opacity: 0 }}
        >
          Restez informé des évolutions des services publics
        </h2>
        <p
          className="news-anim font-source-sans font-normal"
          style={{ fontSize: '16px', color: 'rgba(255,255,255,0.75)', marginTop: '16px', lineHeight: 1.6, opacity: 0 }}
        >
          Recevez chaque mois les actualités du ministère, les nouveaux services en ligne et les consultations publiques ouvertes.
        </p>
        <form
          className="news-anim flex flex-col sm:flex-row"
          style={{ gap: '12px', marginTop: '32px', maxWidth: '520px', margin: '32px auto 0', opacity: 0 }}
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="email"
            placeholder="Votre adresse email"
            className="flex-1 font-source-sans font-normal outline-none"
            style={{
              background: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '2px',
              padding: '14px 18px',
              color: '#FFFFFF',
              fontSize: '15px',
            }}
          />
          <button
            type="submit"
            className="font-montserrat font-semibold uppercase border-none cursor-pointer transition-colors duration-200"
            style={{
              background: '#E5B045',
              color: '#1E3A5F',
              padding: '14px 28px',
              borderRadius: '2px',
              fontSize: '12px',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = '#D4A03E'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = '#E5B045'; }}
          >
            S'INSCRIRE
          </button>
        </form>
        <p
          className="news-anim font-source-sans font-normal"
          style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', marginTop: '16px', opacity: 0 }}
        >
          En vous inscrivant, vous acceptez notre politique de confidentialité.
        </p>
      </div>
    </section>
  );
}

/* ─── Section 7: Video Feature ─── */
function VideoSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const videoEl = sectionRef.current.querySelector('.video-anim');
    const textEls = sectionRef.current.querySelectorAll('.video-text-anim');
    const tl = gsap.timeline({
      scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true },
    });
    if (videoEl) tl.from(videoEl, { opacity: 0, x: -40, duration: 0.6, ease: 'power2.out' });
    if (textEls.length) tl.from(textEls, { opacity: 0, x: 30, duration: 0.6, stagger: 0.1, ease: 'power2.out' }, '-=0.4');
    return () => { tl.kill(); };
  }, []);

  const videoPoints = [
    'Identité numérique FranceConnect+ déployée à l\'ensemble des services',
    'Cloud souverain INTERCONNECT pour les administrations',
    'IA générative expérimentée dans 50 services pilotes',
    '100% des démarches accessibles en ligne d\'ici 2027',
  ];

  return (
    <section ref={sectionRef} style={{ background: '#0F1F33', padding: '56px 0' }}>
      <div className="mx-auto grid grid-cols-1 lg:grid-cols-2 items-center" style={{ maxWidth: '1400px', padding: '0 24px', gap: '48px' }}>
        {/* Video container */}
        <div className="video-anim relative overflow-hidden" style={{ borderRadius: '2px', opacity: 0 }}>
          <div style={{ aspectRatio: '16/9', background: '#1A1A2E' }}>
            <img
              src="/hero-paris-aerial.jpg"
              alt="Projet avenir"
              className="w-full h-full object-cover"
            />
          </div>
          <p
            className="absolute bottom-3 left-3 font-source-sans font-normal"
            style={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)' }}
          >
            © Ministère de la Transformation Digitale — 2026
          </p>
        </div>

        {/* Text content */}
        <div>
          <span
            className="video-text-anim font-source-sans font-medium uppercase block"
            style={{ fontSize: '11px', letterSpacing: '0.1em', color: '#E5B045', opacity: 0 }}
          >
            PROJET D'AVENIR
          </span>
          <h2
            className="video-text-anim font-montserrat font-semibold text-white"
            style={{ fontSize: 'clamp(26px, 3vw, 36px)', lineHeight: 1.15, marginTop: '16px', opacity: 0 }}
          >
            Construire l'État numérique de demain
          </h2>
          <p
            className="video-text-anim font-source-sans font-normal"
            style={{ fontSize: '16px', color: 'rgba(255,255,255,0.75)', lineHeight: 1.65, marginTop: '20px', opacity: 0 }}
          >
            Notre feuille de route pour une administration 100% numérique d'ici 2030. Identité numérique universelle, cloud souverain, IA au service du public : découvrez les chantiers prioritaires du ministère.
          </p>
          <div className="flex flex-col" style={{ gap: '16px', marginTop: '28px' }}>
            {videoPoints.map((pt) => (
              <div key={pt} className="video-text-anim flex items-start gap-3" style={{ opacity: 0 }}>
                <CheckCircle size={16} style={{ color: '#E5B045', flexShrink: 0, marginTop: '3px' }} />
                <span className="font-source-sans font-medium" style={{ fontSize: '14px', color: 'rgba(255,255,255,0.85)' }}>
                  {pt}
                </span>
              </div>
            ))}
          </div>
          <div className="video-text-anim" style={{ marginTop: '32px', opacity: 0 }}>
            <Link
              to="/politiques-publiques"
              className="inline-block font-montserrat font-semibold uppercase no-underline transition-all duration-200"
              style={{
                fontSize: '12px',
                padding: '14px 28px',
                borderRadius: '2px',
                border: '1.5px solid #FFFFFF',
                color: '#FFFFFF',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#FFFFFF';
                e.currentTarget.style.color = '#0F1F33';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = '#FFFFFF';
              }}
            >
              CONSULTER LA FEUILLE DE ROUTE
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Section 8: Portal Grid ─── */
const portalCards = [
  { icon: Users, accent: '#E5B045', title: 'PARTICULIERS', desc: "Carte d'identité, passeport, permis de conduire, aides sociales", thumbnail: '/citoyens-thumbnail.jpg' },
  { icon: UsersRound, accent: '#4A7C6F', title: 'ASSOCIATIONS', desc: 'Création, financement, vie associative, subventions', thumbnail: '/associations-thumbnail.jpg' },
  { icon: HeartHandshake, accent: '#B85C6E', title: 'ÉCONOMIE SOCIALE', desc: 'Coopératives, mutuelles, ESS, insertion par activité', thumbnail: '/economie-sociale-thumbnail.jpg' },
  { icon: Monitor, accent: '#A3C8D8', title: 'NUMÉRIQUE & DATA', desc: 'Identité numérique, cloud souverain, cybersécurité', thumbnail: '/numerique-thumbnail.jpg' },
  { icon: Landmark, accent: '#7A9E7E', title: 'COLLECTIVITÉS', desc: 'Financements, outils, accompagnement territorial', thumbnail: '/collectivites-thumbnail.jpg' },
];

function PortalGridSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const cards = sectionRef.current.querySelectorAll('.portal-card');
    const tl = gsap.timeline({
      scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true },
    });
    tl.from(cards, { opacity: 0, y: 30, duration: 0.5, stagger: 0.08, ease: 'power2.out' });
    return () => { tl.kill(); };
  }, []);

  return (
    <section ref={sectionRef} style={{ background: '#F5F5F0', padding: '56px 0' }}>
      <div className="mx-auto" style={{ maxWidth: '1400px', padding: '0 24px' }}>
        {/* Header */}
        <span
          className="font-source-sans font-medium uppercase block"
          style={{ fontSize: '11px', letterSpacing: '0.12em', color: '#666666', marginBottom: '12px' }}
        >
          NOS ESPACES
        </span>
        <h2
          className="font-montserrat font-semibold"
          style={{ fontSize: 'clamp(26px, 3vw, 36px)', color: '#1E3A5F' }}
        >
          Accédez à votre espace dédié
        </h2>
        <div style={{ width: '40px', height: '2px', background: '#E5B045', marginTop: '16px' }} />

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5" style={{ gap: '24px', marginTop: '48px' }}>
          {portalCards.map((card) => (
            <div
              key={card.title}
              className="portal-card bg-white cursor-pointer transition-all duration-300 overflow-hidden group"
              style={{
                border: '1px solid #D6D6D0',
                borderRadius: '2px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.08)';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.borderColor = '#1E3A5F';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = '#D6D6D0';
              }}
            >
              {/* Thumbnail */}
              <div className="overflow-hidden" style={{ aspectRatio: '1' }}>
                <img
                  src={card.thumbnail}
                  alt={card.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.04]"
                />
              </div>
              <div style={{ padding: '24px' }}>
                <div
                  className="flex items-center justify-center"
                  style={{
                    width: '48px',
                    height: '48px',
                    background: card.accent,
                    borderRadius: '4px',
                  }}
                >
                  <card.icon size={24} className="text-white" />
                </div>
                <h3
                  className="font-montserrat font-semibold mt-4"
                  style={{ fontSize: '18px', color: '#1E3A5F' }}
                >
                  {card.title}
                </h3>
                <p
                  className="font-source-sans font-normal mt-2"
                  style={{ fontSize: '14px', color: '#666666', lineHeight: 1.5 }}
                >
                  {card.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Section 9: Contact Banner ─── */
function ContactBannerSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const tl = gsap.timeline({
      scrollTrigger: { trigger: sectionRef.current, start: 'top 85%', once: true },
    });
    tl.from(sectionRef.current.querySelectorAll('.contact-anim'), { opacity: 0, y: 20, duration: 0.5, stagger: 0.1, ease: 'power2.out' });
    return () => { tl.kill(); };
  }, []);

  return (
    <section ref={sectionRef} style={{ background: '#1E3A5F', padding: '64px 0' }}>
      <div className="mx-auto text-center" style={{ maxWidth: '1400px', padding: '0 24px' }}>
        <h2
          className="contact-anim font-montserrat font-semibold text-white"
          style={{ fontSize: 'clamp(24px, 3vw, 32px)', opacity: 0 }}
        >
          Une question ? Besoin d'aide ?
        </h2>
        <p
          className="contact-anim font-source-sans font-normal"
          style={{ fontSize: '16px', color: 'rgba(255,255,255,0.75)', marginTop: '12px', opacity: 0 }}
        >
          Notre équipe est à votre disposition pour vous accompagner dans vos démarches.
        </p>
        <div className="contact-anim flex flex-wrap justify-center" style={{ gap: '16px', marginTop: '28px', opacity: 0 }}>
          <Link
            to="/contact"
            className="inline-block font-montserrat font-semibold uppercase no-underline transition-all duration-200 hover:translate-y-[-1px]"
            style={{
              background: '#FFFFFF',
              color: '#1E3A5F',
              padding: '14px 28px',
              borderRadius: '2px',
              fontSize: '13px',
              letterSpacing: '0.05em',
            }}
          >
            CONTACTER LE MINISTÈRE
          </Link>
          <Link
            to="/contact"
            className="inline-block font-montserrat font-semibold uppercase no-underline transition-all duration-200 hover:bg-white/10"
            style={{
              background: 'transparent',
              color: '#FFFFFF',
              padding: '14px 28px',
              borderRadius: '2px',
              fontSize: '13px',
              letterSpacing: '0.05em',
              border: '1.5px solid rgba(255,255,255,0.5)',
            }}
          >
            CONSULTER LA FAQ
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ─── Home Page ─── */
export default function Home() {
  return (
    <div>
      <HeroSection />
      <QuickServicesSection />
      <EditorialSection />
      <KeyFiguresSection />
      <NewsSection />
      <NewsletterSection />
      <VideoSection />
      <PortalGridSection />
      <ContactBannerSection />
    </div>
  );
}
