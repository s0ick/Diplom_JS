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
export default getCalc;