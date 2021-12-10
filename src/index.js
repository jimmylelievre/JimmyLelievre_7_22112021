//DOM

const cards = document.querySelector(".cards-container");

const input = document.querySelector(".search-input");

const menuIngredient = document.querySelector(".menu-ingredient");
const menuAppareil = document.querySelector(".menu-appareil");
const menuUstensile = document.querySelector(".menu-ustensile");
const menus = document.querySelector(".menu");

// Filtre recette
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
}

//Apparition des recettes
function recipeDisplay(search) {
  let recipeHtmlElement = recipes
    .filter((recipe) => filterSearch(recipe, search))
    .map((recipe) => {
      let ingredients = [];

      recipe.ingredients.forEach((ingredient) => {
        let eachIngredient = ingredient.ingredient;
        let quantity = ingredient.quantity;
        let unit = ingredient.unit;

        if (unit == undefined) {
          unit = "";
        }
        if (quantity == undefined) {
          quantity = "";
        }
        ingredients.push(
          `<li><strong>${eachIngredient}:</strong> ${quantity} ${unit}</li>`
        );
      });

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

  return recipeHtmlElement;
}

// Evenement input principal
input.addEventListener("input", (e) => {
  let resultInput = e.target.value;
  const tabResult = resultInput.split(" ");

  let recipeList = [];
  if (resultInput.length > 3) {
    tabResult.forEach((searchInput) => {
      if (searchInput != "") {
        recipeList.push(recipeDisplay(searchInput));
        handleSearch(searchInput);
      }
    });

    cards.innerHTML = recipeList.flat().join("");
  } else {
    cards.innerHTML = "";
    handleSearch(" ");
  }

  if (recipeList == "" && resultInput.length > 3) {
    cards.innerHTML =
      "Aucune recette ne correspond à vos critères de recherche. Vous pouvez chercher « tarte aux pommes », « poisson », etc.";
  }
  if (resultInput == "") {
    cards.innerHTML = "";
  }
});
