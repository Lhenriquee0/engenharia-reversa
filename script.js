const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

// BANNERS DO CARROSSEL
const slides = [
  {
    title: "BRIGHT LIGHTS PACK",
    eyebrow: "NOVAS CORES. NOVA ENERGIA.",
    description: "Velocidade, precisão e controle.",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=2200&q=90"
  },
  {
    title: "MOVE TO ZERO",
    eyebrow: "UM FUTURO MELHOR",
    description: "Inovação para você e para o planeta.",
    image:
      "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=2200&q=90"
  },
  {
    title: "JUST DO IT",
    eyebrow: "SUPERE SEUS LIMITES",
    description: "Seu próximo desafio começa agora.",
    image:
      "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&w=2200&q=90"
  }
];

const promotions = [
  'Tênis de corrida <span>Encontre o seu tênis ideal.</span> <a href="#colecoes">Saiba Mais</a>',
  'Novos lançamentos <span>Descubra as novidades.</span> <a href="#colecoes">Ver mais</a>',
  'Estilo esportivo <span>Encontre seu próximo favorito.</span> <a href="#colecoes">Explorar</a>'
];

let currentSlide = 0;
let currentPromotion = 0;
let bagItems = 0;
let autoplay = true;
let autoplayTimer;
let toastTimer;

const hero = $("#hero");
const toast = $("#toast");

// MOSTRAR MENSAGEM
function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2600);
}

// TROCAR BANNER
function showSlide(index) {
  currentSlide = (index + slides.length) % slides.length;
  const slide = slides[currentSlide];

  hero.style.backgroundImage =
    `linear-gradient(90deg, rgba(6,15,26,.35), rgba(6,15,26,.12)), url("${slide.image}")`;

  $("#heroTitle").textContent = slide.title;
  $("#heroEyebrow").textContent = slide.eyebrow;
  $("#heroDescription").textContent = slide.description;

  $$(".dot").forEach((dot, i) => {
    dot.classList.toggle("active", i === currentSlide);
    dot.setAttribute("aria-pressed", String(i === currentSlide));
  });
}

$("#heroPrev").addEventListener("click", () => {
  showSlide(currentSlide - 1);
});

$("#heroPrevBottom").addEventListener("click", () => {
  showSlide(currentSlide - 1);
});

$("#heroNext").addEventListener("click", () => {
  showSlide(currentSlide + 1);
});

$$(".dot").forEach((dot) => {
  dot.addEventListener("click", () => {
    showSlide(Number(dot.dataset.slide));
  });
});

// AVANÇO AUTOMÁTICO
function startAutoplay() {
  clearInterval(autoplayTimer);

  if (autoplay) {
    autoplayTimer = setInterval(() => {
      showSlide(currentSlide + 1);
    }, 6000);
  }
}

$("#pauseButton").addEventListener("click", () => {
  autoplay = !autoplay;
  $("#pauseButton").textContent = autoplay ? "Ⅱ" : "▶";
  $("#pauseButton").setAttribute(
    "aria-label",
    autoplay ? "Pausar carrossel" : "Retomar carrossel"
  );
  startAutoplay();
});

hero.addEventListener("mouseenter", () => {
  clearInterval(autoplayTimer);
});

hero.addEventListener("mouseleave", () => {
  startAutoplay();
});

hero.addEventListener("focusin", () => {
  clearInterval(autoplayTimer);
});

hero.addEventListener("focusout", () => {
  startAutoplay();
});

// FAIXA DE PROMOÇÕES
function showPromotion(index) {
  currentPromotion =
    (index + promotions.length) % promotions.length;

  $("#promoText").innerHTML = promotions[currentPromotion];
}

$("#promoPrev").addEventListener("click", () => {
  showPromotion(currentPromotion - 1);
});

$("#promoNext").addEventListener("click", () => {
  showPromotion(currentPromotion + 1);
});

// MENU PARA CELULARES
const menuToggle = $("#menuToggle");
const mainNav = $("#mainNav");

menuToggle.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");

  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute(
    "aria-label",
    isOpen ? "Fechar menu" : "Abrir menu"
  );

  menuToggle.textContent = isOpen ? "✕" : "☰";
});

$$(".main-nav a").forEach((link) => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Abrir menu");
    menuToggle.textContent = "☰";
  });
});

// ABRIR E FECHAR A BUSCA
$(".search-toggle").addEventListener("click", () => {
  const searchBar = $("#searchBar");
  const isOpen = searchBar.classList.toggle("open");

  if (isOpen) {
    $("#searchInput").focus();
  } else {
    $("#searchInput").value = "";
  }
});

// PESQUISA DEMONSTRATIVA
$("#searchBar").addEventListener("submit", (event) => {
  event.preventDefault();

  const query = $("#searchInput").value.trim();

  if (!query) {
    showToast("Digite o que você deseja encontrar.");
    $("#searchInput").focus();
    return;
  }

  showToast(`Pesquisa demonstrativa: "${query}"`);
});

// SACOLA DEMONSTRATIVA
$("#buyButton").addEventListener("click", () => {
  bagItems++;

  const count = $("#bagCount");
  count.classList.add("visible");

  showToast("Produto adicionado à sacola demonstrativa!");
});

// CATEGORIAS
$$("[data-category]").forEach((button) => {
  button.addEventListener("click", () => {
    const category = button.dataset.category;

    showToast(
      `Categoria selecionada: ${category.charAt(0).toUpperCase()}${category.slice(1)}`
    );
  });
});

// INICIALIZAÇÃO
showSlide(0);
showPromotion(0);
startAutoplay();