const getCalc = () => {
  const price = document.querySelector('.price');
  if(!!price) {
    const price = {
      1: 1999,
      6: 9900,
      9: 13900,
      12: 19900
    },
    priceTotal = document.getElementById('price-total'),
    promoCode = document.querySelector('.price-message input'),
    card = document.getElementById('card_order'),
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
      if((target.placeholder === 'Промокод' || target.type === 'radio' ) && target.name !== 'club-name') {
        countInterval = requestAnimationFrame(countSum);
      }
    });
}

};
export default getCalc;