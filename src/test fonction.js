function handleSearch(search, recipes) {
  let searchdata = recipes.filter((recipe) => filterSearch(recipe, search));

  let ingredientResult = searchdata.map((recipe) => recipe.ingredients);
  recipeDisplay(searchdata);
  ingredientDisplay(ingredientResult.flat());
}

function recipeDisplay(recipes) {
  let recipeHtmlElement = recipes.map((recipe) => {
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
  /* .join("") */
}
