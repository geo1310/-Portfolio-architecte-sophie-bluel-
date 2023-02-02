export function modale(){

    let modal = null

    const openModal = function(e) {

    e.preventDefault();
    modal = document.querySelector(e.target.getAttribute('href'))
    modal.style.display= null;

    // accessibilite
    modal.removeAttribute('aria-hidden')
    modal.setAttribute('aria-modal', 'true')

    // listener close
    modal.querySelectorAll('.js-modal-close').forEach(a => {
        a.addEventListener('click', closeModal)
    })
    // listener escape
    const closeEscape = function(e){

        console.log(e.key)

        if (e.key === "Escape" || e.key === "Esc"){
            window.removeEventListener('keydown', closeEscape)
            closeModal(e)
        }
    }
    window.addEventListener('keydown', closeEscape) // remove listener ????
    
    }

    const closeModal = function(e) {

    if (modal === null) return

    e.preventDefault()

    // tempo pour l 'animation
    //window.setTimeout(function(){
    //    modal.style.display= 'none';
    //    modal = null;
    //},500) // retard de 500ms

    // ecouter la fin de l animation
    const hideModal = function(){
        modal.style.display= 'none';
        modal.removeEventListener('animationend', hideModal )
        modal = null;
    }
    modal.addEventListener('animationend', hideModal)
    
    // accessibilite
    modal.setAttribute('aria-hidden', 'true')
    modal.setAttribute('aria-modal', 'false')

    // remove listener
    modal.querySelectorAll('.js-modal-close').forEach(a => {
        a.removeEventListener('click', closeModal)
    })

    
    }

    document.querySelectorAll(".js-modal").forEach(a => {
        a.addEventListener("click", openModal) 
    })

    

}

