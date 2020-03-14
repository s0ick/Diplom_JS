const scroll = () => {
  const totop = document.getElementById('totop');
  totop.style.opacity = 0;
  totop.style.transition = '0.2s';
  window.addEventListener('scroll', () => {
    if(window.pageYOffset >= 700) totop.style.opacity = 1;
    else totop.style.opacity = 0;
  });

  const activeScrolling = (blockID) => {
    document.querySelector('' + blockID).scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  };

  totop.addEventListener('click', event => {
    event.preventDefault();
    const blockID = '#top';
    activeScrolling(blockID);
  });

  document.body.addEventListener('click', (event) => {
    let target = event.target;
    if(target.tagName === 'A' && target.hash !== '#' && target.hash !== '' ) {
      event.preventDefault();
      const blockID = target.getAttribute('href');
      activeScrolling(blockID);
    }
  });
};
export default scroll;