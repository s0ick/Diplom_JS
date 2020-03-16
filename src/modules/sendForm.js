import modalActive from '../modules/modalActive';
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
    const checkBox = target.querySelector('[type=checkbox]'),
          radioBox = target.querySelectorAll('[type=radio]');
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
          if(target.elements[i].type !== 'radio' && target.elements[i].tagName === 'INPUT') {
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
export default sendForm;