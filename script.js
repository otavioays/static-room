const products = [
  { id:'SR-001', name:'Suporte Individual para Batata Frita', price:39.90, status:'available', statusLabel:'Em estoque', variants:'AÇO / VERMELHO', desc:'Impede que uma batata específica entre em contato com as demais.', specs:['Capacidade máxima: 1 unidade','Batata não inclusa','Aprovado internamente por uma pessoa'], kind:'fry', accent:'#f4c54d' },
  { id:'SR-002', name:'Porta-retrato para Fotos Ainda Não Tiradas', price:59.90, status:'available', statusLabel:'Em estoque', variants:'10×15 / FUTURO', desc:'Mantém reservado um espaço físico para uma memória que ainda não aconteceu.', specs:['Fotografia futura não inclusa','Compatível com atrasos emocionais','Vidro real'], kind:'frame', accent:'#b5a3df' },
  { id:'SR-003', name:'Caixa de Emergência Contendo Outra Caixa', price:54.90, status:'available', statusLabel:'Em estoque', variants:'P / MENOR', desc:'A segunda caixa deve ser utilizada caso a primeira seja insuficiente.', specs:['2 caixas','0 soluções','Abertura sequencial obrigatória'], kind:'box', accent:'#ef765f' },
  { id:'SR-004', name:'Cubo Substituto Temporário de Objetos Perdidos', price:44.90, status:'sold', statusLabel:'Sold out', variants:'CUBO / CINZA', desc:'Substitui simbolicamente qualquer objeto até que o objeto verdadeiro seja encontrado.', specs:['Não substitui chaves adequadamente','Número de série individual','Borracha densa'], kind:'cube', accent:'#a8cfb0' },
  { id:'SR-005', name:'Calendário Composto Apenas por Terças-feiras', price:47.90, status:'available', statusLabel:'Em estoque', variants:'2026 / TERÇA', desc:'Organiza o ano utilizando o único dia aprovado pelo departamento.', specs:['365 terças conceituais','Feriados ignorados','Encadernação espiral'], kind:'calendar', accent:'#f0d25f' },
  { id:'SR-006', name:'Carteira para Recibos Emocionalmente Importantes', price:69.90, status:'available', statusLabel:'Em estoque', variants:'PRETA / 8 RECIBOS', desc:'Proteção dedicada para comprovantes que você não consegue jogar fora.', specs:['8 compartimentos','Nenhum espaço para dinheiro','Fecho excessivamente sério'], kind:'wallet', accent:'#9fc6d8' },
  { id:'SR-007', name:'Espelho Retrovisor para Cadeira de Escritório', price:89.90, status:'available', statusLabel:'Em estoque', variants:'ESQUERDA / DIREITA', desc:'Monitore acontecimentos atrás de você sem abandonar sua planilha.', specs:['Campo visual aproximado: 38°','Não melhora produtividade','Braço ajustável'], kind:'mirror', accent:'#df9c75' },
  { id:'SR-008', name:'Suporte Individual para um Único Cheetos', price:42.90, status:'sold', statusLabel:'Sold out', variants:'CURVO / MUITO CURVO', desc:'Mantém uma unidade selecionada elevada até uma decisão de consumo.', specs:['Capacidade: 1 salgadinho','Não recomendado para fome real','Cheetos não incluso'], kind:'cheeto', accent:'#f18c3f' },
  { id:'SR-009', name:'Botão que Acende Outro Botão', price:64.90, status:'available', statusLabel:'Em estoque', variants:'VERMELHO / VERMELHO', desc:'Quando pressionado, confirma visualmente que outro botão existe.', specs:['Dois botões','Uma função circular','Cabo USB incluso'], kind:'button', accent:'#ec6a70' },
  { id:'SR-010', name:'Carregador Portátil para Objetos sem Eletricidade', price:79.90, status:'available', statusLabel:'Poucas unidades', variants:'10.000 mAh / INÚTIL', desc:'Fornece energia armazenada a objetos incapazes de recebê-la.', specs:['Saída USB-C','Compatível com pedras e colheres','Objeto não carregável não incluso'], kind:'charger', accent:'#83b6d7' },
  { id:'SR-011', name:'Pedra com Manual de Instruções', price:34.90, status:'available', statusLabel:'Em estoque', variants:'PEDRA / 47 PÁGINAS', desc:'Uma unidade mineral acompanhada de documentação operacional completa.', specs:['Origem geológica não rastreada','Manual em português','Uso intuitivo desaconselhado'], kind:'rock', accent:'#b6ae9c' },
  { id:'SR-012', name:'Certificado Oficial de Presença em Casa', price:29.90, status:'available', statusLabel:'Em estoque', variants:'A4 / ASSINADO', desc:'Documento impresso confirmando que você esteve onde já estava.', specs:['Papel 180 g','Assinatura sem autoridade','Válido apenas no endereço declarado'], kind:'certificate', accent:'#9fbe72' }
];

