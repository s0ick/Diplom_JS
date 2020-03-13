document.addEventListener('DOMContentLoaded', () => {
  'use strict';
  
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

  const toggleModal = () => {
    const body = document.querySelector('body');
    let formContent;

    const modalActive = (elem) => {
      const modalId = document.querySelector(elem);
      if(elem !== '#gift') {
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
    
    body.addEventListener('click', event => {
      let target = event.target;
      if(target.tagName === 'A') event.preventDefault();
      if(target.dataset.popup) {
        modalActive(target.dataset.popup);
      } else if (target.closest('div.fixed-gift')) {
        target.style.display = 'none';
        modalActive('#gift');
      }
    });
  };
  toggleModal();

  const sendForm = () => {
    const errorMessege = `Что-то пошло не так...`,
          statusMessage = document.createElement('div');
  
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
    // Валидация для инпутов
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
      if(checkBox.checked) {
        const ajaxSettings = (display, margin, idForm) => {
          target.style.display = display;
          if(!!idForm) {
            formWContent = target.closest('.form-content');
          } else {
            formWContent = target.closest('.form-wrapper');
          }
          statusMessage.innerHTML = '';
          statusMessage.style.cssText = ` 
            border: 2px solid #eee;
            width: 35px;
            height: 35px;
            border-radius: 50%;
            margin: auto;`;
          statusMessage.style.marginTop = margin;
          formWContent.appendChild(statusMessage);
          loadIntervalBig = requestAnimationFrame(loadingAnimateBig);

          const formData = new FormData(target);
          let body = {};
          formData.forEach((value, key) => body[key] = value);
          
          postData(body)  
            .then((output) => {
              if(output.status === 200) {
                target.style.display = display;
                statusMessage.innerHTML = '<img src="./images/tick.png">';
                cancelAnimationFrame(loadIntervalBig);
                cancelAnimationFrame(loadIntervalSmall);
                statusMessage.style.cssText = ``;
                statusMessage.style.marginTop = margin;
                setTimeout(() => {
                  statusMessage.innerHTML = '';
                  statusMessage.style.cssText = ``;
                  if(!!idForm) {
                    target.closest('.popup').style.display = 'none';
                  }
                }, 2500);
              } else throw new Error('Statis network now 200');
              
            })
            .catch((error) => {
              target.style.display = display;
              statusMessage.textContent = errorMessege;
              cancelAnimationFrame(loadIntervalBig);
              cancelAnimationFrame(loadIntervalSmall);
              statusMessage.style.cssText = `margin-top: ${margin}; color: #fff;`;
              setTimeout(() => {
                statusMessage.innerHTML = '';
                if(!!idForm) {
                  target.closest('.popup').style.display = 'none';
                }
              }, 2500);
              console.error(error);
            });

          checkBox.checked = false;
          for(let i = 0; i < target.elements.length; i++) {
            if(target.elements[i].tagName === 'INPUT') {
              target.elements[i].value = '';
            }
          }  
        };
        if(target.id === 'banner-form') {
          ajaxSettings('block', '-10px');
        } else {
          ajaxSettings('none', '40%', target.id);
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

  const getDots = () => {
    const headSlider = document.querySelector('.head-slider'),
          wrapper = headSlider.querySelector('.wrapper'),
          slide = headSlider.querySelectorAll('.slide');
    const div = document.createElement('div');
    div.classList.add('slider-dots');
    wrapper.append(div);      
    slide.forEach((item, index) => {
      let li = document.createElement('li');
      if(index === 0) li.classList.add('slick-active');
      div.append(li); 
    });
  };
  getDots();
  
  const getSliders = () => {
    const headSlider = document.querySelector('.head-slider'),
          wrapper = headSlider.querySelector('.wrapper'),
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
  
    wrapper.addEventListener('click', (event) => {
      event.preventDefault();
      let target = event.target;

      if(!target.matches('li')) {
        return;
      }
  
      prevSlide(slide, currentSlider, 'slide-active');
      prevSlide(dots, currentSlider, 'slick-active');
  
      if(target.matches('#arrow-right')) {
        currentSlider++;
      } else if(target.matches('#arrow-left')) {
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
  
    wrapper.addEventListener('mouseover', (event) => {
     if(event.target.matches('li')) {
        stopSlide();
     }   
    });
    wrapper.addEventListener('mouseout', (event) => {
     if(event.target.matches('li')) {
        startSlide();
     }     
    });
  
    startSlide();
  };
  getSliders();

});