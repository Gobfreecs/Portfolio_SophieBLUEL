let btnidActif = -1;

const btnLogin = document.querySelector(".btnlogin");
const btnProjets = document.querySelector(".btnProjets");
const btncontact = document.querySelector(".btncontact");
const displayLogin = document.querySelector(".displayLogin");
const hideIntro = document.querySelector(".hideIntro");
const hidePortofolio = document.querySelector(".hidePortofolio");
const hideContact = document.querySelector(".hideContact");
const email = document.querySelector('input[type="email"]');
const password = document.querySelector('input[type="password"]');
const btnConnect = document.querySelector('.btnconnect');
const displayBtnlogout = document.querySelector('.displayBtnlogout');
const displayModaltop = document.querySelector('.displayModaltop');
const displayModalintro1 = document.querySelector('.displayModalintro1');
const displayModalprojets = document.querySelector('.displayModalprojets');
const displayModalintro2 = document.querySelector('.displayModalintro2');
const displaybtnlogin = document.querySelector('.displayoffEdit');

btnLogin.addEventListener('click', e => {
    e.preventDefault();
    displayLogin.style.display = "block";
    hideIntro.style.display = "none";
    hidePortofolio.style.display = "none";
    hideContact.style.display = "none";
});

btnProjets.addEventListener('click', e => {
    e.preventDefault();
    displayLogin.style.display = "none";
    hideIntro.style.display = "";
    hidePortofolio.style.display = "";
    hideContact.style.display = "";
    window.location.href = "/FrontEnd/index.html#portfolio";
});

btncontact.addEventListener('click', e => {
    e.preventDefault();
    displayLogin.style.display = "none";
    hideIntro.style.display = "";
    hidePortofolio.style.display = "";
    hideContact.style.display = "";
    window.location.href = "/FrontEnd/index.html#contact";
});


// Récupération des champs de formulaire


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
            displayLoggin()
        })
        .catch(error => {
            console.error(error);
        });
});

const btnlogout = document.querySelector(".btnlogout");

btnlogout.addEventListener('click', e => {
    e.preventDefault();
    logout();
});

function logout() {
    localStorage.removeItem("token");
    displayLogin.style.display = "none";
    displayBtnlogout.style.display = "none";
    displayModaltop.style.display = "none";
    displayModalintro1.style.display = "none";
    displayModalintro2.style.display = "none";
    displayModalprojets.style.display = "none";
    displaybtnlogin.style.display = "flex";

}


function displayLoggin(dl){

    displayLogin.style.display = "none";
    hideIntro.style.display = "";
    hidePortofolio.style.display = "";
    hideContact.style.display = "";
    displayBtnlogout.style.display = "block";
    displayModaltop.style.display = "flex";
    displayModalintro1.style.display = "flex";
    displayModalintro2.style.display = "flex";
    displayModalprojets.style.display = "flex";
    displaybtnlogin.style.display = "none"; 
    }

//Création de la galerie
//je vais chercher les infos sur l'api
const reponseWorks = await fetch('http://localhost:5678/api/works');
const works = await reponseWorks.json();
//rattachement balises au dom
const sectionGallery = document.querySelector(".gallery");


function galleryContent(projects) {

    for (let i = 0; i < projects.length; i++) {
        const article = projects[i];


        const worksElement = document.createElement("figure");

        const imageElement = document.createElement('img');
        imageElement.src = article.imageUrl;

        const nameElement = document.createElement("figcaption");
        nameElement.innerText = article.title;

        sectionGallery.appendChild(worksElement);

        worksElement.appendChild(imageElement);
        worksElement.appendChild(nameElement);
    };
}
galleryContent(works);

//Filtres
//Appel Api categories
const reponseFilter = await fetch('http://localhost:5678/api/categories')
const filter = await reponseFilter.json();

const sectionFilter = document.querySelector("#filter");

//creation button tous
const allFilter = document.createElement("button");
allFilter.innerHTML = "Tous";
allFilter.id = 0;
sectionFilter.appendChild(allFilter);
allFilter.onclick = function () {
    colorfilter(allFilter, 0);

    sectionGallery.innerText = "";
    galleryContent(works);
};



for (let i = 0; i < filter.length; i++) {
    const articleFilter = filter[i];

    const btnfilter = document.createElement("button");
    btnfilter.innerHTML = articleFilter.name;
    btnfilter.id = articleFilter.id;
    btnfilter.setAttribute("actif", false);

    btnfilter.onclick = function () {
        colorfilter(btnfilter, articleFilter.id);
        let newlist = works.filter(function (work) {
            if (work.category.id == articleFilter.id) {
                return work;
            }
        });
        sectionGallery.innerText = "";
        galleryContent(newlist);
    };
    sectionFilter.appendChild(btnfilter);

}


