
let container = document.createElement('div');
container.setAttribute('class', 'relative')

for (let i = 0; i < 20; i ++) {
    let element = document.createElement('div');
    element.setAttribute('class', 'list-element');
    
    let text = document.createTextNode('element ' + (i + 1));
    element.appendChild(text);
    // element.innerHTML = 'element ' + (i + 1);

    container.appendChild(element);
}

document.body.appendChild(container);

class MishoElement extends HTMLElement {
    constructor() {
      super();
    }
    sayHi() {
      console.log('hello there');
    }
}

window.customElements.define('misho-tag', MishoElement);