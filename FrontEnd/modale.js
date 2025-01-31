export function modale(projets,categories){
    
    // declaration variables
    const modal = document.querySelector('.modal')
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
    

    // ouverture et fermeture de la fenetre modale 
    modalTriggers.forEach(trigger => trigger.addEventListener("click", toggleModal))

    function toggleModal(){
        modalContainer.classList.toggle("active")
        if (modalContainer.classList.contains('active')){
            modal.setAttribute('aria-hidden', 'false')
            modal.setAttribute('aria-modal', 'true')
            document.body.style.overflow='hidden'
            modalContent1(projets)
        }
        else{
            modal.setAttribute('aria-hidden', 'true')
            modal.setAttribute('aria-modal', 'false')
            document.body.style.overflow=null
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
            imageProjet.className='image-vignette'
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
            a.addEventListener('click', async function(){

                // requete fetch

                const reponse = await fetch(`http://localhost:5678/api/works/${a.dataset.id}`, {
                method: "DELETE",
                headers: { 
                    "Authorization": `Bearer ${sessionStorage.getItem('token')}`
                },
            }).then(reponse => reponse.json())

            console.log(reponse) // test


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

        // fenetre ajout photo
        const modalPhotoElement = document.createElement('div')
        modalPhotoElement.className='ajout-photo-preview'

        const modalPhotoElementIcone = document.createElement('i')
        modalPhotoElementIcone.className='fa-sharp fa-regular fa-image'

        const modalPhotoElementBouton = document.createElement('button')
        modalPhotoElementBouton.className='ajout-photo-bouton'
        modalPhotoElementBouton.innerText='+ Ajouter photo'

        const modalPhotoElementTexte = document.createElement('p')
        modalPhotoElementTexte.className='ajout-photo-texte'
        modalPhotoElementTexte.innerText='jpg, png : 4mo max'

        const modalImage = document.createElement('img')
        modalImage.className='image-preview'
        
        modalPhotoElement.appendChild(modalPhotoElementIcone)
        modalPhotoElement.appendChild(modalPhotoElementBouton)
        modalPhotoElement.appendChild(modalPhotoElementTexte)
        modalPhotoElement.appendChild(modalImage)

        const modalForm = document.createElement('form')
        modalForm.className='form-add-picture'

        // ajout image au formulaire
        const formImage = document.createElement('input')
        formImage.className='form-image'
        formImage.setAttribute('type', 'file')
        formImage.setAttribute('accept', 'image/png, image/jpeg')
        formImage.setAttribute('size', '4024')
        formImage.setAttribute('name', 'image')

        formImage.onchange = () => {
            const file = formImage.files[0]
            modalImage.src = URL.createObjectURL(file)
            modalPhotoElementIcone.style.display='none'
            modalPhotoElementBouton.style.display='none'
            modalPhotoElementTexte.style.display='none'
        }

        const modalLabel1 = document.createElement('label')
        modalLabel1.setAttribute('for', 'titre')
        modalLabel1.innerText='Titre'
        const modalInput = document.createElement('input')
        modalInput.setAttribute('type', 'text')
        modalInput.setAttribute('name', 'titre')
        modalInput.className='modal-input'
        const modalLabel2 = document.createElement('label')
        modalLabel2.setAttribute('for', 'categorie')
        modalLabel2.innerText='Catégorie'
        const modalSelect = document.createElement('select')
        modalSelect.setAttribute('name', 'categorie')
        modalSelect.className='modal-input'

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
        modalSubmit.setAttribute('disabled', '1')
        modalSubmit.value='Valider'
        modalSubmit.className='modal-submit'

        //rattachement des elements
        modalForm.appendChild(formImage)
        modalForm.appendChild(modalLabel1)
        modalForm.appendChild(modalInput)
        modalForm.appendChild(modalLabel2)
        modalForm.appendChild(modalSelect)
        modalForm.appendChild(modalBorder)
        modalForm.appendChild(modalSubmit)

        // rattachement au DOM
        modalBody.appendChild(modalPhotoElement)
        modalBody.appendChild(modalForm)
        
        // formulaire
        
        const formAjoutPhoto = document.querySelector('.form-add-picture')

        // verification du formulaire
        formAjoutPhoto.addEventListener('input', function(){
           
            const choixImage = modalImage.src
            const choixTitre = document.querySelector("[name=titre]").value

            

            if (choixImage && choixTitre){
                modalSubmit.style.backgroundColor='#1d6154'
                modalSubmit.disabled = 0
            }
            else{
                modalSubmit.style.backgroundColor=null
                modalSubmit.disabled = 1
            }
        })

        // submit du formulaire

        modalPhotoElementBouton.addEventListener('click',function(){
            formImage.click()
        })

        formAjoutPhoto.addEventListener("submit", async function (event) {

            event.preventDefault();

            // Construction de la requete fetch

            const ajoutPhotoObject = {
                image: modalImage.src,
                title: event.target.querySelector("[name=titre]").value,
                category: parseInt(event.target.querySelector("[name=categorie]").value),
            }

            // Création de la charge utile au format JSON string
            const chargeUtile = JSON.stringify(ajoutPhotoObject)
            console.log(chargeUtile) // test
            //console.log(JSON.parse(chargeUtile)) //test

            // requete fetch
            
            const reponse = await fetch("http://localhost:5678/api/works", {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${sessionStorage.getItem('token')}`
                },
                body: chargeUtile
            }).then(reponse => reponse.json())

            console.log(reponse) // test
        

            // retour modal content1
            modalContent1Appel()

        })
    }
}
