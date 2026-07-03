import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Accessibility,
  ChevronDown,
  ChevronRight,
  Train,
  Bus,
  Bike,
  Navigation,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

/* ──────────────────────────────────────────────
   DATA
   ────────────────────────────────────────────── */

const faqItems = [
  {
    q: 'Comment contacter le ministère ?',
    a: 'Vous pouvez nous contacter par email à contact@transformation.gouv.fr, par téléphone au 01 53 73 30 00 du lundi au vendredi de 9h à 18h, ou en utilisant le formulaire de contact ci-dessus. Pour les demandes urgentes concernant vos démarches, contactez le 3939.',
  },
  {
    q: 'Quels sont les délais de réponse ?',
    a: "Le ministère s'engage à répondre à toute demande dans un délai de 15 jours ouvrables. Pour les demandes complexes nécessitant une expertise spécifique, le délai peut être porté à 30 jours avec une notification préalable.",
  },
  {
    q: 'Comment signaler un problème technique sur un service en ligne ?',
    a: "Utilisez le formulaire de contact en sélectionnant ‘Signaler un problème technique’ comme sujet. Précisez le service concerné, la nature du problème et, si possible, capturez d'écran. Notre équipe technique vous répondra sous 48h.",
  },
  {
    q: 'Puis-je visiter le ministère ?',
    a: "Le ministère n'est pas ouvert aux visites publiques. Cependant, des journées portes ouvertes sont organisées annuellement, généralement en septembre. Consultez notre page Actualités pour les prochaines dates.",
  },
  {
    q: 'Comment devenir prestataire du ministère ?',
    a: 'Les marchés publics du ministère sont publiés sur la plateforme PLACE et sur le portail de transparence de notre site. Inscrivez-vous sur ces plateformes pour recevoir les avis d’appel public à la concurrence.',
  },
  {
    q: 'Où puis-je consulter les données budgétaires ?',
    a: "L'intégralité des données budgétaires est disponible sur la page Transparence de ce site et sur data.gouv.fr. Vous y trouverez le budget annuel, le compte financier et les rapports de performance.",
  },
  {
    q: 'Comment accéder aux archives du ministère ?',
    a: 'Les archives publiques sont consultables sur demande écrite adressée au service des archives. Certaines archives numérisées sont également disponibles sur FranceArchives.',
  },
  {
    q: 'Le site est-il accessible aux personnes handicapées ?',
    a: 'Oui, ce site est conforme au référentiel général d’amélioration de l’accessibilité (RGAA) version 4.1. Une déclaration d’accessibilité est disponible en pied de page. Si vous rencontrez des difficultés, contactez-nous.',
  },
];

const transportModes = [
  {
    icon: Train,
    title: 'Ligne 8 — Boucicaut ou L’École Militaire',
    subtitle: 'Ligne 10 — Ségur',
  },
  {
    icon: Bus,
    title: 'Lignes 28, 80, 82, 92 — arrêt Ségur',
    subtitle: null,
  },
  {
    icon: Train,
    title: 'RER C — Champ de Mars',
    subtitle: '10 minutes de marche',
  },
  {
    icon: Bike,
    title: 'Station Vélib’ n°7024 — avenue de Ségur',
    subtitle: null,
  },
];

const specializedServices = [
  {
    icon: Phone,
    name: 'France Services',
    description: 'Assistance pour vos démarches administratives en ligne et en présentiel.',
    phone: '3939',
    hours: '7j/7, 9h–18h',
  },
  {
    icon: Phone,
    name: 'Cybermalveillance',
    description: 'Signalement et assistance en cas de cyberattaque ou d’usurpation d’identité.',
    phone: '3977',
    hours: '24h/24, 7j/7',
  },
  {
    icon: Phone,
    name: 'DILA',
    description: 'Direction de l’Information Légale et Administrative. Questions juridiques.',
    phone: '01 53 73 30 00',
    hours: 'Lun–Ven, 9h–18h',
  },
];

/* ──────────────────────────────────────────────
   SECTION 1 — PAGE HERO
   ────────────────────────────────────────────── */

