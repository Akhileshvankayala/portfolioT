/* No 3D model — Crency-style clean look with scroll parallax + subtle 3D tilt. */
(function () {
  // no loading screen — hero animates straight in (see .ltext CSS)

// cursor — ink dot + spring ring that inflates into a labeled bubble on hover
  var cursorFine = matchMedia('(pointer:fine)').matches,
      reduced = matchMedia('(prefers-reduced-motion: reduce)').matches,
      cdot = document.querySelector('.cursor-dot'),
      cring = document.querySelector('.cursor-ring'),
      clab = cring.querySelector('span'),
      cmx = innerWidth/2, cmy = innerHeight/2, crx = cmx, cry = cmy, cs = 1;
  function labelFor(el) {
    if (!el || !el.closest) return '';
    if (el.closest('.case')) return 'View';
    if (el.closest('a[href^="mailto"]')) return 'Say hi';
    if (el.closest('a[target="_blank"]')) return 'Open';
    if (el.closest('.orb,.chip,.fchip')) return 'Pick';
    if (el.closest('a,button')) return 'Go';
    return '';
  }
  if (cursorFine && !reduced) {
    addEventListener('mousemove', function (e) {
      cmx = e.clientX; cmy = e.clientY;
      cdot.style.transform = 'translate('+cmx+'px,'+cmy+'px) translate(-50%,-50%)';
    }, { passive: true });
    (function cloop(){
      crx += (cmx-crx)*.2; cry += (cmy-cry)*.2;
      var cv = Math.min(Math.hypot(cmx-crx, cmy-cry)/60, .5);
      cs += ((1+cv)-cs)*.25;
      cring.style.transform = 'translate('+crx+'px,'+cry+'px) translate(-50%,-50%) scale('+cs.toFixed(3)+')';
      requestAnimationFrame(cloop);
    })();
    document.addEventListener('mouseover', function (e) {
      var lab = labelFor(e.target);
      clab.textContent = lab;
      var on = !!lab;
      cring.classList.toggle('big', on);
      cdot.classList.toggle('hidden', on);
    });
    addEventListener('mousedown', function () { cring.classList.add('pressed'); });
    addEventListener('mouseup', function () { cring.classList.remove('pressed'); });
  } else {
    cdot.style.display = 'none'; cring.style.display = 'none';
  }

  // project filters
  var frow = document.getElementById('filterRow');
  if (frow) frow.querySelectorAll('.fchip').forEach(function (btn) {
    btn.addEventListener('click', function () {
      frow.querySelectorAll('.fchip').forEach(function (x) { x.classList.remove('active'); });
      btn.classList.add('active');
      var f = btn.dataset.filter;
      document.querySelectorAll('.case').forEach(function (c) {
        var show = f === 'all' || (c.dataset.tags || '').split(' ').indexOf(f) !== -1;
        c.classList.toggle('hide', !show);
      });
    });
  });

  // CFG 2026 photo carousel
  var cfgCarousel = document.getElementById('cfgCarousel');
  if (cfgCarousel) {
    var cfgSlides = Array.prototype.slice.call(cfgCarousel.querySelectorAll('.cfg-slide')),
        cfgDots = Array.prototype.slice.call(cfgCarousel.querySelectorAll('[data-cfg-dot]')),
        cfgCount = document.getElementById('cfgCount'),
        cfgToggle = cfgCarousel.querySelector('[data-cfg-toggle]'),
        cfgIndex = 0, cfgAuto = !reduced, cfgTimer = null;

    function showCfgSlide(index) {
      cfgIndex = (index + cfgSlides.length) % cfgSlides.length;
      cfgSlides.forEach(function (slide, i) {
        var active = i === cfgIndex;
        slide.classList.toggle('is-active', active);
        slide.setAttribute('aria-hidden', active ? 'false' : 'true');
      });
      cfgDots.forEach(function (dot, i) {
        var active = i === cfgIndex;
        dot.classList.toggle('active', active);
        dot.setAttribute('aria-pressed', active ? 'true' : 'false');
      });
      cfgCount.textContent = String(cfgIndex + 1).padStart(2, '0') + ' / ' + String(cfgSlides.length).padStart(2, '0');
    }

    function scheduleCfgSlide() {
      if (cfgTimer) clearInterval(cfgTimer);
      cfgTimer = null;
      if (cfgAuto && !document.hidden && cfgSlides.length > 1) {
        cfgTimer = setInterval(function () { showCfgSlide(cfgIndex + 1); }, 5200);
      }
    }

    cfgCarousel.querySelector('[data-cfg-prev]').addEventListener('click', function () {
      showCfgSlide(cfgIndex - 1);
      scheduleCfgSlide();
    });
    cfgCarousel.querySelector('[data-cfg-next]').addEventListener('click', function () {
      showCfgSlide(cfgIndex + 1);
      scheduleCfgSlide();
    });
    cfgDots.forEach(function (dot) {
      dot.addEventListener('click', function () {
        showCfgSlide(Number(dot.dataset.cfgDot));
        scheduleCfgSlide();
      });
    });
    cfgToggle.addEventListener('click', function () {
      cfgAuto = !cfgAuto;
      cfgToggle.textContent = cfgAuto ? 'Ⅱ' : '▶';
      cfgToggle.setAttribute('aria-label', cfgAuto ? 'Pause carousel' : 'Play carousel');
      cfgToggle.title = cfgAuto ? 'Pause carousel' : 'Play carousel';
      scheduleCfgSlide();
    });
    document.addEventListener('visibilitychange', scheduleCfgSlide);
    showCfgSlide(0);
    scheduleCfgSlide();
  }

  // nav state + scroll progress + active section link
  var navEl = document.querySelector('.nav'),
      progEl = document.querySelector('.progress');
  function onScrollUI() {
    var y = window.scrollY || 0;
    navEl.classList.toggle('scrolled', y > 24);
    var h = document.documentElement.scrollHeight - innerHeight;
    progEl.style.transform = 'scaleX(' + (h > 0 ? y / h : 0) + ')';
  }
  addEventListener('scroll', onScrollUI, { passive: true }); onScrollUI();
  var secIO = new IntersectionObserver(function (es) {
    es.forEach(function (e) {
      if (!e.isIntersecting) return;
      var id = '#' + e.target.id;
      document.querySelectorAll('.links a').forEach(function (a) {
        a.classList.toggle('active', a.getAttribute('href') === id);
      });
    });
  }, { rootMargin: '-40% 0px -55% 0px' });
  ['about', 'skills', 'work', 'cfg'].forEach(function (id) {
    var s = document.getElementById(id); if (s) secIO.observe(s);
  });

  // reveals + counters
  var io = new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: .12 });
  document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });

  var cio = new IntersectionObserver(function (es) {
    es.forEach(function (e) {
      if (!e.isIntersecting) return; cio.unobserve(e.target);
      var end = +e.target.dataset.count, t0 = performance.now();
      (function c(t){ var k = Math.min((t-t0)/1300, 1);
        e.target.textContent = Math.floor(end * (1-Math.pow(1-k,3)));
        if (k<1) requestAnimationFrame(c); })(t0);
    });
  }, { threshold: .5 });
  document.querySelectorAll('[data-count]').forEach(function (el) { cio.observe(el); });

  // subtle 3D tilt (desktop)
  if (matchMedia('(pointer:fine)').matches && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('.tilt,.case').forEach(function (card) {
      var queued = false;
      card.addEventListener('mousemove', function (e) {
        if (queued) return; queued = true;
        requestAnimationFrame(function () {
          queued = false;
          var r = card.getBoundingClientRect(),
              x = (e.clientX - r.left)/r.width - .5, y = (e.clientY - r.top)/r.height - .5;
          card.style.transform = 'perspective(1000px) rotateY('+(x*6)+'deg) rotateX('+(-y*6)+'deg) translateY(-3px)';
        });
      }, { passive: true });
      card.addEventListener('mouseleave', function () { card.style.transform = ''; });
    });
    document.querySelectorAll('.magnetic').forEach(function (b) {
      b.addEventListener('mousemove', function (e) { var r = b.getBoundingClientRect();
        b.style.transform = 'translate('+((e.clientX-r.left-r.width/2)*.15)+'px,'+((e.clientY-r.top-r.height/2)*.25)+'px)'; });
      b.addEventListener('mouseleave', function () { b.style.transform = ''; });
    });
  }

  // vibe + need pickers
  var vibes = {
    dsa: 'Now: <b>DSA daily</b> — patterns, custom data-structure builds, routing algorithms — while shipping full-stack features.',
    mern: 'Now: <b>full-stack MERN</b> — realtime features, auth, dashboards and report pipelines, deployed on Vercel.',
    systems: 'Next: <b>system design basics</b> — schema design, API contracts, and thinking in scale.'
  };
  document.querySelectorAll('.orb').forEach(function (o) {
    o.addEventListener('click', function () {
      document.querySelectorAll('.orb').forEach(function (x) { x.classList.remove('active'); });
      o.classList.add('active');
      document.getElementById('vibeLine').innerHTML = vibes[o.dataset.vibe];
    });
  });
  var GMAIL_TO = 'akhileshvankayala158@gmail.com';
  function gmailLink(role) {
    var su = role + ' - opportunity (edit as needed)';
    var NL = String.fromCharCode(10);
    var body = 'Hi Akhilesh,' + NL + NL + 'I came across your portfolio and I would like to connect with you.' + NL + NL + '[Write your message here]' + NL + NL + 'Best regards,';
    return 'https://mail.google.com/mail/?view=cm&fs=1&to=' + encodeURIComponent(GMAIL_TO) + '&su=' + encodeURIComponent(su) + '&body=' + encodeURIComponent(body);
  }
  var mailBtn = document.getElementById('mailBtn');
  document.querySelectorAll('#needChips .chip').forEach(function (c) {
    c.addEventListener('click', function () {
      document.querySelectorAll('#needChips .chip').forEach(function (x) { x.classList.remove('active'); });
      c.classList.add('active');
      mailBtn.href = gmailLink(c.textContent.trim());
    });
  });
  document.querySelectorAll('.picker').forEach(function (pk) {
    if (pk.querySelector('#needChips')) return;
    pk.querySelectorAll('.chip').forEach(function (c) {
      c.addEventListener('click', function () {
        pk.querySelectorAll('.chip').forEach(function (x) { x.classList.remove('active'); });
        c.classList.add('active');
      });
    });
  });

  // scroll parallax (GSAP if present, fallback to rAF)
  function fallbackParallax() {
    var els = document.querySelectorAll('[data-speed],[data-parallax]');
    (function f() {
      var y = scrollY;
      els.forEach(function (el) {
        var r = el.getBoundingClientRect(), center = r.top + r.height/2 - innerHeight/2;
        if (el.hasAttribute('data-speed')) el.style.transform = 'translateY('+(-center * parseFloat(el.dataset.speed) * .35)+'px)';
        else el.firstElementChild && (el.firstElementChild.style.transform = 'translateY('+(center*.08)+'px) scale(1.15)');
      });
      requestAnimationFrame(f);
    })();
  }
  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
    document.querySelectorAll('[data-speed]').forEach(function (el) {
      gsap.to(el, { y: function(){ return -80 * parseFloat(el.dataset.speed) * 3; }, ease: 'none',
        scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1 } });
    });
    gsap.utils.toArray('.case').forEach(function (c, i) {
      gsap.from(c, { y: 50, rotateX: 4, transformOrigin: 'top center', ease: 'none',
        scrollTrigger: { trigger: c, start: 'top 95%', end: 'top 55%', scrub: 1 } });
    });
    gsap.utils.toArray('.thumb').forEach(function (t) {
      gsap.fromTo(t.firstElementChild, { y: -24 }, { y: 24, ease: 'none',
        scrollTrigger: { trigger: t, start: 'top bottom', end: 'bottom top', scrub: 1 } });
    });
    /* marquee runs on pure CSS so it never fights the scroll thread */
  } else { fallbackParallax(); }
})();

