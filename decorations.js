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
  const text = (selector, value) => {
    const target = document.querySelector(selector);
    if (target) target.textContent = value;
  };
  const html = (selector, value) => {
    const target = document.querySelector(selector);
    if (target) target.innerHTML = value;
  };
  const texts = (selector, values) => {
    document.querySelectorAll(selector).forEach((target, index) => {
      if (values[index] !== undefined) target.textContent = values[index];
    });
  };

  append('.hero', 'nuvem_static_room (1).png', 'asset-doodle doodle-cloud', true);
  append('.hero', 'ChatGPT Image Jul 28, 2026, 12_03_48 AM (5).png', 'asset-doodle doodle-orbit', true);
  append('.drop-section', 'mola_static_room (1).png', 'asset-doodle doodle-spring');
  append('.drop-section', 'estrela_static_room (1).png', 'asset-doodle doodle-star');
  append('.manifesto', 'espiral_static_room (1).png', 'asset-doodle doodle-spiral');
  append('.archive', 'ChatGPT Image Jul 28, 2026, 12_03_47 AM (1).png', 'asset-doodle doodle-archive');
  append('.newsletter', 'espiral_static_room (1).png', 'asset-doodle doodle-news');

  const note = document.querySelector('.note-card');
  if (note) note.prepend(makeImage('ChatGPT Image Jul 28, 2026, 12_03_48 AM (5).png', 'note-scrap'));

  const brand = document.querySelector('.brand');
  if (brand) {
    const logo = document.createElement('img');
    logo.className = 'brand-logo';
    logo.src = file('logostaticroom.png?v=2');
    logo.alt = 'Static Room, departamento de decisões questionáveis';
    logo.draggable = false;
    logo.decoding = 'async';
    logo.loading = 'eager';
    brand.replaceChildren(logo);

    const brandStyle = document.createElement('style');
    brandStyle.textContent = `
      .site-nav{
        overflow:visible !important;
      }
      .site-nav .brand{
        display:flex;
        align-items:flex-start;
        flex:0 0 auto;
        height:78px;
        overflow:visible;
        transform:none !important;
        text-shadow:none !important;
      }
      .site-nav .brand-logo{
        display:block;
        width:clamp(340px,34vw,520px);
        height:auto;
        max-width:none;
        max-height:none;
        object-fit:contain;
        object-position:left top;
        transform:translateY(-17px);
        filter:drop-shadow(2px 3px 0 rgba(19,13,22,.35));
      }
      @media(max-width:900px){
        .site-nav .brand-logo{
          width:clamp(300px,42vw,410px);
          transform:translateY(-13px);
        }
      }
      @media(max-width:620px){
        .site-nav .brand{
          height:66px;
        }
        .site-nav .brand-logo{
          width:280px;
          transform:translateY(-9px);
        }
      }
    `;
    document.head.appendChild(brandStyle);
  }

  document.title = 'Static Room | infelizmente, uma marca';
  const description = document.querySelector('meta[name="description"]');
  if (description) description.content = 'Static Room. Roupas para quem já transformou falta de personalidade em direção criativa.';

  const ticker = 'SIM, É UMA LOJA ★ NÃO, O SITE NÃO VAI FICAR MAIS NORMAL ★ VOCÊ PODE IR EMBORA, MAS JÁ CARREGOU AS IMAGENS ★';
  texts('.top-strip .ticker span', [ticker, ticker]);

  const navArtwork = [
    { src: 'coisasavenda.png?v=1', label: 'Coisas à venda' },
    { src: 'textoobrigatorio.png?v=1', label: 'Texto obrigatório' },
    { src: 'arquivosinuteis.png?v=1', label: 'Arquivos inúteis' },
    { src: 'darseuemail.png?v=1', label: 'Dar seu e-mail' }
  ];
  document.querySelectorAll('.nav-links a').forEach((link, index) => {
    const item = navArtwork[index];
    if (!item) return;
    const image = makeImage(item.src, 'nav-label-image', true);
    link.setAttribute('aria-label', item.label);
    link.replaceChildren(image);
  });
  const navArtworkStyle = document.createElement('style');
  navArtworkStyle.textContent = `
    .site-nav .nav-links{
      gap:clamp(8px,1.25vw,22px);
    }
    .site-nav .nav-links a{
      display:flex;
      align-items:center;
      justify-content:center;
      min-height:52px;
      padding:4px 2px;
      line-height:0;
      text-shadow:none;
    }
    .site-nav .nav-label-image{
      display:block;
      width:auto;
      height:clamp(30px,2.45vw,42px);
      max-width:clamp(112px,10vw,172px);
      object-fit:contain;
      filter:drop-shadow(1px 2px 0 rgba(19,13,22,.38));
      transition:transform .18s ease;
    }
    .site-nav .nav-links a:hover .nav-label-image,
    .site-nav .nav-links a:focus-visible .nav-label-image{
      transform:translateY(-2px) rotate(-1deg);
    }
    @media(max-width:900px){
      .site-nav .nav-links a{
        justify-content:flex-start;
        min-height:58px;
        padding:7px 4px;
      }
      .site-nav .nav-label-image{
        height:40px;
        max-width:230px;
      }
    }
  `;
  document.head.appendChild(navArtworkStyle);

  const cart = document.querySelector('.cart-pill');
  if (cart?.firstChild) cart.firstChild.nodeValue = 'sacola.exe ';

  const heroEyebrow = document.querySelector('.hero .eyebrow');
  if (heroEyebrow) {
    heroEyebrow.classList.add('hero-collection-sticker');
    let collectionImage = heroEyebrow.querySelector('.hero-collection-image');
    if (!collectionImage) {
      collectionImage = document.createElement('img');
      collectionImage.className = 'hero-collection-image';
      heroEyebrow.replaceChildren(collectionImage);
    }
    collectionImage.src = file('colecao001.png?v=5');
    collectionImage.alt = 'Coleção 001, infelizmente disponível';
    collectionImage.draggable = false;
    collectionImage.decoding = 'async';
    collectionImage.loading = 'eager';
    heroEyebrow.setAttribute('aria-label', collectionImage.alt);
  }

  html('.hero h1', 'COMPRE A <span>NOSSA FASE.</span>');
  text('.hero-copy p', 'Fizemos roupas porque desenvolver uma personalidade coerente estava tomando tempo demais.');
  texts('.hero-actions .btn', ['ver coisas com preço ↗', 'ler a justificativa']);
  text('.console-bar > span:first-child', 'tentando-parecer-empresa.exe');
  text('.console-body strong', 'Credibilidade carregando...');
  texts('.console-meta span', ['produto: real', 'projeto: discutível']);
  text('.scroll-note', 'continue. já pagamos a hospedagem ↓');

  const marquee = 'VOCÊ NÃO PRECISA DISSO ★ NÓS PRECISAMOS QUE VOCÊ PRECISE ★ <b>STATIC ROOM</b> ★ ROUPAS PARA A PARTE EXTERNA DO PROBLEMA ★ ';
  document.querySelectorAll('.marquee-track span').forEach((target) => { target.innerHTML = marquee; });

  text('.drop-section .section-tag', 'OBJETOS JURIDICAMENTE CLASSIFICADOS COMO PRODUTOS');
  html('.drop-section .section-title', 'Coisas <span class="outline">à venda</span>');
  text('.drop-section .section-lead', 'Três peças selecionadas entre as três peças que conseguimos terminar. A curadoria foi brutal.');
  const stickerCopy = ['quantidade<br>contável', 'conceito<br>lavável', 'mangas<br>incluídas'];
  document.querySelectorAll('.product-card .sticker').forEach((target, index) => {
    if (stickerCopy[index]) target.innerHTML = stickerCopy[index];
  });
  texts('.product-meta > span', ['camiseta grande', 'moletom que pesa', 'camiseta com mais manga']);
  const productLinks = document.querySelectorAll('.product-link');
  ['Ver Static Core, uma camiseta grande', 'Ver Lost Signal, um moletom que pesa', 'Ver Brain Rot, uma camiseta com mais manga'].forEach((label, index) => {
    productLinks[index]?.setAttribute('aria-label', label);
  });

  text('.manifesto .section-tag', 'TEXTO PARA O PRODUTO PARECER NECESSÁRIO');
  html('.manifesto-copy blockquote', 'A INTERNET FICOU LISA DEMAIS. AÍ A GENTE FEZ <em>UMA CAMISETA.</em>');
  text('.manifesto-copy p', 'Isto deveria explicar uma revolta geracional, a morte da autenticidade e o colapso da cultura. Na prática, gostamos de coisas tortas, imprimimos algumas delas em tecido e agora precisamos chamar isso de movimento. Você leu até aqui, então a responsabilidade já não é só nossa.');
  text('.manifesto .scribble', 'NÃO É UMA TREND. É FALTA DE SUPERVISÃO.');

  const fourthWallStyle = document.createElement('style');
  fourthWallStyle.textContent = '.eye-poster::after{content:"VOCÊ CHEGOU NA PARTE DO CONCEITO" !important}';
  document.head.appendChild(fourthWallStyle);

  text('.archive .section-tag', 'CONTEÚDO PARA O SITE NÃO PARECER SÓ UMA LOJA');
  html('.archive .section-title', 'olhe oque estão dizendo sobre a static room:');

  const archive = document.querySelector('.archive');
  const archiveGrid = archive?.querySelector('.archive-grid');
  if (archive && archiveGrid) {
    const commentCloud = document.createElement('div');
    commentCloud.className = 'comment-cloud';
    commentCloud.setAttribute('aria-label', 'Comentários sobre a Static Room');

    const commentFiles = [
      { src: 'comentário01fb.png?v=1', alt: 'Comentário 1 sobre a Static Room' },
      { src: 'comentario02fb.png?v=1', alt: 'Comentário 2 sobre a Static Room' },
      { src: 'comentário03fb.png?v=1', alt: 'Comentário 3 sobre a Static Room' },
      { src: 'comentário04fb.png?v=1', alt: 'Comentário 4 sobre a Static Room' }
    ];

    commentFiles.forEach((item, index) => {
      const figure = document.createElement('figure');
      figure.className = `comment-float comment-float-${index + 1}`;

      const image = document.createElement('img');
      image.className = 'comment-float-image';
      image.src = file(item.src);
      image.alt = item.alt;
      image.draggable = false;
      image.decoding = 'async';
      image.loading = 'lazy';

      figure.appendChild(image);
      commentCloud.appendChild(figure);
    });

    archiveGrid.replaceWith(commentCloud);
  }

  const commentStyle = document.createElement('style');
  commentStyle.textContent = `
    .archive .comment-cloud{
      position:relative;
      z-index:2;
      display:grid;
      grid-template-columns:repeat(2,minmax(0,1fr));
      align-items:center;
      gap:clamp(22px,4vw,64px);
      width:min(100%,1280px);
      margin:clamp(34px,5vw,72px) auto 0;
    }
    .archive .comment-float{
      position:relative;
      display:flex;
      align-items:center;
      justify-content:center;
      margin:0;
      line-height:0;
    }
    .archive .comment-float:nth-child(even){
      margin-top:clamp(18px,3vw,48px);
    }
    .archive .comment-float-image{
      display:block;
      width:min(100%,620px);
      height:auto;
      max-width:100%;
      object-fit:contain;
      filter:drop-shadow(7px 8px 0 rgba(19,13,22,.48));
      will-change:transform;
    }
    @keyframes sr-comment-float-1{
      0%,100%{transform:translate3d(0,0,0) rotate(-1.1deg)}
      50%{transform:translate3d(2px,-10px,0) rotate(-.65deg)}
    }
    @keyframes sr-comment-float-2{
      0%,100%{transform:translate3d(0,0,0) rotate(1deg)}
      50%{transform:translate3d(-3px,-12px,0) rotate(.55deg)}
    }
    @keyframes sr-comment-float-3{
      0%,100%{transform:translate3d(0,0,0) rotate(.45deg)}
      50%{transform:translate3d(3px,-9px,0) rotate(.95deg)}
    }
    @keyframes sr-comment-float-4{
      0%,100%{transform:translate3d(0,0,0) rotate(-.55deg)}
      50%{transform:translate3d(-2px,-11px,0) rotate(-1deg)}
    }
    .archive .comment-float-1 .comment-float-image{animation:sr-comment-float-1 7.2s ease-in-out infinite}
    .archive .comment-float-2 .comment-float-image{animation:sr-comment-float-2 8.1s ease-in-out -.9s infinite}
    .archive .comment-float-3 .comment-float-image{animation:sr-comment-float-3 7.7s ease-in-out -1.8s infinite}
    .archive .comment-float-4 .comment-float-image{animation:sr-comment-float-4 8.8s ease-in-out -.4s infinite}
    @media(max-width:760px){
      .archive .comment-cloud{
        grid-template-columns:1fr;
        gap:24px;
      }
      .archive .comment-float:nth-child(even){
        margin-top:0;
      }
      .archive .comment-float-image{
        width:min(100%,680px);
      }
    }
    @media(prefers-reduced-motion:reduce){
      .archive .comment-float-image{
        animation:none !important;
        will-change:auto;
      }
    }
  `;
  document.head.appendChild(commentStyle);

  text('.newsletter h2', 'DÊ SEU E-MAIL.');
  text('.newsletter p', 'Não prometemos conteúdo exclusivo. Prometemos usar a palavra “exclusivo” quando mandarmos.');
  const emailInput = document.querySelector('.signup input');
  if (emailInput) emailInput.placeholder = 'SEUEMAIL@AQUI.COM';
  text('.signup button', 'PIORAR MINHA CAIXA ↗');

  texts('.footer-links a', ['Comprar', 'Justificativa', 'Arquivo', 'Instagram', 'TikTok']);
  html('.footer-meta', 'SITE FEITO COM DIREÇÃO CRIATIVA E SONO INSUFICIENTE<br>FOZ DO IGUAÇU, BRASIL<br>© 2026 STATIC ROOM<br>TODOS OS ERROS RESERVADOS');

  const form = document.querySelector('.signup');
  const message = document.querySelector('.form-message');
  form?.addEventListener('submit', () => {
    const email = form.querySelector('input')?.value.trim();
    queueMicrotask(() => {
      if (message) message.textContent = email ? 'OBRIGADO. AGORA SOMOS DUAS PESSOAS COM UM PROBLEMA.' : 'NEM O E-MAIL QUIS PARTICIPAR. TENTE DE NOVO.';
    });
  }, true);
})();