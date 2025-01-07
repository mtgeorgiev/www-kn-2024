
const userActions = {
    login: () => {
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
    },
    logout: () => {
      fetch('./session.php', {
            method: 'DELETE'
        }).then(response => response.json())
          .then(r => {
            console.log('reloading the page')
            document.location.reload();
          });
    }
  };