/* hero terminal typing */
(function () {
  var body = document.getElementById('termBody');
  if (!body) return;
  window.__termStarted = true;
  var lines = [
    ['p', '$ ./hire_akhilesh.sh'],
    ['win', '\u2713 clean code ...... always'],
    ['p', '$ status --now'],
    ['win', '\u2192 open_to_internships \u2588']
  ];
  var i;
  if (window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches) {
    body.innerHTML = lines.map(function (l) { return '<div><span class="' + l[0] + '">' + l[1] + '</span></div>'; }).join('');
    return;
  }
  var li = 0, ci = 0, done = '';
  function type() {
    if (li >= lines.length) { body.innerHTML = done + '<div><span class="caret"></span></div>'; setTimeout(function () { done = ''; li = 0; ci = 0; type(); }, 9000); return; }
    var cls = lines[li][0], txt = lines[li][1];
    if (ci <= txt.length) {
      body.innerHTML = done + '<div><span class="' + cls + '">' + txt.slice(0, ci) + '</span><span class="caret"></span></div>';
      ci++;
      setTimeout(type, txt.charAt(0) === '$' ? 50 : 24);
    } else {
      done += '<div><span class="' + cls + '">' + txt + '</span></div>';
      li++; ci = 0;
      setTimeout(type, 280);
    }
  }
  setTimeout(type, 900);
})();