const state = { cart: [], filter: 'all', query: '', sort: 'featured' };
const productGrid = document.querySelector('#productGrid');
const visibleCount = document.querySelector('#visibleCount');
const noResults = document.querySelector('#noResults');
const searchRow = document.querySelector('#searchRow');
const searchInput = document.querySelector('#searchInput');
const cartDrawer = document.querySelector('#cartDrawer');
const productDrawer = document.querySelector('#productDrawer');
const backdrop = document.querySelector('#backdrop');
const cartItems = document.querySelector('#cartItems');
const cartCount = document.querySelector('#cartCount');
const cartTotal = document.querySelector('#cartTotal');
let activeProduct = null;

function money(value) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
}

function frontArt(product) {
  const a = product.accent;
  const start = `<svg viewBox="0 0 600 600" role="img" aria-label="${product.name}"><rect width="600" height="600" fill="#fff"/><text x="28" y="38" font-family="Courier New, monospace" font-size="16" fill="#111">${product.id} / FRENTE</text>`;
  const end = '</svg>';
  const art = {
    fry: `<ellipse cx="300" cy="472" rx="128" ry="38" fill="#e5e5e5" stroke="#111" stroke-width="6"/><rect x="278" y="275" width="44" height="190" fill="#ddd" stroke="#111" stroke-width="6"/><path d="M230 285 Q300 220 370 285 L350 336 Q300 310 250 336 Z" fill="${a}" stroke="#111" stroke-width="6"/><rect x="288" y="112" width="28" height="220" rx="8" transform="rotate(4 302 220)" fill="#f4c54d" stroke="#111" stroke-width="6"/><text x="112" y="550" font-family="Times New Roman, serif" font-size="42">UMA BATATA DE CADA VEZ</text>`,
    frame: `<rect x="125" y="90" width="350" height="410" fill="${a}" stroke="#111" stroke-width="9"/><rect x="170" y="140" width="260" height="290" fill="#fff" stroke="#111" stroke-width="5" stroke-dasharray="12 8"/><circle cx="300" cy="252" r="72" fill="none" stroke="#111" stroke-width="5" stroke-dasharray="9 9"/><path d="M212 390 Q300 295 388 390" fill="none" stroke="#111" stroke-width="5" stroke-dasharray="9 9"/><text x="196" y="470" font-family="Courier New, monospace" font-size="18">FOTO PENDENTE</text>`,
    box: `<rect x="95" y="120" width="410" height="350" fill="${a}" stroke="#111" stroke-width="8"/><path d="M95 205 L300 315 L505 205" fill="none" stroke="#111" stroke-width="8"/><rect x="205" y="240" width="190" height="160" fill="#fff" stroke="#111" stroke-width="7"/><path d="M205 285 L300 338 L395 285" fill="none" stroke="#111" stroke-width="7"/><text x="130" y="82" font-family="Courier New, monospace" font-size="18">EMERGÊNCIA NÍVEL 2</text>`,
    cube: `<polygon points="300,95 465,185 300,275 135,185" fill="${a}" stroke="#111" stroke-width="7"/><polygon points="135,185 300,275 300,485 135,395" fill="#c7c7c7" stroke="#111" stroke-width="7"/><polygon points="465,185 300,275 300,485 465,395" fill="#9d9d9d" stroke="#111" stroke-width="7"/><text x="211" y="350" font-family="Times New Roman, serif" font-size="35" transform="rotate(29 211 350)">OBJETO</text><text x="180" y="545" font-family="Courier New, monospace" font-size="17">SUBSTITUIÇÃO TEMPORÁRIA</text>`,
    calendar: `<rect x="100" y="90" width="400" height="390" fill="#fff" stroke="#111" stroke-width="8"/><rect x="100" y="90" width="400" height="90" fill="${a}" stroke="#111" stroke-width="8"/><g stroke="#111" stroke-width="6"><line x1="170" y1="65" x2="170" y2="125"/><line x1="430" y1="65" x2="430" y2="125"/></g><text x="150" y="350" font-family="Times New Roman, serif" font-style="italic" font-size="78">terça-feira</text><text x="174" y="420" font-family="Courier New, monospace" font-size="18">REPETIR ATÉ DEZEMBRO</text>`,
    wallet: `<rect x="115" y="165" width="370" height="255" rx="30" fill="#222" stroke="#111" stroke-width="8"/><rect x="145" y="195" width="135" height="175" fill="#fff" stroke="#111" stroke-width="5"/><path d="M170 205 C150 255 208 270 185 325 C170 355 205 368 195 390" fill="none" stroke="${a}" stroke-width="11"/><rect x="315" y="212" width="125" height="95" fill="${a}" stroke="#111" stroke-width="5"/><circle cx="386" cy="260" r="13" fill="#111"/><text x="150" y="470" font-family="Courier New, monospace" font-size="16">SEM ESPAÇO PARA DINHEIRO</text>`,
    mirror: `<rect x="130" y="305" width="310" height="150" rx="24" fill="${a}" stroke="#111" stroke-width="7"/><circle cx="210" cy="470" r="35" fill="#111"/><circle cx="370" cy="470" r="35" fill="#111"/><path d="M270 310 L275 185 L402 125" fill="none" stroke="#111" stroke-width="17"/><ellipse cx="448" cy="112" rx="92" ry="55" fill="#d8eef8" stroke="#111" stroke-width="6" transform="rotate(-7 448 112)"/><text x="84" y="92" font-family="Courier New, monospace" font-size="17">VISIBILIDADE CORPORATIVA</text>`,
    cheeto: `<ellipse cx="300" cy="455" rx="120" ry="34" fill="#dedede" stroke="#111" stroke-width="6"/><rect x="282" y="292" width="36" height="158" fill="#ddd" stroke="#111" stroke-width="6"/><path d="M235 300 Q300 235 365 300 L347 342 Q300 320 253 342 Z" fill="${a}" stroke="#111" stroke-width="6"/><path d="M300 135 C260 180 355 205 300 285" fill="none" stroke="#111" stroke-width="24" stroke-linecap="round"/><path d="M300 135 C260 180 355 205 300 285" fill="none" stroke="#f18c3f" stroke-width="15" stroke-linecap="round"/><text x="126" y="530" font-family="Times New Roman, serif" font-size="44">PRESERVAR ATÉ DECIDIR</text>`,
    button: `<rect x="95" y="120" width="410" height="330" fill="#eee" stroke="#111" stroke-width="7"/><circle cx="215" cy="275" r="72" fill="${a}" stroke="#111" stroke-width="8"/><circle cx="385" cy="275" r="72" fill="#7dcf78" stroke="#111" stroke-width="8"/><path d="M287 275 H313" stroke="#111" stroke-width="8"/><text x="157" y="388" font-family="Courier New, monospace" font-size="17">APERTE UM</text><text x="337" y="388" font-family="Courier New, monospace" font-size="17">ACENDA OUTRO</text>`,
    charger: `<rect x="108" y="170" width="185" height="250" rx="18" fill="${a}" stroke="#111" stroke-width="7"/><rect x="145" y="205" width="110" height="24" fill="#111"/><path d="M292 280 C360 280 340 390 435 390" fill="none" stroke="#111" stroke-width="10"/><path d="M397 350 Q450 305 493 366 Q500 430 425 446 Q370 415 397 350" fill="#9d9687" stroke="#111" stroke-width="7"/><text x="115" y="475" font-family="Courier New, monospace" font-size="16">CARGA NÃO RECEBIDA: 100%</text>`,
    rock: `<path d="M165 355 Q140 245 225 180 Q315 115 410 190 Q490 260 435 382 Q340 455 220 420 Z" fill="#9c9587" stroke="#111" stroke-width="7"/><rect x="330" y="85" width="170" height="240" fill="#fff" stroke="#111" stroke-width="6" transform="rotate(8 415 205)"/><text x="372" y="132" font-family="Courier New, monospace" font-size="16" transform="rotate(8 415 205)">MANUAL</text><g stroke="#111" stroke-width="3"><line x1="356" y1="170" x2="466" y2="185"/><line x1="350" y1="205" x2="460" y2="220"/><line x1="346" y1="240" x2="455" y2="255"/></g><text x="165" y="500" font-family="Times New Roman, serif" font-size="48">OPERAR COM CUIDADO</text>`,
    certificate: `<rect x="105" y="85" width="390" height="425" fill="#fff" stroke="#111" stroke-width="8"/><rect x="132" y="112" width="336" height="371" fill="none" stroke="${a}" stroke-width="5"/><text x="175" y="180" font-family="Times New Roman, serif" font-size="35">CERTIFICADO OFICIAL</text><text x="170" y="255" font-family="Courier New, monospace" font-size="18">CONFIRMAMOS QUE</text><text x="174" y="320" font-family="Times New Roman, serif" font-style="italic" font-size="54">você esteve</text><text x="205" y="370" font-family="Times New Roman, serif" font-style="italic" font-size="54">em casa.</text><circle cx="415" cy="420" r="40" fill="${a}" stroke="#111" stroke-width="4"/><text x="389" y="426" font-family="Courier New, monospace" font-size="14">OK</text>`
  };
  return start + art[product.kind] + end;
}

