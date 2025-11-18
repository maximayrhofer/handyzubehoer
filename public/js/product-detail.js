const id = window.location.pathname.split("/").pop();
fetch("/api/product/" + id)
  .then(res => res.json())
  .then(p => {
    document.getElementById("product-detail").innerHTML = `
      <div class="product-detail">
        <img src="${p.image}" />
        <h1>${p.name}</h1>
        <p>${p.description}</p>
        <p><strong>Preis:</strong> ${p.price} €</p>
        <p><strong>Details:</strong> ${p.details}</p>
        <a href="/cart" class="btn primary">In den Warenkorb</a>
      </div>`;
  });
