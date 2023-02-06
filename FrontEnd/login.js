// Récupération des champs de formulaire
const email = document.querySelector('input[type="email"]');
const password = document.querySelector('input[type="password"]');
const btnConnect = document.querySelector('.btnconnect');

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
            throw new Error('Identifiants incorrects');
        }
        return response.json();
    })
    .then(data => {
        // Stocker le jeton d'accès dans le navigateur
        localStorage.setItem('access_token', data.access_token);
        // Rediriger vers la page protégée
        window.location.href = "/FrontEnd/index-edit.html";
    })
    .catch(error => {
        console.error(error);
    });
});