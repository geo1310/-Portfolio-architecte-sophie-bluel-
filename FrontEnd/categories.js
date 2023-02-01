import { generationProjets } from "./projets.js";

export async function gestionCategories(projets){

    // Récupération des Catégories

    const reponseCategories = await fetch('http://localhost:5678/api/categories/');
    const categories = await reponseCategories.json();

    // génération des boutons filtres categories

    const filtresElements = document.querySelector(".filtres");

    for (let categorie of categories){
        const boutonElement = document.createElement("button");
        boutonElement.dataset.id = categorie.id;
        boutonElement.innerText = categorie.name;

        filtresElements.appendChild(boutonElement);
    }

    // gestion des boutons filtres categories 

    const filtresElementsBoutons = document.querySelectorAll(".filtres button");

    for (let elementBouton of filtresElementsBoutons) {
        elementBouton.addEventListener("click", function (e) {
            const id = e.target.dataset.id;

            if (id !== "tous"){
                const projetsFiltres = projets.filter(function (projet) {
                    return projet.categoryId === parseInt(id);
                });
                generationProjets(projetsFiltres);
            }
            else{  
                generationProjets(projets);
            }

        });
    }


}