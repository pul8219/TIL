const div = document.getElementById('out_div');
const clearbtn = document.getElementById('clearbtn');
const result = document.getElementById('result');

div.addEventListener('mouseover', (event) => {
  result.innerHTML+= `<div>${event.type} ${event.target.id}</div>`;
});

div.addEventListener('mouseout', (event) => {
  result.innerHTML+= `<div>${event.type} ${event.target.id}</div>`;
});

clearbtn.addEventListener('click', (event) => {
  result.innerHTML= '';
  count = 0;
});
