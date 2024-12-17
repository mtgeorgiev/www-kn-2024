
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

const displaySuccessMessage = (message) => {
  let successElement = document.createElement('div');
  successElement.innerText = message;
  successElement.setAttribute('id', 'register-success');
  successElement.classList.add('success');

  document.getElementById('register-form').appendChild(successElement);
}

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

          for (let element of event.target.getElementsByClassName('success')) {
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
            })
            .then(response => response.json())
            .then(data => {
              if (!data.error) {
                 displaySuccessMessage("You have successfully registered");
                 setTimeout(() => {
                   hideRegisterForm();
                 }, 3500);
              } else {
                displayRegisterError(data.error);
              }
            });
          }
        });

const logout = () => {
  fetch('./session.php', {
        method: 'DELETE'
    }).then(response => response.json())
      .then(r => {
        console.log('reloading the page')
        document.location.reload();
      });
}

const showContentVisibleForLoggedUsers = () => {
  for (let visibleElement of document.getElementsByClassName('visible-for-logged-user')) {
    visibleElement.classList.remove('hidden');
  }
}

document.getElementById('logout-button').addEventListener('click', logout);

const checkLoginStatus = () => {
   fetch('./session.php')
    .then(response => response.json())
    .then(data => {
      if (data.username) {
        showContentVisibleForLoggedUsers();
      } else {
        document.getElementById('login-form').classList.remove('hidden');
      }
    });
}

const login = () => {
  let formData = new FormData(document.getElementById('login-form'));

  fetch('./session.php',
        {
            method: 'POST',
            body: formData
        }).then(response => response.json())
          .then(response => {
            if (response.username) {
              showContentVisibleForLoggedUsers();
            }
          });
}

document.getElementById('login-form').addEventListener('submit', event => {
  event.preventDefault();
  login();
});

checkLoginStatus();

class MishoElement extends HTMLElement {
    constructor() {
      super();
    }
    sayHi() {
      console.log('hello there');
    }
}

window.customElements.define('misho-tag', MishoElement);