document.addEventListener('DOMContentLoaded', () => {
    // Reveal on scroll
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('vs');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.rv').forEach(el => {
        observer.observe(el);
    });

    // Nav Background on scroll
    window.addEventListener('scroll', () => {
        const nav = document.querySelector('nav');
        if (window.scrollY > 50) {
            nav.style.backgroundColor = 'var(--color-petroleo-dark)';
            nav.style.height = '70px';
        } else {
            nav.style.backgroundColor = 'var(--color-petroleo)';
            nav.style.height = '80px';
        }
    });

    // Smooth scroll for anchors
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});

// CALCULATOR LOGIC
function showCalc(type) {
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.calc-box').forEach(box => box.classList.remove('active'));
    
    event.target.classList.add('active');
    document.getElementById(`calc-${type}`).classList.add('active');
}

const fmt = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0
});

function updateProj() {
    const monto = parseFloat(document.getElementById('proj-monto').value) || 0;
    const plazo = parseInt(document.getElementById('proj-plazo').value);
    const tasaMes = parseFloat(document.getElementById('proj-perfil').value) / 100;
    
    const costo = monto * (tasaMes / 30) * plazo;
    const neto = monto - costo;
    
    document.getElementById('proj-costo').textContent = fmt.format(costo);
    document.getElementById('proj-neto').textContent = fmt.format(neto);
}

function updateFact() {
    const monto = parseFloat(document.getElementById('fact-monto').value) || 0;
    const dias = parseInt(document.getElementById('fact-dias').value) || 0;
    const select = document.getElementById('fact-perfil');
    const tasaMes = parseFloat(select.value) / 100;
    const percAnticipo = parseFloat(select.options[select.selectedIndex].getAttribute('data-perc')) / 100;
    
    const costo = monto * (tasaMes / 30) * dias;
    const hoy = (monto * percAnticipo) - costo;
    const venc = monto * (1 - percAnticipo);
    
    document.getElementById('fact-hoy').textContent = fmt.format(hoy);
    document.getElementById('fact-venc').textContent = fmt.format(venc);
    document.getElementById('fact-costo').textContent = fmt.format(costo);
}

function handleForm(e) {
    e.preventDefault();
    const form = e.target;
    const btn = form.querySelector('button');
    const msg = document.getElementById('form-ok');
    
    btn.disabled = true;
    btn.textContent = 'Enviando...';
    
    fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            form.reset();
            form.style.opacity = '0.5';
            form.style.pointerEvents = 'none';
            msg.style.display = 'block';
            btn.textContent = 'Enviado';
        } else {
            btn.disabled = false;
            btn.textContent = 'Quiero que me contacten';
            alert('Hubo un error. Por favor intenta de nuevo.');
        }
    }).catch(error => {
        btn.disabled = false;
        btn.textContent = 'Quiero que me contacten';
        alert('Hubo un error de conexión.');
    });
}
