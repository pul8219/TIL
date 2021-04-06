// 코드스피츠 객체지향 자바스크립트 4회차

const ViewModelSubject = class extends ViewModelListener{
    #info = new Set;
    #listeners = new Set;

    add(v, _ = type(v, ViewModelValue)){ this.#info.add(v); }
    clear(){ this.#info.clear(); }
    addListener(v, _ = type(v, ViewModelListener )){
        this.#listeners.add(v);
        ViewModelSubject.watch(this);
    }
    removeListener(v, _ = type(v, ViewModelListener)){
        this.#listeners.delete(v);
        if(!this.#listeners.size) ViewModelSubject.unwatch(this);
    }
    notify(){this.#listeners.forEach(v => v.viewmodelUpdated(this.#info));}

    /**  static 부분 */
    static #subjects = new Set;
    static #inited = false;
    static notify(){
        const f = _ => {
            this.#subjects.forEach(v => {
                if(v.#info.size){
                    v.notify();
                    v.clear();
                }
            });
            if(this.#inited) requestAnimationFrame(f);
        };
        requestAnimationFrame(f);
    }
    static watch(vm, _ = type(vm, ViewModelListener)){
        this.#subjects.add(vm);
        if(!this.#inited){
            this.#inited = true;
            this.notify();
        }
    }
    static unwatch(vm, _ = type(vm, ViewModelListener)){
        this.#subjects.delete(vm);
        if(!this.#subjects.size) this.#inited = false;
    }
}

// 새로운 ViewModel

// 새로운 Scanner
// 고쳐야함
const Scanner = class {
  scan(el, _ = type(el, HTMLElement)) {
    const binder = new Binder();

    // 인자로 준 el 도 check 해야함
    this.checkItem(binder, el);

    // 가장 빠른 DOM Loop임 *
    const stack = [el.firstElementChild];
    let target;
    while ((target = stack.pop())) {
      this.checkItem(binder, target);
      if (target.firstElementChild) stack.push(target.firstElementChild);
      if (target.nextElementSibling) stack.push(target.nextElementSibling);
    }
    return binder; // scan의 결과로 Binder를 리턴해야함
  }

  checkItem(binder, el) {
    const vm = el.getAttribute('data-viewmodel'); // hook이 있으면
    if (vm) binder.add(new BinderItem(el, vm)); // binder에 새로운 binderItem(element와 viewmodel hook값을 넣은)을 넣어주기
  }
};
