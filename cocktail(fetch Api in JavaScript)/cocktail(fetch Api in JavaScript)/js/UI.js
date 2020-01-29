
class UI {


    //display list of all categories
    displayCategory(){

        const catList = cocktailapi.getCategories()
            .then((categories) => {
                const allCat = categories.categories.drinks
                
                const firstOption = document.createElement('option');
                    firstOption.textContent = '-Select Category-';
                    firstOption.value = '';
                
                document.querySelector('#search').appendChild(firstOption);

                allCat.forEach((category) => {
                    
                    const option = document.createElement('option');
                          option.textContent = category.strCategory;
                          option.value = category.strCategory.split(' ').join('_');

                    document.querySelector('#search').appendChild(option);
                })
            })


    }

    //get drinks without ingrdient
    displayDrinks(drinks){

        const resultWrapper = document.querySelector('.results-wrapper');
            resultWrapper.style.display = 'block';

        const resultDiv = document.querySelector('#results');

        //loop through each drinks
        drinks.forEach((drink) => {

            resultDiv.innerHTML += `

                <div class="col-md-4">
                    <div class="card my-3">
                        <button type="button" data-id="${drink.idDrink}" class="favorite-btn btn btn-outline-info">+</button>
                        <img class="card-img-top" src="${drink.strDrinkThumb}" alt="${drink.strDrink}">
                        <div class="card-body">
                            <h2 class="card-title text-center">${drink.strDrink}</h2>
                            <a data-target="#recipe" class="btn btn-success get-recipe" href="#" data-toggle="modal" data-id="${drink.idDrink}">Get Recite</a>
                        </div>
                    </div>
                </div>
            `;
        })

        //show your favourite
        isFavorites();
    }


    //print the search result from the restapi
    getDrinksWithIngredients(drinks){

        const resultWrapper = document.querySelector('.results-wrapper');
            resultWrapper.style.display = 'block';

        const resultDiv = document.querySelector('#results');
        
        //loop through each drinks
        drinks.forEach((drink) => {

            resultDiv.innerHTML += `

            <div class="col-md-6">
                <div class="card my-3">
                    <button type="button" data-id="${drink.idDrink}" class="favorite-btn btn btn-outline-info">+</button>
                    <img class="card-img-top" src="${drink.strDrinkThumb}" alt="${drink.strDrink}">
                        <div class="card-body">
                            <h2 class="card-title text-center">${drink.strDrink}</h2>
                            <p class="card-text font-weight-bold">Instructions: </p>
                            <p class="card-text">
                                ${drink.strInstructions}
                            </p>
                            <p class="card-text">
                                <ul class="list-group">
                                    <li class="list-group-item alert alert-danger">
                                    Ingredients</li>
                                        ${this.displayIngrdients(drink)}
                                </ul>
                            </p>
                            <p class="card-text font-weight-bold">Extra Information:</p>
                            <p class="card-text">
                                <span class="badge badge-pill badge-success">
                                    ${drink.strAlcoholic}
                                </span>
                                <span class="badge badge-pill badge-warning">
                                    Category: ${drink.strCategory}
                                </span>
                            </p>
                        </div>
                </div>
            </div>
            `;
        })
        
        //show your favourite
        isFavorites();
    }

    //display the ingrdient for each drink
    displayIngrdients(drink){

        let ingredients = [];

        for( let i = 1; i < 16; i++){

            const ingredientMeasure = {};

            if(drink[`strIngredient${i}`] !== ''){
                ingredientMeasure.ingredient = drink[`strIngredient${i}`];
                ingredientMeasure.measure = drink[`strMeasure${i}`];
                ingredients.push(ingredientMeasure);
            }

        }
        //build template for ingredients
        let ingredientTemplate = '';

            ingredients.forEach((ingredient) => {
                ingredientTemplate += `
                
                    <li class="list-group-item">
                    ${ingredient.ingredient} - ${ingredient.measure}
                    </li>
                `;
            })
            return ingredientTemplate;

    }

    //display a single ingredient in modal
    displaySingleRecipe(singleRecipe){

        const modalTitle = document.querySelector('.modal-title'),
              modalDescription = document.querySelector('.modal-body .description-text'),
              modalIngredients = document.querySelector('.modal-body .ingredient-list .list-group');

        modalTitle.innerHTML = singleRecipe.strDrink;
        modalDescription.innerHTML = singleRecipe.strInstructions;
        modalIngredients.innerHTML = this.displayIngrdients(singleRecipe);

    }

    //print error messages
    printMessages(message, className){

        //create a div element for the message
        const div = document.createElement('div');

        div.innerHTML = `
            <div class="alert alert-dismissible text-center alert-${className}">
                <button type="button" class="close" data-dismiss="alert">X</button>
                ${message}
            </div>
        
        `;
        //insert before this div
        const reference = document.querySelector('.jumbotron h1');
        const parentNode = reference.parentElement;

        parentNode.insertBefore(div, reference);

        //remove the alert after 3 sec
        setTimeout(()=> {

            document.querySelector('.alert').remove();
        }, 3000)

    }

    clearPrevResults(){
         const clearResults = document.querySelector('#results');
            clearResults.innerHTML = '';
    }


    getToFavorites(favorites){

        const tableBodyFav = document.querySelector('#favorites tbody')

        favorites.forEach((drink) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>
                    <img width="100" src="${drink.image}" alt="${drink.title}">
                </td>
                <td>
                    ${drink.title}
                </td>
                <td>
                    <a href="#" data-target="#recipe" data-toggle="modal" data-id="${drink.id}" class="btn btn-success get-recipe">View</a>
                </td>
                <td>
                    <a href="#" data-id="${drink.id}" class="btn btn-danger remove-recipe">Remove</a>
                </td>

            `;
            tableBodyFav.appendChild(tr);
        })
    }

    //remove drink from favorites
    removeFavorite(element){
        element.remove();
    }

    isFavorites(){

        const drinks = cocktailDB.getFromStorage();

        drinks.forEach((drink) => {

            let {id} = drink;

            let favoriteDrink = document.querySelector(`[data-id="${id}"]`);
            if(favoriteDrink){
                favoriteDrink.classList.add('is-favorite');
                favoriteDrink.textContent = '-';
            }
        })
    }
}