function backArt(product) {
  return `<svg viewBox="0 0 600 600" role="img" aria-label="Detalhes técnicos de ${product.name}">
    <rect width="600" height="600" fill="#fff"/>
    <rect x="35" y="35" width="530" height="530" fill="none" stroke="#111" stroke-width="3"/>
    <rect x="35" y="35" width="530" height="70" fill="${product.accent}" stroke="#111" stroke-width="3"/>
    <text x="58" y="78" font-family="Courier New, monospace" font-weight="700" font-size="21">${product.id} / FICHA TÉCNICA</text>
    <text x="58" y="150" font-family="Times New Roman, serif" font-size="31">${product.name.slice(0, 35)}</text>
    <g font-family="Courier New, monospace" font-size="18" fill="#111">
      <text x="58" y="225">01. ${product.specs[0]}</text>
      <text x="58" y="280">02. ${product.specs[1]}</text>
      <text x="58" y="335">03. ${product.specs[2]}</text>
      <text x="58" y="415">STATUS: ${product.statusLabel.toUpperCase()}</text>
      <text x="58" y="460">VARIANTE: ${product.variants}</text>
    </g>
    <circle cx="470" cy="480" r="52" fill="none" stroke="${product.accent}" stroke-width="7"/>
    <text x="438" y="486" font-family="Courier New, monospace" font-size="17" fill="#111">SR OK</text>
  </svg>`;
}

