'use strict';

(() => {
  const add = (selector, classes) => {
    const host = document.querySelector(selector);
    if (!host) return;
    const sticker = document.createElement('span');
    sticker.className = `sr-sticker ${classes}`;
    sticker.setAttribute('aria-hidden', 'true');
    host.appendChild(sticker);
  };

  [
    ['.hero', 'sr-eye'],
    ['.hero', 'sr-bird'],
    ['.hero', 'sr-smile'],
    ['.statement-grid', 'sr-swirl'],
    ['.statement-grid', 'sr-star'],
    ['.catalog-section', 'sr-badge'],
    ['.catalog-section', 'sr-lizard'],
    ['.manifesto', 'sr-eye'],
    ['.manifesto', 'sr-bird'],
    ['.archive', 'sr-badge'],
    ['.archive', 'sr-swirl'],
    ['.drop-banner', 'sr-star'],
    ['.drop-banner', 'sr-lizard'],
    ['footer', 'sr-smile'],
    ['footer', 'sr-bird']
  ].forEach(([selector, classes]) => add(selector, classes));

  const cardStickers = ['sr-star', 'sr-eye', 'sr-lizard', 'sr-swirl', 'sr-badge'];
  document.querySelectorAll('.product-card').forEach((card, index) => {
    const sticker = document.createElement('span');
    sticker.className = `sr-sticker product-sticker ${cardStickers[index % cardStickers.length]}`;
    sticker.setAttribute('aria-hidden', 'true');
    card.appendChild(sticker);
  });
})();
