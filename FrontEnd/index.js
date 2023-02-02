import { generationProjets } from "./projets.js";
import { gestionCategories } from "./categories.js";
import { modale } from "./modale.js";

// Récupération des projets depuis l'API

const reponseProjets = await fetch('http://localhost:5678/api/works/');
const projets = await reponseProjets.json();

// mettre en local storage le projet ???

//
//


// 1ere génération des projets ----------------------------------------------------------------------------------

generationProjets(projets);

// gestion des categories

gestionCategories(projets);


// gestion administrateur -------------------------- creer module js ---------------------------------------------------

function logout(){
    localStorage.removeItem('token');
    
    const adminElements = document.querySelectorAll('.admin');
    for(const adminElement of adminElements){
        adminElement.style.display="none";
    }
    document.querySelector('.non-admin').style.display=null;
}

// vérification de la présence d'un token admin

const adminToken = localStorage.getItem('token');
if (!adminToken){
    logout();
}
else {

    console.log(adminToken); // test

    document.querySelector('.non-admin').style.display="none";
    document.querySelector('.admin').addEventListener("click", function(){  
    logout();
    });

    modale();
}





