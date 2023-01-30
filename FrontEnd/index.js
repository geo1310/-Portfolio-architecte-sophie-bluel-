import { generationProjets } from "./projets.js";
import { gestionCategories } from "./categories.js";

// Récupération des projets depuis l'API

const reponseProjets = await fetch('http://localhost:5678/api/works/');
const projets = await reponseProjets.json();

const galleryElements = document.querySelector(".gallery");

// 1ere génération des projets ----------------------------------------------------------------------------------

generationProjets(projets, galleryElements);

// gestion des categories

gestionCategories(projets, galleryElements);


// gestion administrateur -----------------------------------------------------------------------------

function logout(){
    localStorage.removeItem('token');
    console.clear()
    const adminElements = document.querySelectorAll('.admin');
    for(const adminElement of adminElements){
        adminElement.style.display="none";
    }
    document.querySelector('.non-admin').style.display="block";
}

const adminToken = localStorage.getItem('token');
if (!adminToken){
    logout();
}
else {

    console.log(adminToken);

    document.querySelector('.non-admin').style.display="none";
    document.querySelector('.admin').addEventListener("click", function(){  
    logout();
    });
}





