export function modale(projets,categories){
    
    // declaration variables
    const titleModalText =document.getElementById('title-modal')
    const modalBody = document.querySelector(".modal-body");
    const modalContainer = document.querySelector(".modal-container");
    const modalTriggers = document.querySelectorAll(".modal-trigger");
    const delGallery = document.querySelector(".del-gallery")
    const modalButton = document.querySelector(".modal-button")
    
    const modalContent1Appel = function(){
        modalContent1(projets)
    }

    const modalContent2Appel= function(){
        modalContent2(projets, categories)
    }
    

    // fermeture de la fenetre modale 
    modalTriggers.forEach(trigger => trigger.addEventListener("click", toggleModal))

    function toggleModal(){
        modalContainer.classList.toggle("active")
        if (modalContainer.classList.contains('active')){
            modalContent1(projets)
        }
    }

    
    // Contenu Modale : Gallerie photo ------------------------------------------------
    
    function modalContent1(projets){

        // vers modale 2
        modalButton.addEventListener("click", modalContent2Appel)
        
        // creation de la modale

        modalBody.innerHTML="";
        document.querySelector('.fa-arrow-left').style.display='none'
        document.querySelector('.modal-footer').style.display=null
        titleModalText.innerText="Galerie photo"
        modalButton.innerText="Ajouter une photo"
        delGallery.style.display=null
        modalButton.className='modal-button'
        
        // creation des vignettes projets
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
            // rattachement au DOM
            modalBody.appendChild(projetElements)     
            
        };

        // suppression d'un projet
        
        document.querySelectorAll('.fa-trash-can').forEach(a => {
            a.addEventListener('click', function(){

                console.log('suppression Id :' + a.dataset.id) //test

                // construction de la requete fetch

                
            })  
        })

    }
    
    // Contenu Modale : Ajout photo ------------------------------------------------

    function modalContent2(projets, categories){

        // Retour sur fenetre modale 1
        const modalBack = document.querySelector('.fa-arrow-left')
        modalBack.style.display=null
        modalBack.addEventListener('click', modalContent1Appel)

        // creation de la modale

        modalBody.innerHTML="";
        document.querySelector('.modal-footer').style.display='none'
        titleModalText.innerText="Ajout photo"
        delGallery.style.display = 'none'

        // creation des elements de la modale
        const modalPhoto = document.createElement('div')
        modalPhoto.className='ajout-photo'
        const modalForm = document.createElement('form')
        const modalLabel1 = document.createElement('label')
        modalLabel1.setAttribute('for', 'titre')
        modalLabel1.innerText='Titre'
        const modalInput = document.createElement('input')
        modalInput.setAttribute('type', 'texte')
        modalInput.setAttribute('name', 'titre')
        const modalLabel2 = document.createElement('label')
        modalLabel2.setAttribute('for', 'categorie')
        modalLabel2.innerText='Catégorie'
        const modalSelect = document.createElement('select')
        modalSelect.setAttribute('name', 'categorie')

        for(const categorie of categories){
            const modalSelectOption = document.createElement('option')
            modalSelectOption.setAttribute('value', categorie.id)
            modalSelectOption.innerText=categorie.name
            modalSelect.appendChild(modalSelectOption)
        }
        
        
        const modalBorder = document.createElement('div')
        modalBorder.className='border-top'
        const modalSubmit = document.createElement('input')
        modalSubmit.setAttribute('type','submit')
        modalSubmit.value='Valider'
        modalSubmit.className='modal-submit'

        //rattachement des elements
        modalForm.appendChild(modalLabel1)
        modalForm.appendChild(modalInput)
        modalForm.appendChild(modalLabel2)
        modalForm.appendChild(modalSelect)
        modalForm.appendChild(modalBorder)
        modalForm.appendChild(modalSubmit)

        // rattachement au DOM
        modalBody.appendChild(modalPhoto)
        modalBody.appendChild(modalForm)


    }


};
