export function modale(projets,categories){

    const titleModalText =document.getElementById('title-modal')
    const galleryElements = document.querySelector(".modal-body");
    const modalContainer = document.querySelector(".modal-container");
    const modalTriggers = document.querySelectorAll(".modal-trigger");
    const delGallery = document.querySelector(".del-gallery")
    const modalButton = document.querySelector(".modal-button")

    modalTriggers.forEach(trigger => trigger.addEventListener("click", toggleModal))

    function toggleModal(){
        modalContainer.classList.toggle("active")
        if (modalContainer.classList.contains('active')){
            modalContent1(projets)
        }
    }

    modalButton.addEventListener("click", function(){
        modalContent2(projets, categories)
        console.log('bouton')
    })

    function modalContent1(projets){
        
        titleModalText.innerText="Galerie photo"
        modalButton.innerText="Ajouter une photo"
        delGallery.style.display=null
        
        
        galleryElements.innerHTML="";
        for (const projet of projets) {
    
            // Création d’une balise dédiée à un projet
            const projetElements = document.createElement("figure");
            projetElements.className="vignette"
            // Création des elements d'un projet
            const imageProjet = document.createElement("img");
            imageProjet.src = projet.imageUrl;
            imageProjet.alt = projet.title;
            const boutonProjet = document.createElement("span")
            boutonProjet.innerText="éditer"
            // Rattachement des elements
            projetElements.appendChild(imageProjet);
            projetElements.appendChild(boutonProjet)
            galleryElements.appendChild(projetElements);
            
        };
    
    }
    
    function modalContent2(projets, categories){
        
        titleModalText.innerText="Ajout photo"
        modalButton.innerText="Valider"
        galleryElements.innerHTML="";
        delGallery.style.display = 'none'

       
        
            
        

    }


};

