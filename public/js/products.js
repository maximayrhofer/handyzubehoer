// products.js — lädt die Produktliste von /api/products und rendert Karten
fetch('/api/products')
  .then(res => {
    if (!res.ok) throw new Error('Failed to load products');
    return res.json();
  })
  .then(data => {
    const wrap = document.getElementById('product-list');
    if (!wrap) return;
    wrap.innerHTML = data.map(p => `
      <article class="card">
        <img src="${p.images[0]}" alt="${p.name}" class="card-img" />
        <h3>${p.name}</h3>
        <p class="muted">${p.description}</p>
        <p style="font-weight:700;margin:10px 0;">${(p.price||0).toFixed(2)} €</p>
        <a class="btn" href="/product/${p.id}">Details</a>
      </article>
    `).join('');
  })
  .catch(err => {
    const wrap = document.getElementById('product-list');
    if (wrap) wrap.innerHTML = '<p>Produkte konnten nicht geladen werden.</p>';
    console.error(err);
  });
