'use strict';

(() => {
  const ASSETS = {
    eye: 'olho_static_room.png',
    bird: 'passaro_static_room.png',
    lizard: 'lagartixa_static_room.png',
    spiral: 'espiral_static_room.png',
    spring: 'mola_static_room.png',
    cloud: 'nuvem_static_room.png',
    star: 'estrela_static_room.png',
    badge: 'adesivo_sr_static_room.png',
    extra1: 'ChatGPT Image Jul 27, 2026, 08_37_19 AM (1).png',
    extra2: 'ChatGPT Image Jul 27, 2026, 08_37_19 AM (2).png',
    extra3: 'ChatGPT Image Jul 27, 2026, 08_37_20 AM (3).png',
    extra4: 'ChatGPT Image Jul 27, 2026, 08_37_20 AM (4).png',
    extra5: 'ChatGPT Image Jul 27, 2026, 08_37_20 AM (5).png'
  };

  document.querySelectorAll('[data-static-room-sticker]').forEach((node) => node.remove());

  const addSticker = ({ selector, asset, slot, eager = false }) => {
    const host = document.querySelector(selector);
    const src = ASSETS[asset];
    if (!host || !src) return;

    const image = document.createElement('img');
    image.className = `sr-sticker sr-${asset} ${slot}`;
    image.src = src;
    image.alt = '';
    image.setAttribute('aria-hidden', 'true');
    image.setAttribute('data-static-room-sticker', asset);
    image.decoding = 'async';
    image.loading = eager ? 'eager' : 'lazy';
    image.draggable = false;
    image.addEventListener('error', () => image.remove(), { once: true });
    host.appendChild(image);
  };

  [
    { selector: '.hero', asset: 'eye', slot: 'hero-eye', eager: true },
    { selector: '.hero', asset: 'extra1', slot: 'hero-extra', eager: true },
    { selector: '.hero', asset: 'bird', slot: 'hero-bird', eager: true },
    { selector: '.hero', asset: 'cloud', slot: 'hero-cloud' },

    { selector: '.statement-grid', asset: 'spiral', slot: 'statement-spiral' },
    { selector: '.statement-grid', asset: 'extra2', slot: 'statement-extra' },
    { selector: '.statement-grid', asset: 'star', slot: 'statement-star' },

    { selector: '.catalog-section', asset: 'badge', slot: 'catalog-badge' },
    { selector: '.catalog-section', asset: 'lizard', slot: 'catalog-lizard' },
    { selector: '.catalog-section', asset: 'spring', slot: 'catalog-spring' },

    { selector: '.manifesto', asset: 'extra3', slot: 'manifesto-extra' },
    { selector: '.manifesto', asset: 'bird', slot: 'manifesto-bird' },
    { selector: '.manifesto', asset: 'eye', slot: 'manifesto-eye' },

    { selector: '.archive', asset: 'extra4', slot: 'archive-extra' },
    { selector: '.archive', asset: 'spiral', slot: 'archive-spiral' },
    { selector: '.archive', asset: 'star', slot: 'archive-star' },

    { selector: '.drop-banner', asset: 'extra5', slot: 'drop-extra' },
    { selector: '.drop-banner', asset: 'lizard', slot: 'drop-lizard' },

    { selector: 'footer', asset: 'badge', slot: 'footer-badge' },
    { selector: 'footer', asset: 'cloud', slot: 'footer-cloud' },
    { selector: 'footer', asset: 'spring', slot: 'footer-spring' }
  ].forEach(addSticker);

  const productAssets = ['star', 'eye', 'lizard', 'spiral', 'badge'];
  document.querySelectorAll('.product-card').forEach((card, index) => {
    const asset = productAssets[index % productAssets.length];
    const image = document.createElement('img');
    image.className = `sr-sticker product-sticker product-sticker-${index + 1}`;
    image.src = ASSETS[asset];
    image.alt = '';
    image.setAttribute('aria-hidden', 'true');
    image.setAttribute('data-static-room-sticker', asset);
    image.decoding = 'async';
    image.loading = 'lazy';
    image.draggable = false;
    image.addEventListener('error', () => image.remove(), { once: true });
    card.appendChild(image);
  });
})();
