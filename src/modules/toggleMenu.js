const toggleMenu = () => {
  const paretBlock = document.querySelector('.top-menu'),
        headerMain = document.querySelector('.header-main'),
        popupMune = document.querySelector('.popup-menu'),
        gallery = document.getElementById('gallery'),
        gift = document.querySelector('.fixed-gift');      
  window.addEventListener('scroll', () => {
    if(window.pageYOffset >= 190 && document.documentElement.clientWidth <= 767) {
      gallery.style.display = 'none';
      paretBlock.style.cssText = `
        position: fixed;
        z-index: 100;
        top: 0`;
      gift.style.right = '0px';
      gift.style.top = '63px';   
    } else {
      gallery.style.display = 'block';
      paretBlock.style.position = 'initial';
      gift.style.right = '20px';
      gift.style.top = '15px'; 
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