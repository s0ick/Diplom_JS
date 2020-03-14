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
export default getSelectList;