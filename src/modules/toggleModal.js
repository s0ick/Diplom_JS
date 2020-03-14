import modalActive from '../modules/modalActive';
const toggleModal = () => {
  const body = document.querySelector('body');
  
  body.addEventListener('click', event => {
    let target = event.target;
    if(target.href === window.location.href + '#') event.preventDefault();
    if(target.dataset.popup) {
      modalActive(target.dataset.popup);
    } else if (target.closest('div.fixed-gift')) {
      target.style.display = 'none';
      modalActive('#gift');
    }
  });
};
export default toggleModal;