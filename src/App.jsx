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

const SwalaCalculator = ({ onCalcChange }) => {
  const [mode, setMode] = useState('project');
  const [amount, setAmount] = useState(10000000);
  const [days, setDays] = useState(30);           // Calc 1: selector fijo
  const [invoiceDays, setInvoiceDays] = useState(45); // Calc 2: input libre
  const [payerType, setPayerType] = useState('public');

  // Notificar al App el contexto del lead
  useEffect(() => {
    const labels = { public: 'Entidad Pública', large: 'Gran Empresa Privada', medium: 'Empresa Mediana' };
    const modeLabel = mode === 'project' ? 'Financiación de Proyectos' : 'Adelanto de Pagos Pendientes';
    onCalcChange({ mode: modeLabel, pagador: labels[payerType] });
  }, [mode, payerType]);

  // ── Tasas ALL-IN (comisión ya incluida) ──────────────────────────────
  const rates = { public: 0.018, large: 0.020, medium: 0.022 };
  // ── % de Anticipo (solo Calc 2) ──────────────────────────────────────
  const advancePct = { public: 0.87, large: 0.85, medium: 0.82 };

  const rate = rates[payerType];
  const fmt = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 });

  // ── CALC 1: Financiación de Proyectos ────────────────────────────────
  const c1Cost   = amount * (rate / 30) * days;
  const c1Net    = amount - c1Cost;

  // ── CALC 2: Adelanto de Pagos Pendientes ─────────────────────────────
  const c2Cost     = amount * (rate / 30) * invoiceDays;
  const c2Today    = (amount * advancePct[payerType]) - c2Cost;
  const c2AtExpiry = amount * (1 - advancePct[payerType]);

  const payerOptions = [
    { id: 'public', label: 'Entidad Pública', desc: 'Alcaldías, Ministerios...', adv: '87%' },
    { id: 'large',  label: 'Gran Empresa', desc: 'Multinacionales, grandes superficies', adv: '85%' },
    { id: 'medium', label: 'Empresa Mediana', desc: 'Empresas locales consolidadas', adv: '82%' },
  ];

  const ResultRow = ({ label, value, highlight }) => (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.07)', alignItems: 'baseline' }}>
      <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)' }}>{label}</span>
      <span style={{ fontFamily: 'var(--font-display)', fontSize: highlight ? '26px' : '16px', color: highlight ? 'var(--color-lima)' : '#fff', fontWeight: 700 }}>
        {fmt.format(value)}
      </span>
    </div>
  );

  return (
    <div style={{ maxWidth: '960px', margin: '0 auto' }}>

      {/* ── TABS ──────────────────────────────────────────────────────── */}
      <div style={{ display: 'flex', background: 'rgba(8,69,86,0.06)', padding: '6px', borderRadius: '16px', marginBottom: '32px', gap: '4px' }}>
        {[{ id: 'project', label: 'Financiación de Proyectos' }, { id: 'invoice', label: 'Adelanto de Pagos Pendientes' }].map(t => (
          <button key={t.id} onClick={() => setMode(t.id)} style={{
            flex: 1, padding: '12px 16px', borderRadius: '12px', border: 'none', cursor: 'pointer',
            fontFamily: 'var(--font-ui)', fontWeight: 600, fontSize: '14px', transition: '0.3s',
            background: mode === t.id ? 'var(--color-petroleo)' : 'transparent',
            color: mode === t.id ? 'var(--color-lima)' : 'var(--color-petroleo)',
          }}>{t.label}</button>
        ))}
      </div>

      <motion.div key={mode} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
        style={{ background: '#fff', borderRadius: '32px', boxShadow: '0 40px 100px rgba(8,69,86,0.07)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '0' }}>

        {/* ── PANEL IZQUIERDO: INPUTS ─────────────────────────────────── */}
        <div style={{ padding: '48px' }}>

          {/* SELECTOR DE PAGADOR */}
          <div style={{ marginBottom: '28px' }}>
            <label className="swala-label" style={{ display: 'block', marginBottom: '12px' }}>¿Quién te paga?</label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
              {payerOptions.map(p => (
                <button key={p.id} onClick={() => setPayerType(p.id)} style={{
                  padding: '10px 6px', borderRadius: '10px', border: '1.5px solid', borderColor: payerType === p.id ? 'var(--color-lima-dark)' : '#E5E9EC',
                  background: payerType === p.id ? 'rgba(184,217,0,0.08)' : '#FAFAFA', cursor: 'pointer', transition: '0.2s', textAlign: 'center',
                }}>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-petroleo)', marginBottom: '3px' }}>{p.label}</div>
                  <div style={{ fontSize: '10px', color: 'var(--color-gris)' }}>{p.desc}{mode === 'invoice' ? ` · Anticipo ${p.adv}` : ''}</div>
                </button>
              ))}
            </div>
          </div>

          {/* MONTO */}
          <div style={{ marginBottom: '24px' }}>
            <label className="swala-label" style={{ display: 'block', marginBottom: '8px' }}>{mode === 'project' ? 'Monto a financiar (COP)' : 'Valor de la factura (COP)'}</label>
            <input type="number" value={amount} min={1000000} max={500000000} step={1000000} onChange={e => setAmount(Math.max(0, Number(e.target.value)))}
              className="swala-input" style={{ fontSize: '18px', fontWeight: 700, color: 'var(--color-petroleo)' }} />
            <div style={{ fontSize: '12px', color: 'var(--color-gris)', marginTop: '4px' }}>{fmt.format(amount)}</div>
          </div>

          {/* DÍAS */}
          {mode === 'project' ? (
            <div>
              <label className="swala-label" style={{ display: 'block', marginBottom: '10px' }}>Plazo de pago del cliente</label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: '6px' }}>
                {[30, 45, 60, 90, 120].map(d => (
                  <button key={d} onClick={() => setDays(d)} style={{
                    padding: '10px 4px', borderRadius: '10px', border: '1.5px solid', borderColor: days === d ? 'var(--color-lima-dark)' : '#E5E9EC',
                    background: days === d ? 'rgba(184,217,0,0.08)' : '#FAFAFA', fontSize: '13px', fontWeight: 700, color: 'var(--color-petroleo)', cursor: 'pointer', transition: '0.2s',
                  }}>{d}d</button>
                ))}
              </div>
            </div>
          ) : (
            <div>
              <label className="swala-label" style={{ display: 'block', marginBottom: '8px' }}>Días hasta el vencimiento</label>
              <input type="number" value={invoiceDays} min={1} max={360} onChange={e => setInvoiceDays(Math.max(1, Number(e.target.value)))} className="swala-input" placeholder="Ej: 45" />
            </div>
          )}
        </div>

        {/* ── PANEL DERECHO: RESULTADOS ───────────────────────────────── */}
        <div style={{ background: 'var(--color-petroleo)', borderRadius: '0 32px 32px 0', padding: '48px', display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
          <Orb color="rgba(230,255,40,0.08)" size="300px" top="-30%" right="-20%" />

          {mode === 'project' ? (
            <>
              <p style={{ fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginBottom: '24px' }}>Financiación de Proyectos — Simulación orientativa</p>
              <ResultRow label="Monto financiado" value={amount} />
              <ResultRow label="Costo total de la operación" value={c1Cost} />
              <ResultRow label="Lo que recibes neto" value={c1Net} highlight />
            </>
          ) : (
            <>
              <p style={{ fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginBottom: '24px' }}>Adelanto de Pagos — Simulación orientativa</p>
              <ResultRow label="Valor de tu factura" value={amount} />
              <ResultRow label="Lo que recibes hoy" value={c2Today} highlight />
              <ResultRow label="Lo que recibes al vencimiento" value={c2AtExpiry} />
              <ResultRow label="Costo total" value={c2Cost} />
            </>
          )}

          <p style={{ marginTop: '20px', fontSize: '11px', color: 'rgba(255,255,255,0.35)', fontStyle: 'italic' }}>*Sujeto a evaluación de riesgo. Condiciones reales dependen de la solidez del pagador.</p>
        </div>
      </motion.div>
    </div>
  );
};

