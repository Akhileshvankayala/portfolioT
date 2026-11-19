(function () {
  var files = [
    '24eg105g54-Connecting to a MongoDB Database Using the MongoDB Shell.pdf',
    '24eg105g54-Getting Started with MongoDB Atlas.pdf',
    '24eg105g54-Introduction to Atlas Search.pdf',
    '24eg105g54-Introduction to MongoDB.pdf',
    '24eg105g54-MongoDB Aggregation.pdf',
    '24eg105g54-MongoDB and the Document Model.pdf',
    '24eg105g54-MongoDB CRUD Operations Insert and Find Documents.pdf',
    '24eg105g54-MongoDB CRUD Operations Modifying Query Results.pdf',
    '24eg105g54-MongoDB CRUD Operations Replace and Delete Documents.pdf',
    '24eg105g54-MongoDB Indexes.pdf',
    '24eg105g54-MongoDB Transactions.pdf',
    '24EG105G54-NPTEL-Programming in java.pdf',
    '24eg105g54.pdf',
    'Achievements -24eg105g54_dreamdestination_ Microsoft Learn.pdf',
    'Achievements -learn ai and gen ai basics _ Microsoft Learn.pdf',
    'Basics of DSA-Simplilearn.pdf',
    'cisco-ai analyse.pdf',
    'cisco-into to ai.pdf',
    'Completion Certificate _ SkillsBuild-ibm.pdf',
    'Design a dream destination using Microsoft Copilot _ Microsoft Learn.pdf',
    'explore gen ai _ Microsoft Learn.pdf',
    'gdsc vogue ai participation certificate.png',
    'infosys excel 2016 course.pdf',
    'NPTEL certificate Data Structures And Algorithms and also programming Using Python.pdf',
    'prompt-design-in-vertex-ai-skill-badge.png',
    'Python_Essentials_1_certificate_24eg105g54-anurag-edu-in_c5170ec8-cca8-41b3-b57a-47758b005df9 (1).pdf',
    'Python_Essentials_2_certificate_24eg105g54-anurag-edu-in_c89b6b09-61b5-4a62-80b9-a1f954b390d8.pdf',
    'Simpli learn c certificate.pdf',
    'software engineering-simpli learn.pdf',
    'Wadhwani Foundation Certificate - Problem Solving & Innovation.pdf',
    'Wadhwani Foundation Certificate - Self-Presentation.pdf',
    'cloud certificate by IBM/IBM CC0101EN Certificate _ Cognitive Class.pdf',
    'iee/iee membership card.pdf',
    'iee/iee membership certificate.pdf',
    'L4G Badges/Attention Mechanism.png',
    'L4G Badges/Create Image Captioning Models.png',
    'L4G Badges/Develop Gen AI Apps with Gemini and Streamlit.png',
    'L4G Badges/Encoder-Decoder Architecture.png',
    'L4G Badges/Gemini for Application Developers.png',
    'L4G Badges/Gemini for Cloud Architects.png',
    'L4G Badges/Gemini for Data Scientists and Analysts.png',
    'L4G Badges/Gemini for DevOps Engineers.png',
    'L4G Badges/Gemini for end-to-end SDLC.png',
    'L4G Badges/Gemini for Network Engineers.png',
    'L4G Badges/Gemini for Security Engineers.png',
    'L4G Badges/Inspect Rich Documents with Gemini Multimodality and Multimodal RAG.png',
    'L4G Badges/Introduction to Generative AI.png',
    'L4G Badges/Introduction to Image Generation.png',
    'L4G Badges/Introduction to Large Language Models.png',
    'L4G Badges/Introduction to Responsible AI.png',
    'L4G Badges/Introduction to Vertex AI Studio.png',
    'L4G Badges/L4G all badges-pdf.pdf',
    'L4G Badges/Machine Learning Operations (MLOps) for Generative AI.png',
    'L4G Badges/Prompt Design in Vertex AI.png',
    'L4G Badges/Responsible AI for Developers- Fairness & Bias.png',
    'L4G Badges/Responsible AI for Developers- Interpretability & Transparency.png',
    'L4G Badges/Responsible AI for Developers- Privacy & Safety.png',
    'L4G Badges/Responsible AI-Applying AI Principles with Google Cloud.png',
    'L4G Badges/Transformer Models and BERT Model.png',
    'L4G Badges/Vector Search and Embeddings.png'
  ];

  var grid = document.getElementById('certGrid');
  var search = document.getElementById('certSearch');
  var count = document.getElementById('certCount');
  var empty = document.getElementById('certEmpty');
  if (!grid || !search || !count || !empty) return;

  if (window.pdfjsLib) {
    window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
  }

  function titleFor(file) {
    var title = file.split('/').pop().replace(/\.[^.]+$/, '');
    title = title.replace(/^24eg105g54-/i, '');
    title = title.replace(/^Python_Essentials_(\d+)_certificate_24eg105g54.*$/i, 'Python Essentials $1');
    title = title.replace(/_/g, ' ').replace(/\s+/g, ' ').trim();
    return title;
  }

  function issuerFor(file) {
    var name = file.toLowerCase();
    if (file.indexOf('L4G Badges/') === 0 || name.indexOf('vertex-ai') !== -1) return 'Google Cloud';
    if (file.indexOf('cloud certificate by IBM/') === 0 || name.indexOf('skillsbuild-ibm') !== -1) return 'IBM';
    if (file.indexOf('iee/') === 0) return 'IEEE';
    if (name.indexOf('microsoft learn') !== -1 || name.indexOf('copilot') !== -1) return 'Microsoft Learn';
    if (name.indexOf('nptel') !== -1) return 'NPTEL';
    if (name.indexOf('cisco') !== -1 || name.indexOf('python_essentials') !== -1) return 'Cisco';
    if (/mongodb|24eg105g54-/i.test(file)) return 'MongoDB';
    if (name.indexOf('simplilearn') !== -1 || name.indexOf('simpli learn') !== -1) return 'Simplilearn';
    if (name.indexOf('wadhwani') !== -1) return 'Wadhwani Foundation';
    if (name.indexOf('gdsc') !== -1) return 'Google Developer Student Clubs';
    if (name.indexOf('infosys') !== -1) return 'Infosys';
    return 'Certificate';
  }

  var pdfObserver = 'IntersectionObserver' in window ? new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      pdfObserver.unobserve(entry.target);
      renderPdfPreview(entry.target);
    });
  }, { rootMargin: '600px 0px' }) : null;

  function renderPdfPreview(art) {
    if (art.dataset.preview !== 'pending') return;
    art.dataset.preview = 'loading';
    if (!window.pdfjsLib) {
      art.dataset.preview = 'unavailable';
      art.querySelector('.cert-file-icon').textContent = 'OPEN PDF';
      art.classList.add('cert-preview-fallback');
      return;
    }

    var canvas = document.createElement('canvas');
    canvas.className = 'cert-preview-canvas';
    canvas.setAttribute('aria-hidden', 'true');
    art.appendChild(canvas);
    var icon = art.querySelector('.cert-file-icon');

    window.pdfjsLib.getDocument({ url: art.dataset.file }).promise
      .then(function (pdf) { return pdf.getPage(1); })
      .then(function (page) {
        var baseViewport = page.getViewport({ scale: 1 });
        var scale = Math.min(art.clientWidth / baseViewport.width, art.clientHeight / baseViewport.height);
        var pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
        var viewport = page.getViewport({ scale: scale * pixelRatio });
        canvas.width = Math.ceil(viewport.width);
        canvas.height = Math.ceil(viewport.height);
        canvas.style.width = Math.ceil(viewport.width / pixelRatio) + 'px';
        canvas.style.height = Math.ceil(viewport.height / pixelRatio) + 'px';
        return page.render({ canvas: canvas, canvasContext: canvas.getContext('2d'), viewport: viewport }).promise;
      })
      .then(function () {
        art.dataset.preview = 'ready';
        icon.hidden = true;
      })
      .catch(function () {
        art.dataset.preview = 'unavailable';
        canvas.remove();
        icon.textContent = 'OPEN PDF';
        art.classList.add('cert-preview-fallback');
      });
  }

  var cards = files.map(function (file) {
    var title = titleFor(file);
    var isImage = /\.png$/i.test(file);
    var href = './Certificates/' + file.split('/').map(encodeURIComponent).join('/');
    var card = document.createElement('a');
    card.className = 'cert-card reveal';
    card.href = href;
    card.target = '_blank';
    card.rel = 'noopener';
    card.setAttribute('aria-label', 'Open certificate: ' + title + ' in a new tab');

    var art = document.createElement('span');
    art.className = 'cert-art';
    if (isImage) {
      var image = document.createElement('img');
      image.src = href;
      image.alt = '';
      image.loading = 'lazy';
      art.appendChild(image);
    } else {
      var icon = document.createElement('span');
      icon.className = 'cert-file-icon';
      icon.textContent = 'PDF';
      art.appendChild(icon);
      art.dataset.file = href;
      art.dataset.preview = 'pending';
      if (pdfObserver) pdfObserver.observe(art);
      else renderPdfPreview(art);
    }

    var copy = document.createElement('span');
    copy.className = 'cert-card-copy';
    var heading = document.createElement('strong');
    heading.className = 'cert-card-title';
    heading.textContent = title;
    var issuer = document.createElement('span');
    issuer.className = 'cert-card-issuer';
    issuer.textContent = issuerFor(file);
    var action = document.createElement('span');
    action.className = 'cert-card-action';
    action.textContent = isImage ? 'View badge ↗' : 'View certificate ↗';
    copy.appendChild(heading);
    copy.appendChild(issuer);
    copy.appendChild(action);
    card.appendChild(art);
    card.appendChild(copy);
    card.dataset.search = (title + ' ' + issuer.textContent + ' ' + file).toLowerCase().replace(/[_-]+/g, ' ');
    return card;
  });

  function updateResults() {
    var terms = search.value.trim().toLowerCase().replace(/[_-]+/g, ' ').split(/\s+/).filter(Boolean);
    var visible = 0;
    cards.forEach(function (card) {
      var matches = terms.every(function (term) { return card.dataset.search.indexOf(term) !== -1; });
      card.hidden = !matches;
      if (matches) visible++;
    });
    count.textContent = 'Showing ' + visible + ' of ' + cards.length + ' certificates';
    empty.hidden = visible !== 0;
  }

  cards.forEach(function (card) { grid.appendChild(card); });
  search.addEventListener('input', updateResults);
  updateResults();
})();
