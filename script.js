const entry = document.querySelector('#entry');
const enterButton = document.querySelector('#enterButton');
const bagButton = document.querySelector('#bagButton');
const bagClose = document.querySelector('#bagClose');
const bagPanel = document.querySelector('#bagPanel');
const bagItems = document.querySelector('#bagItems');
const bagCount = document.querySelector('#bagCount');
const bagTotal = document.querySelector('#bagTotal');
const checkoutButton = document.querySelector('#checkoutButton');
const disturbButton = document.querySelector('#disturbButton');
const newsletterForm = document.querySelector('#newsletterForm');
const formMessage = document.querySelector('#formMessage');
const cursor = document.querySelector('.cursor');
const bag = [];

function money(value) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
}

function openBag() {
  bagPanel.classList.add('open');
  bagPanel.setAttribute('aria-hidden', 'false');
  bagButton.setAttribute('aria-expanded', 'true');
}

function closeBag() {
  bagPanel.classList.remove('open');
  bagPanel.setAttribute('aria-hidden', 'true');
  bagButton.setAttribute('aria-expanded', 'false');
}

function renderBag() {
  bagCount.textContent = bag.length;
  bagTotal.textContent = money(bag.reduce((sum, item) => sum + item.price, 0));
  if (!bag.length) {
    bagItems.innerHTML = '<p class="bag-empty">ainda ecoa vazio.</p>';
    return;
  }
  bagItems.innerHTML = bag.map((item, index) => `
    <article class="bag-item">
      <div><h3>${item.name}</h3><p>${money(item.price)}</p></div>
      <button type="button" data-remove="${index}">devolver</button>
    </article>
  `).join('');
}

enterButton.addEventListener('click', () => {
  entry.classList.add('gone');
  setTimeout(() => entry.remove(), 750);
});

bagButton.addEventListener('click', openBag);
bagClose.addEventListener('click', closeBag);

document.querySelectorAll('.add-button').forEach((button) => {
  button.addEventListener('click', () => {
    const card = button.closest('.product-card');
    bag.push({ name: card.dataset.product, price: Number(card.dataset.price) });
    renderBag();
    openBag();
    button.textContent = 'foi';
    setTimeout(() => button.textContent = 'levar', 900);
  });
});

bagItems.addEventListener('click', (event) => {
  const button = event.target.closest('[data-remove]');
  if (!button) return;
  bag.splice(Number(button.dataset.remove), 1);
  renderBag();
});

checkoutButton.addEventListener('click', () => {
  checkoutButton.textContent = bag.length ? 'checkout ainda não existe. perfeito.' : 'primeiro coloque algo aqui';
  setTimeout(() => checkoutButton.textContent = 'continuar sem entender', 1800);
});

disturbButton.addEventListener('click', () => {
  document.body.classList.toggle('disturbed');
  disturbButton.textContent = document.body.classList.contains('disturbed') ? 'organizar pior' : 'desorganizar a sala';
});

newsletterForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const email = new FormData(newsletterForm).get('email');
  formMessage.textContent = `${email} foi deixado dentro da parede.`;
  newsletterForm.reset();
});

window.addEventListener('mousemove', (event) => {
  if (!cursor) return;
  cursor.style.left = `${event.clientX}px`;
  cursor.style.top = `${event.clientY}px`;
});

document.querySelectorAll('a,button,input').forEach((element) => {
  element.addEventListener('mouseenter', () => cursor?.classList.add('active'));
  element.addEventListener('mouseleave', () => cursor?.classList.remove('active'));
});

document.querySelectorAll('.draggable').forEach((sticker) => {
  let active = false;
  let offsetX = 0;
  let offsetY = 0;
  sticker.addEventListener('pointerdown', (event) => {
    active = true;
    const rect = sticker.getBoundingClientRect();
    offsetX = event.clientX - rect.left;
    offsetY = event.clientY - rect.top;
    sticker.setPointerCapture(event.pointerId);
    sticker.style.position = 'fixed';
    sticker.style.zIndex = 180;
  });
  sticker.addEventListener('pointermove', (event) => {
    if (!active) return;
    sticker.style.left = `${event.clientX - offsetX}px`;
    sticker.style.top = `${event.clientY - offsetY}px`;
    sticker.style.right = 'auto';
    sticker.style.bottom = 'auto';
  });
  sticker.addEventListener('pointerup', () => { active = false; });
});

window.addEventListener('scroll', () => {
  const y = window.scrollY;
  document.querySelector('.hero-symbol')?.style.setProperty('transform', `rotate(7deg) translateY(${y * .06}px)`);
  document.querySelector('.note-a')?.style.setProperty('translate', `0 ${y * .04}px`);
  document.querySelector('.note-b')?.style.setProperty('translate', `0 ${y * -.03}px`);
});

renderBag();
