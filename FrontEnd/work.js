let works = [];
let articleFilter = [];
let filter = [];

const hidePortofolio = document.querySelector(".hidePortofolio");
const hideContact = document.querySelector(".hideContact");
const displayBtnlogout = document.querySelector('.displayBtnlogout');
const displayModaltop = document.querySelector('.displayModaltop');
const displayModalintro1 = document.querySelector('.displayModalintro1');
const displayModalprojets = document.querySelector('.displayModalprojets');
const displayModalintro2 = document.querySelector('.displayModalintro2');
const displaybtnlogin = document.querySelector('.displayoffEdit');
const btnlogout = document.querySelector(".btnlogout");
const modalgallery = document.querySelector(".modal-wrapper");
const mgalleryEdit = document.querySelector(".btnmodal");
const galleryEdit = document.querySelector(".modal-gallery-del");
const btnclose = document.createElement("button");
const galleryAdd = document.querySelector(".modal-add");
const btnAdd = document.querySelector(".btnposition");
const formAdd = document.querySelector(".formModal");
const sectionAdd = document.querySelector(".sectionadd");
const categoriesAdd = document.querySelector(".editing-scroll");
const form = document.querySelector('.formModal');
const titleInput = document.querySelector('#title');
const imageUrlInput = document.querySelector('#input-file');
const msgError = document.querySelector('.msgError');

if (isConnected()) {

    displayUpdatebtn();

}


//fonction logout affichage et disparition des éléments

btnlogout.addEventListener('click', e => {
    e.preventDefault();
    logout();
});

function logout() {
    localStorage.removeItem("token");
    displayBtnlogout.style.display = "none";
    displayModaltop.style.display = "none";
    displayModalintro1.style.display = "none";
    displayModalintro2.style.display = "none";
    displayModalprojets.style.display = "none";
    displaybtnlogin.style.display = "flex";
}



function isConnected() {
    const token = localStorage.getItem('token');

    if (token == null) {
        console.log("notConnected");
        return false;
    } else {
        console.log("connected")
        return true;
    }
}

function displayUpdatebtn() {
    displayBtnlogout.style.display = "block";
    displayModaltop.style.display = "flex";
    displayModalintro1.style.display = "flex";
    displayModalintro2.style.display = "flex";
    displayModalprojets.style.display = "flex";
    displaybtnlogin.style.display = "none";
}

//Création de la galerie

const sectionGallery = document.querySelector(".gallery");