function ContactHero() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!heroRef.current) return;
    const ctx = gsap.context(() => {
      const els = heroRef.current?.querySelectorAll('.hero-reveal');
      if (els) {
        gsap.from(els, { y: 25, opacity: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out' });
      }
      const hotline = heroRef.current?.querySelector('.hotline-reveal');
      if (hotline) {
        gsap.from(hotline, { y: 15, opacity: 0, duration: 0.5, ease: 'power2.out', delay: 0.3 });
      }
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={heroRef}
      className="relative"
      style={{
        background: 'linear-gradient(135deg, rgba(15,31,51,0.92) 0%, rgba(30,58,95,0.82) 100%)',
        padding: '100px 0 100px',
      }}
    >
      {/* Background image */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage: 'url(/contact-hero.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 24px' }}>
        {/* Breadcrumb */}
        <div className="hero-reveal" style={{ marginBottom: '24px' }}>
          <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontWeight: 400, fontSize: '13px', color: 'rgba(255,255,255,0.5)' }}>
            <Link to="/" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>Accueil</Link>
            {' > '}
            <span>Contact</span>
          </span>
        </div>

        {/* Title */}
        <h1
          className="hero-reveal"
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 600,
            fontSize: '52px',
            color: '#FFFFFF',
            letterSpacing: '-0.02em',
            margin: 0,
          }}
        >
          Nous Contacter
        </h1>

        {/* Subtitle */}
        <p
          className="hero-reveal"
          style={{
            fontFamily: "'Source Sans 3', sans-serif",
            fontWeight: 400,
            fontSize: '18px',
            color: 'rgba(255,255,255,0.8)',
            maxWidth: '600px',
            marginTop: '16px',
            lineHeight: 1.6,
          }}
        >
          Le ministère et ses services sont à votre disposition pour répondre à vos questions et vous accompagner dans vos démarches.
        </p>

        {/* Emergency hotline */}
        <div
          className="hotline-reveal flex flex-wrap items-center gap-3"
          style={{
            background: 'rgba(255,255,255,0.1)',
            border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: '2px',
            padding: '14px 24px',
            marginTop: '32px',
            maxWidth: 'fit-content',
          }}
        >
          <Phone size={18} color="#E5B045" />
          <span
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 600,
              fontSize: '15px',
              color: '#FFFFFF',
            }}
          >
            Numéro vert France Services : 3939
          </span>
          <span
            style={{
              fontFamily: "'Source Sans 3', sans-serif",
              fontWeight: 400,
              fontSize: '12px',
              color: 'rgba(255,255,255,0.5)',
            }}
          >
            (service gratuit + prix d’un appel)
          </span>
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────
   SECTION 2 — CONTACT FORM + INFO CARD
   ────────────────────────────────────────────── */

