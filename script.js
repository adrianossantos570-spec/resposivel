// Efeito de destaque suave na seção de endereço ao clicar no botão "Compre Já"
document.querySelectorAll('.btn[href="#Address"]').forEach(button => {
  button.addEventListener('click', function (event) {
    event.preventDefault();

    const addressSection = document.querySelector('.Address');
    addressSection.scrollIntoView({ behavior: 'smooth' });

    addressSection.classList.add('highlight');
    setTimeout(() => {
      addressSection.classList.remove('highlight');
    }, 3000);
  });
});
// ===== MENU FIXO E EFEITO AO ROLAR =====
window.addEventListener("scroll", () => {
  const header = document.querySelector(".header");
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

// ===== ROLAGEM SUAVE =====
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    const destino = document.querySelector(link.getAttribute("href"));
    if (destino) destino.scrollIntoView({ behavior: "smooth" });
  });
});

// ===== SETAS DO CARROSSEL =====
const carrossel = document.querySelector(".carrossel-container");
if (carrossel) {
  const setaEsq = document.createElement("button");
  const setaDir = document.createElement("button");

  setaEsq.innerHTML = "&#10094;";
  setaDir.innerHTML = "&#10095;";
  setaEsq.className = "seta esquerda";
  setaDir.className = "seta direita";

  carrossel.parentElement.appendChild(setaEsq);
  carrossel.parentElement.appendChild(setaDir);

  const scrollStep = 350;

  setaEsq.addEventListener("click", () => {
    carrossel.scrollBy({ left: -scrollStep, behavior: "smooth" });
  });
  setaDir.addEventListener("click", () => {
    carrossel.scrollBy({ left: scrollStep, behavior: "smooth" });
  });
}

// ===== BOTÃO VOLTAR AO TOPO =====
const botaoTopo = document.createElement("button");
botaoTopo.innerText = "⬆";
botaoTopo.classList.add("botao-topo");
document.body.appendChild(botaoTopo);

botaoTopo.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

window.addEventListener("scroll", () => {
  botaoTopo.style.display = window.scrollY > 400 ? "block" : "none";
});

// ===== ANIMAÇÃO DE ENTRADA SUAVE =====
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
});

document.querySelectorAll("section, .box, .cordefundo-text").forEach(el => {
  el.classList.add("hidden");
  observer.observe(el);
});

// ===== EFEITO DE BRILHO NO MAPA =====
const mapa = document.querySelector(".address-container");
if (mapa) {
  const mapaObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        mapa.classList.add("highlight");
      } else {
        mapa.classList.remove("highlight");
      }
    });
  });
  mapaObserver.observe(mapa);
}



document.addEventListener('DOMContentLoaded', function () {
  // Selectors (usa classes que você já tem)
  var btnAbrir = document.querySelector('.btn-abrir-menu');
  var menu = document.querySelector('.menu-mobile');
  var btnFechar = menu ? menu.querySelector('.btn-fechar') : null;
  var menuLinks = menu ? menu.querySelectorAll('nav a') : [];

  if (!menu || !btnAbrir) {
    // Se não existir, não quebra — apenas avisa no console
    console.warn('Menu mobile ou botão abrir não encontrados (.menu-mobile / .btn-abrir-menu).');
    return;
  }

  // Cria overlay (fundo escuro) se não existir
  var overlay = document.querySelector('.menu-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.className = 'menu-overlay';
    // estilo inline mínimo para garantir que funcione sem CSS extra
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.background = 'rgba(0,0,0,0.45)';
    overlay.style.zIndex = '998';
    overlay.style.opacity = '0';
    overlay.style.visibility = 'hidden';
    overlay.style.transition = 'opacity 0.3s ease, visibility 0.3s';
    document.body.appendChild(overlay);
  }

  // Funções abrir / fechar
  function openMenu() {
    menu.classList.add('ativo');
    overlay.style.visibility = 'visible';
    overlay.style.opacity = '1';
    // esconder o botão de abrir (mantém acessibilidade)
    btnAbrir.style.visibility = 'hidden';
    btnAbrir.setAttribute('aria-hidden', 'true');
    // prevenir scroll do body quando o menu está aberto
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    menu.classList.remove('ativo');
    overlay.style.opacity = '0';
    // aguarda a transição antes de esconder visualmente
    setTimeout(function () {
      overlay.style.visibility = 'hidden';
    }, 300);
    btnAbrir.style.visibility = 'visible';
    btnAbrir.setAttribute('aria-hidden', 'false');
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
  }

  // Eventos
  btnAbrir.addEventListener('click', function (e) {
    e.preventDefault();
    openMenu();
  });

  if (btnFechar) {
    btnFechar.addEventListener('click', function (e) {
      e.preventDefault();
      closeMenu();
    });
  }

  // clicar no overlay fecha o menu
  overlay.addEventListener('click', function () {
    closeMenu();
  });

  // clicar em qualquer link do menu fecha
  if (menuLinks && menuLinks.length) {
    menuLinks.forEach(function (lnk) {
      lnk.addEventListener('click', function () {
        closeMenu();
      });
    });
  }

  // tecla Esc fecha
  document.addEventListener('keydown', function (ev) {
    if (ev.key === 'Escape' || ev.key === 'Esc') {
      closeMenu();
    }
  });

  // Segurança: se o menu for fechado por CSS/por outro script, garantir que o botão abrir volte a aparecer
  var observer = new MutationObserver(function () {
    if (!menu.classList.contains('ativo')) {
      btnAbrir.style.visibility = 'visible';
      btnAbrir.setAttribute('aria-hidden', 'false');
      overlay.style.opacity = '0';
      setTimeout(function () {
        overlay.style.visibility = 'hidden';
      }, 300);
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    }
  });
  observer.observe(menu, { attributes: true, attributeFilter: ['class'] });
});

document.addEventListener("DOMContentLoaded", () => {
  const btnAbrir = document.querySelector(".btn-abrir-menu");
  const menu = document.querySelector(".menu-mobile");
  const btnFechar = document.querySelector(".menu-mobile .btn-fechar");

  if (!btnAbrir || !menu || !btnFechar) {
    console.error("❌ Elementos do menu não encontrados.");
    return;
  }

  btnAbrir.addEventListener("click", () => {
    menu.classList.add("ativo");
    btnAbrir.style.display = "none";
  });

  btnFechar.addEventListener("click", () => {
    menu.classList.remove("ativo");
    btnAbrir.style.display = "block";
  });

  // Fecha o menu ao clicar em um link
  document.querySelectorAll(".menu-mobile nav a").forEach(link => {
    link.addEventListener("click", () => {
      menu.classList.remove("ativo");
      btnAbrir.style.display = "block";
    });
  });
});
