const getSelectList = () => {
  const clubsList = document.querySelector('.clubs-list'),
        headMian = document.querySelector('.head-main'),
        clubsListUl = document.querySelector('.clubs-list ul');    
        
  headMian.addEventListener('click', event => {
    let target = event.target;

    const toggle = (elem) => {
      elem.style.display = (elem.style.display === 'block') ? '' : 'block';
    };
     if(target.tagName === 'P') toggle(clubsListUl);
     else if(!target.matches('ul>li')) clubsListUl.style.display = 'none';
  });
};
export default getSelectList;