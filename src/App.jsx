import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { FileText, Package, Clock, ChevronRight, MessageCircle, Zap, DollarSign, X, CheckCircle2 } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

/* ─── COMPONENTE POPUP DE SALIDA ─── */
const ExitIntentPopup = () => {
  const [show, setShow] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const handleMouseLeave = (e) => {
      if (e.clientY <= 0 && !dismissed) {
        setShow(true);
      }
    };

    const handleInactivity = setTimeout(() => {
      if (!dismissed) setShow(true);
    }, 45000); 

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      clearTimeout(handleInactivity);
    };
  }, [dismissed]);

  const close = () => {
    setShow(false);
    setDismissed(true);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
            background: 'rgba(8,69,86,0.9)', backdropFilter: 'blur(10px)',
            zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '20px'
          }}
        >
          <motion.div 
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            style={{
              background: '#fff', padding: '40px', borderRadius: '32px',
              maxWidth: '500px', width: '100%', textAlign: 'center', position: 'relative',
              boxShadow: '0 40px 100px rgba(0,0,0,0.3)'
            }}
          >
            <button onClick={close} style={{
              position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8'
            }}>
              <X size={24} />
            </button>

            <div style={{
              width: '80px', height: '80px', background: 'var(--color-lima)', borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px'
            }}>
              <Zap size={40} color="var(--color-petroleo)" />
            </div>

            <h3 style={{ fontSize: '28px', fontFamily: 'var(--font-display)', marginBottom: '16px', color: 'var(--color-petroleo)' }}>
              ¿Tu producción no puede esperar?
            </h3>
            <p style={{ color: 'var(--color-gris)', marginBottom: '32px', fontSize: '16px', lineHeight: 1.6 }}>
              No dejes que la falta de capital detenga tu taller. Obtén una respuesta sobre tu financiamiento hoy mismo.
            </p>

            <a href="#formulario" onClick={close} style={{
              display: 'block', background: 'var(--color-petroleo)', color: '#fff',
              padding: '18px', borderRadius: '12px', textDecoration: 'none', fontWeight: 600,
              boxShadow: '0 10px 30px rgba(8,69,86,0.2)'
            }}>
              Hablar con un asesor ahora
            </a>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

/* ─── ANIMACIONES GLOBALES ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] },
  }),
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: (delay = 0) => ({
    opacity: 1,
    transition: { duration: 0.6, delay },
  }),
};

/* ─── COMPONENTES DE APOYO ─── */
const Orb = ({ color, size, top, left, right, bottom, delay = 0, duration = 20, dx = 80, dy = 60 }) => (
  <motion.div
    animate={{ x: [0, dx, 0], y: [0, dy, 0], scale: [1, 1.15, 1] }}
    transition={{ duration, repeat: Infinity, ease: 'easeInOut', delay }}
    style={{
      position: 'absolute',
      width: size, height: size,
      top, left, right, bottom,
      borderRadius: '50%',
      background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
      filter: 'blur(80px)',
      pointerEvents: 'none',
    }}
  />
);

const SectionConnector = ({ from, to }) => (
  <div style={{
    height: '120px',
    background: `linear-gradient(to bottom, ${from}, ${to})`,
    position: 'relative',
    zIndex: 1,
  }} />
);

const SituationCard = ({ icon, title, desc, delay }) => (
  <motion.div
    variants={fadeUp}
    custom={delay}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.2 }}
    whileHover={{ y: -10, transition: { duration: 0.3 } }}
    style={{
      background: '#fff',
      padding: '48px',
      borderRadius: '24px',
      border: '1px solid rgba(8,69,86,0.06)',
      boxShadow: '0 10px 40px rgba(8,69,86,0.05)',
      transition: 'border-color 0.4s, box-shadow 0.4s',
      cursor: 'default',
    }}
    className="sit-card"
  >
    <div style={{ marginBottom: '28px', color: 'var(--color-petroleo)' }}>{icon}</div>
    <h3 style={{
      fontFamily: 'var(--font-display)', fontSize: '22px',
      color: 'var(--color-petroleo)', marginBottom: '16px', lineHeight: 1.3,
    }}>{title}</h3>
    <p style={{ color: 'var(--color-gris)', fontSize: '16px', lineHeight: 1.7 }}>{desc}</p>
  </motion.div>
);

