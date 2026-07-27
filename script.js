'use strict';

const cart = [];
const cartCount = document.querySelector('#cartCount');
const cartTotal = document.querySelector('#cartTotal');
const cartButton = document.querySelector('#cartButton');
const toast = document.querySelector('#toast');
const newsletterForm = document.querySelector('#newsletterForm');
const newsletterMessage = document.querySelector('#newsletterMessage');

function formatMoney(value) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  window.clearTimeout(showToast.timeoutId);
  showToast.timeoutId = window.setTimeout(() => {
    toast.classList.remove('show');
  }, 2300);
}

function renderCart() {
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  cartCount.textContent = cart.length;
  cartTotal.textContent = formatMoney(total);
}

document.querySelectorAll('[data-scroll-to]').forEach((button) => {
  button.addEventListener('click', () => {
    const target = document.querySelector(`#${button.dataset.scrollTo}`);
    target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

document.querySelectorAll('.product-card').forEach((card) => {
  const button = card.querySelector('.add-button');
  button.addEventListener('click', () => {
    const product = card.dataset.product;
    const price = Number(card.dataset.price);
    cart.push({ product, price });
    renderCart();

    const originalText = button.textContent;
    button.textContent = 'RESPONSABILIDADE TRANSFERIDA';
    button.disabled = true;
    showToast(`${product} foi adicionado ao carrinho.`);

    window.setTimeout(() => {
      button.textContent = originalText;
      button.disabled = false;
    }, 1200);
  });
});

cartButton.addEventListener('click', () => {
  if (!cart.length) {
    showToast('O carrinho ainda não contém nenhuma decisão comercial.');
    return;
  }
  showToast(`${cart.length} objeto(s) no carrinho. Checkout será conectado na próxima etapa.`);
});

newsletterForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const input = newsletterForm.querySelector('input');
  newsletterMessage.textContent = 'Registro concluído. Agora você será avisado antes que a equipe recupere o bom senso.';
  input.value = '';
});

renderCart();