function productCard(product) {
  const sold = product.status === 'sold';
  return `<article class="product-card" data-product-id="${product.id}">
    <button class="product-open" type="button" data-open-product="${product.id}">
      <span class="product-media">
        <span class="product-art product-art-front">${frontArt(product)}</span>
        <span class="product-art product-art-back">${backArt(product)}</span>
      </span>
      <span class="product-title">${product.name}</span>
      <span class="product-status ${sold ? 'sold' : ''}">${product.statusLabel}</span>
      <span class="product-price">${money(product.price)}</span>
      <span class="product-variants">${product.variants}</span>
    </button>
    <button class="grid-add" type="button" data-add-product="${product.id}" ${sold ? 'disabled' : ''}>${sold ? 'ESGOTADO' : 'ADICIONAR'}</button>
  </article>`;
}

function setDrawer(drawer, open) {
  [cartDrawer, productDrawer].forEach((item) => item.setAttribute('aria-hidden', 'true'));
  drawer?.setAttribute('aria-hidden', open ? 'false' : 'true');
  backdrop.hidden = !open;
  document.body.classList.toggle('drawer-open', open);
}

function catalogProducts() {
  const query = state.query.trim().toLocaleLowerCase('pt-BR');
  let list = products.filter((product) => {
    const filterMatch = state.filter === 'all' || product.status === state.filter;
    const searchMatch = !query || product.name.toLocaleLowerCase('pt-BR').includes(query) || product.desc.toLocaleLowerCase('pt-BR').includes(query);
    return filterMatch && searchMatch;
  });
  if (state.sort === 'price-asc') list.sort((a,b) => a.price - b.price);
  if (state.sort === 'price-desc') list.sort((a,b) => b.price - a.price);
  if (state.sort === 'name') list.sort((a,b) => a.name.localeCompare(b.name, 'pt-BR'));
  return list;
}

