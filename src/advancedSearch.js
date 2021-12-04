// DOM
const inputIngredient = document.querySelector(".input-ingredient");
const inputAppareil = document.querySelector(".input-appareil");
const inputUstensile = document.querySelector(".input-ustensile");

const listIngredient = document.querySelector(".ul-ingredient");
const listAppareil = document.querySelector(".ul-appareil");
const listUstensile = document.querySelector(".ul-ustensile");

const listTagHandler = {
  "list-ingredient": displayRecipeTagIngredient,
  "list-appareil": displayRecipeTagAppareil,
  "list-ustensil": displayRecipeTagUstensil,
};
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

function displayRecipes(recipes) {
  let recipeHtmlList = recipes.map((recipe) => {
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
  });
  let uniqueHtml = [...new Set(recipeHtmlList)];
  cards.innerHTML = uniqueHtml.join("");
}

// Apparition des recettes en fonction des tags
function ingredientRecipeDisplay(search) {
  return recipes
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
    .reduce((acc, recipe) => {
      let result = acc.find((item) => item.id == recipe.id);

      if (result == undefined) {
        acc.push(recipe);
      }
      return acc;
    }, []);

  /* .join(""); */
}

function appareilRecipeDisplay(search) {
  return recipes
    .filter((recipe) => {
      let searchAppareil = recipe.appliance
        .toLowerCase()
        .includes(search.toLowerCase());
      if (searchAppareil) {
        return true;
      }
    })
    .reduce((acc, recipe) => {
      let result = acc.find((item) => item.id == recipe.id);

      if (result == undefined) {
        acc.push(recipe);
      }
      return acc;
    }, []);
}

function ustensilRecipeDisplay(search) {
  return recipes
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
    .reduce((acc, recipe) => {
      let result = acc.find((item) => item.id == recipe.id);

      if (result == undefined) {
        acc.push(recipe);
      }
      return acc;
    }, []);
}

// Affichage des ingredients sans les doublons dans la fenetre recherche avancée
function dipslayElementCuisine(uniqueIgredient, className) {
  return uniqueIgredient
    .map((i) => {
      return `
    
      <li class="${className}">${i}</li>
    `;
    })
    .join("");
}

function ingredientDisplay(search = null) {
  let uniqueIgredient = [];

  if (search == null) {
    let ing = [];
    recipes.map((recipe) => {
      for (i = 0; i < recipe.ingredients.length; i++) {
        let ingredient = recipe.ingredients[i].ingredient.toLowerCase();
        ing.push(ingredient);
      }
    });

    uniqueIgredient = [...new Set(ing)];

    uniqueIgredient.splice(30);
    listIngredient.innerHTML = dipslayElementCuisine(
      uniqueIgredient,
      "list-ingredient"
    );
  } else {
    uniqueIgredient = [...new Set(search)];
    listIngredient.innerHTML = dipslayElementCuisine(
      uniqueIgredient,
      "list-ingredient"
    );
  }
  let callback = listTagHandler["list-ingredient"];
  addTagAppareilEvent("list-ingredient", callback);
}
ingredientDisplay();

function appareilDisplay(search = null) {
  let uniqueAppareil = [];

  if (search == null) {
    let appareil = [];
    recipes.map((recipe) => {
      appareil.push(recipe.appliance.toLowerCase());
    });

    uniqueAppareil = [...new Set(appareil)];

    listAppareil.innerHTML = dipslayElementCuisine(
      uniqueAppareil,
      "list-appareil"
    );
  } else {
    uniqueAppareil = [...new Set(search)];
    listAppareil.innerHTML = dipslayElementCuisine(
      uniqueAppareil,
      "list-appareil"
    );
    let callback = listTagHandler["list-appareil"];
    addTagAppareilEvent("list-appareil", callback);
  }
}

appareilDisplay();
let callback = listTagHandler["list-appareil"];
addTagAppareilEvent("list-appareil", callback);
// Affichée les ustensiles dans la fenetre recherche avancé ustensile

function ustensileDisplay(search = null) {
  let uniqueUstensil = [];

  if (search == null) {
    let ustensil = [];
    recipes.map((recipe) => ustensil.push(recipe.ustensils));

    uniqueUstensil = [...new Set(ustensil.flat())];

    listUstensile.innerHTML = dipslayElementCuisine(
      uniqueUstensil,
      "list-ustensil"
    );
  } else {
    uniqueUstensil = [...new Set(search)];
    listUstensile.innerHTML = dipslayElementCuisine(
      uniqueUstensil,
      "list-ustensil"
    );
  }
  let callback = listTagHandler["list-ustensil"];
  addTagAppareilEvent("list-ustensil", callback);
}
ustensileDisplay();

