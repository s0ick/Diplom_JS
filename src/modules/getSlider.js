const getSliders = () => {
  const headSlider = document.querySelector('.head-slider'),
        gallerySlider = document.querySelector('.gallery-bg');

  const addSlider = (slider) => {
    const wrapper = slider.querySelector('.wrapper'),
          slide = wrapper.querySelectorAll('.slide'),
          dots = wrapper.querySelectorAll('.slider-dots li');    
    let currentSlider = 0,
        intervalSlider = 0;

    const prevSlide = (elem, index, strClass) => {
      elem[index].classList.remove(strClass);
    };
    const nextSlide = (elem, index, strClass) => {
      elem[index].classList.add(strClass);
    };

    const autoplay = () => {
      prevSlide(slide, currentSlider, 'slide-active');
      prevSlide(dots, currentSlider, 'slick-active');
      currentSlider++;
      if(currentSlider >= slide.length) currentSlider = 0;
      nextSlide(slide, currentSlider, 'slide-active');
      nextSlide(dots, currentSlider, 'slick-active');
    };

    const startSlide = () => {
      intervalSlider = setInterval(autoplay, 4000);
    };
    const stopSlide = () => {
      clearInterval(intervalSlider);
    };

    slider.addEventListener('click', (event) => {
      event.preventDefault();
      let target = event.target;

      if(!target.matches('li')) return;
      
      prevSlide(slide, currentSlider, 'slide-active');
      prevSlide(dots, currentSlider, 'slick-active');

      if(target.matches('.arrow-right')) {
        currentSlider++;
      } else if(target.matches('.arrow-left')) {
        currentSlider--;
      } else if(target.matches('li')) {
        dots.forEach((item, index) => {
          if(item === target) currentSlider = index;
        });
      }

      if(currentSlider >= slide.length) currentSlider = 0;
      if(currentSlider < 0) currentSlider = slide.length -1;

      nextSlide(slide, currentSlider, 'slide-active');
      nextSlide(dots, currentSlider, 'slick-active');
    });

    slider.addEventListener('mouseover', (event) => {
      if(event.target.matches('li')) {
        stopSlide();
      }    
    });
    slider.addEventListener('mouseout', (event) => {
      if(event.target.matches('li')) {
        startSlide();
      }     
    });
    startSlide();
  };
  console.log(document.location.pathname);
  if(document.location.pathname === '/index.html' || document.location.pathname === '/') addSlider(headSlider);
  addSlider(gallerySlider);

};
export default getSliders;