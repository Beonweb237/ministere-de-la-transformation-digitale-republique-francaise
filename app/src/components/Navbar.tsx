import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { label: 'Services', path: '/services' },
  { label: 'Démarches', path: '/demarches' },
  { label: 'Actualités', path: '/actualites' },
  { label: 'Politiques', path: '/politiques-publiques' },
  { label: 'Transparence', path: '/transparence' },
];

const portalCards = [
  { title: 'PARTICULIERS', desc: 'Carte d\'identité, passeport, permis, aides sociales', color: '#E5B045' },
  { title: 'ASSOCIATIONS', desc: 'Création, financement, vie associative, subventions', color: '#4A7C6F' },
  { title: 'ÉCONOMIE SOCIALE', desc: 'Coopératives, mutuelles, ESS, insertion', color: '#B85C6E' },
  { title: 'NUMÉRIQUE & DATA', desc: 'Identité numérique, cloud souverain, cybersécurité', color: '#A3C8D8' },
  { title: 'COLLECTIVITÉS', desc: 'Financements, outils, accompagnement territorial', color: '#7A9E7E' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      if (currentY < 100) {
        setIsVisible(true);
        setIsScrolled(false);
      } else {
        setIsScrolled(true);
        setIsVisible(currentY < lastScrollY.current);
      }
      lastScrollY.current = currentY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-400"
        style={{
          transform: isVisible ? 'translateY(0)' : 'translateY(-100%)',
          opacity: isVisible ? 1 : 0,
          transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          background: isScrolled ? 'rgba(30, 58, 95, 0.95)' : 'transparent',
          backdropFilter: isScrolled ? 'blur(12px)' : 'none',
          height: '80px',
        }}
      >
        <div className="mx-auto flex items-center justify-between h-full" style={{ maxWidth: '1400px', padding: '0 24px' }}>
          {/* Left - Logotype */}
          <Link to="/" className="flex items-center gap-3 no-underline">
            <div className="flex flex-col">
              <span className="text-white font-montserrat font-bold text-sm tracking-widest" style={{ fontSize: '14px', letterSpacing: '0.12em' }}>
                MINISTÈRE
              </span>
              <span className="text-white font-source-sans font-normal" style={{ fontSize: '11px' }}>
                de la Transformation Digitale
              </span>
            </div>
            <div className="w-px h-8 bg-white/30" />
            <span className="text-white font-source-sans font-normal" style={{ fontSize: '10px', opacity: 0.9 }}>
              République Française
            </span>
          </Link>

          {/* Center - Nav Links */}
          <nav className="hidden lg:flex items-center" style={{ gap: '32px' }}>
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="relative text-white font-source-sans font-medium uppercase no-underline group"
                style={{ fontSize: '12px', letterSpacing: '0.08em' }}
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-200 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* Right - CTA + Hamburger */}
          <div className="flex items-center" style={{ gap: '16px' }}>
            <Link
              to="/contact"
              className="hidden md:inline-flex items-center text-white font-montserrat font-semibold uppercase no-underline transition-all duration-200 hover:bg-white/10"
              style={{
                fontSize: '11px',
                letterSpacing: '0.06em',
                padding: '10px 20px',
                border: '1px solid rgba(255,255,255,0.5)',
                borderRadius: '2px',
              }}
            >
              NOUS CONTACTER
            </Link>
            <button
              onClick={() => setMenuOpen(true)}
              className="flex flex-col justify-center items-center gap-1 bg-transparent border-none cursor-pointer p-2"
              aria-label="Menu"
            >
              <Menu className="text-white" size={20} strokeWidth={2} />
            </button>
          </div>
        </div>
      </header>

      {/* Bento Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] flex items-center justify-center"
            style={{ background: 'rgba(30, 58, 95, 0.98)', backdropFilter: 'blur(8px)' }}
          >
            <button
              onClick={() => setMenuOpen(false)}
              className="absolute top-6 right-6 text-white bg-transparent border-none cursor-pointer p-2"
              aria-label="Close menu"
            >
              <X size={28} />
            </button>

            <motion.div
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 w-full px-6"
              style={{ maxWidth: '1200px' }}
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.05 } },
              }}
            >
              {portalCards.map((card) => (
                <motion.div
                  key={card.title}
                  variants={{
                    hidden: { opacity: 0, scale: 0.95 },
                    visible: { opacity: 1, scale: 1 },
                  }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col items-start cursor-pointer transition-all duration-200"
                  style={{
                    aspectRatio: '1',
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '2px',
                    padding: '24px',
                  }}
                  whileHover={{
                    background: 'rgba(255,255,255,0.12)',
                    borderColor: 'rgba(255,255,255,0.2)',
                    y: -4,
                  }}
                >
                  <div
                    className="flex items-center justify-center"
                    style={{
                      width: '48px',
                      height: '48px',
                      background: card.color,
                      borderRadius: '4px',
                    }}
                  >
                    <div className="w-5 h-5 bg-white rounded-sm" />
                  </div>
                  <span
                    className="text-white font-source-sans font-semibold uppercase mt-4"
                    style={{ fontSize: '11px', letterSpacing: '0.08em' }}
                  >
                    {card.title}
                  </span>
                  <span
                    className="text-white font-source-sans font-normal mt-2"
                    style={{ fontSize: '12px', opacity: 0.6, lineHeight: 1.5 }}
                  >
                    {card.desc}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
