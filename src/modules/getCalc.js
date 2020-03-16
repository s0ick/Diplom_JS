const getCalc = () => {
  const price = document.querySelector('.price');
  if(!!price) {
    let price = {};
    const priceTotal = document.getElementById('price-total'),
          promoCode = document.querySelector('.price-message input'),
          card = document.getElementById('card_order'),
          bodyInput = document.getElementById('card_leto_mozaika'),
          inputMonth = document.querySelectorAll('.time input');

    let count = 0,
        countInterval = 0;
        
    const countSum = () => {
      countInterval = requestAnimationFrame(countSum);
      count++;
      if(bodyInput.checked) {
        price = {
          1: 2999,
          6: 14990,
          9: 21990,
          12: 24990
        };
      } else {
        price = {
          1: 1999,
          6: 9900,
          9: 13900,
          12: 19900
        };
      }
      let total = 0;
      inputMonth.forEach(item => {
        if(item.checked) {
          total = price[item.value];
          if(promoCode.value === 'ТЕЛО2020') {
            total = Math.floor(total * 0.7);
          } else total = price[item.value];
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
    card.addEventListener('change', event => {
      let target = event.target;
      if(target.placeholder === 'Промокод' || target.type === 'radio' ) {
        countInterval = requestAnimationFrame(countSum);
      }
    });
}

};
export default getCalc;