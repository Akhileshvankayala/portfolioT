/* Portfolio bot for Akhilesh Vankayala — 100% client-side, works on file:// too.
   Knowledge is curated from the site; anything outside it falls back to contact. */
(function () {
  'use strict';
  var MAIL = 'akhileshvankayala158@gmail.com',
      GH = 'https://github.com/Akhileshvankayala',
      LI = 'https://www.linkedin.com/in/akhilesh-vankayala-5ba7b1343/',
      IG = 'https://www.instagram.com/akhilesh._.158/',
      HIRBEE_LIVE = 'https://smart-placement-tracker-indol.vercel.app/login',
      HIRBEE_GH = 'https://github.com/Akhileshvankayala/smart-placement-tracker',
      SLACK_LIVE = 'https://slack-clone-group-project-1.vercel.app/',
      SLACK_GH = 'https://github.com/Akhileshvankayala/slack-clone-group-project-1',
      ROUTE_GH = 'https://github.com/Akhileshvankayala/garbageDisposal-Route_Optimisation_System',
      CAMPUS_GH = 'https://github.com/Akhileshvankayala/physically-challenged-campus-services',
      RESULT_GH = 'https://github.com/Akhileshvankayala/Result_Extractor-working',
      QUIZ_GH = 'https://github.com/Akhileshvankayala/quiz-for-IP';

  function link(href, text) {
    return '<a href="' + href + '" target="_blank" rel="noopener">' + text + '</a>';
  }

  var KB = [
    { k: ['hello', 'hey', 'namaste', 'greetings', 'good morning', 'good evening', ' hi '],
      a: "Hey! I'm the bot for Akhilesh's portfolio. Ask me about his <b>skills</b>, <b>projects</b>, <b>education</b> — or how to <b>contact</b> him." },
    { k: ['who are you', 'about yourself', 'about him', 'about akhilesh', 'who is akhilesh', 'background', 'introduce', 'yourself'],
      a: "<b>Akhilesh Vankayala</b> — a Computer Science undergrad, MERN developer and DSA problem-solver, with a growing interest in AI/ML, preparing for software engineering roles. His philosophy: discipline, consistency, continuous learning." },
    { k: ['education', 'college', 'university', 'degree', 'study', 'studying', 'btech', 'b tech', 'cgpa', 'school', 'anurag', 'marks', 'intermediate', '10th', '12th'],
      a: "B.Tech CSE at Anurag University (2024–2028, CGPA 9.73/10) · Intermediate 964/1000 (Sri Chaitanya) · Class X CGPA 10/10. Core strengths: DSA, full-stack MERN, and now system design." },
    { k: ['skill', 'tech stack', 'technologies', 'language', 'framework', 'what can you do', 'stack', 'tools', 'fundamental'],
      a: "<b>Frontend:</b> React, TypeScript, Tailwind, Vite/Next.js · <b>Backend:</b> Node, Express, FastAPI, MongoDB, SQL basics · <b>Also:</b> Socket.IO, Supabase, Docker, JWT, Cloudinary — plus DSA daily. Also fluent in C, C++, Java; MySQL, Bootstrap, Git, HTML/CSS." },
    { k: ['project', 'work', 'built', 'portfolio', 'showcase'],
      a: "6 shipped: <b>HirBee</b> placement tracker (live), <b>Slack clone</b> (live), a route-optimisation engine, campus-access services, a result extractor and a quiz engine. Scroll to Projects — or ask me about any by name!" },
    { k: ['hirbee', 'placement', 'tracker', 'tpo', 'recruitment', 'hiring'],
      a: "<b>HirBee — Smart Placement Tracker:</b> recruitment platform for college TPOs — eligibility-based applications, status tracking, auto emails, resume uploads, Excel reports. " + link(HIRBEE_LIVE, 'Live demo ↗') + ' · ' + link(HIRBEE_GH, 'GitHub ↗') },
    { k: ['slack', 'chat', 'real time', 'realtime', 'socket', 'message', 'messaging'],
      a: "<b>Slack Clone:</b> realtime channels + DMs over Socket.IO, JWT auth, Cloudinary media, Zustand state. " + link(SLACK_LIVE, 'Live demo ↗') + ' · ' + link(SLACK_GH, 'GitHub ↗') },
    { k: ['route', 'garbage', 'dijkstra', 'optimisation', 'optimization', 'networkx', 'waste', 'hospital', 'hospital project', 'biomedical', 'sqlite'],
      a: "<b>Route Optimisation System:</b> biomedical waste collection for hospitals — Dijkstra + NetworkX routing, React + TypeScript frontend, FastAPI + SQLAlchemy + SQLite, Docker Compose. " + link(ROUTE_GH, 'GitHub ↗') },
    { k: ['campus', 'accessib', 'disabled', 'challenged', 'supabase', 'gemini'],
      a: "<b>Accessible Campus Services:</b> 100% accuracy on canteen, mobility & service requests — Supabase realtime plus a Gemini-powered support chatbot. " + link(CAMPUS_GH, 'GitHub ↗') },
    { k: ['result', 'extractor', 'pandas', 'pdf', 'excel', 'marks', 'flask', 'selenium', 'scraping'],
      a: "<b>Result Extractor:</b> Flask + Selenium portal scraping, Pandas processing, 98% accuracy over 100+ records, Next.js frontend. " + link(RESULT_GH, 'GitHub ↗') },
    { k: ['quiz'],
      a: "<b>Single Player Quiz:</b> hand-rolled Stack + LinkedList engine, REST sessions, timer & lifelines in vanilla JS. DSA in production. " + link(QUIZ_GH, 'GitHub ↗') },
    { k: ['cfg', 'code for good', 'jpmc', 'jpmorgan', 'hackathon', 'code for food'],
      a: "<b>CFG 2026</b> was JPMC Code for Good in Hyderabad. Akhilesh's team worked on The Barabari Collective's design-assignment evaluation challenge, building dashboards and an evaluation pipeline with human judgment in the loop. They submitted with 10 seconds remaining; he describes it as a memorable lesson in teamwork, resilience, and using AI responsibly." },
    { k: ['cfg', 'challenge', 'challenge 1', 'what was the cfg 2026 challenge', 'problem statement', 'problem statements', 'barabari collective', 'human judgment', 'ui ux', 'design assignments', 'product design assignment'],
      a: "At <b>CFG 2026</b>, the team chose Challenge 1 from The Barabari Collective: automate evaluation of UI/UX and product-design assignments while keeping human judgment in the loop. The team shaped the approach through ideation and conversations with the NGO representatives and mentors." },
    { k: ['contribute', 'contribution', 'dashboards', 'model evaluation', 'integration', '10 seconds', 'ten seconds', 'merge conflicts', 'ai coding agent', 'what did he learn', 'takeaway', 'takeaways'],
      a: "Akhilesh mainly built the student and organization dashboards, and also contributed to model evaluation and integration. After an AI coding agent derailed parts of the codebase, the team simplified its approach, recovered, resolved merge conflicts, tested the app, and submitted with <b>10 seconds remaining</b>. His biggest takeaways were understanding the problem, adapting, communicating, using AI responsibly, and staying calm." },
    { k: ['mentor', 'mentors', 'rashmi', 'khushi', 'santhosh', 'ravi kant', 'snehitha', 'charitha', 'teammates', 'team members'],
      a: "CFG 2026 mentors included <b>Rashmi K.</b>, <b>Khushi Aggarwal</b>, <b>Ravi Kant Dwivedi</b>, and <b>Santhosh Munnoor</b>. Akhilesh's teammates were <b>Snehitha Reddy V.</b> and <b>Charitha Reddy Kalam</b>." },
    { k: ['experience', 'internship', 'job', 'hire', 'hiring', 'fresher', 'work experience', 'open to work', 'looking for'],
      a: "He's a pre-final undergrad actively looking for <b>SWE / full-stack internships</b> — real shipped code, not just coursework. The contact section below is the fastest route." },
    { k: ['contact', 'email', 'mail', 'reach', 'phone', 'number', 'linkedin', 'github', 'instagram', 'social'],
      a: 'Email him at <a href="mailto:' + MAIL + '">' + MAIL + '</a> — replies in about an hour. Call/text: <b>+91-8125671508</b>. Also on ' + link(LI, 'LinkedIn ↗') + ', ' + link(GH, 'GitHub ↗') + ', ' + link(IG, 'Instagram ↗') + '.' },
    { k: ['resume', 'cv', 'download'],
      a: "Grab it from the About section — the 'Download résumé' button. Or ask him directly over email." },
    { k: ['where', 'location', 'based', 'city', 'hyderabad', 'remote'],
      a: "Based in Hyderabad, India — and happy to work remote." },
    { k: ['dsa', 'algorithm', 'leetcode', 'codechef', 'codeforces', 'problem solving', 'problem-solving', 'coding', 'data structure'],
      a: "DSA is his daily practice — custom data structures, routing algorithms, REST-backed logic. The quiz engine and route optimiser are DSA running in production." },
    { k: ['goal', 'aim', 'future', 'plan', 'ambition', 'dream'],
      a: "Short-term: crack a great SWE internship. Long-term: master DSA, development and system design." },
    { k: ['hobby', 'hobbies', 'free time', 'art', 'artwork', 'interest', 'fun', 'gifts'],
      a: "Beyond code: artwork and handmade gifts for loved ones. Creativity off-screen too." },
    { k: ['certificat', 'certified', 'course', 'courses', 'nptel', 'simplilearn', 'ibm', 'cisco', 'google', 'cloud', 'modern ai'],
      a: "NPTEL Programming in Java, Google Cloud Generative AI for Developers, Cisco Intro to Modern AI, Simplilearn Software Development — plus NPTEL DSA, IBM SkillsBuild, GDSC Vogue AI, Infosys Excel, Wadhwani programs." },
    { k: ['salesforce', 'club', 'summit', 'coordinator', 'coordinated', 'leadership', 'volunteer'],
      a: 'Technical Member of the <b>Salesforce Club</b> at Anurag University — co-ordinated <b>The Great Asia AI Summit 2026</b>: welcoming attendees, handling queries, keeping event ops smooth.' },
    { k: ['thank', 'thanks', 'great', 'awesome', 'nice', 'cool'],
      a: "Anytime! And don't forget to say hi to Akhilesh himself — he replies fast." },
    { k: ['bye', 'see you', 'goodbye', 'later'],
      a: "Bye! The contact section is one scroll away whenever you need him." },
    { k: ['help', 'what can you', 'options', 'menu'],
      a: "I can answer: <b>who</b> he is, <b>education</b>, <b>skills</b>, each <b>project</b>, <b>experience</b>, <b>certifications</b>, <b>hobbies</b>, <b>location</b> — or how to <b>contact</b> him. Try a chip below!" }
  ];
  var FALLBACK = "Hmm, I only know Akhilesh's portfolio stuff — try asking about his <b>projects</b>, <b>skills</b> or <b>contact</b>. Or email him directly at <a href=\"mailto:" + MAIL + "\">" + MAIL + "</a> — he replies fast.";
  var CHIPS = ['His projects?', 'Skills?', 'HirBee?', 'Experience?', 'Contact him?'];

  function norm(s) {
    return ' ' + String(s || '').toLowerCase().replace(/[^a-z0-9+\s]/g, ' ').replace(/\s+/g, ' ') + ' ';
  }
  function kwHit(n, words, raw) {
    var k = String(raw || '').trim().toLowerCase();
    if (!k) return false;
    if (n.indexOf(' ' + k + ' ') !== -1) return true;
    if (k.indexOf(' ') !== -1) return false;
    if (k.length < 5) return false;
    for (var i = 0; i < words.length; i++) {
      var w = words[i];
      if (w && w.length >= 5 && (w.indexOf(k) === 0 || k.indexOf(w) === 0)) return true;
    }
    return false;
  }
  function match(q) {
    var n = norm(q), words = n.split(' '), best = null, bs = 0, i, j, s;
    for (i = 0; i < KB.length; i++) {
      s = 0;
      for (j = 0; j < KB[i].k.length; j++) {
        if (kwHit(n, words, KB[i].k[j])) s += KB[i].k[j].length > 4 ? 2 : 1;
      }
      if (s > bs) { bs = s; best = KB[i]; }
    }
    return { best: best, score: bs };
  }

  var fab = document.getElementById('botFab'),
      panel = document.getElementById('botPanel'),
      msgs = document.getElementById('botMsgs'),
      form = document.getElementById('botForm'),
      input = document.getElementById('botInput'),
      chipsBox = document.getElementById('botChips'),
      closeBtn = document.getElementById('botClose'),
      opened = false, greeted = false;

  function scrollDown() { msgs.scrollTop = msgs.scrollHeight; }
  function bubble(html, who) {
    var d = document.createElement('div');
    d.className = 'bot-msg ' + who;
    d.innerHTML = html;
    msgs.appendChild(d);
    scrollDown();
    return d;
  }
  function reply(q) {
    var typing = bubble('<span class="tdot"></span><span class="tdot"></span><span class="tdot"></span>', 'bot typing');
    var m = match(q);
    if (m.score > 0) {
      var wait = Math.min(400 + q.length * 8, 1100);
      setTimeout(function () {
        try { typing.outerHTML = ''; } catch (e) {}
        bubble(m.best.a, 'bot');
      }, wait);
    } else {
      var wait = Math.min(400 + q.length * 8, 1100);
      setTimeout(function () {
        try { typing.outerHTML = ''; } catch (e) {}
        bubble(smartFallback(q), 'bot');
      }, wait);
    }
  }
  var PERSONAL = ['age', 'old', 'birthday', 'born', 'salary', 'pay', 'married', 'girlfriend', 'boyfriend', 'family', 'parents', 'religion', 'caste', 'height'];
  function smartFallback(q) {
    var n = norm(q), i;
    for (i = 0; i < PERSONAL.length; i++) {
      if (n.indexOf(' ' + PERSONAL[i] + ' ') !== -1) return 'That is personal stuff Akhilesh did not put on his site — best to ask him directly at ' + link('mailto:' + MAIL, MAIL) + '.';
    }
    var letters = n.replace(/[^a-z]/g, '');
    if (letters.length < 3) return 'Could you say that another way? I can answer about his <b>skills</b>, <b>projects</b>, <b>education</b> and <b>contact</b>.';
    return 'I can answer portfolio questions about <b>CFG 2026</b>, Akhilesh\'s <b>projects</b>, <b>skills</b>, <b>education</b> and <b>contact</b>. For anything else, email him at ' + link('mailto:' + MAIL, MAIL) + '.';
  }
  function ask(q) {
    q = String(q || '').trim();
    if (!q) return;
    bubble(q.replace(/</g, '&lt;'), 'user');
    reply(q);
  }
  function setOpen(on) {
    opened = on;
    panel.classList.toggle('open', on);
    panel.setAttribute('aria-hidden', on ? 'false' : 'true');
    fab.setAttribute('aria-expanded', on ? 'true' : 'false');
    if (on && !greeted) {
      greeted = true;
      setTimeout(function () {
        bubble("Hey, I'm <b>Akhilesh's bot</b> — I know everything on this site. What do you want to know?", 'bot');
      }, 350);
    }
    if (on) setTimeout(function () { input.focus({ preventScroll: true }); }, 320);
  }

  CHIPS.forEach(function (c) {
    var b = document.createElement('button');
    b.type = 'button';
    b.className = 'bot-chip';
    b.textContent = c;
    b.addEventListener('click', function () { ask(c); });
    chipsBox.appendChild(b);
  });

  fab.addEventListener('click', function () { setOpen(!opened); });
  closeBtn.addEventListener('click', function () { setOpen(false); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && opened) setOpen(false);
  });
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    ask(input.value);
    input.value = '';
  });
})();

/* terminal fallback: runs the hero typing if main.js died before it */
if (!window.__termStarted) (function () {
  var body = document.getElementById('termBody');
  if (!body) return;
  window.__termStarted = true;
  var lines = [
    ['p', '$ ./hire_akhilesh.sh'],
    ['win', '\u2713 clean code ...... always'],
    ['p', '$ status --now'],
    ['win', '\u2192 open_to_internships \u2588']
  ];
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
