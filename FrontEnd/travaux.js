
// Récupération des travaux depuis l'API
const reponse = await fetch('http://localhost:5678/api/works/');
const travaux = await reponse.json();

console.log(travaux); // test


function genererTravaux(travaux) {

    for (let i in travaux) {

        const projet = travaux[i];

        console.log(projet) //test
        
        // Récupération de l'élément du DOM qui accueillera les travaux
        const galleryElements = document.querySelector(".gallery");
        // Création d’une balise dédiée à un projet
        const projetElements = document.createElement("figure");
        
        // Création des balises 
        const imageProjet = document.createElement("img");
        imageProjet.src = projet.imageUrl;
        imageProjet.alt = projet.title;
        const titreProjet = document.createElement("figcaption");
        titreProjet.innerText = projet.title;
        

        // Rattachement des elements du dom
        projetElements.appendChild(imageProjet);
        projetElements.appendChild(titreProjet);
        galleryElements.appendChild(projetElements)
       
    }
}

genererTravaux(travaux);