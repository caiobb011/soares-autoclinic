(() => {
  const menuButton = document.querySelector('#menu-toggle');
  const menu = document.querySelector('#main-nav');
  const header = document.querySelector('.header');
  const closeMenu = () => {
    menu?.classList.remove('open');
    menuButton?.classList.remove('active');
    menuButton?.setAttribute('aria-expanded', 'false');
    menuButton?.setAttribute('aria-label', 'Abrir menu');
    document.body.classList.remove('menu-open');
  };
  menuButton?.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('open');
    menuButton.classList.toggle('active', isOpen);
    menuButton.setAttribute('aria-expanded', String(isOpen));
    menuButton.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
    document.body.classList.toggle('menu-open', isOpen);
  });
  menu?.querySelectorAll('a').forEach((a) => a.addEventListener('click', closeMenu));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeMenu(); });
  window.addEventListener('scroll', () => header?.classList.toggle('scrolled', window.scrollY > 24), { passive:true });
  document.querySelector('#year').textContent = new Date().getFullYear();
  document.querySelector('#whatsapp-form')?.addEventListener('submit', (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const name = form.elements.nome.value.trim();
    const car = form.elements.veiculo.value.trim();
    const issue = form.elements.mensagem.value.trim();
    if (issue.length < 5) { form.elements.mensagem.setCustomValidity('Descreva o problema com pelo menos 5 caracteres.'); form.reportValidity(); return; }
    form.elements.mensagem.setCustomValidity('');
    const lines = [ 'Olá! Conheci a Soares Autoclinic pelo site e gostaria de solicitar um orçamento.', name && `Meu nome: ${name}`, car && `Veículo: ${car}`, `O que está acontecendo: ${issue}` ].filter(Boolean);
    const url = 'https://wa.me/5521966188991?text=' + encodeURIComponent(lines.join('\n'));
    const opened = window.open(url, '_blank', 'noopener,noreferrer');
    if (!opened) window.location.href = url;
  });
  document.querySelector('#mensagem')?.addEventListener('input', e => e.target.setCustomValidity(''));
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('in-view'); observer.unobserve(entry.target); } });
    }, {threshold: 0.08});
    document.querySelectorAll('.section-intro, .service-card, .manifesto-main, .review, .contact-intro, .form-panel, .location-title, .location-info').forEach(el => { el.classList.add('fade-up'); observer.observe(el); });
  }
})();
