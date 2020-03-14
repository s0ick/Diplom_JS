const getDots = () => {
  const headSlider = document.querySelector('.head-slider'),
        gallerySlider = document.querySelector('.gallery-bg');

  const addDots = (elem) => {
    const div = document.createElement('div'),
          wrapper = elem.querySelector('.wrapper'),
          slide = elem.querySelectorAll('.slide');
    div.classList.add('slider-dots');
    wrapper.append(div);      
    slide.forEach((item, index) => {
      let li = document.createElement('li');
      if(index === 0) li.classList.add('slick-active');
      div.append(li); 
    });
  };
  if(document.location.pathname === '/index.html' || document.location.pathname === '/') addDots(headSlider);
  addDots(gallerySlider);
};
export default getDots;