function renderProducts() {
  const list = catalogProducts();
  productGrid.innerHTML = list.map(productCard).join('');
  visibleCount.textContent = list.length;
  noResults.hidden = list.length > 0;
}

function renderCart() {
  cartCount.textContent = state.cart.length;
  cartTotal.textContent = money(state.cart.reduce((sum, item) => sum + item.price, 0));
  cartItems.innerHTML = state.cart.length ? state.cart.map((item, index) => `
    <article class="cart-item"><div><h3>${item.name}</h3><p>${money(item.price)}</p></div><button type="button" data-remove="${index}">Remove</button></article>
  `).join('') : '<p class="empty-message">Your cart is empty.</p>';
}

function addToCart(product) {
  state.cart.push({ id: product.id, name: product.name, price: product.price });
  renderCart();
  setDrawer(cartDrawer, true);
}

function openProduct(product) {
  activeProduct = product;
  document.querySelector('#drawerProductId').textContent = product.id;
  document.querySelector('#drawerProductName').textContent = product.name;
  document.querySelector('#drawerProductPrice').textContent = money(product.price);
  document.querySelector('#drawerProductStatus').textContent = product.statusLabel;
  document.querySelector('#drawerProductDesc').textContent = product.desc;
  document.querySelector('#drawerProductVariants').textContent = product.variants;
  document.querySelector('#drawerSpecs').innerHTML = product.specs.map((spec) => `<li>${spec}</li>`).join('');
  document.querySelector('#drawerFront').innerHTML = frontArt(product);
  document.querySelector('#drawerBack').innerHTML = backArt(product);
  const addButton = document.querySelector('#drawerAdd');
  addButton.disabled = product.status === 'sold';
  addButton.textContent = product.status === 'sold' ? 'SOLD OUT' : 'ADD TO CART';
  setDrawer(productDrawer, true);
}

document.querySelector('#announcementClose').addEventListener('click', (event) => event.currentTarget.closest('.announcement').remove());
document.querySelector('#searchToggle').addEventListener('click', () => { searchRow.hidden = false; searchInput.focus(); });
document.querySelector('#searchClose').addEventListener('click', () => { searchRow.hidden = true; searchInput.value = ''; state.query = ''; renderProducts(); });
searchInput.addEventListener('input', () => { state.query = searchInput.value; renderProducts(); });

document.querySelectorAll('.filter-button').forEach((button) => button.addEventListener('click', () => {
  document.querySelectorAll('.filter-button').forEach((item) => item.classList.remove('active'));
  button.classList.add('active');
  state.filter = button.dataset.filter;
  renderProducts();
}));

document.querySelector('#sortSelect').addEventListener('change', (event) => { state.sort = event.target.value; renderProducts(); });

productGrid.addEventListener('click', (event) => {
  const addButton = event.target.closest('[data-add-product]');
  if (addButton) {
    const product = products.find((item) => item.id === addButton.dataset.addProduct);
    if (product && product.status !== 'sold') addToCart(product);
    return;
  }
  const openButton = event.target.closest('[data-open-product]');
  if (openButton) {
    const product = products.find((item) => item.id === openButton.dataset.openProduct);
    if (product) openProduct(product);
  }
});

document.querySelector('#drawerAdd').addEventListener('click', () => { if (activeProduct?.status !== 'sold') addToCart(activeProduct); });
document.querySelector('#cartToggle').addEventListener('click', () => setDrawer(cartDrawer, true));
document.querySelector('#cartClose').addEventListener('click', () => setDrawer(null, false));
document.querySelector('#productClose').addEventListener('click', () => setDrawer(null, false));
backdrop.addEventListener('click', () => setDrawer(null, false));
document.addEventListener('keydown', (event) => { if (event.key === 'Escape') setDrawer(null, false); });

cartItems.addEventListener('click', (event) => {
  const removeButton = event.target.closest('[data-remove]');
  if (!removeButton) return;
  state.cart.splice(Number(removeButton.dataset.remove), 1);
  renderCart();
});

document.querySelector('#checkoutButton').addEventListener('click', (event) => {
  const original = event.currentTarget.textContent;
  event.currentTarget.textContent = state.cart.length ? 'CHECKOUT AINDA NÃO CONECTADO' : 'CARRINHO VAZIO';
  setTimeout(() => { event.currentTarget.textContent = original; }, 1600);
});

renderProducts();
renderCart();
