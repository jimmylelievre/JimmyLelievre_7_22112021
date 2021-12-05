//DOM

const cards = document.querySelector(".cards-container");

const input = document.querySelector(".search-input");

const menuIngredient = document.querySelector(".menu-ingredient");
const menuAppareil = document.querySelector(".menu-appareil");
const menuUstensile = document.querySelector(".menu-ustensile");
const menus = document.querySelector(".menu");

function filtre(search) {
  let nouvTab = [];
  for (let i = 0; i < recipes.length; i++) {
    if (recipes[i].name.toLowerCase().includes(search.toLowerCase())) {
      nouvTab.push(recipes[i]);
    }
    if (recipes[i].description.toLowerCase().includes(search.toLowerCase())) {
      nouvTab.push(recipes[i]);
    }
    for (let j = 0; j < recipes[i].ingredients.length; j++) {
      if (
        recipes[i].ingredients[j].ingredient
          .toLowerCase()
          .includes(search.toLowerCase())
      ) {
        nouvTab.push(recipes[i]);
      }
    }
  }
  let unique = [...new Set(nouvTab)];
  return unique;
}

function recipeDisplay(array) {
  for (let i = 0; i < array.length; i++) {
    let ingredients = [];

    for (j = 0; j < array[i].ingredients.length; j++) {
      let ingredient = array[i].ingredients[j].ingredient;
      let quantity = array[i].ingredients[j].quantity;
      let unit = array[i].ingredients[j].unit;

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

    cards.innerHTML += `
      
      <div class="cards">
      <section class="recipe"> 
      <div class="card-image"></div>
      <div class="card-recipe">
      <div class="title-recipe">
      <h2>${array[i].name}</h2>
      <p><i class="far fa-clock"></i>${array[i].time} min</p>
      </div>
      <div class="description-recipe">
      
      <ul>${ingredients.join("")}</ul>
      
      <p class="description">${array[i].description}.</p>
      </div>
      </div>
      </section>
      
      </div>
      
      
      
      `;
  }
}

input.addEventListener("input", (e) => {
  resultInput = e.target.value;
  const tabResult = resultInput.split(" ");
  let recipeList = [];

  if (resultInput.length > 3) {
    tabResult.forEach((searchInput) => {
      if (searchInput != "") {
        recipeList.push((resultFiltre = filtre(searchInput)));
        handleSearch(searchInput);
      }
    });
    cards.innerHTML = "";
    recipeDisplay(recipeList.flat());
    handleSearch(resultInput);
  } else {
    cards.innerHTML = "";
  }
  if (recipeList == "" && resultInput.length > 3) {
    cards.innerHTML =
      "Aucune recette ne correspond à vos critères de recherche. Vous pouvez chercher « tarte aux pommes », « poisson », etc.";
  }
});