const StepCard = ({ number, icon, title, desc, delay }) => (
  <motion.div
    variants={fadeUp}
    custom={delay}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.2 }}
    whileHover={{ y: -8, transition: { duration: 0.3 } }}
    style={{
      position: 'relative',
      padding: '40px',
      background: 'rgba(255,255,255,0.04)',
      borderRadius: '24px',
      border: '1px solid rgba(255,255,255,0.07)',
      overflow: 'hidden',
      cursor: 'default',
    }}
    className="step-card"
  >
    <div style={{
      position: 'absolute', top: '16px', right: '24px',
      fontFamily: 'var(--font-display)', fontSize: '80px',
      color: 'rgba(230,255,40,0.07)', lineHeight: 1, userSelect: 'none',
    }}>{number}</div>

    <div style={{
      width: '52px', height: '52px',
      background: 'rgba(230,255,40,0.1)',
      borderRadius: '14px',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      marginBottom: '28px',
      color: 'var(--color-lima)',
    }}>{icon}</div>

    <h3 style={{
      fontFamily: 'var(--font-display)', fontSize: '22px',
      color: '#fff', marginBottom: '14px', lineHeight: 1.3,
    }}>{title}</h3>
    <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '15px', lineHeight: 1.7 }}>{desc}</p>
  </motion.div>
);

