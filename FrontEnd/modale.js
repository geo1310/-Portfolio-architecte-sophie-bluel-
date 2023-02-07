export function modale(projets,categories){

    const titleModalText =document.getElementById('title-modal')
    const galleryElements = document.querySelector(".modal-body");
    const modalContainer = document.querySelector(".modal-container");
    const modalTriggers = document.querySelectorAll(".modal-trigger");
    const delGallery = document.querySelector(".del-gallery")
    const modalButton = document.querySelector(".modal-button")
    
    
    const modalContent2Appel= function(projets,categories){
        modalContent2(projets, categories)
        console.log('bouton')
    }
    const modalContent2Valid= function(){
        console.log('bouton valider')
    }

    modalTriggers.forEach(trigger => trigger.addEventListener("click", toggleModal))

    function toggleModal(){
        modalContainer.classList.toggle("active")
        if (modalContainer.classList.contains('active')){
            modalContent1(projets)
        }
    }

    
    // Galerie photo modale
    function modalContent1(projets){

        modalButton.removeEventListener('click', modalContent2Valid)
        modalButton.addEventListener("click", modalContent2Appel)
        

        titleModalText.innerText="Galerie photo"
        modalButton.innerText="Ajouter une photo"
        delGallery.style.display=null
        modalButton.className='modal-button'
        
        
        galleryElements.innerHTML="";
        for (const projet of projets) {
    
            // Création d’une balise dédiée à un projet
            const projetElements = document.createElement("figure");
            projetElements.className="vignette"
            // Création des elements d'un projet
            const imageProjet = document.createElement("img");
            imageProjet.src = projet.imageUrl;
            imageProjet.alt = projet.title;
            const trashProjet = document.createElement('i')
            trashProjet.className="fa-regular fa-trash-can"
            trashProjet.dataset.id=projet.id
            const boutonProjet = document.createElement("span")
            boutonProjet.innerText="éditer"
            boutonProjet.className="edit-button"
            boutonProjet.dataset.id=projet.id
            // Rattachement des elements
            projetElements.appendChild(imageProjet);
            projetElements.appendChild(trashProjet)
            projetElements.appendChild(boutonProjet)
            galleryElements.appendChild(projetElements);

            
            
        };
        
    
    }
    
    // Ajout photo modale
    function modalContent2(projets, categories){

        modalButton.removeEventListener('click',modalContent2Appel)
        modalButton.addEventListener('click',modalContent2Valid)

        modalButton.className='modal-button2'        
        titleModalText.innerText="Ajout photo"
        modalButton.innerText="Valider"
        galleryElements.innerHTML="";
        delGallery.style.display = 'none'
        
        

       
        
            
        

    }


};

