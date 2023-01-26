
const formulaireLogin = document.querySelector(".login");
formulaireLogin.addEventListener("submit", async function (event) {

    event.preventDefault();

    // Création de l’objet du login
    const login = {
        email: event.target.querySelector("[name=email]").value,
        password: event.target.querySelector("[name=mot-de-passe").value,
    };

    console.log(login);

      // Création de la charge utile au format JSON
      const chargeUtile = JSON.stringify(login);

      // Appel de la fonction fetch
    
      const reponse = await fetch("http://localhost:5678/api/users/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: chargeUtile
      })
      const reponseToken = (reponse).json()
      
      console.log(reponseToken);

});

