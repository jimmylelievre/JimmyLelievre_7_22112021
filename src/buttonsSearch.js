const tagContainer = document.querySelector(".tag-container");
const buttonAppareil = document.querySelector(".appareil");
const buttonUstensile = document.querySelector(".ustensiles");
const chevronUp = document.querySelectorAll(".fa-chevron-up");
const buttonIngredient = document.querySelector(".advanced-search ");

// Ouverture  et fermetures des fenetres recherches avancées

buttonIngredient.addEventListener("click", () => {
  inputIngredient.classList.add("with-input");
  menuIngredient.style.visibility = "visible";
  menuUstensile.style.visibility = "hidden";
  menuAppareil.style.visibility = "hidden";
  buttonAppareil.style.left = "500px";
  buttonUstensile.style.left = "500px";
});

buttonAppareil.addEventListener("click", () => {
  inputAppareil.classList.add("with-input");
  menuAppareil.style.visibility = "visible";
  buttonUstensile.style.left = "500px";
  menuUstensile.style.visibility = "hidden";
  menuIngredient.style.visibility = "hidden";
  buttonAppareil.style.left = "0px";
});

buttonUstensile.addEventListener("click", () => {
  inputUstensile.classList.add("with-input");
  menuUstensile.style.visibility = "visible";
  menuAppareil.style.visibility = "hidden";
  menuIngredient.style.visibility = "hidden";
  buttonAppareil.style.left = "0px";
  buttonUstensile.style.left = "0px";
});

// Fermeture des boutons search au click sur le chevron up
chevronUp.forEach((el) => {
  el.addEventListener("click", () => {
    menuIngredient.style.visibility = "hidden";
    menuAppareil.style.visibility = "hidden";
    menuUstensile.style.visibility = "hidden";
    buttonIngredient.style.visibility = "visible";
    buttonUstensile.style.visibility = "visible";
    buttonAppareil.style.visibility = "visible";
    buttonAppareil.style.left = "0px";
    buttonUstensile.style.left = "0px";
  });
});

// Fermeture des boutons search au click en dehors du bouton
window.addEventListener("click", (e) => {
  if (e.target.localName != "div" && e.target.localName != "input") {
    menuIngredient.style.visibility = "hidden";
    menuAppareil.style.visibility = "hidden";
    menuUstensile.style.visibility = "hidden";
    buttonIngredient.style.visibility = "visible";
    buttonUstensile.style.visibility = "visible";
    buttonAppareil.style.visibility = "visible";
    buttonAppareil.style.left = "0px";
    buttonUstensile.style.left = "0px";
  }
});
