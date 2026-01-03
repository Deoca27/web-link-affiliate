document.addEventListener("DOMContentLoaded", () => {
  // ====== NAV (index page) ======
  const btn1 = document.getElementById("btnPage1");
  const btn2 = document.getElementById("btnPage2");

  if (btn1) btn1.addEventListener("click", () => {
    window.location.href = "pages/page1.html";
  });

  if (btn2) btn2.addEventListener("click", () => {
    window.location.href = "pages/page2.html";
  });

  // ====== PRODUCT PAGE ======
  const grid = document.getElementById("productGrid");
  if (!grid) return;

  const searchInput = document.getElementById("productSearch");

  // data dari products.js
  const products = Array.isArray(window.PRODUCTS) ? window.PRODUCTS : [];

  function ProductCard(product) {
    const card = document.createElement("article");
    card.className = "product-card";

    const thumb = document.createElement("div");
    thumb.className = "product-thumb";

    const img = document.createElement("img");
    img.src = product.img || "shopee.png";
    img.alt = product.title || "Produk";

    thumb.appendChild(img);

    const body = document.createElement("div");
    body.className = "product-body";

    const title = document.createElement("h3");
    title.className = "product-title";
    title.textContent = product.title || "Tanpa Nama";

    const price = document.createElement("p");
    price.className = "product-price";
    price.textContent = product.price || "-";

    const actions = document.createElement("div");
    actions.className = "product-actions";

    const btnBuy = document.createElement("a");
    btnBuy.className = "pbtn pbtn-primary";
    btnBuy.href = product.link || "#";
    btnBuy.target = "_blank";
    btnBuy.rel = "noopener";
    btnBuy.textContent = "Beli";

    actions.appendChild(btnBuy);

    body.appendChild(title);
    body.appendChild(price);
    body.appendChild(actions);

    card.appendChild(thumb);
    card.appendChild(body);

    return card;
  }

  function render(list) {
    grid.innerHTML = "";
    if (!list.length) {
      const empty = document.createElement("div");
      empty.className = "empty";
      empty.textContent = "Produk tidak ditemukan.";
      grid.appendChild(empty);
      return;
    }
    list.forEach((p) => grid.appendChild(ProductCard(p)));
  }

  // initial render
  render(products);

  // search filter
  if (searchInput) {
    searchInput.addEventListener("input", () => {
      const q = searchInput.value.trim().toLowerCase();
      const filtered = products.filter((p) =>
        (p.title || "").toLowerCase().includes(q)
      );
      render(filtered);
    });
  }
});
