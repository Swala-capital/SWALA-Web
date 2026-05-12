
function sendProForm(e){
  e.preventDefault();
  var form=e.target;
  var data={tipo:'Swala Pro'};
  form.querySelectorAll('input,textarea').forEach(function(i){if(i.value)data[i.placeholder]=i.value});
  fetch('https://formspree.io/f/mbdpbnyw',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)});
  form.style.display='none';
  document.getElementById('pro-form-ok').style.display='block';
}


// ── NAV ──────────────────────────────────────────
window.addEventListener('scroll',()=>{
  document.getElementById('nav').classList.toggle('sc',window.scrollY>60);
});

// ── THREAD CANVAS (Hero) ─────────────────────────
(function(){
  var canvas = document.getElementById('thread-canvas');
  if(!canvas) return;
  var ctx = canvas.getContext('2d');
  var W, H, t = 0;
  var mouse = {x: -9999, y: -9999};

  var THREAD_COUNT = 22;
  var threads = [];

  var COLORS = [
    'rgba(196,181,253,',
    'rgba(167,139,250,',
    'rgba(139,92,246,',
    'rgba(255,220,200,',
    'rgba(216,180,254,',
    'rgba(255,255,255,',
  ];

  function init(){
    var hero = canvas.parentElement;
    W = canvas.width = hero.offsetWidth;
    H = canvas.height = hero.offsetHeight;
    threads = [];
    for(var i = 0; i < THREAD_COUNT; i++){
      threads.push({
        yBase: (i / THREAD_COUNT) * H * 1.2 - H * 0.1,
        amplitude: 20 + Math.random() * 60,
        freq: 0.003 + Math.random() * 0.005,
        phase: Math.random() * Math.PI * 2,
        speed: 0.003 + Math.random() * 0.006,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        opacity: 0.04 + Math.random() * 0.14,
        width: 0.5 + Math.random() * 1.8,
        segments: 120,
      });
    }
  }

  function draw(){
    ctx.clearRect(0, 0, W, H);
    t += 1;

    for(var i = 0; i < threads.length; i++){
      var th = threads[i];
      ctx.beginPath();
      ctx.lineWidth = th.width;

      var gradient = ctx.createLinearGradient(0, 0, W, 0);
      gradient.addColorStop(0, th.color + '0)');
      gradient.addColorStop(0.2, th.color + th.opacity + ')');
      gradient.addColorStop(0.8, th.color + th.opacity + ')');
      gradient.addColorStop(1, th.color + '0)');
      ctx.strokeStyle = gradient;

      for(var s = 0; s <= th.segments; s++){
        var x = (s / th.segments) * W;
        // Mouse distortion
        var mx = mouse.x, my = mouse.y;
        var distX = x - mx;
        var distY = (th.yBase + Math.sin(x * th.freq + th.phase + t * th.speed) * th.amplitude) - my;
        var dist = Math.sqrt(distX*distX + distY*distY);
        var push = dist < 150 ? (150 - dist) / 150 * 40 : 0;
        var pushDir = dist > 0 ? distY / dist : 0;

        var y = th.yBase
          + Math.sin(x * th.freq + th.phase + t * th.speed) * th.amplitude
          + Math.sin(x * th.freq * 0.4 + t * th.speed * 0.7) * (th.amplitude * 0.3)
          + push * pushDir;

        if(s === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
    }

    requestAnimationFrame(draw);
  }

  var hero = canvas.parentElement;
  hero.addEventListener('mousemove', function(e){
    var r = canvas.getBoundingClientRect();
    mouse.x = e.clientX - r.left;
    mouse.y = e.clientY - r.top;
  });
  hero.addEventListener('mouseleave', function(){ mouse.x = -9999; mouse.y = -9999; });
  window.addEventListener('resize', function(){ init(); });
  init();
  draw();
})();

// ── FLOATING TEXTILE ICONS ────────────────────────
(function(){
  var container = document.getElementById('textile-floats');
  if(!container) return;

  // Professional minimal icons (Lucide-style, precise geometry)
  var icons = [
    // Trending up — crecimiento financiero
    '<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="rgba(196,181,253,0.55)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>',
    // Package — pedidos / producción
    '<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="rgba(196,181,253,0.55)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="16.5" y1="9.4" x2="7.5" y2="4.21"/><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>',
    // File text — contrato
    '<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="rgba(196,181,253,0.55)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>',
    // Layers — capas de tela
    '<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="rgba(196,181,253,0.55)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>',
    // Clock — plazos de pago
    '<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="rgba(196,181,253,0.55)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
    // Shield check — garantía / confianza
    '<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="rgba(196,181,253,0.55)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>',
  ];

  var positions = [
    {top:'12%',right:'8%',rot:-15,size:1.1,dur:6},
    {top:'25%',right:'22%',rot:25,size:.8,dur:8},
    {top:'60%',right:'5%',rot:-5,size:1.2,dur:7},
    {top:'45%',right:'38%',rot:10,size:.7,dur:9},
    {top:'75%',right:'18%',rot:-20,size:1,dur:6.5},
    {top:'15%',right:'45%',rot:5,size:.9,dur:7.5},
  ];

  positions.forEach(function(pos, i){
    var el = document.createElement('div');
    el.className = 'tf';
    el.style.cssText = 'position:absolute;top:'+pos.top+';right:'+pos.right+';--rot:'+pos.rot+'deg;transform:rotate('+pos.rot+'deg) scale('+pos.size+');animation:floatSwatch '+pos.dur+'s ease-in-out infinite;animation-delay:'+(i*1.1)+'s';
    el.innerHTML = icons[i % icons.length];
    container.appendChild(el);
  });
})();

// ── FABRIC CANVAS ANIMATIONS ──────────────────────
(function(){
  var configs = [
    {id:'fabric1', palette:['#3B0764','#5B21B6','#7C3AED','#C4B5FD','#1e1035'], pattern:'diagonal'},
    {id:'fabric2', palette:['#1e1035','#6D28D9','#8B5CF6','#DDD6FE','#0f0820'], pattern:'twill'},
    {id:'fabric3', palette:['#0a1628','#1d3a5f','#2563eb','#60a5fa','#34D399'], pattern:'satin'},
  ];

  configs.forEach(function(cfg){
    var canvas = document.getElementById(cfg.id);
    if(!canvas) return;
    var ctx = canvas.getContext('2d');
    var W, H, t = 0;

    function resize(){
      var parent = canvas.parentElement;
      W = canvas.width = parent.offsetWidth;
      H = canvas.height = parent.offsetHeight;
    }

    function drawWeave(){
      ctx.clearRect(0,0,W,H);
      t += 0.008;

      var cellSize = 8;
      var cols = Math.ceil(W / cellSize) + 2;
      var rows = Math.ceil(H / cellSize) + 2;

      for(var r = 0; r < rows; r++){
        for(var c = 0; c < cols; c++){
          var x = c * cellSize;
          var y = r * cellSize;

          var wave = Math.sin(c * 0.15 + t) * Math.cos(r * 0.15 + t * 0.7);
          var colorIdx = Math.floor(((wave + 1) / 2) * (cfg.palette.length - 1));
          colorIdx = Math.max(0, Math.min(cfg.palette.length - 1, colorIdx));

          var isWarp;
          if(cfg.pattern === 'diagonal') isWarp = (r + c + Math.floor(t * 4)) % 4 < 2;
          else if(cfg.pattern === 'twill') isWarp = (r * 2 + c + Math.floor(t * 3)) % 6 < 3;
          else isWarp = (r + c * 2 + Math.floor(t * 5)) % 5 < 2;

          ctx.fillStyle = cfg.palette[isWarp ? colorIdx : (colorIdx + 2) % cfg.palette.length];
          ctx.globalAlpha = 0.35 + wave * 0.15;
          ctx.fillRect(x, y, cellSize - 0.5, cellSize - 0.5);
        }
      }

      // Overlay shimmer
      var grad = ctx.createLinearGradient(
        (Math.cos(t * 0.5) + 1) * W / 2, 0,
        (Math.sin(t * 0.3) + 1) * W / 2, H
      );
      grad.addColorStop(0, 'rgba(196,181,253,0)');
      grad.addColorStop(0.5, 'rgba(196,181,253,0.08)');
      grad.addColorStop(1, 'rgba(196,181,253,0)');
      ctx.globalAlpha = 1;
      ctx.fillStyle = grad;
      ctx.fillRect(0,0,W,H);

      requestAnimationFrame(drawWeave);
    }

    resize();
    window.addEventListener('resize', resize);
    drawWeave();
  });
})();

// ── STATS COUNT-UP ────────────────────────────────
(function(){
  var stats = document.querySelectorAll('.stat-n[data-count]');
  var animated = false;

  var obs = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(entry.isIntersecting && !animated){
        animated = true;
        stats.forEach(function(el){
          var target = parseInt(el.getAttribute('data-count'));
          var suffix = el.getAttribute('data-suffix') || '';
          var duration = 1200;
          var start = performance.now();
          function update(now){
            var elapsed = now - start;
            var progress = Math.min(elapsed / duration, 1);
            var eased = 1 - Math.pow(1 - progress, 3);
            var val = Math.round(eased * target);
            el.textContent = val + suffix;
            if(progress < 1) requestAnimationFrame(update);
          }
          requestAnimationFrame(update);
        });
      }
    });
  }, {threshold: 0.3});

  if(stats.length) obs.observe(stats[0].closest('.stats-bar'));
})();

