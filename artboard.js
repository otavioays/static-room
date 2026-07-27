'use strict';

(() => {
  const status = document.querySelector('#interactionStatus');

  document.querySelectorAll('[data-scroll]').forEach((control) => {
    control.addEventListener('click', (event) => {
      const target = document.querySelector(control.dataset.scroll);
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  document.querySelectorAll('[data-pop]').forEach((piece) => {
    piece.addEventListener('click', () => {
      piece.classList.remove('is-popped');
      requestAnimationFrame(() => piece.classList.add('is-popped'));
      window.setTimeout(() => piece.classList.remove('is-popped'), 260);
    });
  });

  document.querySelectorAll('.product-hotspot').forEach((product) => {
    product.addEventListener('click', () => {
      const selected = product.classList.toggle('is-selected');
      product.setAttribute('aria-pressed', String(selected));
      if (status) {
        status.textContent = selected
          ? `${product.dataset.product} foi marcado para a próxima camada ilustrada.`
          : `${product.dataset.product} foi desmarcado.`;
      }
    });
  });
})();
