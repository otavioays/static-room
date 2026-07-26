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

function svgDefs(shadowId) {
  return `
    <defs>
      <filter id="${shadowId}" x="-20%" y="-20%" width="150%" height="150%" color-interpolation-filters="sRGB">
        <feFlood flood-color="#000000" flood-opacity=".24" result="shadowColor"/>
        <feComposite in="shadowColor" in2="SourceAlpha" operator="in" result="shadowMask"/>
        <feOffset in="shadowMask" dx="9" dy="9" result="shadowOffset"/>
        <feMerge>
          <feMergeNode in="shadowOffset"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
  `;
}

function isoCube(x, y, w, h, d, topColor, leftColor, rightColor, stroke = '#111') {
  const x2 = x + w;
  const y2 = y + h;
  return `
    <polygon points="${x},${y} ${x + d},${y - d} ${x2 + d},${y - d} ${x2},${y}"
      fill="${topColor}" stroke="${stroke}" stroke-width="4" shape-rendering="crispEdges"/>
    <polygon points="${x},${y} ${x},${y2} ${x + d},${y2 - d} ${x + d},${y - d}"
      fill="${leftColor}" stroke="${stroke}" stroke-width="4" shape-rendering="crispEdges"/>
    <polygon points="${x2},${y} ${x2 + d},${y - d} ${x2 + d},${y2 - d} ${x2},${y2}"
      fill="${rightColor}" stroke="${stroke}" stroke-width="4" shape-rendering="crispEdges"/>
  `;
}

function pixelShadowBase() {
  return `<path d="M155 472H445V486H416V500H184V486H155Z" fill="#000" opacity=".14" shape-rendering="crispEdges"/>`;
}

function pixelCaption(text, x = 104, width = 392, fontSize = 20) {
  return `
    <rect x="${x}" y="516" width="${width}" height="34" fill="#ffffff" stroke="#888888" stroke-width="2" shape-rendering="crispEdges"/>
    <rect x="${x + 4}" y="520" width="${width - 8}" height="4" fill="#eeeeee" shape-rendering="crispEdges"/>
    <text x="300" y="540" text-anchor="middle" font-family="Courier New, monospace" font-size="${fontSize}" fill="#111111">${text}</text>
  `;
}