/* page wipe transitions for in-page nav */
(function () {
  var wipe = document.querySelector('.wipe');
  if (!wipe) return;
  var reduced = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  function revealIn(target) {
    target.querySelectorAll('.reveal:not(.in)').forEach(function (el) {
      var r = el.getBoundingClientRect();
      if (r.top < innerHeight * 0.92) el.classList.add('in');
    });
  }
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var id = a.getAttribute('href');
      if (!id || id.length < 2) return;
      var target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      if (reduced) { target.scrollIntoView({ behavior: 'smooth' }); return; }
      var wipeTitles = { top: ['00', 'HELLO'], about: ['01', 'ABOUT'], skills: ['02', 'SKILLS'], work: ['03', 'WORK'], cfg: ['04', 'CFG 2026'], contact: ['05', 'CONTACT'] };
      var wt = wipeTitles[target.id] || ['--', String(target.id).toUpperCase()];
      var wNum = document.getElementById('wipeNum'), wWord = document.getElementById('wipeWord');
      if (wNum) wNum.textContent = wt[0];
      if (wWord) wWord.textContent = wt[1];
      wipe.classList.remove('leave');
      wipe.classList.add('cover');
      setTimeout(function () {
        target.scrollIntoView({ behavior: 'auto', block: 'start' });
        try { history.replaceState(null, '', id); } catch (err) {}
        revealIn(target);
        wipe.classList.add('leave');
        setTimeout(function () { wipe.classList.remove('cover', 'leave'); }, 520);
      }, 520);
    });
  });
})();
