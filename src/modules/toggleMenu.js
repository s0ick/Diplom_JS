const toggleMenu = () => {
  const paretBlock = document.querySelector('.top-menu'),
        headerMain = document.querySelector('.header-main'),
        popupMune = document.querySelector('.popup-menu');
  window.addEventListener('scroll', () => {
    if(window.pageYOffset >= 190 && document.documentElement.clientWidth <= 767) {
      paretBlock.style.cssText = `
        position: fixed;
        z-index: 100;
        top: 0`;
    } else {
      paretBlock.style.position = 'initial';
    }
  });
  headerMain.addEventListener('click', event => {
    let target = event.target;
    if(target.closest('.menu-button')) {
      popupMune.style.display = 'flex';
    } else if(target.matches('a')) {
      popupMune.style.display = 'none';
    } else if(target.closest('.close-menu-btn')) {
      popupMune.style.display = 'none';
    }
  });
};
export default toggleMenu;