const btnConnect = document.querySelector('.btnconnect');
const email = document.querySelector('input[type="email"]');
const password = document.querySelector('input[type="password"]');
const hideIntro = document.querySelector(".hideIntro");
const displayBtnlogout = document.querySelector('.displayBtnlogout');
const displayModaltop = document.querySelector('.displayModaltop');
const displayModalintro1 = document.querySelector('.displayModalintro1');
const displayModalprojets = document.querySelector('.displayModalprojets');
const displayModalintro2 = document.querySelector('.displayModalintro2');
const displaybtnlogin = document.querySelector('.displayoffEdit');

// Écouteur d'événement pour le bouton de connexion
btnConnect.addEventListener('click', e => {
    e.preventDefault();
    // Préparer les données à envoyer à l'API
    const data = {
        email: email.value,
        password: password.value
    };
    // Envoyer les données à l'API en utilisant la méthode fetch()
    fetch('http://localhost:5678/api/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            if (!response.ok) {
                window.alert("Mauvais identifiants");
                throw new Error('Identifiants incorrects');

            }
            return response.json();
        })
        .then(data => {
            // Stocker le jeton d'accès dans le navigateur
            localStorage.setItem('token', data.token);
            // Rediriger vers la page protégée
            window.location.href = "/FrontEnd/index.html";
        })
        .catch(error => {
            console.error(error);
        });
});
