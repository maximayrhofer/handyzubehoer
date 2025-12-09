// product-detail.js — lädt /api/product/:id und baut die Detailansicht (im Stil der Index)
// Einfaches Produkt-Detail-Skript — nutzt p.images (Array) und baut Thumbnails
const id = location.pathname.split('/').pop();
fetch('/api/product/' + id)
  .then(r => {
    if (!r.ok) throw new Error('Produkt nicht gefunden');
    return r.json();
  })
  .then(p => {
    const wrap = document.getElementById('product-detail');
    if (!wrap) return;
    document.getElementById('breadcrumb-name').textContent = p.name || 'Produkt';

    // prepare images array
    const imgs = Array.isArray(p.images) && p.images.length ? p.images.slice() : (p.image ? [p.image] : []);
    const normalize = s => (s && s.startsWith('/') ? s : '/' + (s || ''));

    // build markup: main image + thumbs
    const first = imgs.length ? normalize(imgs[0]) : '/assets/placeholder.png';
    wrap.innerHTML = `
      <div class="pd-left">
        <div class="pd-main-wrap">
          <img id="pd-main-img" class="pd-main-img" src="${first}" alt="${p.name || 'Produktbild'}" />
        </div>
        <div id="pd-thumbs" class="pd-thumbs"></div>
      </div>
      <div class="product-info pd-right">
        <h1 class="pd-title">${p.name}</h1>
        <p class="muted">${p.description || ''}</p>
        <p class="pd-price">${(p.price||0).toFixed(2)} €</p>
        <p class="pd-details"><strong>Details:</strong> ${p.details || '-'}</p>
        <div class="pd-actions">
          <a class="btn primary" href="/cart">In den Warenkorb</a>
          <a class="btn" href="/products">Zurück zur Liste</a>
        </div>
      </div>
    `;

    const mainImg = document.getElementById('pd-main-img');
    const thumbs = document.getElementById('pd-thumbs');

    // safe onerror: show placeholder if image fails
    mainImg.onerror = () => {
      console.error('Hauptbild konnte nicht geladen werden:', mainImg.src);
      if (!mainImg.src.endsWith('/assets/placeholder.png')) mainImg.src = '/assets/placeholder.png';
      mainImg.alt = 'Bild konnte nicht geladen werden';
    };

    // build thumbnails (if any)
    thumbs.innerHTML = '';
    if (imgs.length === 0) {
      thumbs.style.display = 'none';
      return;
    }

    imgs.forEach((raw, i) => {
      const src = normalize(raw);
      const t = document.createElement('img');
      t.src = src;
      t.alt = `${p.name || 'Bild'} ${i+1}`;
      t.style.width = '72px';
      t.style.height = '72px';
      t.style.objectFit = 'cover';
      t.style.borderRadius = '8px';
      t.style.cursor = 'pointer';
      t.style.boxShadow = '0 4px 10px rgba(0,0,0,0.06)';
      t.style.opacity = '0.95';
      t.dataset.index = i;
      t.addEventListener('click', () => {
        // preload then swap to avoid flicker/404 issues
        const pre = new Image();
        pre.onload = () => { mainImg.src = src; mainImg.alt = p.name || 'Produktbild'; };
        pre.onerror = () => {
          console.error('Bild konnte nicht geladen werden:', src);
          mainImg.src = '/assets/placeholder.png';
          mainImg.alt = 'Bild konnte nicht geladen werden';
        };
        pre.src = src;
      });
      t.onerror = () => { t.style.display = 'none'; };
      thumbs.appendChild(t);
    });
  })
  .catch(err => {
    const wrap = document.getElementById('product-detail');
    if (wrap) wrap.innerHTML = '<p>Produkt konnte nicht geladen werden.</p>';
    console.error(err);
  });
