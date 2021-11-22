//DOM
const cards = document.querySelector(".cards");

const input = document.querySelector(".search-input");

const menuIngredient = document.querySelector(".menu-ingredient");
const menuAppareil = document.querySelector(".menu-appareil");
const menuUstensile = document.querySelector(".menu-ustensile");
const menus = document.querySelector(".menu");

function filterSearch(recipe, search) {
  let searchIngredient;
  for (i = 0; i < recipe.ingredients.length; i++) {
    searchIngredient = recipe.ingredients[i].ingredient
      .toLowerCase()
      .includes(search.toLowerCase());
    if (searchIngredient) {
      return true;
    }
  }
  let searchName = recipe.name.toLowerCase().includes(search.toLowerCase());
  let searchDescription = recipe.description
    .toLowerCase()
    .includes(search.toLowerCase());

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
  console.log("recipe html :", recipeHtmlElement.length);
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
        console.log(searchInput);
      }
    });
    console.log("recipe list", recipeList.flat().length);

    cards.innerHTML = recipeList.flat().join("");
  } else {
    cards.innerHTML = "";
  }

  if (recipeList == "" && resultInput.length > 3) {
    cards.innerHTML =
      "Aucune recette ne correspond à vos critères de recherche. Vous pouvez chercher « tarte aux pommes », « poisson », etc.";
  }
  if (resultInput == "") {
    cards.innerHTML = "";
  }
  handleSearch(resultInput);
});
