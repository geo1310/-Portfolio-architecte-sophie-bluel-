// Affichage des projets

export function generationProjets(projets,galleryElements){   

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