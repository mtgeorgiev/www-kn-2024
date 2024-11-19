
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

const showRegisterForm = () => {
  document.getElementById("register-form")
          .classList.remove("hidden");
};

const hideRegisterForm = () => {
  document.getElementById("register-form")
          .classList.add("hidden");
};

const displayRegisterError = (message) => {
  let errorElement = document.createElement('div');
  errorElement.innerText = message;
  errorElement.setAttribute('id', 'register-error');
  errorElement.classList.add('errors');

  document.getElementById('register-form').appendChild(errorElement);


  // let errorElement = document.getElementById("register-error");
  // errorElement.innerText = message;
  // errorElement.classList.remove("hidden");
};

document.getElementById('show-register-form')
        .addEventListener('click', showRegisterForm);

document.getElementById('hide-register-form')
        .addEventListener('click', hideRegisterForm);

document.getElementById('register-form')
        .addEventListener('submit', event => {
          event.preventDefault();

          for (let element of event.target.getElementsByClassName('errors')) {
            element.parentElement.removeChild(element);
          }

          let password = event.target.querySelector('input[name="password"').value;
          let confirmPassword = event.target.querySelector('input[name="confirm-password"').value;

          if (password !== confirmPassword) {
            displayRegisterError('Passwords do not match');
          } else {
            let body = new FormData(); // new FormData(event.target)
            body.append('username', event.target.querySelector('input[name="username"').value);
            body.append('password', password);


            fetch('./register.php', {
              method: 'POST',
              body: body,
            });
          }
        });




class MishoElement extends HTMLElement {
    constructor() {
      super();
    }
    sayHi() {
      console.log('hello there');
    }
}

window.customElements.define('misho-tag', MishoElement);