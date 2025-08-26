(() => {
  const openBtn = document.getElementById('openContactFab');
  const popup = document.getElementById('contactPopup');
  const closeBtn = document.getElementById('closeContactPopup');
  const form = document.getElementById('contactForm');

  function openPopup(){
    if(!popup) return;
    popup.hidden = false;
    popup.classList.add('is-open');
  }
  function closePopup(){
    if(!popup) return;
    popup.classList.remove('is-open');
    setTimeout(() => { popup.hidden = true; }, 200);
  }

  openBtn && openBtn.addEventListener('click', openPopup);
  closeBtn && closeBtn.addEventListener('click', closePopup);
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closePopup(); });

  form && form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const payload = Object.fromEntries(data.entries());
    console.log('Contato enviado (mock):', payload);
    form.reset();
    closePopup();
    alert('Obrigado! Entraremos em contato em breve.');
  });
})();

