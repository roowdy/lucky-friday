(() => {
  const refs = {
    openMenuBtn: document.querySelector('[data-menu-open]'),
    closeMenuBtn: document.querySelector('[data-menu-close]'),
    menu: document.querySelector('[data-menu]'),
  };

  refs.openMenuBtn.addEventListener('click', toggleModal);
  refs.closeMenuBtn.addEventListener('click', toggleModal);

  function toggleModal() {
    refs.menu.classList.toggle('is-open');
  }
})();

const refs = {
  divMobEl: document.querySelector('.mobile-menu'),
  navigationEl: document.querySelector('.menu-navigation'),
};

refs.navigationEl.addEventListener('click', closeMobMenue);

function closeMobMenue(e) {
  if (e.target.nodeName === 'A') {
    refs.divMobEl.classList.remove('is-open');
  }
}