const SwalaCalculator = () => {
  const [amount, setAmount] = useState(10000000);
  const [days, setDays] = useState(30);

  const monthlyRate = 0.025;
  const platformFee = 0.01;
  const totalCost = (amount * monthlyRate * (days / 30)) + (amount * platformFee);
  const netAmount = amount - totalCost;

  const formatter = new Intl.NumberFormat('es-CO', {
    style: 'currency', currency: 'COP', maximumFractionDigits: 0,
  });

  return (
    <motion.div 
      variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
      style={{
        maxWidth: '900px', margin: '0 auto', background: '#fff', padding: '48px',
        borderRadius: '32px', boxShadow: '0 40px 100px rgba(8,69,86,0.06)',
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '60px',
      }}
    >
      <div>
        <div style={{ marginBottom: '40px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
            <label className="swala-label">Monto de la operación</label>
            <span style={{ fontWeight: 700, color: 'var(--color-petroleo)' }}>{formatter.format(amount)}</span>
          </div>
          <input type="range" min="1000000" max="200000000" step="1000000" value={amount} onChange={(e) => setAmount(Number(e.target.value))} className="swala-slider" />
        </div>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
            <label className="swala-label">Plazo estimado (días)</label>
            <span style={{ fontWeight: 700, color: 'var(--color-petroleo)' }}>{days} días</span>
          </div>
          <input type="range" min="15" max="120" step="15" value={days} onChange={(e) => setDays(Number(e.target.value))} className="swala-slider" />
        </div>
      </div>
      <div style={{
        background: 'var(--color-petroleo)', padding: '40px', borderRadius: '24px', color: '#fff',
        display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', overflow: 'hidden',
      }}>
        <Orb color="rgba(230,255,40,0.1)" size="200px" top="-20%" right="-20%" />
        <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px' }}>Recibes hoy aprox.</p>
        <h3 style={{ fontSize: '38px', fontFamily: 'var(--font-display)', color: 'var(--color-lima)', marginBottom: '24px' }}>{formatter.format(netAmount)}</h3>
        <div style={{ paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', marginBottom: '8px' }}>
            <span>Costo total del servicio</span>
            <span>{formatter.format(totalCost)}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const ContactForm = () => {
  const [status, setStatus] = useState('idle');
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    setTimeout(() => setStatus('success'), 1500);
  };

  if (status === 'success') {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} style={{ background: '#fff', padding: '60px 40px', borderRadius: '32px', textAlign: 'center', boxShadow: '0 40px 100px rgba(8,69,86,0.06)' }}>
        <div style={{ width: '80px', height: '80px', background: 'var(--color-lima)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
          <CheckCircle2 size={40} color="var(--color-petroleo)" />
        </div>
        <h3 style={{ fontSize: '28px', fontFamily: 'var(--font-display)', marginBottom: '16px', color: 'var(--color-petroleo)' }}>¡Solicitud Recibida!</h3>
        <p style={{ color: 'var(--color-gris)', fontSize: '16px' }}>Un asesor de Swala Capital se pondrá en contacto contigo en menos de 48 horas.</p>
      </motion.div>
    );
  }

  return (
    <div style={{ background: '#fff', padding: '48px', borderRadius: '32px', boxShadow: '0 40px 100px rgba(8,69,86,0.06)' }}>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div className="form-group"><label className="swala-label">Nombre completo</label><input type="text" className="swala-input" placeholder="Tu nombre" required /></div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div className="form-group"><label className="swala-label">Empresa</label><input type="text" className="swala-input" placeholder="Nombre taller" required /></div>
          <div className="form-group"><label className="swala-label">Celular</label><input type="tel" className="swala-input" placeholder="300 000 0000" required /></div>
        </div>
        <div className="form-group"><label className="swala-label">Ventas Mensuales</label>
          <select className="swala-input" required>
            <option value="">Selecciona</option>
            <option value="1-10">1M - 10M</option>
            <option value="10-50">10M - 50M</option>
            <option value="50-100">50M - 100M</option>
            <option value="100+">Más de 100M</option>
          </select>
        </div>
        <div className="form-group"><label className="swala-label">¿Para qué necesitas el capital?</label><textarea className="swala-input" rows="3" placeholder="Ej: Comprar tela para un pedido..." required></textarea></div>
        <button type="submit" className="btn-primary" disabled={status === 'sending'} style={{ width: '100%', justifyContent: 'center' }}>
          {status === 'sending' ? 'Procesando...' : 'Enviar mi solicitud'}
        </button>
      </form>
    </div>
  );
};

/* ─── APP PRINCIPAL ─── */
const App = () => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="app-container">
      <ExitIntentPopup />
      
      <nav style={{
        position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 1000, height: scrolled ? '68px' : '80px',
        background: scrolled ? 'rgba(8,69,86,0.96)' : 'transparent', backdropFilter: scrolled ? 'blur(12px)' : 'none',
        display: 'flex', alignItems: 'center', transition: 'all 0.5s'
      }}>
        <div className="container nav-wrapper">
          <a href="#" className="logo">Swala<span>Capital</span></a>
          <a href="#formulario" className="btn-nav">Contacto</a>
        </div>
      </nav>

      <section className="hero" id="inicio" style={{ background: 'var(--color-petroleo)', minHeight: '100vh', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden', paddingTop: '80px' }}>
        <Orb color="rgba(230,255,40,0.1)" size="700px" top="-15%" right="-10%" />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <motion.div variants={fadeUp} initial="hidden" animate="visible">
            <h1 className="hero-h1">¿El dinero te <span className="accent">frena</span><br />aunque tengas pedidos?</h1>
            <p className="hero-sub">Conectamos confeccionistas colombianos con el capital que necesitan. Sin hipotecas ni historial crediticio.</p>
            <div className="hero-actions-container">
              <a href="#formulario" className="btn-primary">Hablar con Swala <ChevronRight size={20} /></a>
            </div>
          </motion.div>
        </div>
      </section>

      <SectionConnector from="var(--color-petroleo)" to="var(--color-blanco-hueso)" />

      <section id="situaciones" style={{ background: 'var(--color-blanco-hueso)', padding: '100px 0' }}>
        <div className="container">
          <h2 className="sec-heading" style={{ textAlign: 'center', marginBottom: '72px' }}>Sabemos lo que <span style={{ color: 'var(--color-lima-dark)' }}>vives</span></h2>
          <div className="grid-3">
            <SituationCard icon={<FileText size={32} />} title="Contratos sin capital" desc="Tienes el negocio pero te falta el impulso para ejecutarlo." delay={0.1} />
            <SituationCard icon={<Package size={32} />} title="Órdenes por arrancar" desc="La materia prima no espera. Te habilitamos el flujo hoy." delay={0.2} />
            <SituationCard icon={<Clock size={32} />} title="Facturas por cobrar" desc="Adelanta el pago de tus facturas y sigue produciendo." delay={0.3} />
          </div>
        </div>
      </section>

      <SectionConnector from="var(--color-blanco-hueso)" to="var(--color-petroleo)" />

      <section id="proceso" style={{ background: 'var(--color-petroleo)', padding: '100px 0', color: '#fff' }}>
        <div className="container">
          <h2 className="sec-heading" style={{ color: '#fff', textAlign: 'center', marginBottom: '80px' }}>En <span style={{ color: 'var(--color-lima)' }}>3 simples pasos</span></h2>
          <div className="grid-3">
            <StepCard number="01" icon={<MessageCircle size={24} />} title="Hablemos" desc="Cuéntanos tus pedidos y necesidades actuales." delay={0.1} />
            <StepCard number="02" icon={<Zap size={24} />} title="Evaluación" desc="Análisis ágil en menos de 48 horas." delay={0.2} />
            <StepCard number="03" icon={<DollarSign size={24} />} title="Recibe" desc="El capital llega directo a tu producción." delay={0.3} />
          </div>
        </div>
      </section>

      <SectionConnector from="var(--color-petroleo)" to="var(--color-blanco-hueso)" />

      <section id="calculadora" style={{ background: 'var(--color-blanco-hueso)', padding: '100px 0' }}>
        <div className="container">
          <h2 className="sec-heading" style={{ textAlign: 'center', marginBottom: '60px' }}>Calcula tu <span style={{ color: 'var(--color-lima-dark)' }}>liquidez</span></h2>
          <SwalaCalculator />
        </div>
      </section>

      <section id="formulario" style={{ background: 'var(--color-blanco-hueso)', padding: '100px 0 140px' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '80px', alignItems: 'center' }}>
            <div>
              <h2 className="sec-heading" style={{ textAlign: 'left', marginBottom: '24px' }}>Listos para <span style={{ color: 'var(--color-lima-dark)' }}>impulsarte</span></h2>
              <p style={{ color: 'var(--color-gris)', fontSize: '18px', marginBottom: '40px' }}>Completa tus datos y un consultor te contactará en menos de 48h.</p>
            </div>
            <ContactForm />
          </div>
        </div>
      </section>

      <footer style={{ background: '#052D38', padding: '60px 0', color: 'rgba(255,255,255,0.4)', textAlign: 'center' }}>
        <div className="container">
          <p>&copy; 2026 Swala Capital. Financiación para el sector confección.</p>
        </div>
      </footer>

      <style>{`
        .hero-h1 { font-family: var(--font-display); font-size: clamp(40px, 8vw, 80px); line-height: 1.1; color: #fff; margin-bottom: 24px; }
        .hero-sub { font-size: 20px; color: rgba(255,255,255,0.7); max-width: 600px; margin-bottom: 40px; }
        .sec-heading { font-family: var(--font-display); font-size: clamp(32px, 5vw, 52px); line-height: 1.2; }
        .swala-slider { -webkit-appearance: none; width: 100%; height: 6px; background: #E5E9EC; border-radius: 5px; outline: none; }
        .swala-slider::-webkit-slider-thumb { -webkit-appearance: none; width: 24px; height: 24px; background: var(--color-lima-dark); border-radius: 50%; cursor: pointer; border: 4px solid #fff; box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
        .swala-input { width: 100%; padding: 14px; border: 1px solid #E5E9EC; border-radius: 12px; font-size: 15px; outline: none; transition: 0.3s; }
        .swala-input:focus { border-color: var(--color-lima-dark); box-shadow: 0 0 0 4px rgba(230,255,40,0.1); }
        @media (max-width: 768px) { .grid-3 { grid-template-columns: 1fr !important; gap: 32px; } }
      `}</style>
    </div>
  );
};

export default App;