// ── REVEAL ON SCROLL ──────────────────────────────
var obs = new IntersectionObserver(function(es){
  es.forEach(function(e){if(e.isIntersecting) e.target.classList.add('vs')});
},{threshold:.1});
document.querySelectorAll('.rv').forEach(function(el){obs.observe(el)});

// ── SIMULATOR ─────────────────────────────────────
function sfmt(i){var r=i.value.replace(/\D/g,'');i.value=r?parseInt(r).toLocaleString('es-CO'):'';}
function snum(id){var e=document.getElementById(id);if(!e)return 0;return parseFloat(e.value.replace(/\D/g,''))||0;}
function fmt(n){return'$'+Math.round(n).toLocaleString('es-CO');}
function calc(){
  var m=snum('sm'),p=parseInt(document.getElementById('sp').value)||0,c=snum('sc'),q=document.getElementById('sq').value;
  var sr=document.getElementById('sr');
  if(!m||!p||!c){sr.classList.remove('show');return;}
  var fee=Math.round(m*.01),meses=p/30,int=Math.round(.02*meses*m),saldo=c-m-int-fee;
  var perfil=q==='p'?'✅ Excelente — entidad pública':q==='g'?'✅ Buen perfil — gran empresa privada':q==='m'?'⚡ Aceptable — requiere análisis':'';
  document.getElementById('rv-cont').textContent=fmt(c);
  document.getElementById('rv-cap').textContent='− '+fmt(m);
  document.getElementById('rv-int').textContent='− '+fmt(int)+' ('+meses.toFixed(1)+'m)';
  document.getElementById('rv-fee').textContent='− '+fmt(fee);
  document.getElementById('rv-saldo').textContent=fmt(saldo);
  document.getElementById('rv-perfil').textContent=perfil;
  sr.classList.add('show');
}

// ── TOGGLE OPTIONS ────────────────────────────────
function toggleOpt(id){
  var f=document.getElementById(id);
  var isOpen=f.classList.contains('open');
  ['opt1','opt2','opt3'].forEach(function(o){
    document.getElementById(o).classList.remove('open');
    document.getElementById(o).closest('.opt-card').classList.remove('open');
  });
  if(!isOpen){
    f.classList.add('open');
    f.closest('.opt-card').classList.add('open');
  }
}

// ── FORM SUBMIT ───────────────────────────────────
function sendForm(e,id){
  e.preventDefault();
  e.stopPropagation();
  var form=e.target;
  var data={};
  form.querySelectorAll('input,textarea').forEach(function(i){if(i.value)data[i.placeholder]=i.value});
  fetch('https://formspree.io/f/mbdpbnyw',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({opcion:id,...data})});
  form.style.display='none';
  document.getElementById('ok-'+id).style.display='block';
}
