//fontion supprimer image
const workId = 

btnDelete.addEventListener('click', e => {

    e.preventDefault();

    const dataDelete = 
});

    fetch('http://localhost:5678/api/works',{
        method:'DELETE',
        Headers:{
            'Authorization': 'Bearer my-token',
            'Content-Type': 'application/json'
        }
    })




    const btnBack = document.createElement("button");
btnBack.innerHTML = '<i class="fa-solid fa-left-long"></i>';
btnBack.setAttribute("class", "btn-modal");
btnBack.setAttribute("class", "btnBack");

mgalleryEdit.appendChild(btnBack);
    