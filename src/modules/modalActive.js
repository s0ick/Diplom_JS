const modalActive = (elem) => {
  let formContent;
  const modalId = document.querySelector(elem);
  if(elem !== '#gift' && elem !== '#thanks') {
    formContent = modalId.querySelector('form');
    formContent.style.display = 'block';
  } else {
    setTimeout(() => {
      modalId.style.display = 'none';
    }, 2500);
  }
  modalId.style.display = 'block';
  modalId.addEventListener('click', event => {
    let modalTarget = event.target;
    if(modalTarget.classList.contains('close_icon') || modalTarget.classList.contains('overlay')) {
      modalId.style.display = 'none';
    } else if(modalTarget.classList.contains('close-btn')) {
      modalId.style.display = 'none';
    }
  });
};
export default modalActive;