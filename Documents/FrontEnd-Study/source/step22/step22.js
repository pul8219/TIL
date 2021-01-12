// mousedown 이벤트와 선택 막기
let test1 = document.getElementById('test1');
test1.addEventListener('mousedown', function(event){
 
    event.preventDefault();
});
test1.addEventListener('dblclick', function(){
    alert('dblclick');
});