function frontArt(product) {
  const a = product.accent;
  const shadowId = `pixel-shadow-${product.id.toLowerCase()}`;
  const start = `
    <svg viewBox="0 0 600 600" role="img" aria-label="${product.name}" style="image-rendering:pixelated;shape-rendering:crispEdges">
      ${svgDefs(shadowId)}
      <rect width="600" height="600" fill="#d4d0c8" shape-rendering="crispEdges"/>
      <rect x="16" y="16" width="568" height="568" fill="#ffffff" stroke="#777777" stroke-width="3" shape-rendering="crispEdges"/>
      <rect x="20" y="20" width="560" height="36" fill="#d4d0c8" stroke="#ffffff" stroke-width="2" shape-rendering="crispEdges"/>
      <line x1="20" y1="56" x2="580" y2="56" stroke="#777777" stroke-width="3" shape-rendering="crispEdges"/>
      <rect x="30" y="29" width="14" height="14" fill="${a}" stroke="#111111" stroke-width="2" shape-rendering="crispEdges"/>
      <text x="52" y="42" font-family="Courier New, monospace" font-size="14" fill="#111111">${product.id} / ICON VIEW</text>
      ${pixelShadowBase()}
  `;
  const end = '</svg>';
  const art = {
    fry: `
      <g filter="url(#${shadowId})">
        ${isoCube(268, 280, 38, 146, 18, '#ffffff', '#d8d8d8', '#ababab')}
        ${isoCube(208, 286, 134, 48, 24, '#ffb9aa', '#ff806a', '#c84f3e')}
        ${isoCube(286, 118, 20, 170, 11, '#fff3a9', '#f4c54d', '#d49d00')}
        <rect x="290" y="132" width="5" height="118" fill="#fff7c8" shape-rendering="crispEdges"/>
        <rect x="224" y="298" width="80" height="5" fill="#ffd2c7" shape-rendering="crispEdges"/>
      </g>
      ${pixelCaption('1 BATATA • 0 CONTATO', 92, 416, 20)}
    `,
    frame: `<rect x="125" y="90" width="350" height="410" fill="${a}" stroke="#111" stroke-width="9"/><rect x="170" y="140" width="260" height="290" fill="#fff" stroke="#111" stroke-width="5" stroke-dasharray="12 8"/><circle cx="300" cy="252" r="72" fill="none" stroke="#111" stroke-width="5" stroke-dasharray="9 9"/><path d="M212 390 Q300 295 388 390" fill="none" stroke="#111" stroke-width="5" stroke-dasharray="9 9"/><text x="196" y="470" font-family="Courier New, monospace" font-size="18">FOTO PENDENTE</text>`,
    box: `
      <g filter="url(#${shadowId})">
        ${isoCube(145, 222, 230, 154, 38, '#ffbcae', a, '#bd4d3c')}
        ${isoCube(238, 268, 112, 82, 20, '#ffffff', '#e8e8e8', '#bdbdbd')}
        <rect x="166" y="244" width="128" height="7" fill="#ffd8d0" shape-rendering="crispEdges"/>
        <rect x="252" y="286" width="58" height="5" fill="#ffffff" shape-rendering="crispEdges"/>
        <text x="190" y="356" font-family="Courier New, monospace" font-size="17" fill="#111111">CAIXA 01</text>
        <text x="260" y="333" font-family="Courier New, monospace" font-size="13" fill="#111111">CAIXA 02</text>
      </g>
      ${pixelCaption('EMERGÊNCIA NÍVEL 2', 112, 376, 20)}
    `,
    cube: `
      <g filter="url(#${shadowId})">
        ${isoCube(198, 208, 172, 172, 44, '#dff1e2', a, '#719a78')}
        <rect x="220" y="238" width="7" height="98" fill="#d7f1dc" shape-rendering="crispEdges"/>
        <rect x="236" y="228" width="86" height="7" fill="#effaf1" shape-rendering="crispEdges"/>
        <path d="M370 210L414 166V338L370 382Z" fill="#638a69" opacity=".45" shape-rendering="crispEdges"/>
        <text x="236" y="316" font-family="Courier New, monospace" font-size="26" font-weight="700" fill="#111111">OBJ</text>
        <rect x="334" y="192" width="12" height="12" fill="#ffffff" shape-rendering="crispEdges"/>
      </g>
      ${pixelCaption('SUBSTITUIÇÃO TEMPORÁRIA', 74, 452, 17)}
    `,
    calendar: `<rect x="100" y="90" width="400" height="390" fill="#fff" stroke="#111" stroke-width="8"/><rect x="100" y="90" width="400" height="90" fill="${a}" stroke="#111" stroke-width="8"/><g stroke="#111" stroke-width="6"><line x1="170" y1="65" x2="170" y2="125"/><line x1="430" y1="65" x2="430" y2="125"/></g><text x="150" y="350" font-family="Times New Roman, serif" font-style="italic" font-size="78">terça-feira</text><text x="174" y="420" font-family="Courier New, monospace" font-size="18">REPETIR ATÉ DEZEMBRO</text>`,
    wallet: `<rect x="115" y="165" width="370" height="255" rx="30" fill="#222" stroke="#111" stroke-width="8"/><rect x="145" y="195" width="135" height="175" fill="#fff" stroke="#111" stroke-width="5"/><path d="M170 205 C150 255 208 270 185 325 C170 355 205 368 195 390" fill="none" stroke="${a}" stroke-width="11"/><rect x="315" y="212" width="125" height="95" fill="${a}" stroke="#111" stroke-width="5"/><circle cx="386" cy="260" r="13" fill="#111"/><text x="150" y="470" font-family="Courier New, monospace" font-size="16">SEM ESPAÇO PARA DINHEIRO</text>`,
    mirror: `<rect x="130" y="305" width="310" height="150" rx="24" fill="${a}" stroke="#111" stroke-width="7"/><circle cx="210" cy="470" r="35" fill="#111"/><circle cx="370" cy="470" r="35" fill="#111"/><path d="M270 310 L275 185 L402 125" fill="none" stroke="#111" stroke-width="17"/><ellipse cx="448" cy="112" rx="92" ry="55" fill="#d8eef8" stroke="#111" stroke-width="6" transform="rotate(-7 448 112)"/><text x="84" y="92" font-family="Courier New, monospace" font-size="17">VISIBILIDADE CORPORATIVA</text>`,
    cheeto: `<ellipse cx="300" cy="455" rx="120" ry="34" fill="#dedede" stroke="#111" stroke-width="6"/><rect x="282" y="292" width="36" height="158" fill="#ddd" stroke="#111" stroke-width="6"/><path d="M235 300 Q300 235 365 300 L347 342 Q300 320 253 342 Z" fill="${a}" stroke="#111" stroke-width="6"/><path d="M300 135 C260 180 355 205 300 285" fill="none" stroke="#111" stroke-width="24" stroke-linecap="round"/><path d="M300 135 C260 180 355 205 300 285" fill="none" stroke="#f18c3f" stroke-width="15" stroke-linecap="round"/><text x="126" y="530" font-family="Times New Roman, serif" font-size="44">PRESERVAR ATÉ DECIDIR</text>`,
    button: `<rect x="95" y="120" width="410" height="330" fill="#eee" stroke="#111" stroke-width="7"/><circle cx="215" cy="275" r="72" fill="${a}" stroke="#111" stroke-width="8"/><circle cx="385" cy="275" r="72" fill="#7dcf78" stroke="#111" stroke-width="8"/><path d="M287 275 H313" stroke="#111" stroke-width="8"/><text x="157" y="388" font-family="Courier New, monospace" font-size="17">APERTE UM</text><text x="337" y="388" font-family="Courier New, monospace" font-size="17">ACENDA OUTRO</text>`,
    charger: `<rect x="108" y="170" width="185" height="250" rx="18" fill="${a}" stroke="#111" stroke-width="7"/><rect x="145" y="205" width="110" height="24" fill="#111"/><path d="M292 280 C360 280 340 390 435 390" fill="none" stroke="#111" stroke-width="10"/><path d="M397 350 Q450 305 493 366 Q500 430 425 446 Q370 415 397 350" fill="#9d9687" stroke="#111" stroke-width="7"/><text x="115" y="475" font-family="Courier New, monospace" font-size="16">CARGA NÃO RECEBIDA: 100%</text>`,
    rock: `
      <g filter="url(#${shadowId})">
        <polygon points="145,362 130,302 164,240 220,198 295,182 366,207 421,263 438,330 407,389 342,430 252,438 182,410"
          fill="#817b70" stroke="#111111" stroke-width="5" shape-rendering="crispEdges"/>
        <polygon points="164,240 220,198 295,182 270,254 204,284" fill="#c7c0b2" shape-rendering="crispEdges"/>
        <polygon points="270,254 295,182 366,207 421,263 349,285" fill="#aaa396" shape-rendering="crispEdges"/>
        <polygon points="204,284 270,254 349,285 324,354 228,360" fill="#958e82" shape-rendering="crispEdges"/>
        <rect x="185" y="238" width="14" height="10" fill="#e8e1d4" shape-rendering="crispEdges"/>
        ${isoCube(328, 116, 138, 198, 18, '#ffffff', '#f5f5f5', '#bdbdbd')}
        <text x="357" y="153" font-family="Courier New, monospace" font-size="16" fill="#111111">MANUAL</text>
        <g stroke="#111111" stroke-width="3" shape-rendering="crispEdges">
          <line x1="350" y1="181" x2="447" y2="181"/>
          <line x1="350" y1="207" x2="447" y2="207"/>
          <line x1="350" y1="233" x2="447" y2="233"/>
          <line x1="350" y1="259" x2="430" y2="259"/>
        </g>
        <rect x="341" y="130" width="7" height="86" fill="#ffffff" shape-rendering="crispEdges"/>
      </g>
      ${pixelCaption('OPERAR COM CUIDADO', 110, 380, 20)}
    `,
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
