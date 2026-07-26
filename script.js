const cart = [];
const cartDrawer = document.querySelector('#cartDrawer');
const cartBackdrop = document.querySelector('#cartBackdrop');
const cartTrigger = document.querySelector('#cartTrigger');
const cartClose = document.querySelector('#cartClose');
const cartItems = document.querySelector('#cartItems');
const cartCount = document.querySelector('#cartCount');
const cartTotal = document.querySelector('#cartTotal');
const checkoutButton = document.querySelector('#checkoutButton');

function formatMoney(value) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
}

function openCart() {
  cartDrawer.classList.add('open');
  cartBackdrop.classList.add('visible');
  cartDrawer.setAttribute('aria-hidden', 'false');
  cartTrigger.setAttribute('aria-expanded', 'true');
  document.body.classList.add('cart-open');
}

function closeCart() {
  cartDrawer.classList.remove('open');
  cartBackdrop.classList.remove('visible');
  cartDrawer.setAttribute('aria-hidden', 'true');
  cartTrigger.setAttribute('aria-expanded', 'false');
  document.body.classList.remove('cart-open');
}

function renderCart() {
  cartCount.textContent = cart.length;
  cartTotal.textContent = formatMoney(cart.reduce((total, item) => total + item.price, 0));

  if (!cart.length) {
    cartItems.innerHTML = '<p class="empty-cart">Nenhuma decisão comercial foi tomada.</p>';
    return;
  }

  cartItems.innerHTML = cart.map((item, index) => `
    <article class="cart-item">
      <div>
        <h3>${item.name}</h3>
        <p>${formatMoney(item.price)}</p>
      </div>
      <button type="button" data-remove="${index}">Revogar decisão</button>
    </article>
  `).join('');
}

cartTrigger.addEventListener('click', openCart);
cartClose.addEventListener('click', closeCart);
cartBackdrop.addEventListener('click', closeCart);

document.querySelectorAll('.add-to-cart').forEach((button) => {
  button.addEventListener('click', () => {
    cart.push({ name: button.dataset.product, price: Number(button.dataset.price) });
    renderCart();
    openCart();
    const original = button.textContent;
    button.textContent = 'RESPONSABILIDADE TRANSFERIDA';
    setTimeout(() => { button.textContent = original; }, 1200);
  });
});

cartItems.addEventListener('click', (event) => {
  const removeButton = event.target.closest('[data-remove]');
  if (!removeButton) return;
  cart.splice(Number(removeButton.dataset.remove), 1);
  renderCart();
});

checkoutButton.addEventListener('click', () => {
  const original = checkoutButton.textContent;
  checkoutButton.textContent = cart.length ? 'CHECKOUT SERÁ CONECTADO DEPOIS' : 'NENHUMA PUNCHLINE SELECIONADA';
  setTimeout(() => { checkoutButton.textContent = original; }, 1700);
});

// Headroom adapted for the editorial chrome: hide while scrolling down, reveal while scrolling up.
let previousY = window.scrollY;
const chrome = document.querySelector('[data-chrome-headroom]');
window.addEventListener('scroll', () => {
  const currentY = window.scrollY;
  if (currentY > previousY && currentY > 170) chrome.style.transform = 'translateY(-100%)';
  else chrome.style.transform = 'translateY(0)';
  previousY = currentY;
}, { passive: true });

renderCart();