function colorfilter(btn, id) {
    if (btnidActif != -1) {
        const btnfilterOff = document.getElementById(btnidActif);
        btnfilterOff.setAttribute("style", "background-color : white;");
        btn.setAttribute("style", "color : #1D6154;");
    }
    btnidActif = id;
    btn.setAttribute("style", "background-color : #1D6154; color: white;");

}

//modal

let modal = null
const focusSelector = 'button, submit, img, input'
let focusables = []
let previousFocusElem = null


const openModal = function (e) {
    e.preventDefault()
    modal = document.querySelector(e.target.getAttribute('href'))
    focusables = Array.from(modal.querySelectorAll(focusSelector))
    previousFocusElem = document.querySelector(':focus')
    focusables[0].focus()
    modal.style.display = null
    modal.removeAttribute('aria-hidden')
    modal.setAttribute('aria-modal', "true")
    modal.addEventListener('click', closeModal)
    modal.querySelector('.btnclose').addEventListener('click', closeModal)
    modal.querySelector('.btnclose2').addEventListener('click', closeModal)
    modal.querySelector(".js-modal-stop").addEventListener('click', stopPropagation)

}

const closeModal = function (e) {
    if (modal === null) return
    if (previousFocusElem !== null) previousFocusElem.focus()
    e.preventDefault()
    modal.style.display = 'none'
    modal.setAttribute('aria-hidden', 'true')
    modal.removeAttribute('aria-modal')
    modal.removeEventListener('click', closeModal)
    modal.querySelector('.btnclose').removeEventListener('click', closeModal)
    modal.querySelector('.btnclose2').removeEventListener('click', closeModal)
    modal.querySelector(".js-modal-stop").removeEventListener('click', stopPropagation)
    modal = null
}

const stopPropagation = function (e) {
    e.stopPropagation()
}

const focusInModal = function (e) {
    e.preventDefault()
    console.log(focusables)
    let index = focusables.findIndex(f => f === modal.querySelector(':focus'))
    if (e.shiftKey === true) {
        index--
    } else {
        index++
    }
    if (index >= focusables.length) {
        index = 0
    }
    if (index < 0) {
        index = focusables.length - 1
    }
    focusables[index].focus()
}

document.querySelectorAll('.modal-js').forEach(a => {
    a.addEventListener('click', openModal)
})

window.addEventListener('keydown', function (e) {
    if (e.key === "Escape" || e.key === "Esc") {
        closeModal(e)
    }
    if (e.key === 'Tab' && modal !== null)
        focusInModal(e)
})

//Modal Gallerie

const modalgallery = document.querySelector(".modal-wrapper");
const mgalleryEdit = document.querySelector(".btnmodal");
const galleryEdit = document.querySelector(".modal-gallery-del");

const btnclose = document.createElement("button");
btnclose.innerHTML = '<i class="fa-sharp fa-solid fa-xmark"></i>';
btnclose.setAttribute("class", "btn-modal");
btnclose.setAttribute("class", "btnclose");

const modaltitleGal = document.createElement("h2");
modaltitleGal.innerHTML = "Galerie photo";

function editgalleryContent(editprojects) {

    for (let i = 0; i < editprojects.length; i++) {
        const article = editprojects[i];

        const worksElement = document.createElement("figure");

        const imageElement = document.createElement('img');
        imageElement.crossOrigin = "anonymous";
        imageElement.src = article.imageUrl;

        const nameElement = document.createElement("figcaption");
        nameElement.innerText = "éditer";

        const btnDelete = document.createElement("button");
        btnDelete.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
        btnDelete.setAttribute("class", "btnDelete");
        btnDelete.id = article.id;
        btnDeleteFonction(btnDelete);


        galleryEdit.appendChild(worksElement);
        worksElement.appendChild(imageElement);
        worksElement.appendChild(nameElement);
        worksElement.appendChild(btnDelete);
    };
};
editgalleryContent(works)

function btnDeleteFonction(btnDelete) {
    btnDelete.addEventListener('click', event => {
        event.preventDefault();
        fetch('http://localhost:5678/api/works/' + btnDelete.id, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            }
        })
        
    })
    displayLoggin()
  }