function galleryContent(projects) {
    sectionGallery.innerHTML = ''; // effacer le contenu précédent de la galerie

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

//Appel API pour la création et mise a jour des galeries

function updateGallery() {
    fetch('http://localhost:5678/api/works')
        .then(response => response.json())
        .then(projects => {
            works = projects;
            galleryContent(projects);
            editgalleryContent(projects);
        })
        .catch(error => console.error(error));
}

updateGallery();



//Filtres
//Appel Api categories
fetch('http://localhost:5678/api/categories')
    .then(response => response.json())
    .then(filter => {
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
//création des filtres par l'API
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
    })
    .catch(error => console.error(error));

//Changement couleur filtres

let idActif = -1;

function colorfilter(btn, id) {
    if (idActif != -1) {
        const btnfilterOff = document.getElementById(idActif);
        btnfilterOff.setAttribute("style", "background-color : white;");
        btn.setAttribute("style", "color : #1D6154;");
    }
    idActif = id;
    btn.setAttribute("style", "background-color : #1D6154; color: white;");
}

//modal

let modal = null
const focusSelector = 'button, submit, img, input'
let focusables = []
let previousFocusElem = null

//ouverture de la modal

const openModal = function (e) {
    e.preventDefault()
    modal = document.querySelector(e.target.getAttribute('href'))
    focusables = Array.from(modal.querySelectorAll(focusSelector))
    previousFocusElem = document.querySelector(':focus')
    focusables[0].focus()
    modal.style.display = 'flex'
    modal.removeAttribute('aria-hidden')
    modal.setAttribute('aria-modal', "true")
    modal.addEventListener('click', closeModal)
    modal.querySelector('.btnclose').addEventListener('click', closeModal)
    modal.querySelector('.btnclose2').addEventListener('click', closeModal)
    modal.querySelector(".js-modal-stop").addEventListener('click', stopPropagation)

}

//fermeture de la modal

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

// Gallerie de la modal avec bouton pour supprimer un projet


btnclose.innerHTML = '<i class="fas-sharp fa-solid fa-xmark"></i>';
btnclose.setAttribute("class", "btn-modal");
btnclose.setAttribute("class", "btnclose");

const modaltitleGal = document.createElement("h2");
modaltitleGal.innerHTML = "Galerie photo";

function editgalleryContent(editprojects) {
    galleryEdit.innerHTML = ''; // effacer le contenu précédent de la galerie

    for (let i = 0; i < editprojects.length; i++) {
        const article = editprojects[i];

        const worksElement = document.createElement("figure");

        const imageElement = document.createElement('img');
        imageElement.src = article.imageUrl;

        const nameElement = document.createElement("figcaption");
        nameElement.innerText = "éditer";

        const btnDelete = document.createElement("button");
        btnDelete.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
        btnDelete.setAttribute("class", "btnDelete");
        btnDelete.id = article.id;
        btnDelete.addEventListener('click', event => {
            event.preventDefault();
            fetch('http://localhost:5678/api/works/' + btnDelete.id, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                }
            })
                .then(response => {
                    if (response.ok) {
                        updateGallery()
                    }
                })
                .catch(error => console.error(error));
        })

        galleryEdit.appendChild(worksElement);
        worksElement.appendChild(imageElement);
        worksElement.appendChild(nameElement);
        worksElement.appendChild(btnDelete);
    };
};

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


//Panneau Modal d'ajout d'image avec formulaire

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
    imageUrlInput.value = null;
    form.reset();
    hiddeInput.setAttribute("style", "display: flex;")
    previewImage.src = null;
    previewImage.style.display = "none";
};

const btnclose2 = document.createElement("button");
btnclose2.innerHTML = '<i class="fas-sharp fa-solid fa-xmark"></i>';
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

fetch('http://localhost:5678/api/categories')
  .then(response => response.json())
  .then(filter => {
    const selectElement = document.createElement("select");
    
    const defaultOption = document.createElement("option");
    defaultOption.innerHTML = "Choisissez votre Catégorie";
    defaultOption.value = 0;
    inputcatAdd.appendChild(defaultOption);
    
    filter.forEach(function (filterItem) {
      const optionElement = document.createElement("option");
      optionElement.innerHTML = filterItem.name;
      optionElement.value = filterItem.id;
      inputcatAdd.appendChild(optionElement);
    });
  })
  .catch(error => console.error(error));
  

//Prévisualisation de l'image de projet
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


//Formulaire ajout image
const categoryInput = document.getElementById('category');
form.addEventListener('submit', async function (event) {
    event.preventDefault();

    if (form.checkValidity()) {
        const title = titleInput.value;
        const imageUrl = imageUrlInput.files[0];
        const categoryId = categoryInput.value;

        if (parseInt(categoryId) !== 0){  

        const formData = new FormData();
        formData.append('title', title);
        formData.append('image', imageUrl);
        formData.append('category', categoryId);
        formData.append('userId', 1);

        console.log(Array.from(formData))

        fetch('http://localhost:5678/api/works', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'accept': 'application/json',
            },
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                modalgallery.setAttribute("style", "display:flex;")
                galleryAdd.setAttribute("style", 'display:none;')
                msgError.setAttribute('style','display:none;');
                hiddeInput.setAttribute("style", "display: flex;")
                previewImage.src = null;
                previewImage.style.display = "none";
                form.reset();
                updateGallery();
            })
            .catch(error => {
                console.error(error);
            });
        }else{

            msgError.setAttribute('style','display:flex;');
        }
    } else {
        window.alert("Attention tous les champs ne sont pas remplis");
        throw new Error('Attention tous les champs ne sont pas remplis');
    }
});