function ContactForm() {
  const [civility, setCivility] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div style={{ background: '#FFFFFF', padding: '48px 0' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 24px' }}>
        <div className="grid grid-cols-1 lg:grid-cols-[55%_45%]" style={{ gap: '24px' }}>
          {/* Left — Form */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] }}
          >
            <span
              style={{
                fontFamily: "'Source Sans 3', sans-serif",
                fontWeight: 500,
                fontSize: '11px',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: '#E5B045',
              }}
            >
              ENVOYER UN MESSAGE
            </span>
            <h2
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 600,
                fontSize: '24px',
                color: '#1A1A1A',
                marginTop: '8px',
              }}
            >
              Formulaire de contact
            </h2>

            <form className="flex flex-col" style={{ gap: '20px', marginTop: '24px' }}>
              {/* Civility */}
              <div className="flex flex-row gap-4">
                {['Mme', 'M.', 'Autre'].map((label) => (
                  <button
                    key={label}
                    type="button"
                    onClick={() => setCivility(label)}
                    className="cursor-pointer transition-all duration-150"
                    style={{
                      border: civility === label ? '1.5px solid #1E3A5F' : '1.5px solid #D6D6D0',
                      borderRadius: '2px',
                      padding: '10px 20px',
                      fontFamily: "'Montserrat', sans-serif",
                      fontWeight: 500,
                      fontSize: '13px',
                      color: civility === label ? '#1E3A5F' : '#666666',
                      background: civility === label ? 'rgba(30,58,95,0.04)' : 'transparent',
                    }}
                  >
                    {label}
                  </button>
                ))}
              </div>

              {/* Nom */}
              <motion.input
                type="text"
                placeholder="Votre nom"
                className="w-full outline-none transition-all duration-200"
                style={{
                  border: '1.5px solid #D6D6D0',
                  borderRadius: '2px',
                  padding: '12px 16px',
                  fontFamily: "'Source Sans 3', sans-serif",
                  fontWeight: 400,
                  fontSize: '15px',
                  color: '#1A1A1A',
                }}
                whileFocus={{
                  borderColor: '#1E3A5F',
                  boxShadow: '0 0 0 3px rgba(30,58,95,0.08)',
                }}
              />

              {/* Prénom */}
              <motion.input
                type="text"
                placeholder="Votre prénom"
                className="w-full outline-none transition-all duration-200"
                style={{
                  border: '1.5px solid #D6D6D0',
                  borderRadius: '2px',
                  padding: '12px 16px',
                  fontFamily: "'Source Sans 3', sans-serif",
                  fontWeight: 400,
                  fontSize: '15px',
                  color: '#1A1A1A',
                }}
                whileFocus={{
                  borderColor: '#1E3A5F',
                  boxShadow: '0 0 0 3px rgba(30,58,95,0.08)',
                }}
              />

              {/* Email */}
              <motion.input
                type="email"
                placeholder="votre@email.fr"
                className="w-full outline-none transition-all duration-200"
                style={{
                  border: '1.5px solid #D6D6D0',
                  borderRadius: '2px',
                  padding: '12px 16px',
                  fontFamily: "'Source Sans 3', sans-serif",
                  fontWeight: 400,
                  fontSize: '15px',
                  color: '#1A1A1A',
                }}
                whileFocus={{
                  borderColor: '#1E3A5F',
                  boxShadow: '0 0 0 3px rgba(30,58,95,0.08)',
                }}
              />

              {/* Sujet */}
              <div className="relative">
                <select
                  className="w-full appearance-none outline-none cursor-pointer transition-all duration-200"
                  defaultValue=""
                  style={{
                    border: '1.5px solid #D6D6D0',
                    borderRadius: '2px',
                    padding: '12px 16px',
                    fontFamily: "'Source Sans 3', sans-serif",
                    fontWeight: 400,
                    fontSize: '15px',
                    color: '#1A1A1A',
                    background: '#FFFFFF',
                  }}
                  onFocus={(e) => {
                    (e.currentTarget as HTMLSelectElement).style.borderColor = '#1E3A5F';
                    (e.currentTarget as HTMLSelectElement).style.boxShadow = '0 0 0 3px rgba(30,58,95,0.08)';
                  }}
                  onBlur={(e) => {
                    (e.currentTarget as HTMLSelectElement).style.borderColor = '#D6D6D0';
                    (e.currentTarget as HTMLSelectElement).style.boxShadow = 'none';
                  }}
                >
                  <option value="" disabled>Sélectionnez un sujet</option>
                  <option>Demande d’information</option>
                  <option>Signaler un problème technique</option>
                  <option>Question sur une démarche</option>
                  <option>Proposition de partenariat</option>
                  <option>Autre</option>
                </select>
                <ChevronDown
                  size={16}
                  color="#666666"
                  className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none"
                />
              </div>

              {/* Message */}
              <motion.textarea
                placeholder="Votre message..."
                className="w-full outline-none resize-none transition-all duration-200"
                style={{
                  border: '1.5px solid #D6D6D0',
                  borderRadius: '2px',
                  padding: '12px 16px',
                  fontFamily: "'Source Sans 3', sans-serif",
                  fontWeight: 400,
                  fontSize: '15px',
                  color: '#1A1A1A',
                  minHeight: '140px',
                }}
                whileFocus={{
                  borderColor: '#1E3A5F',
                  boxShadow: '0 0 0 3px rgba(30,58,95,0.08)',
                }}
              />

              {/* Consent */}
              <label className="flex items-start gap-3 cursor-pointer">
                <input type="checkbox" className="mt-1" />
                <span
                  style={{
                    fontFamily: "'Source Sans 3', sans-serif",
                    fontWeight: 400,
                    fontSize: '12px',
                    color: '#666666',
                    lineHeight: 1.5,
                  }}
                >
                  J’accepte que mes données soient traitées conformément à la{' '}
                  <a
                    href="#"
                    style={{ color: '#1E3A5F', textDecoration: 'underline' }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#2B5C8F'; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = '#1E3A5F'; }}
                  >
                    politique de confidentialité
                  </a>{' '}
                  du ministère.
                </span>
              </label>

              {/* Submit */}
              <motion.button
                type="submit"
                className="w-full cursor-pointer"
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontWeight: 600,
                  fontSize: '13px',
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                  color: '#FFFFFF',
                  background: '#1E3A5F',
                  padding: '14px 28px',
                  borderRadius: '2px',
                  border: 'none',
                  marginTop: '8px',
                }}
                whileHover={{ backgroundColor: '#2B5C8F', y: -1, boxShadow: '0 4px 12px rgba(30,58,95,0.2)' }}
                transition={{ duration: 0.2 }}
              >
                ENVOYER MON MESSAGE
              </motion.button>
            </form>
          </motion.div>

          {/* Right — Info Card */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] }}
            style={{
              background: '#F5F5F0',
              border: '1px solid #E8E8E3',
              borderRadius: '2px',
              padding: '40px 32px',
              height: 'fit-content',
            }}
          >
            <h3
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 600,
                fontSize: '14px',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                color: '#1E3A5F',
                marginBottom: '24px',
                borderBottom: '2px solid #E5B045',
                paddingBottom: '12px',
              }}
            >
              COORDONNÉES
            </h3>

            <div className="flex flex-col" style={{ gap: '24px' }}>
              {/* Address */}
              <div className="flex items-start gap-4">
                <MapPin size={18} color="#1E3A5F" className="flex-shrink-0 mt-0.5" />
                <div>
                  <p style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 500, fontSize: '14px', color: '#1A1A1A', margin: 0 }}>
                    20 avenue de Ségur
                  </p>
                  <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontWeight: 400, fontSize: '13px', color: '#666666', margin: 0 }}>
                    75007 Paris, France
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4">
                <Phone size={18} color="#1E3A5F" className="flex-shrink-0 mt-0.5" />
                <div>
                  <p style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 500, fontSize: '14px', color: '#1A1A1A', margin: 0 }}>
                    01 53 73 30 00
                  </p>
                  <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontWeight: 400, fontSize: '12px', color: '#666666', margin: 0 }}>
                    Du lundi au vendredi, 9h–18h
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <Mail size={18} color="#1E3A5F" className="flex-shrink-0 mt-0.5" />
                <div>
                  <a
                    href="mailto:contact@transformation.gouv.fr"
                    style={{
                      fontFamily: "'Montserrat', sans-serif",
                      fontWeight: 500,
                      fontSize: '14px',
                      color: '#1A1A1A',
                      textDecoration: 'underline',
                    }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#2B5C8F'; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = '#1A1A1A'; }}
                  >
                    contact@transformation.gouv.fr
                  </a>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-4">
                <Clock size={18} color="#1E3A5F" className="flex-shrink-0 mt-0.5" />
                <div>
                  <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontWeight: 400, fontSize: '13px', color: '#1A1A1A', margin: 0 }}>
                    Lundi–Vendredi : 9h00 – 18h00
                  </p>
                  <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontWeight: 400, fontSize: '13px', color: '#666666', margin: 0 }}>
                    Samedi–Dimanche : Fermé
                  </p>
                </div>
              </div>

              {/* Accessibility */}
              <div className="flex items-start gap-4">
                <Accessibility size={18} color="#1E3A5F" className="flex-shrink-0 mt-0.5" />
                <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontWeight: 400, fontSize: '12px', color: '#666666', margin: 0 }}>
                  Bâtiment accessible aux personnes à mobilité réduite
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────
   SECTION 3 — LOCATION MAP
   ────────────────────────────────────────────── */