const btnajouterimg = document.createElement("button");
btnajouterimg.setAttribute("class", "btnajouterimg");
btnajouterimg.innerHTML = "Ajouter une photo";
btnajouterimg.onclick = function (o) {
    modalgallery.setAttribute("style", "display: none;")
    galleryAdd.setAttribute("style", 'display:flex;')
}


const btndeleteAll = document.createElement("button")
btndeleteAll.setAttribute("class", "btndeleteAll");
btndeleteAll.innerHTML = "Supprimer la gallerie";

modalgallery.appendChild(mgalleryEdit);
modalgallery.appendChild(modaltitleGal);
modalgallery.appendChild(galleryEdit);
modalgallery.appendChild(btnajouterimg);
modalgallery.appendChild(btndeleteAll);
mgalleryEdit.appendChild(btnclose);



//Modal d'ajout d'image
const galleryAdd = document.querySelector(".modal-add");
const btnAdd = document.querySelector(".btnposition");
const formAdd = document.querySelector(".formModal");
const sectionAdd = document.querySelector(".sectionadd");

const categoriesAdd = document.querySelector(".editing-scroll");

const inputcatAdd = document.createElement("select");
inputcatAdd.setAttribute('id', 'category')
inputcatAdd.setAttribute('required', true)

const btnBack = document.createElement("button");
btnBack.innerHTML = '<i class="fa-solid fa-left-long"></i>';
btnBack.setAttribute("class", "btnbackclose");
btnBack.setAttribute("class", "btnBack");
btnBack.onclick = function (b) {
    b.preventDefault();
    modalgallery.setAttribute("style", "display:flex;")
    galleryAdd.setAttribute("style", 'display:none;')
};

const btnclose2 = document.createElement("button");
btnclose2.innerHTML = '<i class="fa-sharp fa-solid fa-xmark"></i>';
btnclose2.setAttribute("class", "btnclose2")

const titleAdd = document.createElement("h2");
titleAdd.innerHTML = "Ajout photo";

const btnvalider = document.createElement("input")
btnvalider.innerHTML = "Valider";
btnvalider.setAttribute("class", "btnvalider")
btnvalider.setAttribute("type", "submit")

galleryAdd.appendChild(btnAdd);
galleryAdd.appendChild(titleAdd);
galleryAdd.appendChild(sectionAdd);
galleryAdd.appendChild(formAdd);


btnAdd.appendChild(btnBack);
btnAdd.appendChild(btnclose2);



formAdd.appendChild(categoriesAdd);
categoriesAdd.appendChild(inputcatAdd);

formAdd.appendChild(btnvalider);

const inputOption0 = document.createElement("option");
inputOption0.innerHTML = "Choisissez votre Catégorie";
inputOption0.id = 0;
inputcatAdd.appendChild(inputOption0);

for (let i = 0; i < filter.length; i++) {
    const articleFilter = filter[i];
    const inputOption = document.createElement("option");
    inputOption.innerHTML = articleFilter.name;
    inputOption.value = articleFilter.id;
    inputcatAdd.appendChild(inputOption);
}

//Formulaire ajout image

const form = document.querySelector('.formModal');
const titleInput = document.querySelector('#title');
const imageUrlInput = document.querySelector('#input-file');
const categoryInput = document.getElementById('category');

form.addEventListener('submit', async function (event) {
  event.preventDefault();
  
  if (form.checkValidity()) {
    const title = titleInput.value;
    const imageUrl = imageUrlInput.files[0];
    const categoryId = categoryInput.value;

    const formData = new FormData();
    formData.append('title', title);
    formData.append('imageUrl', imageUrl);
    formData.append('categoryId', categoryId);
    formData.append('userId', 1);

    console.log(Array.from(formData))

    fetch('http://localhost:5678/api/works', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'accept': 'application/json',
        'Content-Type': 'multipart/form-data'
        
      },
      body: formData
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.error(error);
      });
  } else {
    window.alert("Attention tous les champs ne sont pas remplis");
    throw new Error('Attention tous les champs ne sont pas remplis');
  }
});






//Prévisualisation
const hiddeInput = document.querySelector(".hidde-input")

const inputFile = document.getElementById("input-file");
const previewImage = document.getElementById("preview-image");
inputFile.addEventListener("change", function () {
    const reader = new FileReader();
    reader.onload = function (event) {
        previewImage.src = event.target.result;
        previewImage.style.display = "block";
        hiddeInput.setAttribute("style", "display: none;")
    };
    reader.readAsDataURL(inputFile.files[0]);
});






