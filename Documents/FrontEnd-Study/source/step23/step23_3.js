const div = document.getElementById('parent');
const clearbtn = document.getElementById('clearbtn');
const result = document.getElementById('result');

// id가 parent인 div를 떠나면(parent 내부의 child로 가는 것은 떠나는 것 아님) 하단에 빨간 박스를 띄우고 싶다고 해보자.

div.addEventListener('mouseout', (event) => {
    if(event.target.id=='parent' && event.relatedTarget.id !== 'child'){ // parent를 떠난 것이면서 child로 들어간 경우는 제외해야한다.
        result.innerHTML+= `<div id='red_box'></div>`;

    }
});

clearbtn.addEventListener('click', (event) => {
  result.innerHTML= '';
  count = 0;
});
