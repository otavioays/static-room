(() => {
  const purgeCenteredProductPngs = () => {
    document.querySelectorAll('.product-scrap').forEach((node) => node.remove());
    document.querySelectorAll('.product-visual.has-scrap').forEach((node) => node.classList.remove('has-scrap'));
  };

  const setupPricesCarousel = () => {
    const modal = document.querySelector('#prices-modal');
    const popup = modal?.querySelector('.prices-popup');
    const frame = popup?.querySelector('img[alt*="Comprar"], img[src*="comprarnovo"], img[alt*="Preços"], img[src*="pre%C3%A7os"], img[src*="preços"]');
    const triggers = [...document.querySelectorAll('[data-open-prices]')];
    const products = [...document.querySelectorAll('.product-card .shirt-image')].map((image) => ({
      src: image.currentSrc || image.src,
      alt: image.alt || 'Camiseta Static Room'
    }));

    if (!modal || !popup || !frame || products.length === 0 || popup.dataset.carouselReady === 'true') return;

    popup.dataset.carouselReady = 'true';
    frame.classList.add('prices-frame');
    frame.draggable = false;

    const style = document.createElement('style');
    style.dataset.pricesCarousel = 'true';
    style.textContent = `
      .prices-popup{isolation:isolate}
      .prices-popup>.prices-frame{position:relative;z-index:3;display:block!important;width:100%!important;height:auto!important;max-width:none!important;max-height:93vh!important;object-fit:contain!important;pointer-events:none}
      .prices-carousel-stage{position:absolute;z-index:1;left:14%;right:5%;top:10%;bottom:17%;display:grid;place-items:center;overflow:hidden;pointer-events:none}
      .prices-carousel-shirt{display:block!important;width:100%!important;height:100%!important;max-width:100%!important;max-height:100%!important;object-fit:contain!important;object-position:center!important;filter:drop-shadow(8px 12px 9px rgba(19,13,22,.34));transform:translateZ(0)}
      .prices-carousel-nav{position:absolute;z-index:4;top:37%;width:11%;height:25%;padding:0;border:0;background:transparent;cursor:pointer;color:transparent;font-size:0}
      .prices-carousel-nav--prev{left:17%}
      .prices-carousel-nav--next{right:2.5%}
      .prices-carousel-nav:focus-visible{outline:4px solid var(--acid);outline-offset:-8px;border-radius:45%;background:rgba(245,230,108,.12)}
      .prices-close{z-index:6!important}
      @media(max-width:620px){
        .prices-carousel-stage{left:13%;right:4%;top:10%;bottom:16%}
        .prices-carousel-shirt{max-width:100%!important;max-height:100%!important}
        .prices-carousel-nav{top:35%;height:29%}
      }
      @media(prefers-reduced-motion:reduce){.prices-carousel-shirt{animation:none!important;transition:none!important}}
    `;
    document.head.appendChild(style);

    const stage = document.createElement('div');
    stage.className = 'prices-carousel-stage';
    stage.setAttribute('aria-live', 'polite');

    const shirt = document.createElement('img');
    shirt.className = 'prices-carousel-shirt';
    shirt.decoding = 'async';
    shirt.draggable = false;
    stage.appendChild(shirt);

    const previous = document.createElement('button');
    previous.className = 'prices-carousel-nav prices-carousel-nav--prev';
    previous.type = 'button';
    previous.setAttribute('aria-label', 'Ver camiseta anterior');

    const next = document.createElement('button');
    next.className = 'prices-carousel-nav prices-carousel-nav--next';
    next.type = 'button';
    next.setAttribute('aria-label', 'Ver próxima camiseta');

    popup.append(stage, previous, next);

    let currentIndex = 0;

    const render = (index, direction = 1) => {
      currentIndex = (index + products.length) % products.length;
      const product = products[currentIndex];
      shirt.src = product.src;
      shirt.alt = product.alt;

      if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches && shirt.animate) {
        shirt.animate(
          [
            { opacity: 0, transform: `translateX(${direction * 24}px) scale(.965)` },
            { opacity: 1, transform: 'translateX(0) scale(1)' }
          ],
          { duration: 240, easing: 'cubic-bezier(.2,.8,.2,1)' }
        );
      }
    };

    triggers.forEach((trigger, index) => {
      trigger.addEventListener('click', () => render(index, index >= currentIndex ? 1 : -1), true);
    });

    previous.addEventListener('click', () => render(currentIndex - 1, -1));
    next.addEventListener('click', () => render(currentIndex + 1, 1));

    document.addEventListener('keydown', (event) => {
      if (!modal.classList.contains('open')) return;
      if (event.key === 'ArrowLeft') render(currentIndex - 1, -1);
      if (event.key === 'ArrowRight') render(currentIndex + 1, 1);
    });

    render(0);
  };

  purgeCenteredProductPngs();
  new MutationObserver(purgeCenteredProductPngs).observe(document.documentElement, {
    childList: true,
    subtree: true
  });

  setupPricesCarousel();

  const panel = document.querySelector('.hero-console, .reality-loading-slot');
  if (!panel) return;

  panel.classList.remove('hero-console');
  panel.classList.add('reality-loading-slot', 'visible');
  panel.removeAttribute('data-reveal');
  panel.setAttribute('aria-label', 'Status da transmissão: Reality Loading');
  panel.replaceChildren();

  const image = document.createElement('img');
  image.className = 'reality-loading-window';
  image.src = new URL('realityloading.png?v=2', document.baseURI).href;
  image.alt = 'Janela Static Room mostrando Reality Loading, sinal instável e alma encontrada';
  image.draggable = false;
  image.decoding = 'async';
  image.loading = 'eager';

  panel.appendChild(image);
})();