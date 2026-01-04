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

    // ✅ samain tinggi title per-row setelah DOM kebentuk
    requestAnimationFrame(equalizeTitleHeights);
  }

  // ✅ NEW: samain tinggi title per baris (row)
  function equalizeTitleHeights() {
    const cards = [...grid.querySelectorAll(".product-card")];
    if (!cards.length) return;

    // reset dulu biar ngukur ulang bener
    cards.forEach((card) => {
      const t = card.querySelector(".product-title");
      if (t) t.style.height = "auto";
    });

    // group per baris pakai offsetTop
    const rows = new Map();

    cards.forEach((card) => {
      const top = card.offsetTop;
      if (!rows.has(top)) rows.set(top, []);
      rows.get(top).push(card);
    });

    // tiap row -> ambil max tinggi title -> set sama semua di row itu
    rows.forEach((rowCards) => {
      let maxH = 0;

      rowCards.forEach((card) => {
        const t = card.querySelector(".product-title");
        if (t) maxH = Math.max(maxH, t.offsetHeight);
      });

      rowCards.forEach((card) => {
        const t = card.querySelector(".product-title");
        if (t) t.style.height = `${maxH}px`;
      });
    });
  }

  // initial render
  render(products);

  // ✅ NEW: biar pas resize (2 kolom -> 1 kolom) tetap rapi
  window.addEventListener("resize", () => {
    requestAnimationFrame(equalizeTitleHeights);
  });

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
