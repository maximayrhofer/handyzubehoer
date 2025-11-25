// product-detail.js — lädt /api/product/:id und baut die Detailansicht (im Stil der Index)
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
    wrap.innerHTML = `
      <div style="grid-column:1/2">
        <img src="${p.image}" alt="${p.name}" style="width:100%;border-radius:16px;box-shadow:0 12px 30px rgba(120,160,200,0.08)" />
      </div>
      <div class="product-info" style="grid-column:2/2">
        <h1>${p.name}</h1>
        <p class="muted">${p.description}</p>
        <p style="font-size:20px;font-weight:800;margin:12px 0;">${(p.price||0).toFixed(2)} €</p>
        <p><strong>Details:</strong> ${p.details || '-'}</p>
        <div style="margin-top:18px;">
          <a class="btn primary" href="/cart" style="text-decoration:none;">In den Warenkorb</a>
          <a class="btn" href="/products" style="margin-left:12px;text-decoration:none;">Zurück zur Liste</a>
        </div>
      </div>
    `;
  })
  .catch(err => {
    const wrap = document.getElementById('product-detail');
    if (wrap) wrap.innerHTML = '<p>Produkt konnte nicht geladen werden.</p>';
    console.error(err);
  });
