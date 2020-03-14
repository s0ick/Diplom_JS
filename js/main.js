class SliderCarousel {
  constructor({
      main,
      wrap,
      next,
      prev,
      position = 0,
      slidesToShow = 4,
      infinity = false,
      responsive = [],
  }) {
      if (!main || !wrap) {
          console.warn('slider-carousel: Необходимо ввести 2 свойства(main, wrap)');
      }
      this.main = document.querySelector(main);
      this.wrap = document.querySelector(wrap);
      this.next = document.querySelector(next);
      this.prev = document.querySelector(prev);
      this.slides = document.querySelector(wrap).children;
      this.slidesToShow = slidesToShow;
      this.options = {
          position,
          infinity,
          widthSlide: Math.floor(100 / this.slidesToShow),
          maxPosition: this.slides.length - this.slidesToShow,
      };
      this.responsive = responsive;
  }

  init() {

      this.addStyle();
      this.addGloClass();

      if (this.prev && this.next) {
          this.controlSlider();
      } else {
          this.addArrow();
          this.controlSlider();
      }
      if (this.responsive) {
          this.responsInit();
      }
  }

  addGloClass() {
      this.main.classList.add('glo-slider');
      this.wrap.classList.add('glo-slider__wrap');

      for (const item of this.slides) {
          item.classList.add('glo-slider__item');
      }
  }

  addStyle() {
      let style = document.getElementById('sliderCarousel-style');
      if (!style) {
          style = document.createElement('style');
          style.id = 'sliderCarousel-style';
      }

      style.textContent = `
        .glo-slider {
          overflow: hidden  !important;
        }
        .glo-slider__wrap {
          display: flex !important;
          transition: transform 0.5s !important;
          will-change: transform !important;
        }
        .glo-slider__item {
          display: flex !important;
          align-items: center;
          flex-direction: column;
          flex: 0 0 ${this.options.widthSlide}% !important;
        }
        `;
      document.head.appendChild(style);
  }

  controlSlider() {
      this.prev.addEventListener('click', this.prevSlider.bind(this));
      this.next.addEventListener('click', this.nextSlider.bind(this));
  }

  prevSlider() {
      if (this.options.infinity || this.options.position > 0) {
          --this.options.position;
          if (this.options.position < 0) {
              this.options.position = this.options.maxPosition;
          }
          let translate = 0;
          if(this.options.position * this.options.widthSlide === 0) {
            this.wrap.style.transform = `translateX(-2.5%)`;
          }
          else {
            this.wrap.style.transform = `translateX(-${(this.options.position * this.options.widthSlide) + 4}%)`;
          }
      }
  }

  nextSlider() {
      if (this.options.infinity || this.options.position < this.options.maxPosition) {
          ++this.options.position;

          if (this.options.position > this.options.maxPosition) {
              this.options.position = 0;
          }
          if(this.options.position * this.options.widthSlide === 0) {
            this.wrap.style.transform = `translateX(-2.5%)`;
          }
          else {
            this.wrap.style.transform = `translateX(-${(this.options.position * this.options.widthSlide) + 4}%)`;
          }
      }
  }

  addArrow() {

      this.prev = document.createElement('button');
      this.next = document.createElement('button');

      this.prev.className = 'glo-slider__prev';
      this.next.className = 'glo-slider__next';

      this.main.appendChild(this.prev);
      this.main.appendChild(this.next);

      const style = document.createElement('style');
      style.textContent = `
      .glo-slider__prev,
      .glo-slider__next {
          margin: 0 10px;
          border: 20px solid transparent;
          background: transparent;
      }
      
      .glo-slider__next{
          border-left-color: #19b5fe;
      }
      .glo-slider__prev {
          border-right-color: #19b5fe;
      }
      .glo-slider__prev:hover,
      .glo-slider__next:hover,
      .glo-slider__prev:focus,
      .glo-slider__next:focus {
          background: transparent;
          outline: transparent;
      }
      `;

      document.head.appendChild(style);

  }

  responsInit() {
      const slidesToShowDefault = this.slidesToShow,
          allResponse = this.responsive.map(item => item.breakpoint),
          maxResponse = Math.max(...allResponse);

      const changeSlide = () => {
          this.options.widthSlide = Math.floor(100 / this.slidesToShow);
          this.options.maxPosition = this.slides.length - this.slidesToShow;
          this.addStyle();
      };


      const checkResponse = () => {
          const widthWindow = document.documentElement.clientWidth;

          if (widthWindow < maxResponse) {
              for (let i = 0; i < allResponse.length; i++) {
                  if (widthWindow < allResponse[i]) {
                      this.slidesToShow = this.responsive[i].slideToShow;
                      changeSlide();

                  }
              }
          } else {
              this.slidesToShow = slidesToShowDefault;
              changeSlide();
          }
      };

      checkResponse();

      window.addEventListener('resize', checkResponse);

  }
} 
document.addEventListener('DOMContentLoaded', () => {
  'use strict';
  
  // Drop list
  const getSelectList = () => {
    const clubsList = document.querySelector('.clubs-list'),
          clubsListUl = document.querySelector('.clubs-list ul');    

    clubsList.addEventListener('click', event => {
      let target = event.target;
      const toggle = (elem) => {
        elem.style.display = (elem.style.display === 'block') ? '' : 'block';
      };
      if(target.tagName === 'P') {
        toggle(clubsListUl);
      }
    });
  };
  getSelectList();

  // Modal window behavior
  const modalActive = (elem) => {
    let formContent;
    const modalId = document.querySelector(elem);
    if(elem !== '#gift' && elem !== '#thanks') {
      formContent = modalId .querySelector('form');
      formContent.style.display = 'block';
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
  
  // Modal window activation
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
  toggleModal();

  // Submission settings for each form
  const sendForm = () => {
    const errorMessege = `Что-то пошло не так...`,
          statusMessage = document.createElement('div'),
          thanksModal = document.querySelector('#thanks');
  
    let count = 25,
        loadIntervalBig,
        loadIntervalSmall,
        formWContent;
    
    const loadingAnimateBig = () => {
      loadIntervalBig = requestAnimationFrame(loadingAnimateBig);
       if(count <= 40) {
        count++;
        statusMessage.style.width = count + 'px';
       } else {
        cancelAnimationFrame(loadIntervalBig);
        loadIntervalSmall = requestAnimationFrame(loadingAnimateSmall);
       }
    };
    
    const loadingAnimateSmall = () => {
      loadIntervalSmall = requestAnimationFrame(loadingAnimateSmall);
       if(count >= 5) {
        count--;
        statusMessage.style.width = count + 'px';
       } else {
        cancelAnimationFrame(loadIntervalSmall);
        loadIntervalBig = requestAnimationFrame(loadingAnimateBig);
       }
    };
  
    document.body.addEventListener('click', (event) => {
      let target = event.target;
      if(target.placeholder === 'Ваш номер телефона...') {
        target.value = '+';
      }
    });
    // Validate for inputs
    document.body.addEventListener('input', (event) => {
      let target = event.target;
        if(target.placeholder === 'Ваше имя...') {
          while(target.value.replace(/^[а-яА-ЯёЁ\s]+/g, '')) {
            target.value = target.value.substring(0, target.value.length - 1);
          } if(target.value.trim() === '') target.value = '';
        } else if(target.placeholder === 'Ваш номер телефона...') {
            while(target.value.length === 13  || target.value.slice(1).replace(/[\d]+/g, '')) {
              target.value = target.value.substring(0, target.value.length - 1);
            }
        }
    });
  
    // Action
    document.body.addEventListener('submit', (event) => {
      let target = event.target;
      event.preventDefault();
      const checkBox = target.querySelector('[type=checkbox]');
      let check = true;
      if(!!checkBox) {
        if(checkBox.checked) check = true;
        else check = false;
      }
      if(check) {
        const ajaxSettings = (display, idForm) => {
          target.style.display = display;
          if(!!idForm) {
            formWContent = target.closest('.form-content');
            statusMessage.innerHTML = '';
            statusMessage.style.cssText = ` 
              border: 2px solid #eee;
              width: 35px;
              height: 35px;
              border-radius: 50%;
              margin: auto;
              margin-top: 40%;`;
            formWContent.appendChild(statusMessage);
            loadIntervalBig = requestAnimationFrame(loadingAnimateBig);
          }

          const formData = new FormData(target);
          let body = {};
          formData.forEach((value, key) => body[key] = value);
          
          postData(body)  
            .then((output) => {
              if(output.status === 200) {
                target.style.display = display;
                if(!!idForm) {
                  statusMessage.innerHTML = '<img src="./images/tick.png">';
                  cancelAnimationFrame(loadIntervalBig);
                  cancelAnimationFrame(loadIntervalSmall);
                  statusMessage.style.cssText = `margin-top: 40%;`;
                  setTimeout(() => {
                    statusMessage.innerHTML = '';
                    statusMessage.style.cssText = ``;
                    target.closest('.popup').style.display = 'none';
                  }, 2500);
                } else {
                  thanksModal.style.display = 'block';
                  modalActive('#thanks');
                }
              } else throw new Error('Statis network now 200');
              
            })
            .catch((error) => {
              target.style.display = display;
              if(!!idForm) {
                statusMessage.textContent = errorMessege;
                cancelAnimationFrame(loadIntervalBig);
                cancelAnimationFrame(loadIntervalSmall);
                statusMessage.style.cssText = `margin-top: 40%; color: #fff;`;
                setTimeout(() => {
                  statusMessage.innerHTML = '';
                  target.closest('.popup').style.display = 'none';
                }, 2500);
              }
              console.error(error);
            });

          if(!!checkBox) checkBox.checked = false;
          for(let i = 0; i < target.elements.length; i++) {
            if(target.elements[i].tagName === 'INPUT') {
              target.elements[i].value = '';
            }
          }  
        };
        if(target.id === 'banner-form' || target.id === 'card_order' || 
          target.id === 'footer_form') {
          ajaxSettings('block');
        } else {
          ajaxSettings('none', target.id);
        }

      } else {
        alert('Вы не согласны на обработку данных');
      }
    });
    
    const postData = (body) => {
      return fetch('./server.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });
    };
  };
  sendForm();

  // Add dots for sliders
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
    if(document.location.pathname === '/index.html') addDots(headSlider);
    addDots(gallerySlider);
  };
  getDots();
  
  // Submission settings for each slider
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
    if(document.location.pathname === '/index.html') addSlider(headSlider);
    addSlider(gallerySlider);

  };
  getSliders();

  // Calc init
  const getCalc = () => {
    if(document.location.pathname === '/index.html' || document.location.pathname === '/') {
      const price = {
        1: 1999,
        6: 9900,
        9: 13900,
        12: 19900
      },
      priceTotal = document.getElementById('price-total'),
      promoCode = document.querySelector('.price-message input'),
      inputMonth = document.querySelectorAll('.time input');
      priceTotal.textContent = price[1];

      let count = 0,
          countInterval = 0;
          
      const countSum = () => {
        countInterval = requestAnimationFrame(countSum);
        count++;
        let total = 0;
        inputMonth.forEach(item => {
          if(item.checked) {
            total = price[item.value];
            if(promoCode.value === 'ТЕЛО2019') {
              total = Math.floor(total * 0.7);
            }
          }
        });

        priceTotal.textContent = total;
        if(count * count <= total ) {
          priceTotal.textContent = count * count;
        } else {
          cancelAnimationFrame(countInterval);
          count = 0;
        }
      };

      inputMonth.forEach(item => {
        item.addEventListener('change', event => {
          countInterval = requestAnimationFrame(countSum);
        });
      });
      promoCode.addEventListener('input', () => {
        if(promoCode.value === 'ТЕЛО2019') {
          countInterval = requestAnimationFrame(countSum);
        }
      });
  }

  };
  getCalc();

  // Add smooth scroll and link scroll top
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
  scroll();

  // Menu
  const toggleMenu = () => {
    const paretBlock = document.querySelector('.top-menu'),
          headerMain = document.querySelector('.header-main'),
          popupMune = document.querySelector('.popup-menu');
    window.addEventListener('scroll', () => {
      if(window.pageYOffset >= 190) {
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
      if(target.closest('.top-menu')) {
        popupMune.style.display = 'flex';
      } else if(target.matches('a')) {
        popupMune.style.display = 'none';
      } else if(target.closest('.close-menu-btn')) {
        popupMune.style.display = 'none';
      }
    });
    
    
  };
  toggleMenu();
});