import { HashRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';

function PageStub({ title }: { title: string }) {
  return (
    <div className="min-h-[100dvh] flex items-center justify-center" style={{ background: '#F5F5F0' }}>
      <div className="text-center">
        <h1 className="font-montserrat font-semibold text-3xl" style={{ color: '#1E3A5F' }}>{title}</h1>
        <p className="font-source-sans text-base mt-4" style={{ color: '#666666' }}>Page en cours de développement.</p>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<PageStub title="Services" />} />
          <Route path="/demarches" element={<PageStub title="Démarches" />} />
          <Route path="/actualites" element={<PageStub title="Actualités" />} />
          <Route path="/politiques-publiques" element={<PageStub title="Politiques Publiques" />} />
          <Route path="/transparence" element={<PageStub title="Transparence" />} />
          <Route path="/a-propos" element={<About />} />
          <Route path="/contact" element={<PageStub title="Contact" />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
}
