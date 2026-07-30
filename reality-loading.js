(() => {
  const purgeCenteredProductPngs = () => {
    document.querySelectorAll('.product-scrap').forEach((node) => node.remove());
    document.querySelectorAll('.product-visual.has-scrap').forEach((node) => node.classList.remove('has-scrap'));
  };

  purgeCenteredProductPngs();
  new MutationObserver(purgeCenteredProductPngs).observe(document.documentElement, {
    childList: true,
    subtree: true
  });

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
