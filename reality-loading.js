(() => {
  const panel = document.querySelector('.hero-console');
  if (!panel) return;

  panel.className = 'reality-loading-slot';
  panel.setAttribute('aria-label', 'Status da transmissão: Reality Loading');
  panel.replaceChildren();

  const image = document.createElement('img');
  image.className = 'reality-loading-window';
  image.src = new URL('realityloading.png?v=1', document.baseURI).href;
  image.alt = 'Janela Static Room mostrando Reality Loading, sinal instável e alma encontrada';
  image.draggable = false;
  image.decoding = 'async';
  image.loading = 'eager';

  panel.appendChild(image);
})();
