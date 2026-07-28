(() => {
  const file = (name) => new URL(name, document.baseURI).href;
  const makeImage = (name, className, eager = false) => {
    const image = document.createElement('img');
    image.className = className;
    image.src = file(name);
    image.alt = '';
    image.setAttribute('aria-hidden', 'true');
    image.draggable = false;
    image.decoding = 'async';
    image.loading = eager ? 'eager' : 'lazy';
    return image;
  };
  const append = (selector, name, className, eager = false) => {
    const target = document.querySelector(selector);
    if (!target) return;
    target.appendChild(makeImage(name, className, eager));
  };

  append('.hero', 'nuvem_static_room (1).png', 'asset-doodle doodle-cloud', true);
  append('.hero', 'ChatGPT Image Jul 28, 2026, 12_03_48 AM (5).png', 'asset-doodle doodle-orbit', true);
  append('.drop-section', 'mola_static_room (1).png', 'asset-doodle doodle-spring');
  append('.drop-section', 'estrela_static_room (1).png', 'asset-doodle doodle-star');
  append('.manifesto', 'espiral_static_room (1).png', 'asset-doodle doodle-spiral');
  append('.archive', 'ChatGPT Image Jul 28, 2026, 12_03_47 AM (1).png', 'asset-doodle doodle-archive');
  append('.newsletter', 'espiral_static_room (1).png', 'asset-doodle doodle-news');

  const productFiles = [
    'ChatGPT Image Jul 28, 2026, 12_03_48 AM (4).png',
    'ChatGPT Image Jul 28, 2026, 12_03_48 AM (3).png',
    'ChatGPT Image Jul 28, 2026, 12_03_48 AM (2).png'
  ];
  document.querySelectorAll('.product-visual').forEach((visual, index) => {
    const name = productFiles[index];
    if (!name) return;
    visual.classList.add('has-scrap');
    visual.prepend(makeImage(name, 'product-scrap'));
  });

  const note = document.querySelector('.note-card');
  if (note) note.prepend(makeImage('ChatGPT Image Jul 28, 2026, 12_03_48 AM (5).png', 'note-scrap'));
})();