const ContactForm = ({ calcContext }) => {
  const [status, setStatus] = useState('idle');
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    const formData = new FormData(e.target);
    const data = new URLSearchParams(formData).toString();

    try {
      await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: data,
      });
      setStatus('success');
    } catch (error) {
      console.error(error);
      alert("Hubo un error al enviar. Por favor intenta de nuevo.");
      setStatus('idle');
    }
  };

  if (status === 'success') {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} style={{ background: '#fff', padding: '60px 40px', borderRadius: '32px', textAlign: 'center', boxShadow: '0 40px 100px rgba(8,69,86,0.06)' }}>
        <div style={{ width: '80px', height: '80px', background: 'var(--color-lima)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
          <CheckCircle2 size={40} color="var(--color-petroleo)" />
        </div>
        <h3 style={{ fontSize: '28px', fontFamily: 'var(--font-display)', marginBottom: '16px', color: 'var(--color-petroleo)' }}>¡Listo! Recibimos tu información.</h3>
        <p style={{ color: 'var(--color-gris)', fontSize: '16px' }}>Te escribimos en menos de 48 horas hábiles al WhatsApp que nos dejaste. 🙌</p>
      </motion.div>
    );
  }

  return (
    <div style={{ background: '#fff', padding: '48px', borderRadius: '32px', boxShadow: '0 40px 100px rgba(8,69,86,0.06)' }}>
      <form 
        name="contact" 
        method="POST" 
        data-netlify="true" 
        onSubmit={handleSubmit} 
        style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
      >
        <input type="hidden" name="form-name" value="contact" />
        {/* CAMPOS DE CONTEXTO DE CALCULADORA */}
        <input type="hidden" name="producto-calculado" value={calcContext?.mode || 'No especificado'} />
        <input type="hidden" name="perfil-pagador" value={calcContext?.pagador || 'No especificado'} />
        
        <div className="form-group">
          <label className="swala-label" style={{ fontWeight: 600, color: 'var(--color-petroleo)', marginBottom: '8px', display: 'block' }}>Nombre completo</label>
          <input type="text" name="nombre" className="swala-input" placeholder="Tu nombre" required />
        </div>
        
        <div className="form-group">
          <label className="swala-label" style={{ fontWeight: 600, color: 'var(--color-petroleo)', marginBottom: '8px', display: 'block' }}>WhatsApp</label>
          <input type="tel" name="celular" className="swala-input" placeholder="300 000 0000" required />
        </div>
        
        <div className="form-group">
          <label className="swala-label" style={{ fontWeight: 600, color: 'var(--color-petroleo)', marginBottom: '8px', display: 'block' }}>¿Cuál describe mejor tu situación?</label>
          <select className="swala-input" name="situacion" required>
            <option value="">Selecciona tu situación</option>
            <option value="Contrato sin capital">Tengo un contrato pero no el capital para ejecutarlo</option>
            <option value="Orden de compra sin capital">Tengo una orden de compra pero necesito capital para arrancar</option>
            <option value="Factura por cobrar">Ya entregué y facturé, pero necesito liquidez ahora</option>
            <option value="Saber más">Quiero saber más sobre Swala</option>
          </select>
        </div>
        
        <button type="submit" className="btn-primary" disabled={status === 'sending'} style={{ width: '100%', justifyContent: 'center', background: 'var(--color-lima)', color: 'var(--color-petroleo)', fontWeight: 'bold', border: 'none', padding: '16px', borderRadius: '12px', fontSize: '16px', cursor: 'pointer', transition: '0.3s' }}>
          {status === 'sending' ? 'Procesando...' : 'Quiero que me contacten'}
        </button>
      </form>
    </div>
  );
};

/* ─── APP PRINCIPAL ─── */
const App = () => {
  const [scrolled, setScrolled] = useState(false);
  const [calcContext, setCalcContext] = useState({ mode: 'Financiación de Proyectos', pagador: 'Entidad Pública' });

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
          <SwalaCalculator onCalcChange={setCalcContext} />
        </div>
      </section>

      <section id="formulario" style={{ background: 'var(--color-blanco-hueso)', padding: '100px 0 140px' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '80px', alignItems: 'center' }}>
            <div>
              <h2 className="sec-heading" style={{ textAlign: 'left', marginBottom: '24px' }}>Listos para <span style={{ color: 'var(--color-lima-dark)' }}>impulsarte</span></h2>
              <p style={{ color: 'var(--color-gris)', fontSize: '18px', marginBottom: '40px' }}>Completa tus datos y un consultor te contactará en menos de 48h.</p>
            </div>
            <ContactForm calcContext={calcContext} />
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