function displayRecipeTag(tagChoiceList, tagRecipeCallback, className) {
  let tagRecipeList = tagChoiceList
    .map((tagSearchText) => {
      let recipeToDisplay = tagRecipeCallback(tagSearchText);
      handleSearch(tagSearchText);

      return recipeToDisplay;
    })
    .flat();
  displayRecipes(tagRecipeList);
}

function displayRecipeTagIngredient(tagChoiceList) {
  displayRecipeTag(tagChoiceList, ingredientRecipeDisplay, "list-ingredient");
}

function displayRecipeTagAppareil(tagChoiceList) {
  displayRecipeTag(tagChoiceList, appareilRecipeDisplay, "list-appareil");
}

function displayRecipeTagUstensil(tagChoiceList) {
  displayRecipeTag(tagChoiceList, ustensilRecipeDisplay, "list-ustensil");
}

// Input recherche avancée ingredient
inputIngredient.addEventListener("input", (e) => {
  let ing = [];
  let resultInput = e.target.value.toLowerCase();
  if (resultInput.length === 0 || resultInput === "") {
    ingredientDisplay();
  }

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
  if (resultInput.length === 0 || resultInput === "") {
    listIngredient.innerHTML = "";
  }
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
  if (resultInput.length === 0 || resultInput === "") {
    listIngredient.innerHTML = "";
  }
  if (resultInput) {
    ustensil = recipes
      .map((recipe) => recipe.ustensils)
      .flat()
      .map((ustensils) => ustensils.toLowerCase())
      .filter((ustensil) => ustensil.includes(resultInput));
    ustensileDisplay(ustensil);
  }
});

// Apparition des tags de chaque recherche avancée
let tagChoiceList = [];
/* listIngredient.addEventListener("click", (e) => {
  let tagChoice = e.target.textContent;
  tagChoiceList.push(tagChoice);

  displayRecipeTagIngredient(tagChoiceList);

  tagContainer.innerHTML += `

  
      <div data-id="${tagChoice}" class="tag">
        <p data-id="${tagChoice}"  >${tagChoice}</p>
        <i data-id="${tagChoice}"  class="far fa-times-circle"></i>          
      </div>   
      

        
    `;
  // remove tag a chaque clic dessus
  const tag = document.querySelectorAll(".tag");

  tag.forEach((tag) => {
    tag.addEventListener("click", (e) => {
      console.log(e);
      let myIndex = tagChoiceList.indexOf(e.target.dataset.id);
      if (myIndex !== -1) {
        tagChoiceList.splice(myIndex, 1);
      }

      displayRecipeTagIngredient(tagChoiceList);

      tag.style.display = "none";
    });
  });
}); */
function handleTagClick(e, recipeTagCallback) {
  tagChoice = e.target.textContent;
  tagChoiceList.push(tagChoice);
  console.log("call");
  /* tagChoiceList = [...new Set(tagChoiceList)]; */
  console.log(tagChoiceList);
  /*  let callback = listTagHandler[className]; */
  recipeTagCallback(tagChoiceList);
  /*  addTagAppareilEvent(className, callback); */

  tagContainer.innerHTML += `

    <div id="${tagChoice}" class="tag color-one">
      <p id="${tagChoice}"  >${tagChoice}</p>
      <i id="${tagChoice}"  class="far fa-times-circle"></i>          
    </div>           
       
    `;

  const tag = document.querySelectorAll(".tag");
  tag.forEach((tag) => {
    tag.addEventListener("click", (e) => {
      let myIndex = tagChoiceList.indexOf(e.target.id);
      if (myIndex !== -1) {
        tagChoiceList.splice(myIndex, 1);
      }

      recipeTagCallback(tagChoiceList);

      /* addTagAppareilEvent(className, callback); */
      tag.style.display = "none";
    });
  });
}

function addTagAppareilEvent(className, callback) {
  Array.from(document.getElementsByClassName(className)).forEach((element) => {
    element.addEventListener(
      "click",
      (e) => {
        handleTagClick(e, callback);
      },
      [(once = true)]
    );
  });
}
/* addTagAppareilEvent("list-ingredient", displayRecipeTagIngredient); */

/* listUstensile.addEventListener("click", (e) => {
  tagChoice = e.target.textContent;
  tagChoiceList.push(tagChoice);

  displayRecipeTagUstensil(tagChoiceList);
  tagContainer.innerHTML += `
  
      <div id="${tagChoice}" class="tag color-two">
        <p id="${tagChoice}"  >${tagChoice}</p>
        <i id="${tagChoice}"  class="far fa-times-circle"></i>          
      </div>   
    `;

  const tag = document.querySelectorAll(".tag");
  tag.forEach((tag) => {
    tag.addEventListener("click", (e) => {
      e.stopPropagation();
      console.log(e);
      let myIndex = tagChoiceList.indexOf(e.target.id);
      if (myIndex !== -1) {
        tagChoiceList.splice(myIndex, 1);
      }

      displayRecipeTagUstensil(tagChoiceList);
      tag.style.display = "none";
    });
  });
});
 */
