// DOM
const inputIngredient = document.querySelector(".input-ingredient");
const inputAppareil = document.querySelector(".input-appareil");
const inputUstensile = document.querySelector(".input-ustensile");

const tagContainer = document.querySelector(".tag-container");
const buttonAppareil = document.querySelector(".appareil");
const buttonUstensile = document.querySelector(".ustensiles");
const buttonIngredient = document.querySelector(".advanced-search ");

const listIngredient = document.querySelector(".ul-ingredient");
const listAppareil = document.querySelector(".ul-appareil");
const listUstensile = document.querySelector(".ul-ustensile");

const chevronUp = document.querySelectorAll(".fa-chevron-up");

// Apparition des recette en fonction des tags
function tagRecipeDisplay(search) {
  cards.innerHTML += recipes
    .filter((recipe) => {
      for (i = 0; i < recipe.ingredients.length; i++) {
        searchIngredient = recipe.ingredients[i].ingredient
          .toLowerCase()
          .includes(search.toLowerCase());
        if (searchIngredient) {
          return true;
        }
      }
    })
    .map((recipe) => {
      let ingredients = [];

      for (i = 0; i < recipe.ingredients.length; i++) {
        let ingredient = recipe.ingredients[i].ingredient;
        let quantity = recipe.ingredients[i].quantity;
        let unit = recipe.ingredients[i].unit;

        if (unit == undefined) {
          unit = "";
        }
        if (quantity == undefined) {
          quantity = "";
        }
        ingredients.push(
          `<li><strong>${ingredient}:</strong> ${quantity} ${unit}</li>`
        );
      }
      return `
              
              <div class="cards">
                  <section class="recipe"> 
                      <div class="card-image"></div>
                      <div class="card-recipe">
                          <div class="title-recipe">
                              <h2>${recipe.name}</h2>
                              <p><i class="far fa-clock"></i>${
                                recipe.time
                              } min</p>
                          </div>
                      <div class="description-recipe">
                        <ul>${ingredients.join("")}</ul>
                        <p class="description">${recipe.description}.</p>
                      </div>
                  </div>
                  </section>
              </div>
              
              
              
              `;
    })
    .join("");
}

function appareilRecipeDisplay(search) {
  cards.innerHTML += recipes
    .filter((recipe) => {
      let searchAppareil = recipe.appliance
        .toLowerCase()
        .includes(search.toLowerCase());
      if (searchAppareil) {
        return true;
      }
      console.log("recipe appareil : " + recipe.appliance);
    })
    .map((recipe) => {
      let ingredients = [];

      for (i = 0; i < recipe.ingredients.length; i++) {
        let ingredient = recipe.ingredients[i].ingredient;
        let quantity = recipe.ingredients[i].quantity;
        let unit = recipe.ingredients[i].unit;

        if (unit == undefined) {
          unit = "";
        }
        if (quantity == undefined) {
          quantity = "";
        }
        ingredients.push(
          `<li><strong>${ingredient}:</strong> ${quantity} ${unit}</li>`
        );
      }
      return `
              
              <div class="cards">
                  <section class="recipe"> 
                      <div class="card-image"></div>
                      <div class="card-recipe">
                          <div class="title-recipe">
                              <h2>${recipe.name}</h2>
                              <p><i class="far fa-clock"></i>${
                                recipe.time
                              } min</p>
                          </div>
                      <div class="description-recipe">
              
                          <ul>${ingredients.join("")}</ul>
              
                          <p class="description">${recipe.description}.</p>
                      </div>
                  </div>
                  </section>
              
              </div>
              
              
              
              `;
    })
    .join("");
}

function ustensilRecipeDisplay(search) {
  cards.innerHTML += recipes
    .filter((recipe) => {
      for (i = 0; i < recipe.ustensils.length; i++) {
        searchUstensil = recipe.ustensils[i]
          .toLowerCase()
          .includes(search.toLowerCase());
        if (searchUstensil) {
          return true;
        }
      }
    })
    .map((recipe) => {
      let ingredients = [];

      for (i = 0; i < recipe.ingredients.length; i++) {
        let ingredient = recipe.ingredients[i].ingredient;
        let quantity = recipe.ingredients[i].quantity;
        let unit = recipe.ingredients[i].unit;

        if (unit == undefined) {
          unit = "";
        }
        if (quantity == undefined) {
          quantity = "";
        }
        ingredients.push(
          `<li><strong>${ingredient}:</strong> ${quantity} ${unit}</li>`
        );
      }
      return `
              
              <div class="cards">
                  <section class="recipe"> 
                      <div class="card-image"></div>
                      <div class="card-recipe">
                          <div class="title-recipe">
                              <h2>${recipe.name}</h2>
                              <p><i class="far fa-clock"></i>${
                                recipe.time
                              } min</p>
                          </div>
                      <div class="description-recipe">
              
                          <ul>${ingredients.join("")}</ul>
              
                          <p class="description">${recipe.description}.</p>
                      </div>
                  </div>
                  </section>
              
              </div>
              
              
              
              `;
    })
    .join("");
}

