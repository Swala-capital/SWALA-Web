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
    <div className="app-root">
      {/* BACKGROUND DYNAMICS */}
      <div className="bg-glow">
        <motion.div 
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          style={{ 
            position: 'absolute', top: '-10%', right: '-10%', width: '800px', height: '800px', 
            borderRadius: '50%', background: 'radial-gradient(circle, rgba(230, 255, 40, 0.08) 0%, transparent 70%)', filter: 'blur(80px)' 
          }}
        />
        <motion.div 
          animate={{
            x: [0, -80, 0],
            y: [0, 100, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          style={{ 
            position: 'absolute', bottom: '-10%', left: '-10%', width: '600px', height: '600px', 
            borderRadius: '50%', background: 'radial-gradient(circle, rgba(8, 69, 86, 0.04) 0%, transparent 70%)', filter: 'blur(80px)' 
          }}
        />
      </div>

      {/* NAVIGATION */}
      <nav className={scrolled ? 'scrolled' : ''}>
        <div className="container nav-wrapper">
          <a href="#" className="logo">
            Swala<span>Capital</span>
          </a>
          <a href="#formulario" className="btn-nav">
            Quiero hablar con Swala
          </a>
        </div>
      </nav>

      {/* HERO SECTION */}
      <header className="hero">
        <div className="container">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="hero-content"
          >
            <h1>
              ¿El dinero te <span className="accent">frena</span> aunque tengas pedidos?
            </h1>
            <p className="hero-sub">
              Conectamos confeccionistas colombianos con el capital que necesitan para ejecutar sus pedidos. Sin hipotecas. Sin historial crediticio.
            </p>
            <div className="hero-actions-container">
              <a href="#formulario" className="btn-primary">
                Quiero hablar con Swala
                <ChevronRight size={20} />
              </a>
              <div className="hero-badges">
                <span>Sector Confección</span>
                <div className="dot"></div>
                <span>Respuesta 48h</span>
              </div>
            </div>
          </motion.div>
        </div>
      </header>

      {/* SECTION 2: SITUACIONES */}
      <section className="sec" id="situaciones">
        <div className="container">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="sec-title"
          >
            <h2>
              Sabemos lo que <span className="accent">vives</span> día a día
            </h2>
          </motion.div>

          <div className="grid-3">
            <SituationCard 
              icon={<FileText color="#084556" size={32} />}
              title="Tengo un contrato pero no el capital para ejecutarlo"
              desc="Te ganaste el negocio pero te falta el impulso inicial para cumplir con la producción."
              delay={0.1}
            />
            <SituationCard 
              icon={<Package color="#084556" size={32} />}
              title="Tengo la orden de compra pero necesito capital para arrancar"
              desc="La materia prima y la mano de obra no esperan. Nosotros te habilitamos el flujo."
              delay={0.2}
            />
            <SituationCard 
              icon={<Clock color="#084556" size={32} />}
              title="Ya entregué y facturé, pero necesito liquidez ahora mismo"
              desc="No esperes 60 o 90 días. Te adelantamos el pago de tus facturas hoy mismo."
              delay={0.3}
            />
          </div>
        </div>
      </section>

      {/* SECTION 3: CÓMO FUNCIONA */}
      <section className="sec" id="proceso" style={{ backgroundColor: 'var(--color-petroleo)', color: '#fff' }}>
        <div className="container">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="sec-title"
            style={{ marginBottom: '80px' }}
          >
            <h2 style={{ color: '#fff' }}>
              Tu capital en <span className="accent">3 simples pasos</span>
            </h2>
          </motion.div>

          <div className="grid-3">
            <StepCard 
              number="01"
              icon={<ChevronRight className="text-[#E6FF28]" size={24} />}
              title="Hablemos de tu negocio"
              desc="Cuéntanos sobre tus pedidos y necesidades de capital. Entendemos el ritmo de la confección."
              delay={0.1}
            />
            <StepCard 
              number="02"
              icon={<ChevronRight className="text-[#E6FF28]" size={24} />}
              title="Evaluación ágil"
              desc="Analizamos tus órdenes de compra o facturas. Sin burocracia pesada ni trámites infinitos."
              delay={0.2}
            />
            <StepCard 
              number="03"
              icon={<ChevronRight className="text-[#E6FF28]" size={24} />}
              title="Recibe el capital"
              desc="Desembolso directo para que tu producción no se detenga. Así de simple."
              delay={0.3}
            />
          </div>
        </div>
      </section>

      <style>{`
        .hero-actions-container { display: flex; flex-direction: column; gap: 24px; align-items: flex-start; }
        @media (min-width: 768px) {
          .hero-actions-container { flex-direction: row; align-items: center; gap: 32px; }
        }
        
        /* STEP CARD STYLES */
        .step-card {
          position: relative;
          padding: 40px;
          background: rgba(255,255,255,0.03);
          border-radius: 24px;
          border: 1px solid rgba(255,255,255,0.05);
          transition: var(--transition);
        }
        
        .step-card:hover {
          background: rgba(255,255,255,0.06);
          border-color: var(--color-lima);
          transform: translateY(-8px);
        }
        
        .step-number {
          font-family: var(--font-display);
          font-size: 64px;
          color: rgba(230, 255, 40, 0.1);
          position: absolute;
          top: 20px;
          right: 30px;
          line-height: 1;
        }
        
        .step-card h3 {
          font-family: var(--font-display);
          font-size: 24px;
          color: #fff;
          margin-bottom: 16px;
          position: relative;
        }
        
        .step-card p {
          color: rgba(255,255,255,0.6);
          font-size: 16px;
          line-height: 1.6;
        }

        .icon-box {
          width: 48px;
          height: 48px;
          background: rgba(230, 255, 40, 0.1);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 24px;
        }
      `}</style>
    </div>
  );
};

const StepCard = ({ number, icon, title, desc, delay }) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.5 }}
    className="step-card"
  >
    <div className="step-number">{number}</div>
    <div className="icon-box">{icon}</div>
    <h3>{title}</h3>
    <p>{desc}</p>
  </motion.div>
);

const SituationCard = ({ icon, title, desc, delay }) => (
  <motion.div 
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay }}
    whileHover={{ y: -10 }}
    className="sit-card"
  >
    <div className="icon-wrapper">{icon}</div>
    <h3>{title}</h3>
    <p>{desc}</p>
  </motion.div>
);

export default App;
