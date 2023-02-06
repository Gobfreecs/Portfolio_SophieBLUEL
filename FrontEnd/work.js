
//Création de la galerie
//je vais chercher les infos sur l'api
const reponseWorks = await fetch('http://localhost:5678/api/works');
const works = await reponseWorks.json();
//rattachement balises au dom
const sectionGallery = document.querySelector(".gallery");

function writeContent(projects) {

    for (let i = 0; i < projects.length; i++) {
        const article = projects[i];


        const worksElement = document.createElement("figure");

        const imageElement = document.createElement("img");
        imageElement.src = article.imageUrl;
        imageElement.setAttribute("origin", "anonymus");

        const nameElement = document.createElement("figcaption");
        nameElement.innerText = article.title;


        sectionGallery.appendChild(worksElement);


        worksElement.appendChild(imageElement);
        worksElement.appendChild(nameElement);
    };
}
writeContent(works);

//Filtres
//Appel Api categories
const reponseFilter = await fetch('http://localhost:5678/api/categories');
const filter = await reponseFilter.json();

const sectionFilter = document.querySelector("#filter");

//creation button tous
const allFilter = document.createElement("button");
allFilter.innerHTML = "Tous";
sectionFilter.appendChild(allFilter);
allFilter.onclick = function () {
    sectionGallery.innerText = "";
    writeContent(works);
};


for (let i = 0; i < filter.length; i++) {
    const articleFilter = filter[i];

    const btnfilter = document.createElement("button");
    btnfilter.innerHTML = articleFilter.name;
    btnfilter.id = articleFilter.id;
    btnfilter.onclick = function () {
        let newlist = works.filter(function (work) {
            if (work.category.id == articleFilter.id) {
                return work;
            }
        });
        sectionGallery.innerText = "";
        writeContent(newlist);
    };
    sectionFilter.appendChild(btnfilter);

}