function handleSearch(search) {
  let searchdata = recipes.filter((recipe) => filterSearch(recipe, search));

  let ingredientResult = searchdata.map((recipe) => recipe.ingredients);
  let appareilResult = searchdata.map((recipe) => recipe.appliance);
  let ustensilResult = searchdata.map((recipe) => recipe.ustensils);

  let searchUstensil = [];

  for (let i = 0; i < ustensilResult.flat().length; i++) {
    searchUstensil.push(ustensilResult.flat()[i].toLowerCase());
  }

  let searchIngredient = [];

  for (let i = 0; i < ingredientResult.flat().length; i++) {
    searchIngredient.push(ingredientResult.flat()[i].ingredient.toLowerCase());
  }
  /* console.log("ingredient", searchUstensil); */
  ingredientDisplay(searchIngredient);
  appareilDisplay(appareilResult);
  ustensileDisplay(searchUstensil);
}
// Affichage des ingredients sans les doublons dans la fenetre recherche avancée

function ingredientDisplay(search) {
  const uniqueIgredient = [...new Set(search)];

  listIngredient.innerHTML = uniqueIgredient
    .map((i) => {
      return `
      
        <li class="list">${i}</li>
      `;
    })
    .join("");
}

// Permet d'affiché seulement les trente premiers ingredients
function ingredientDisplay2() {
  let ing = [];
  recipes.map((recipe) => {
    for (i = 0; i < recipe.ingredients.length; i++) {
      let ingredient = recipe.ingredients[i].ingredient.toLowerCase();
      ing.push(ingredient);
    }
  });

  const uniqueIgredient = [...new Set(ing)];
  uniqueIgredient.splice(30);

  listIngredient.innerHTML = uniqueIgredient
    .map((i) => {
      return `
        
        <li class="list">${i}</li>
        `;
    })
    .join("");
}
ingredientDisplay2();

// Affichée les appareils dans la fenetre recherche avancé appareil
let appliance = [];
function appareilDisplay(search) {
  const uniqueAppliance = [...new Set(search)];

  listAppareil.innerHTML = uniqueAppliance

    .map((i) => {
      return `
    
      <li>${i}</li>
    `;
    })
    .join("");
}
appareilDisplay("");

// Affichée les ustensiles dans la fenetre recherche avancé ustensile
let listUstensil = [];
function ustensileDisplay(search) {
  const uniqueUstensil = [...new Set(search)];

  listUstensile.innerHTML = uniqueUstensil
    .map((i) => {
      return `
    
      <li>${i}</li>
    `;
    })
    .join("");
}
ustensileDisplay("");

// Input recherche avancée ingredient
inputIngredient.addEventListener("input", (e) => {
  let ing = [];
  let resultInput = e.target.value.toLowerCase();

  if (resultInput) {
    ing = recipes
      .map((recipe) => recipe.ingredients)
      .flat()
      .map((ingredient) => ingredient.ingredient.toLowerCase())
      .filter((ingredient) => ingredient.includes(resultInput));
    ingredientDisplay(ing);
  }
});

inputAppareil.addEventListener("input", (e) => {
  let appareil = [];
  let resultInput = e.target.value.toLowerCase();
  if (resultInput) {
    appareil = recipes
      .map((recipe) => recipe.appliance.toLowerCase())
      .filter((recipe) => recipe.includes(resultInput));
    appareilDisplay(appareil);
  }
});

inputUstensile.addEventListener("input", (e) => {
  let ustensil = [];
  let resultInput = e.target.value.toLowerCase();
  if (resultInput) {
    ustensil = recipes
      .map((recipe) => recipe.ustensils)
      .flat()
      .map((ustensils) => ustensils.toLowerCase())
      .filter((ustensil) => ustensil.includes(resultInput));
    ustensileDisplay(ustensil);
  }
});

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

// Apparition des tags de chaque recherche avancée

listIngredient.addEventListener("click", (e) => {
  tagChoice = e.target.textContent;

  console.log("tag choice : " + tagChoice);

  tagContainer.innerHTML += `
  
        <div class="tag">
          <p>${tagChoice}</p>
          <i class="far fa-times-circle"></i>          
        </div>
    `;
  // remove tag a chaque clic dessus
  const tag = document.querySelectorAll(".tag");

  tag.forEach((tag) => {
    tag.addEventListener("click", () => {
      tag.innerHTML = "";
      tag.classList.remove("tag");
      cards.innerHTML = "";
    });
  });
  tagRecipeDisplay(tagChoice);
});

listAppareil.addEventListener("click", (e) => {
  tagChoice = e.target.textContent;
  tagContainer.innerHTML += `
  
        <div class="tag color-one">
          <p>${e.target.textContent}</p>
          <i class="far fa-times-circle"></i>          
        </div>
    `;

  const tag = document.querySelectorAll(".tag");
  tag.forEach((tag) => {
    tag.addEventListener("click", () => {
      tag.innerHTML = "";
      tag.classList.remove("tag");
    });
  });
  appareilRecipeDisplay(tagChoice);
});

listUstensile.addEventListener("click", (e) => {
  tagContainer.innerHTML += `
  
        <div class="tag color-two">
          <p>${e.target.textContent}</p>
          <i class="far fa-times-circle"></i>          
        </div>
    `;

  const tag = document.querySelectorAll(".tag");
  tag.forEach((tag) => {
    tag.addEventListener("click", () => {
      tag.innerHTML = "";
      tag.classList.remove("tag");
    });
  });
  ustensilRecipeDisplay(e.target.textContent);
});
