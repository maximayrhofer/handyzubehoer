fetch("/api/products")
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById("product-list");
    container.innerHTML = data
      .map(
        p => `
        <article class="card">
          <img src="${p.image}" class="card-img"/>
          <h3>${p.name}</h3>
          <p>${p.price} €</p>
          <a href="/product/${p.id}" class="btn">Details</a>
        </article>`
      )
      .join("");
  });
