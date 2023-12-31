/* fonction qui me permet d'afficher l'email de partage du score obtenue sur Azertype */
function afficherEmail(nom, email, score) {
    let mailto = `mailto:${email}?subject=Partage du score Azertype&body=Salut, je suis ${nom} et je viens de réaliser le score ${score} sur le site d'Azertype !`;
    location.href = mailto;
}

/* fonction qui permet d'afficher le score obtenue sur le site */
function afficherResultat (resultat, nbreTotalMot){
    let scoreJoueur = document.querySelector(".score span");
    let affichageScore = `${resultat} / ${nbreTotalMot}`;
    scoreJoueur.innerText = affichageScore;
    console.log("Vous avez obtenu "+ resultat +" sur "+ nbreTotalMot);
}

/* fonction qui propose à l'utilisateur de jouer avec les phrases ou les mots */ 
function afficherProposition (word){           
    let mot = document.querySelector("#suggest label");
    mot.innerText = word;
}

/* fonction qui permet d'afficher la popup de partage lorsqu'on clique sur partage */
function initEventPopup() {
    let partager = document.getElementById("partager");
    let popupBackground = document.getElementById("popupBackground");
    partager.addEventListener("click", () => {
        afficherPopup();
    })
    popupBackground.addEventListener("click", (event) => {
        if (event.target === popupBackground) {
            cacherPopup();
        }
    })
}

/* fonction qui permet de verifier que le nom respecte les règles de validation */
function validerNom(balise1){
    if(balise1.length < 2){
        throw new Error("le nom est court");
    }
}

/* fonction qui permet de vérifier que l'email respecte les règles de validation */
function validerEmail(balise2){
    let testEmail = new RegExp("[a-zA-Z0-9]+@[a-zA-Z]+\\.[a-zA-Z]+");
    let baliseEmail = testEmail.test(balise2);
    if(!baliseEmail){
        throw new Error("L'email est invalide");
    }
}

/* fonction qui permet de gerer le formulaire de la popup de partage */
function gererFormulaire(scoreAEnvoyer) {
    try {
        let nomWeb = document.querySelector('form input[type="text"]');
        let nom = nomWeb.value;
        validerNom(nom);

        let emailWeb= document.querySelector('form input[type="email"]');
        let email = emailWeb.value;
        validerEmail(email);

        afficherEmail(nom, email, scoreAEnvoyer);
    }
    catch(erreur) {
        afficherMessageErreur(erreur.message);
    }
}

/* fonction pour afficher le message d'erreur en dessous de la popup */
function afficherMessageErreur(erreurAffiche) {   
    let spanAffiche = document.getElementById("spanErreur");    
    if(!spanAffiche){
        let maPopup = document.querySelector(".popup");
        spanAffiche = document.createElement("span");
        spanAffiche.id = "spanErreur";
        maPopup.append(spanAffiche);
    }
    spanAffiche.innerText = erreurAffiche;
}

/* fonction principale qui permet de faire fonctionner le jeu */
function lancerJeu(){
    initEventPopup();
    let result = 0;
    let i = 0;
    let valider = document.querySelector("#valider input");
    let jeu = document.getElementById("jeu");
    let change = document.querySelectorAll(".boutton input");
    let listeProposition = tabMots;  
    afficherProposition(listeProposition[i]);
    valider.addEventListener("click", () => {        
        console.log(jeu.value);
        if(jeu.value === listeProposition[i]){
            result ++;
        }
        i++;
        afficherResultat(result, listeProposition.length);
        jeu.value = "";
        if(listeProposition[i] === undefined){
            afficherProposition("le jeu est terminé");
            valider.disabled = true;
        }
        else{
            afficherProposition (listeProposition[i]);
        }
    })
    for(let j = 0; j < change.length; j++){
        change[j].addEventListener("change", () =>{
            console.log(change[j].value);
            if(change[j].value === "2"){
                listeProposition = tabPhrases;
            }
            else{
                listeProposition = tabMots;
            }
        afficherProposition(listeProposition[i]);
        })
    }
    let popupBackground = document.getElementById("popupBackground");
    popupBackground.addEventListener("submit", (event) => {
        event.preventDefault();

        let score = document.querySelector(".score");
        score = result;
        gererFormulaire(score);
    })   
}



