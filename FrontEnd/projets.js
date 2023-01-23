
// Récupération des projets depuis l'API
const reponseProjets = await fetch('http://localhost:5678/api/works/');
const projets = await reponseProjets.json();

// Récupération des Catégories
const reponseCategories = await fetch('http://localhost:5678/api/categories/');
const categories = await reponseCategories.json();

// génération des boutons filtres categories

const filtresElements = document.querySelector(".filtres")

for (let categorie of categories){
    const boutonElement = document.createElement("button");
    boutonElement.dataset.id = categorie.id;
    boutonElement.innerText = categorie.name

    filtresElements.appendChild(boutonElement);
}


// génération des projets

const galleryElements = document.querySelector(".gallery");

function genererProjets(projets) {

    for (const projet of projets) {
        
        // Création d’une balise dédiée à un projet
        const projetElements = document.createElement("figure");
        // Création des elements d'un projet
        const imageProjet = document.createElement("img");
        imageProjet.src = projet.imageUrl;
        imageProjet.alt = projet.title;
        const titreProjet = document.createElement("figcaption");
        titreProjet.innerText = projet.title;
        
        // Rattachement des elements
        projetElements.appendChild(imageProjet);
        projetElements.appendChild(titreProjet);
        galleryElements.appendChild(projetElements)
       
    }
}

// premiere génération des projets

genererProjets(projets);





// gestion des boutons filtres categories

const filtresElementsBoutons = document.querySelectorAll(".filtres button");

    for (let elementBouton of filtresElementsBoutons) {
        elementBouton.addEventListener("click", async function (event) {
            const id = event.target.dataset.id;
            
            if (id !== "tous"){
                const projetsFiltres = projets.filter(function (projet) {
                    return projet.categoryId === parseInt(id);
                });
                galleryElements.innerHTML="";
                genererProjets(projetsFiltres);
            }
            else{
                galleryElements.innerHTML="";
                genererProjets(projets);
            }
            
        });
    }
















