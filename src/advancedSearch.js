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
let tagChoiceList = [];
/**
 * ----------------------------------------------------------------
 * LES FONCTIONS DE RECUPÉRATIONS DES ELEMENTS DANS LA CUISINE
 * Ces fonctions ci dessus permettent de récupérer les élements : ustensil, appareil et ingrédient
 * dans la cuisine.
 * ----------------------------------------------------------------
 */

/** 
  Cette fonction permet de récupération l'ensemble de des ingredients
*/
getAllIngredients = () => {
  let all = recipes
    .map((recipe) => recipe.ingredients)
    .flat()
    .map((ingredient) => ingredient.ingredient.toLowerCase());
  return [...new Set(all)];
};
/** 
  Cette fonction permet de récupération l'ensemble de des ustensil
*/
getAllUstensiles = () => {
  let all = recipes
    .map((recipe) => recipe.ustensils)
    .flat()
    .map((ustensil) => ustensil.toLowerCase());
  return [...new Set(all)];
};

/** 
  Cette fonction permet de récupération l'ensemble de des appareils
*/
getAllAppareils = () => {
  let all = recipes.map((recipe) => recipe.appliance.toLowerCase());
  return [...new Set(all)];
};
/**
 * ------------------------------------------------
 * Cette fonction prend en parametres :
 *   - search : la recherche tapé par l'utilisateur elle null quand on vient d'ouvrir le site
 *   - listContainer : l'element dans laquelle les li généré seront affiché
 *   - className : la classe de l'élement utilisé par exemple list-ingredient
 * ------------------------------------------------
 */
const getCusineElements = (
  search = null,
  listContainer,
  className,
  elementCallback
) => {
  let elements = [];
  let callback = listTagHandler[className];
  if (search == null) {
    elements = elementCallback();
    elements.splice(30);
  } else {
    elements = [...new Set(search)];
  }
  document.querySelector(listContainer).innerHTML = dipslayElementCuisine(
    elements,
    className
  );
  addTagElementEvent(className, callback);
};
/**
 *  Dans ces fonctions on appelle notre fonction getCusineElements
 * A chaque fois on lui donne lui élement pour récuperer ce qu'on veux ingredients, appareils, ustensils
 * Ces 3 fonctions définient ci-après serve de rappels pour ne pas appeler getCusineElements à chaque fois avec la liste longue de ses parametre
 *
 */
const displayIngredients = (search = null) =>
  getCusineElements(
    search,
    ".ul-ingredient",
    "list-ingredient",
    getAllIngredients
  );
const displayAppareils = (search = null) =>
  getCusineElements(search, ".ul-appareil", "list-appareil", getAllAppareils);
const displayUstensils = (search = null) =>
  getCusineElements(search, ".ul-ustensile", "list-ustensil", getAllUstensiles);

/**
 * La fonction init est la premiere fonction appeler elle permet d'appeler nos fonction de rappels à l'état initial
 * Elle est aussi appelé après avoir enlevé tous les tags
 */
function init() {
  displayIngredients();
  displayAppareils();
  displayUstensils();
}
init();

function filterSearch(recipe, search) {
  let searchName = recipe.name.toLowerCase().includes(search.toLowerCase());
  let searchDescription = recipe.description
    .toLowerCase()
    .includes(search.toLowerCase());

  let i;
  recipe.ingredients.map((element) => {
    searchIngredient = element.ingredient
      .toLowerCase()
      .includes(search.toLowerCase());
    if (searchIngredient) {
      i = true;
    }
  });

  if (i) {
    return true;
  }
  if (searchName) {
    return true;
  }
  if (searchDescription) {
    return true;
  }
  /* console.log(searchIngredient); */
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
  displayIngredients(searchIngredient);
  displayAppareils(appareilResult);
  displayUstensils(searchUstensil);
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
function dipslayElementCuisine(elements, className) {
  return elements
    .map((i) => {
      return `
    
      <li class="${className}">${i}</li>
    `;
    })
    .join("");
}

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
    displayIngredients();
  }

  if (resultInput) {
    ing = recipes
      .map((recipe) => recipe.ingredients)
      .flat()
      .map((ingredient) => ingredient.ingredient.toLowerCase())
      .filter((ingredient) => ingredient.includes(resultInput));
    displayIngredients(ing);
  }
});

inputAppareil.addEventListener("input", (e) => {
  let appareil = [];
  let resultInput = e.target.value.toLowerCase();
  if (resultInput.length === 0 || resultInput === "") {
    listAppareil.innerHTML = "";
  }
  if (resultInput) {
    appareil = recipes
      .map((recipe) => recipe.appliance.toLowerCase())
      .filter((recipe) => recipe.includes(resultInput));
    diplayAppareils(appareil);
  }
});

inputUstensile.addEventListener("input", (e) => {
  let ustensil = [];
  let resultInput = e.target.value.toLowerCase();
  if (resultInput.length === 0 || resultInput === "") {
    listUstensile.innerHTML = "";
  }
  if (resultInput) {
    ustensil = recipes
      .map((recipe) => recipe.ustensils)
      .flat()
      .map((ustensils) => ustensils.toLowerCase())
      .filter((ustensil) => ustensil.includes(resultInput));
    displayUstensils(ustensil);
  }
});

// Apparition des tags de chaque recherche avancée
function handleTagClick(e, className, recipeTagCallback) {
  tagChoice = e.target.textContent;
  tagChoiceList.push(tagChoice);
  recipeTagCallback(tagChoiceList);
  let colorClass = {
    "list-ingredient": "",
    "list-appareil": "color-one",
    "list-ustensil": "color-two",
  };
  tagContainer.innerHTML += `

    <div id="${tagChoice}" class="tag ${colorClass[className]}">
      <p>${tagChoice}</p>
      <i  class="far fa-times-circle"></i>          
    </div>           
       
    `;

  const tag = document.querySelectorAll(".tag");
  tag.forEach((tag) => {
    tag.addEventListener("click", (e) => {
      let myIndex = tagChoiceList.indexOf(e.currentTarget.id);
      if (myIndex !== -1) {
        tagChoiceList.splice(myIndex, 1);
      }
      // On traite quand la liste des tags devients vide on revient à zero
      if (tagChoiceList.length == 0) {
        init();
      } else {
        recipeTagCallback(tagChoiceList);
      }
      recipeTagCallback(tagChoiceList);

      tag.style.display = "none";
    });
  });
}

function addTagElementEvent(className, callback) {
  Array.from(document.getElementsByClassName(className)).forEach((element) => {
    element.addEventListener(
      "click",
      (e) => {
        handleTagClick(e, className, callback);
      },
      [(once = true)]
    );
  });
}
