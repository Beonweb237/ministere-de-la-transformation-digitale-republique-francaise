import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const navLinks = [
  { label: 'Services', path: '/services' },
  { label: 'Démarches', path: '/demarches' },
  { label: 'Actualités', path: '/actualites' },
  { label: 'Politiques', path: '/politiques-publiques' },
  { label: 'Transparence', path: '/transparence' },
];

const resourceLinks = [
  { label: 'Budget 2026', path: '/transparence' },
  { label: 'Contrats publics', path: '/transparence' },
  { label: 'Organigramme', path: '/a-propos' },
  { label: 'FAQ Accessibilité', path: '/contact' },
];

const socialLinks = [
  { label: 'X (Twitter)', href: '#' },
  { label: 'LinkedIn', href: '#' },
  { label: 'Instagram', href: '#' },
  { label: 'YouTube', href: '#' },
];

const legalLinks = [
  { label: 'Mentions légales', path: '#' },
  { label: 'Données personnelles', path: '#' },
  { label: 'Accessibilité', path: '#' },
  { label: 'Open Data', path: '#' },
];

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!footerRef.current) return;
    const cols = footerRef.current.querySelectorAll('.footer-col');
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: footerRef.current,
        start: 'top 85%',
        once: true,
      },
    });
    tl.from(cols, {
      opacity: 0,
      y: 20,
      duration: 0.5,
      stagger: 0.08,
      ease: 'power2.out',
    });
    return () => { tl.kill(); };
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative"
      style={{
        background: 'linear-gradient(135deg, #1E3A5F 0%, #0F1F33 100%)',
        padding: '96px 0 48px',
      }}
    >
      <div className="mx-auto" style={{ maxWidth: '1400px', padding: '0 24px' }}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Col 1 - Ministry Info */}
          <div className="footer-col">
            <div className="flex flex-col mb-4">
              <span className="text-white font-montserrat font-bold text-sm tracking-widest" style={{ fontSize: '13px', letterSpacing: '0.12em' }}>
                MINISTÈRE
              </span>
              <span className="text-white font-source-sans font-normal" style={{ fontSize: '11px', opacity: 0.8 }}>
                de la Transformation Digitale
              </span>
            </div>
            <p className="text-white font-source-sans font-normal" style={{ fontSize: '14px', opacity: 0.7, lineHeight: 1.6 }}>
              20 avenue de Ségur<br />
              75007 Paris
            </p>
            <p className="text-white font-source-sans font-normal mt-3" style={{ fontSize: '14px', opacity: 0.7 }}>
              contact@transformation.gouv.fr
            </p>
          </div>

          {/* Col 2 - Navigation */}
          <div className="footer-col">
            <h4 className="text-white font-montserrat font-semibold uppercase" style={{ fontSize: '11px', letterSpacing: '0.08em', opacity: 0.4, marginBottom: '16px' }}>
              NAVIGATION
            </h4>
            <ul className="list-none p-0 m-0 flex flex-col" style={{ gap: '10px' }}>
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-white font-source-sans font-normal no-underline transition-colors duration-150 hover:text-white"
                    style={{ fontSize: '14px', opacity: 0.7 }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 - Resources */}
          <div className="footer-col">
            <h4 className="text-white font-montserrat font-semibold uppercase" style={{ fontSize: '11px', letterSpacing: '0.08em', opacity: 0.4, marginBottom: '16px' }}>
              RESSOURCES
            </h4>
            <ul className="list-none p-0 m-0 flex flex-col" style={{ gap: '10px' }}>
              {resourceLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.path}
                    className="text-white font-source-sans font-normal no-underline transition-colors duration-150 hover:text-white"
                    style={{ fontSize: '14px', opacity: 0.7 }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 - Social */}
          <div className="footer-col">
            <h4 className="text-white font-montserrat font-semibold uppercase" style={{ fontSize: '11px', letterSpacing: '0.08em', opacity: 0.4, marginBottom: '16px' }}>
              RÉSEAUX SOCIAUX
            </h4>
            <ul className="list-none p-0 m-0 flex flex-col" style={{ gap: '10px' }}>
              {socialLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-white font-source-sans font-normal no-underline transition-colors duration-150 hover:text-white"
                    style={{ fontSize: '14px', opacity: 0.7 }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 5 - Legal */}
          <div className="footer-col">
            <h4 className="text-white font-montserrat font-semibold uppercase" style={{ fontSize: '11px', letterSpacing: '0.08em', opacity: 0.4, marginBottom: '16px' }}>
              INFORMATIONS LÉGALES
            </h4>
            <ul className="list-none p-0 m-0 flex flex-col" style={{ gap: '10px' }}>
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.path}
                    className="text-white font-source-sans font-normal no-underline transition-colors duration-150 hover:text-white"
                    style={{ fontSize: '14px', opacity: 0.7 }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-12 pt-6 text-center"
          style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}
        >
          <p className="text-white font-source-sans font-normal" style={{ fontSize: '12px', opacity: 0.4 }}>
            © 2026 Ministère de la Transformation Digitale — République Française
            {' '}&mdash;{' '}
            <a
              href="https://www.beonweb.cm/"
              target="_blank"
              rel="noopener noreferrer"
              className="no-underline transition-colors duration-150 hover:text-white"
              style={{ color: 'inherit', opacity: 1 }}
            >
              Conçu par Beonweb
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
