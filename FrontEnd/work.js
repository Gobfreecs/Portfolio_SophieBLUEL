let btnidAtcif = -1;

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
    colorfilter(allFilter , 0);

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
       colorfilter(btnfilter , articleFilter.id);
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

function colorfilter (btn , id){
    if (btnidAtcif != -1) {
        const btnfilterActif =
            document.getElementById(btnidAtcif);
        btnfilterActif.setAttribute("style", "background-color : white;");
    }
    btnidAtcif = id;
    btn.setAttribute("style", "background-color : green;");
}

//modal

let modal = null
const focusSelector = 'button, submit, img'
let focusables = []

const openModal = function (e) {
    e.preventDefault()
    modal = document.querySelector(e.target.getAttribute('href'))
    focusables = Array.from(modal.querySelectorAll(focusSelector))
    modal.style.display = null
    modal.removeAttribute('aria-hidden')
    modal.setAttribute('aria-modal', "true")
    modal.addEventListener('click', closeModal)
    modal.querySelector('.btnclose-modal').addEventListener('click', closeModal)
    modal.querySelector('.js-modal-stop').addEventListener('click', stopPropagation)
}

const closeModal = function (e) {
    if (modal === null) return
    e.preventDefault()
    modal.style.display = 'none'
    modal.setAttribute('aria-hidden', 'true')
    modal.removeAttribute('aria-modal')
    modal.removeEventListener('click', closeModal)
    modal.querySelector('.btnclose-modal').removeEventListener('click', closeModal)
    modal.querySelector('.js-modal-stop').removeEventListener('click', closeModal)
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

const modalgallery = document.querySelector(".modal-wrapper");
const mgalleryEdit = document.querySelector(".btnmodal");
const galleryEdit = document.querySelector(".modal-gallery-del");

const btnclose = document.createElement("button");
btnclose.innerHTML = '<i class="fa-sharp fa-solid fa-xmark"></i>';
btnclose.setAttribute("class", "btn-modal");
btnclose.setAttribute("class", "btnclose");



mgalleryEdit.appendChild(btnBack);

const modaltitleGal = document.createElement("h2");
modaltitleGal.innerHTML = "Galerie photo";

const btnajouterimg = document.createElement("button");
btnajouterimg.setAttribute("class", "btnajouterimg");
btnajouterimg.innerHTML = "Ajouter une photo";
btnajouterimg.onclick = function (o) {

}


const btndeleteAll = document.createElement("button")
btndeleteAll.setAttribute("class", "btndeleteAll");
btndeleteAll.innerHTML = "Supprimer la gallerie";


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
        btnDelete.onclick = function (d) {

            d.preventDefault();
            fetch('http://localhost:5678/api/works/' + btnDelete.id, {
                method: 'DELETE',
                Headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,

                }
            })
        };


        modalgallery.appendChild(mgalleryEdit);
        modalgallery.appendChild(modaltitleGal);
        modalgallery.appendChild(galleryEdit);
        modalgallery.appendChild(btnajouterimg);
        modalgallery.appendChild(btndeleteAll);


        mgalleryEdit.appendChild(btnclose);


        galleryEdit.appendChild(worksElement);

        worksElement.appendChild(imageElement);
        worksElement.appendChild(nameElement);
        worksElement.appendChild(btnDelete);

    };

}
editgalleryContent(works);

//add image
const categoriesAdd = document.querySelector(".editing-scroll");

const inputcatAdd = document.createElement("select");

const inputOption = document.createElement("option");




categoriesAdd.appendChild(inputcatAdd);
inputcatAdd.appenchild(inputOption);