function LocationMap() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      const mapEl = sectionRef.current?.querySelector('.map-container');
      if (mapEl) {
        gsap.from(mapEl, { opacity: 0, x: -20, duration: 0.5, ease: 'power2.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true },
        });
      }
      const items = sectionRef.current?.querySelectorAll('.transport-item');
      if (items) {
        gsap.from(items, { opacity: 0, x: 15, duration: 0.4, stagger: 0.08, ease: 'power2.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true },
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <div style={{ background: '#F5F5F0', padding: '48px 0' }}>
      <div ref={sectionRef} style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 24px' }}>
        {/* Header */}
        <div style={{ marginBottom: '40px' }}>
          <span
            style={{
              fontFamily: "'Source Sans 3', sans-serif",
              fontWeight: 500,
              fontSize: '11px',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: '#E5B045',
            }}
          >
            NOUS TROUVER
          </span>
          <h2
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 600,
              fontSize: '30px',
              color: '#1A1A1A',
              marginTop: '8px',
            }}
          >
            Notre adresse
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[60%_40%]" style={{ gap: '32px' }}>
          {/* Map */}
          <div
            className="map-container relative overflow-hidden"
            style={{
              background: '#E8E8E3',
              borderRadius: '2px',
              aspectRatio: '16/10',
              minHeight: '300px',
            }}
          >
            {/* Stylized map placeholder */}
            <svg
              viewBox="0 0 800 500"
              className="w-full h-full"
              style={{ display: 'block' }}
            >
              {/* Map background */}
              <rect width="800" height="500" fill="#EDE9E0" />
              {/* Roads */}
              <rect x="0" y="220" width="800" height="14" fill="#FFFFFF" />
              <rect x="0" y="380" width="800" height="10" fill="#FFFFFF" />
              <rect x="200" y="0" height="500" width="12" fill="#FFFFFF" />
              <rect x="500" y="0" height="500" width="10" fill="#FFFFFF" />
              <rect x="350" y="0" height="500" width="8" fill="#F5F2EC" />
              <rect x="0" y="120" width="800" height="8" fill="#F5F2EC" />
              <rect x="0" y="300" width="800" height="8" fill="#F5F2EC" />
              {/* Avenue de Ségur label */}
              <rect x="505" y="180" width="160" height="26" fill="rgba(255,255,255,0.9)" rx="2" />
              <text x="510" y="197" fontFamily="'Source Sans 3', sans-serif" fontSize="12" fill="#1A1A1A">Av. de Ségur</text>
              {/* Building block */}
              <rect x="510" y="234" width="120" height="80" fill="#C9C5BC" rx="2" />
              <rect x="520" y="244" width="30" height="20" fill="#A39F96" rx="1" />
              <rect x="560" y="244" width="30" height="20" fill="#A39F96" rx="1" />
              <rect x="600" y="244" width="20" height="20" fill="#A39F96" rx="1" />
              <rect x="520" y="274" width="30" height="30" fill="#A39F96" rx="1" />
              <rect x="560" y="274" width="30" height="30" fill="#A39F96" rx="1" />
              <rect x="600" y="274" width="20" height="30" fill="#A39F96" rx="1" />
              {/* Park/green area */}
              <rect x="40" y="40" width="140" height="70" fill="#C8D6C4" rx="4" />
              <rect x="40" y="320" width="140" height="60" fill="#C8D6C4" rx="4" />
              {/* Water */}
              <rect x="40" y="410" width="120" height="50" fill="#B8D4E3" rx="4" />
            </svg>

            {/* Pulsing pin marker */}
            <div
              className="absolute"
              style={{ left: '65%', top: '50%', transform: 'translate(-50%, -100%)' }}
            >
              <div
                className="relative"
                style={{
                  width: '32px',
                  height: '32px',
                }}
              >
                {/* Pulse ring */}
                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: 'rgba(30,58,95,0.2)',
                    animation: 'mapPinPulse 2s ease-in-out infinite',
                  }}
                />
                {/* Pin */}
                <div
                  className="relative flex items-center justify-center rounded-full"
                  style={{
                    width: '32px',
                    height: '32px',
                    background: '#1E3A5F',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                  }}
                >
                  <MapPin size={18} color="#FFFFFF" />
                </div>
              </div>
            </div>

            {/* Address overlay */}
            <div
              className="absolute bottom-4 left-4"
              style={{
                background: 'rgba(255,255,255,0.95)',
                padding: '8px 14px',
                borderRadius: '2px',
              }}
            >
              <span
                style={{
                  fontFamily: "'Source Sans 3', sans-serif",
                  fontWeight: 500,
                  fontSize: '12px',
                  color: '#1A1A1A',
                }}
              >
                20 avenue de Ségur, 75007 Paris
              </span>
            </div>
          </div>

          {/* Directions */}
          <div>
            <h3
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 600,
                fontSize: '16px',
                color: '#1A1A1A',
                marginBottom: '20px',
              }}
            >
              Comment venir ?
            </h3>
            <div className="flex flex-col" style={{ gap: '16px' }}>
              {transportModes.map((mode, i) => {
                const Icon = mode.icon;
                return (
                  <div
                    key={i}
                    className="transport-item flex items-start gap-3"
                  >
                    <Icon size={18} color="#1E3A5F" className="flex-shrink-0 mt-0.5" />
                    <div>
                      <p
                        style={{
                          fontFamily: "'Montserrat', sans-serif",
                          fontWeight: 500,
                          fontSize: '13px',
                          color: '#1A1A1A',
                          margin: 0,
                        }}
                      >
                        {mode.title}
                      </p>
                      {mode.subtitle && (
                        <p
                          style={{
                            fontFamily: "'Source Sans 3', sans-serif",
                            fontWeight: 400,
                            fontSize: '12px',
                            color: '#666666',
                            margin: 0,
                            marginTop: '2px',
                          }}
                        >
                          {mode.subtitle}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────
   SECTION 4 — FAQ ACCORDION
   ────────────────────────────────────────────── */

function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const items = sectionRef.current.querySelectorAll('.faq-item');
    const ctx = gsap.context(() => {
      gsap.from(items, { opacity: 0, y: 15, duration: 0.4, stagger: 0.06, ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <div style={{ background: '#FFFFFF', padding: '48px 0' }}>
      <div ref={sectionRef} style={{ maxWidth: '800px', margin: '0 auto', padding: '0 24px' }}>
        {/* Header */}
        <div style={{ marginBottom: '40px' }}>
          <span
            style={{
              fontFamily: "'Source Sans 3', sans-serif",
              fontWeight: 500,
              fontSize: '11px',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: '#E5B045',
            }}
          >
            FAQ
          </span>
          <h2
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 600,
              fontSize: '30px',
              color: '#1A1A1A',
              marginTop: '8px',
            }}
          >
            Questions fréquentes
          </h2>
        </div>

        {/* Accordion */}
        <div className="flex flex-col">
          {faqItems.map((item, i) => (
            <div
              key={i}
              className="faq-item"
              style={{ borderBottom: '1px solid #D6D6D0' }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between cursor-pointer bg-transparent border-none text-left"
                style={{ padding: '24px 0' }}
              >
                <span
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontWeight: 600,
                    fontSize: '16px',
                    color: '#1A1A1A',
                    paddingRight: '16px',
                  }}
                >
                  {item.q}
                </span>
                <motion.div
                  animate={{ rotate: openIndex === i ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0"
                >
                  <ChevronDown size={20} color="#1E3A5F" />
                </motion.div>
              </button>
              <AnimatePresence initial={false}>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <p
                      style={{
                        fontFamily: "'Source Sans 3', sans-serif",
                        fontWeight: 400,
                        fontSize: '15px',
                        color: '#666666',
                        lineHeight: 1.65,
                        paddingBottom: '24px',
                        margin: 0,
                      }}
                    >
                      {item.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────
   SECTION 5 — SPECIALIZED SERVICES
   ────────────────────────────────────────────── */

function SpecializedServices() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const cards = sectionRef.current.querySelectorAll('.service-card');
    const ctx = gsap.context(() => {
      gsap.from(cards, { opacity: 0, y: 25, duration: 0.5, stagger: 0.1, ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <div style={{ background: '#F5F5F0', padding: '48px 0' }}>
      <div ref={sectionRef} style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 24px' }}>
        {/* Header */}
        <div style={{ marginBottom: '40px' }}>
          <span
            style={{
              fontFamily: "'Source Sans 3', sans-serif",
              fontWeight: 500,
              fontSize: '11px',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: '#666666',
            }}
          >
            AUTRES CANAUX
          </span>
          <h2
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 600,
              fontSize: '30px',
              color: '#1A1A1A',
              marginTop: '8px',
            }}
          >
            Contactez les services spécialisés
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: '24px' }}>
          {specializedServices.map((service) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.name}
                className="service-card"
                style={{
                  background: '#FFFFFF',
                  border: '1px solid #E8E8E3',
                  borderRadius: '2px',
                  padding: '32px 28px',
                }}
                whileHover={{
                  boxShadow: '0 6px 20px rgba(0,0,0,0.06)',
                  y: -2,
                }}
                transition={{ duration: 0.2 }}
              >
                <Icon size={28} color="#1E3A5F" strokeWidth={1.5} />
                <h3
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontWeight: 600,
                    fontSize: '16px',
                    color: '#1E3A5F',
                    marginTop: '16px',
                  }}
                >
                  {service.name}
                </h3>
                <p
                  style={{
                    fontFamily: "'Source Sans 3', sans-serif",
                    fontWeight: 400,
                    fontSize: '13px',
                    color: '#666666',
                    lineHeight: 1.6,
                    marginTop: '8px',
                  }}
                >
                  {service.description}
                </p>
                <div className="flex items-center gap-2" style={{ marginTop: '16px' }}>
                  <Phone size={12} color="#1E3A5F" />
                  <span
                    style={{
                      fontFamily: "'Montserrat', sans-serif",
                      fontWeight: 500,
                      fontSize: '13px',
                      color: '#1A1A1A',
                    }}
                  >
                    {service.phone}
                  </span>
                </div>
                <p
                  style={{
                    fontFamily: "'Source Sans 3', sans-serif",
                    fontWeight: 400,
                    fontSize: '11px',
                    color: '#666666',
                    marginTop: '4px',
                    marginLeft: '20px',
                  }}
                >
                  {service.hours}
                </p>
                <a
                  href={`tel:${service.phone}`}
                  className="inline-flex items-center gap-1 no-underline transition-colors duration-150"
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontWeight: 600,
                    fontSize: '11px',
                    textTransform: 'uppercase',
                    color: '#1E3A5F',
                    marginTop: '12px',
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#2B5C8F'; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = '#1E3A5F'; }}
                >
                  APPELER LE {service.phone} <ChevronRight size={14} />
                </a>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────
   SECTION 6 — NEWSLETTER CTA
   ────────────────────────────────────────────── */

function NewsletterCTA() {
  return (
    <div style={{ background: '#1E3A5F', padding: '64px 0' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] }}
        className="text-center"
        style={{ maxWidth: '600px', margin: '0 auto', padding: '0 24px' }}
      >
        <Mail size={28} color="#E5B045" style={{ margin: '0 auto' }} />
        <h2
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 600,
            fontSize: '24px',
            color: '#FFFFFF',
            marginTop: '12px',
          }}
        >
          Restez en contact avec le ministère
        </h2>
        <p
          style={{
            fontFamily: "'Source Sans 3', sans-serif",
            fontWeight: 400,
            fontSize: '15px',
            color: 'rgba(255,255,255,0.75)',
            marginTop: '8px',
            lineHeight: 1.6,
          }}
        >
          Inscrivez-vous à notre lettre d’information mensuelle pour recevoir les actualités et les nouveaux services.
        </p>

        <form
          className="flex flex-col sm:flex-row gap-3"
          style={{ marginTop: '24px' }}
        >
          <input
            type="email"
            placeholder="Votre adresse email"
            className="flex-1 outline-none"
            style={{
              background: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '2px',
              padding: '12px 16px',
              color: '#FFFFFF',
              fontFamily: "'Source Sans 3', sans-serif",
              fontSize: '15px',
            }}
            onFocus={(e) => { (e.currentTarget as HTMLInputElement).style.borderColor = '#FFFFFF'; }}
            onBlur={(e) => { (e.currentTarget as HTMLInputElement).style.borderColor = 'rgba(255,255,255,0.2)'; }}
          />
          <button
            type="submit"
            className="cursor-pointer transition-colors duration-200"
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 600,
              fontSize: '12px',
              textTransform: 'uppercase',
              color: '#1E3A5F',
              background: '#E5B045',
              padding: '12px 24px',
              borderRadius: '2px',
              border: 'none',
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = '#D4A03E'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = '#E5B045'; }}
          >
            S’INSCRIRE
          </button>
        </form>

        <p
          style={{
            fontFamily: "'Source Sans 3', sans-serif",
            fontWeight: 400,
            fontSize: '11px',
            color: 'rgba(255,255,255,0.4)',
            marginTop: '12px',
          }}
        >
          Conforme au RGPD. Désinscription à tout moment.
        </p>
      </motion.div>
    </div>
  );
}

/* ──────────────────────────────────────────────
   MAIN PAGE
   ────────────────────────────────────────────── */

export default function Contact() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      {/* Inject keyframe animation for map pin pulse */}
      <style>{`
        @keyframes mapPinPulse {
          0%, 100% { transform: scale(1); opacity: 0.4; }
          50% { transform: scale(1.4); opacity: 0; }
        }
      `}</style>
      <ContactHero />
      <ContactForm />
      <LocationMap />
      <FaqSection />
      <SpecializedServices />
      <NewsletterCTA />
    </div>
  );
}
