// DOM
const inputIngredient = document.querySelector(".input-ingredient");
const inputAppareil = document.querySelector(".input-appareil");
const inputUstensile = document.querySelector(".input-ustensile");

const listIngredient = document.querySelector(".ul-ingredient");
const listAppareil = document.querySelector(".ul-appareil");
const listUstensile = document.querySelector(".ul-ustensile");

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
  console.log(recipes);
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
      console.log(result, recipe.name, acc);

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
function ingredientDisplay(search = null) {
  let uniqueIgredient = [];
  console.log(search);
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
    listIngredient.innerHTML = displayIngredientHtml(uniqueIgredient);
  } else {
    uniqueIgredient = [...new Set(search)];
    listIngredient.innerHTML = displayIngredientHtml(uniqueIgredient);
  }
}
ingredientDisplay();

function displayIngredientHtml(uniqueIgredient) {
  return uniqueIgredient
    .map((i) => {
      return `
    
      <li class="list">${i}</li>
    `;
    })
    .join("");
}
function displayAppareilHtml(uniqueAppareil) {
  return uniqueAppareil
    .map((i) => {
      return `
    
      <li class="list">${i}</li>
    `;
    })
    .join("");
}

function displayUstensilHtml(uniqueUstensil) {
  return uniqueUstensil
    .map((i) => {
      return `
    
      <li class="list">${i}</li>
    `;
    })
    .join("");
}

function appareilDisplay(search = null) {
  let uniqueAppareil = [];
  console.log(search);
  if (search == null) {
    let appareil = [];
    recipes.map((recipe) => {
      appareil.push(recipe.appliance.toLowerCase());
    });

    uniqueAppareil = [...new Set(appareil)];

    listAppareil.innerHTML = displayAppareilHtml(uniqueAppareil);
  } else {
    uniqueAppareil = [...new Set(search)];
    listAppareil.innerHTML = displayAppareilHtml(uniqueAppareil);
  }
}
appareilDisplay();
// Affichée les ustensiles dans la fenetre recherche avancé ustensile

function ustensileDisplay(search = null) {
  let uniqueUstensil = [];

  if (search == null) {
    let ustensil = [];
    recipes.map((recipe) => ustensil.push(recipe.ustensils));

    console.log(ustensil.flat());

    uniqueUstensil = [...new Set(ustensil.flat())];

    listUstensile.innerHTML = displayUstensilHtml(uniqueUstensil);
  } else {
    uniqueUstensil = [...new Set(search)];
    listUstensile.innerHTML = displayUstensilHtml(uniqueUstensil);
  }
}
ustensileDisplay();

function displayRecipeTagIngredient(tagChoiceList) {
  let tagRecipeList = tagChoiceList
    .map((tagSearchText) => {
      let recipeToDisplay = ingredientRecipeDisplay(tagSearchText);
      handleSearch(tagSearchText);
      console.log(tagSearchText);
      return recipeToDisplay;
    })
    .flat();
  displayRecipes(tagRecipeList);
}
function displayRecipeTagAppareil(tagChoiceList) {
  let tagRecipeList = tagChoiceList
    .map((tagSearchText) => {
      let recipeToDisplay = appareilRecipeDisplay(tagSearchText);
      handleSearch(tagSearchText);

      return recipeToDisplay;
    })
    .flat();
  displayRecipes(tagRecipeList);
}

function displayRecipeTagUstensil(tagChoiceList) {
  let tagRecipeList = tagChoiceList
    .map((tagSearchText) => {
      let recipeToDisplay = ustensilRecipeDisplay(tagSearchText);
      handleSearch(tagSearchText);

      return recipeToDisplay;
    })
    .flat();
  displayRecipes(tagRecipeList);
}

// Input recherche avancée ingredient
inputIngredient.addEventListener("input", (e) => {
  let ing = [];
  let resultInput = e.target.value.toLowerCase();
  if (resultInput.length === 0 || resultInput === "") {
    ingredientDisplay();
  }
  console.log(resultInput);
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
listIngredient.addEventListener("click", (e) => {
  let tagChoice = e.target.textContent;
  tagChoiceList.push(tagChoice);

  displayRecipeTagIngredient(tagChoiceList);

  tagContainer.innerHTML += `
  
        <div class="tag">
          <p>${tagChoice}</p>
          <i class="far fa-times-circle"></i>          
        </div>
    `;
  // remove tag a chaque clic dessus
  const tag = document.querySelectorAll(".tag");

  tag.forEach((tag) => {
    tag.addEventListener("click", (e) => {
      let myIndex = tagChoiceList.indexOf(e.target.textContent);
      if (myIndex !== -1) {
        tagChoiceList.splice(myIndex, 1);
      }

      displayRecipeTagIngredient(tagChoiceList);
      tag.innerHTML = "";
      tag.classList.remove("tag");
    });
  });
});

listAppareil.addEventListener("click", (e) => {
  tagChoice = e.target.textContent;
  tagChoiceList.push(tagChoice);

  displayRecipeTagAppareil(tagChoiceList);
  tagContainer.innerHTML += `
  
        <div class="tag color-one">
          <p>${e.target.textContent}</p>
          <i class="far fa-times-circle"></i>          
        </div>
    `;

  const tag = document.querySelectorAll(".tag");
  tag.forEach((tag) => {
    tag.addEventListener("click", (e) => {
      let myIndex = tagChoiceList.indexOf(e.target.textContent);
      if (myIndex !== -1) {
        tagChoiceList.splice(myIndex, 1);
      }

      displayRecipeTagAppareil(tagChoiceList);
      tag.innerHTML = "";
      tag.classList.remove("tag");
    });
  });
});

listUstensile.addEventListener("click", (e) => {
  tagChoice = e.target.textContent;
  tagChoiceList.push(tagChoice);

  displayRecipeTagUstensil(tagChoiceList);
  tagContainer.innerHTML += `
  
        <div class="tag color-two">
          <p>${e.target.textContent}</p>
          <i class="far fa-times-circle"></i>          
        </div>
    `;

  const tag = document.querySelectorAll(".tag");
  tag.forEach((tag) => {
    tag.addEventListener("click", (e) => {
      let myIndex = tagChoiceList.indexOf(e.target.textContent);
      if (myIndex !== -1) {
        tagChoiceList.splice(myIndex, 1);
      }

      displayRecipeTagUstensil(tagChoiceList);
      tag.innerHTML = "";
      tag.classList.remove("tag");
    });
  });
});
