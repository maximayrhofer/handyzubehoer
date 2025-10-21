document.addEventListener("DOMContentLoaded", () => {
  fetch("/api/products")
    .then((res) => res.json())
    .then((products) => {
      const list = document.getElementById("product-list");
      products.forEach((product) => {
        const div = document.createElement("div");
        div.className = "product";
        div.innerHTML = `
          <img src="${product.image}" alt="${product.name}" width="200" />
          <h3>${product.name}</h3>
          <p>${product.price} €</p>
        `;
        list.appendChild(div);
      });
    });
});
