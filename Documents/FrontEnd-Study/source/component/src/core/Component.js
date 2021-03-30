export default class Component {
    $target;
    $state;
    $props; // ✏️
    constructor($target, $props) {
      this.$target = $target;
      this.$props = $props; // ✏️ $props 할당
      this.setup();
      this.setEvent();
      this.render();
    }
    setup() {}
    mounted() {} // ✏️
    template() { return ''; }
    render() {
      this.$target.innerHTML = this.template();
      this.mounted(); // ✏️ render 후에 mounted가 실행된다.
    }
    setEvent() {}
    setState(newState) {
      this.$state = { ...this.$state, ...newState };
      this.render();
    }

    addEvent(eventType, selector, callback){
      const childeren = [...this.$target.querySelectorAll(selector)];
      // selector에 명시한 것보다 더 하위 요소가 선택된 경우엔
      // closest를 이용하여 처리한다.

      /* childeren 내부에 요소가 있으면 바로 끝나고, 
      해당 요소와 무관한 부분이 target일 때는 closest 해도 null을 반환해 if문에서 걸러지고
      해당 요소보다 더 하위 요소가 선택된 경우에는 children 안에는 없지만 target.closest를 통해 가까운 해당 선택자 요소를 찾게한다.
      */
      const isTarget = (target) => childeren.includes(target) || target.closest(selector);
      this.$target.addEventListener(eventType, event => {
        if(!isTarget(event.target)) return false;
        callback(event);
      });
    }
  }