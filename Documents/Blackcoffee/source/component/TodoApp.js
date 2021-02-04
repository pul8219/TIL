
export function TodoApp($div){
    const $ul = $div.querySelector('#todo-list');

    this.render = () => {
        console.log(this);
    }
}