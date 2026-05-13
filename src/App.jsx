import { motion } from 'framer-motion';
import { FileText, Package, Clock, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';

const App = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen">
      {/* BACKGROUND ANIMATION */}
      <div className="fixed inset-0 z-[-1] overflow-hidden bg-[#F9F7F2]">
        <motion.div 
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-10%] right-[-10%] w-[800px] h-[800px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(230, 255, 40, 0.08) 0%, transparent 70%)', filter: 'blur(80px)' }}
        />
        <motion.div 
          animate={{
            x: [0, -80, 0],
            y: [0, 100, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(8, 69, 86, 0.04) 0%, transparent 70%)', filter: 'blur(80px)' }}
        />
      </div>

      {/* NAVIGATION */}
      <nav className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 flex items-center ${scrolled ? 'h-[70px] bg-[#084556]/95 backdrop-blur-md border-b border-white/10' : 'h-[80px] bg-transparent'}`}>
        <div className="container flex justify-between items-center">
          <a href="#" className="text-2xl font-bold text-white font-serif">
            Swala<span className="text-[#E6FF28]">Capital</span>
          </a>
          <a href="#formulario" className="hidden md:flex items-center gap-2 px-6 py-2 rounded-xl border border-white/20 text-white font-bold text-sm hover:bg-[#E6FF28] hover:text-[#084556] hover:border-[#E6FF28] transition-all">
            Quiero hablar con Swala
          </a>
        </div>
      </nav>

      {/* HERO SECTION */}
      <header className="relative min-h-screen flex items-center pt-20 bg-[#084556] text-white overflow-hidden">
        <div className="container relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-[850px]"
          >
            <h1 className="font-serif text-5xl md:text-8xl leading-[1.05] mb-8">
              ¿El dinero te <span className="text-[#E6FF28]">frena</span> aunque tengas pedidos?
            </h1>
            <p className="text-lg md:text-2xl text-white/70 mb-12 max-w-[650px] font-medium">
              Conectamos confeccionistas colombianos con el capital que necesitan para ejecutar sus pedidos. Sin hipotecas. Sin historial crediticio.
            </p>
            <div className="flex flex-col md:row items-start md:items-center gap-8">
              <a href="#formulario" className="inline-flex items-center gap-2 px-8 py-4 bg-[#E6FF28] text-[#084556] rounded-xl font-bold text-lg hover:scale-105 hover:shadow-[0_20px_40px_rgba(230,255,40,0.2)] transition-all">
                Quiero hablar con Swala
                <ChevronRight size={20} />
              </a>
              <div className="flex items-center gap-4 text-xs font-semibold text-white/40 tracking-wider uppercase">
                <span>Sector Confección</span>
                <span className="w-1 h-1 rounded-full bg-[#E6FF28]"></span>
                <span>Respuesta 48h</span>
              </div>
            </div>
          </motion.div>
        </div>
      </header>

      {/* SECTION 2: SITUACIONES */}
      <section className="py-32 relative">
        <div className="container">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="font-serif text-4xl md:text-6xl text-[#084556] mb-4">
              Sabemos lo que <span className="text-[#B8D900]">vives</span> día a día
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <SituationCard 
              icon={<FileText className="text-[#084556]" size={32} />}
              title="Tengo un contrato pero no el capital para ejecutarlo"
              desc="Te ganaste el negocio pero te falta el impulso inicial para cumplir con la producción."
              delay={0.1}
            />
            <SituationCard 
              icon={<Package className="text-[#084556]" size={32} />}
              title="Tengo la orden de compra pero necesito capital para arrancar"
              desc="La materia prima y la mano de obra no esperan. Nosotros te habilitamos el flujo."
              delay={0.2}
            />
            <SituationCard 
              icon={<Clock className="text-[#084556]" size={32} />}
              title="Ya entregué y facturé, pero necesito liquidez ahora mismo"
              desc="No esperes 60 o 90 días. Te adelantamos el pago de tus facturas hoy mismo."
              delay={0.3}
            />
          </div>
        </div>
      </section>

      {/* ADD STYLES FOR TAILWIND-LIKE UTILITIES (Since we don't have Tailwind installed yet, I'll use inline or base classes) */}
      <style>{`
        .font-serif { font-family: var(--font-display); }
        .grid { display: grid; }
        .md\\:grid-cols-3 { grid-template-columns: repeat(3, 1fr); }
        @media (max-width: 768px) { .md\\:grid-cols-3 { grid-template-columns: 1fr; } }
        .gap-8 { gap: 2rem; }
        .text-center { text-align: center; }
        .mb-20 { margin-bottom: 5rem; }
        .py-32 { padding-top: 8rem; padding-bottom: 8rem; }
        .items-center { align-items: center; }
        .justify-between { justify-content: space-between; }
        .flex { display: flex; }
        .max-w-\\[850px\\] { max-width: 850px; }
        .leading-\\[1\\.05\\] { line-height: 1.05; }
        .mb-8 { margin-bottom: 2rem; }
        .mb-12 { margin-bottom: 3rem; }
        .gap-4 { gap: 1rem; }
        .uppercase { text-transform: uppercase; }
        .tracking-wider { letter-spacing: 0.05em; }
      `}</style>
    </div>
  );
};

const SituationCard = ({ icon, title, desc, delay }) => (
  <motion.div 
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay }}
    whileHover={{ y: -10 }}
    className="bg-white p-12 rounded-[24px] border border-[#084556]/5 shadow-[0_10px_30px_rgba(8,69,86,0.04)] hover:shadow-[0_30px_60px_rgba(8,69,86,0.1)] hover:border-[#E6FF28] transition-all"
  >
    <div className="mb-8">{icon}</div>
    <h3 className="font-serif text-2xl text-[#084556] mb-4 leading-snug">{title}</h3>
    <p className="text-[#898A8D] leading-relaxed">{desc}</p>
  </motion.div>
);

export default App;
