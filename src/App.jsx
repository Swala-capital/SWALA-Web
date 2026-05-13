import { motion, useScroll, useTransform } from 'framer-motion';
import { FileText, Package, Clock, ChevronRight, MessageCircle, Zap, DollarSign } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

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

/* ─── ORBE ANIMADO ─── */
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

/* ─── CONECTOR ENTRE SECCIONES ─── */
const SectionConnector = ({ from, to }) => (
  <div style={{
    height: '120px',
    background: `linear-gradient(to bottom, ${from}, ${to})`,
    position: 'relative',
    zIndex: 1,
  }} />
);

/* ─── TARJETA DE SITUACIÓN ─── */
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

/* ─── TARJETA DE PASO ─── */
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
    {/* Número decorativo de fondo */}
    <div style={{
      position: 'absolute', top: '16px', right: '24px',
      fontFamily: 'var(--font-display)', fontSize: '80px',
      color: 'rgba(230,255,40,0.07)', lineHeight: 1, userSelect: 'none',
    }}>{number}</div>

    {/* Caja de icono */}
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

/* ─── APP PRINCIPAL ─── */
const App = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div style={{ position: 'relative' }}>

      {/* ── NAVEGACIÓN ── */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 1000,
        height: scrolled ? '68px' : '80px',
        background: scrolled ? 'rgba(8,69,86,0.96)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.08)' : 'none',
        display: 'flex', alignItems: 'center',
        transition: 'all 0.5s cubic-bezier(0.16,1,0.3,1)',
      }}>
        <div className="container nav-wrapper">
          <a href="#" className="logo">Swala<span>Capital</span></a>
          <a href="#formulario" className="btn-nav">Quiero hablar con Swala</a>
        </div>
      </nav>

      {/* ══════════════════════════════════
          SECCIÓN 1 — HERO (Petróleo)
      ══════════════════════════════════ */}
      <header style={{
        minHeight: '100vh',
        background: 'var(--color-petroleo)',
        display: 'flex', alignItems: 'center',
        paddingTop: '80px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Orbes internos del Hero */}
        <Orb color="rgba(230,255,40,0.10)" size="700px" top="-15%" right="-10%" duration={18} dx={60} dy={40} />
        <Orb color="rgba(8,45,56,0.6)"    size="500px" bottom="-20%" left="-5%"  duration={24} delay={3} dx={-40} dy={60} />

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="hero-content"
          >
            <motion.p
              variants={fadeIn}
              custom={0.2}
              initial="hidden"
              animate="visible"
              style={{
                fontSize: '12px', fontWeight: 700, letterSpacing: '0.15em',
                textTransform: 'uppercase', color: 'var(--color-lima)',
                marginBottom: '24px',
              }}
            >
              Capital para confeccionistas colombianos
            </motion.p>

            <h1 className="hero-h1">
              ¿El dinero te <span className="accent">frena</span><br />aunque tengas pedidos?
            </h1>

            <motion.p variants={fadeUp} custom={0.2} initial="hidden" animate="visible" className="hero-sub">
              Conectamos confeccionistas colombianos con el capital que necesitan para ejecutar sus pedidos.
              Sin hipotecas. Sin historial crediticio.
            </motion.p>

            <motion.div variants={fadeUp} custom={0.4} initial="hidden" animate="visible" className="hero-actions-container">
              <a href="#formulario" className="btn-primary">
                Quiero hablar con Swala
                <ChevronRight size={20} />
              </a>
              <div className="hero-badges">
                <span>Sector Confección</span>
                <div className="dot" />
                <span>Respuesta en 48h</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </header>

      {/* Conector Hero → Situaciones */}
      <SectionConnector from="var(--color-petroleo)" to="var(--color-blanco-hueso)" />

      {/* ══════════════════════════════════
          SECCIÓN 2 — SITUACIONES (Hueso)
      ══════════════════════════════════ */}
      <section id="situaciones" style={{
        background: 'var(--color-blanco-hueso)',
        padding: '100px 0 120px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Orbe suave Lima, apenas perceptible en el fondo hueso */}
        <Orb color="rgba(184,217,0,0.08)" size="600px" top="10%" right="-10%" duration={22} delay={1} dx={-50} dy={40} />

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            style={{ textAlign: 'center', marginBottom: '72px' }}
          >
            <h2 className="sec-heading">
              Sabemos lo que <span style={{ color: 'var(--color-lima-dark)' }}>vives</span> día a día
            </h2>
            <p style={{ color: 'var(--color-gris)', maxWidth: '520px', margin: '16px auto 0', fontSize: '17px', lineHeight: 1.6 }}>
              Tres situaciones que bloquean a los mejores confeccionistas del país. Nosotros las resolvemos.
            </p>
          </motion.div>

          <div className="grid-3">
            <SituationCard
              icon={<FileText size={32} />}
              title="Tengo el contrato pero no el capital para ejecutarlo"
              desc="Ganaste el negocio. Ahora necesitas el impulso para cumplir sin comprometer lo que construiste."
              delay={0.1}
            />
            <SituationCard
              icon={<Package size={32} />}
              title="Tengo la orden de compra pero necesito capital para arrancar"
              desc="La materia prima y la mano de obra no esperan. Te habilitamos el flujo para que no pierdas el pedido."
              delay={0.2}
            />
            <SituationCard
              icon={<Clock size={32} />}
              title="Ya entregué y facturé, pero necesito liquidez ahora mismo"
              desc="No esperes 60 o 90 días. Te adelantamos el pago de tus facturas para que sigas produciendo hoy."
              delay={0.3}
            />
          </div>
        </div>
      </section>

      {/* Conector Situaciones → Proceso */}
      <SectionConnector from="var(--color-blanco-hueso)" to="var(--color-petroleo)" />

      {/* ══════════════════════════════════
          SECCIÓN 3 — CÓMO FUNCIONA (Petróleo)
      ══════════════════════════════════ */}
      <section id="proceso" style={{
        background: 'var(--color-petroleo)',
        padding: '100px 0 120px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Orbes en la sección oscura */}
        <Orb color="rgba(230,255,40,0.06)" size="800px" top="-20%" left="-15%"  duration={26} delay={2} dx={70}  dy={50} />
        <Orb color="rgba(5,45,56,0.8)"    size="500px" bottom="-15%" right="-5%" duration={20} delay={0} dx={-50} dy={-40} />

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            style={{ textAlign: 'center', marginBottom: '80px' }}
          >
            <h2 className="sec-heading" style={{ color: '#fff' }}>
              Tu capital en <span style={{ color: 'var(--color-lima)' }}>3 pasos</span>
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.5)', maxWidth: '480px', margin: '16px auto 0', fontSize: '17px', lineHeight: 1.6 }}>
              Sin burocracia. Sin filas. Sin hipotecar tu negocio.
            </p>
          </motion.div>

          {/* Línea conectora horizontal entre pasos */}
          <div style={{ position: 'relative' }}>
            <div style={{
              position: 'absolute', top: '52px', left: '20%', right: '20%', height: '1px',
              background: 'linear-gradient(to right, transparent, rgba(230,255,40,0.2), transparent)',
              zIndex: 0,
            }} />
            <div className="grid-3" style={{ position: 'relative', zIndex: 1 }}>
              <StepCard
                number="01"
                icon={<MessageCircle size={24} />}
                title="Hablemos de tu negocio"
                desc="Cuéntanos sobre tus pedidos y necesidades. Entendemos el ritmo de la confección colombiana."
                delay={0.1}
              />
              <StepCard
                number="02"
                icon={<Zap size={24} />}
                title="Evaluación ágil"
                desc="Analizamos tus órdenes o facturas en menos de 48 horas. Sin papeleo infinito ni visitas al banco."
                delay={0.2}
              />
              <StepCard
                number="03"
                icon={<DollarSign size={24} />}
                title="Recibe tu capital"
                desc="El dinero llega directo para que tu producción no se detenga. Así de claro."
                delay={0.3}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Estilos internos */}
      <style>{`
        .hero-h1 {
          font-family: var(--font-display);
          font-size: clamp(48px, 7vw, 86px);
          line-height: 1.05;
          margin-bottom: 28px;
          color: #fff;
        }
        .hero-sub {
          font-size: clamp(17px, 2vw, 21px);
          color: rgba(255,255,255,0.65);
          margin-bottom: 52px;
          max-width: 600px;
          line-height: 1.65;
        }
        .hero-actions-container {
          display: flex;
          flex-wrap: wrap;
          gap: 24px;
          align-items: center;
        }
        .sec-heading {
          font-family: var(--font-display);
          font-size: clamp(34px, 5vw, 54px);
          color: var(--color-petroleo);
          line-height: 1.1;
        }
        .sit-card:hover {
          border-color: var(--color-lima) !important;
          box-shadow: 0 24px 60px rgba(8,69,86,0.1) !important;
        }
        .step-card:hover {
          background: rgba(255,255,255,0.07) !important;
          border-color: var(--color-lima) !important;
        }
        @media (max-width: 768px) {
          .grid-3 { grid-template-columns: 1fr !important; }
          .hero-actions-container { flex-direction: column; align-items: flex-start; }
        }
      `}</style>
    </div>
  );
};

export default App;
