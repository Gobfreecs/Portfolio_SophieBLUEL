const openModal = function(e) {
    e.preventDefault()
    const target = document.querySelector(e.target.getAttribute('href'))
    target.style.display = null
    target.setAttribute('aria-hidden', false)
}

document.querySelectorAll('.modal-js'). forEach(a => {
    a.addEventListener('click',openModal)
    
})