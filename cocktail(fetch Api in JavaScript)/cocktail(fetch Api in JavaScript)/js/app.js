//Instaciate the classes
const ui = new UI();

const cocktailapi = new CocktailAPI();

const cocktailDB = new CocktailDB();



//create eventListeners

function eventListeners(){

    //display the categories
    document.addEventListener('DOMContentLoaded', documentReady);
    //get search form
    const searchForm = document.querySelector('#search-form');

    //listen to search form
        if(searchForm){
            searchForm.addEventListener('submit', getCockTails);
        }

        // use delegation after the result is display
    const resultDivRecipe = document.querySelector('#results');

        if(resultDivRecipe){
            resultDivRecipe.addEventListener('click', getReciteDelegation);
        }

}

    eventListeners()

function getCockTails(e){
    e.preventDefault();

    //get search input if not empty
    const searchInput = document.querySelector('#search').value;

    if (searchInput === ''){

        //print messages if the form is empty
        ui.printMessages('please input something to this form', 'danger'); 

    }else{
        
        //search the cocktails drink by ingredient
        let serverResponse;

        //get the type of search for each input in form
        const type = document.querySelector('#type').value;

        //using the switch statement
        switch(type){

            case 'name':        //get cocktail drinks by name
                serverResponse =  cocktailapi.getCockTailDrinks(searchInput);
                break; 
            case 'ingredient':    //get cocktail by ingredient
                serverResponse = cocktailapi.getCockTailIngredient(searchInput);
                break;
            case 'category':
                serverResponse = cocktailapi.getCocktailByCategory(searchInput);
                break;
            case 'alcohol':
                serverResponse = cocktailapi.getCocktailByAlcoholOrNonalcohol(searchInput);
                break;
        }

        //clear the previous result
        ui.clearPrevResults();
       
        //get drinks by name
        serverResponse.then((cocktails) => {
                const allCocktails = cocktails.cocktails.drinks;
                if (allCocktails === null){

                    //print a message
                    ui.printMessages('no result found, try different term', 'danger'); 
                }else{

                    if(type === 'name'){

                        //print the search results for drink by name
                        ui.getDrinksWithIngredients(allCocktails);
                    }else{

                        //print the search results without ingredient(alcoholic, ingredient,category)
                        ui.displayDrinks(allCocktails)
                    }
                    
                }
            })
        
    }
}

// use delegation for the result area
function getReciteDelegation(e){
    e.preventDefault();

    if(e.target.classList.contains('get-recipe')){
        
        // allCocktails.getSingleRecipe(e.target.getAttribute('data-id'))
        cocktailapi.getSingleRecipe(e.target.dataset.id)
            .then((recipe) => {
                const singleRecipe = recipe.recipe.drinks[0];
                ui.displaySingleRecipe(singleRecipe);
            })
        
    }

    //add into favourite with delegation
    if(e.target.classList.contains('favorite-btn')){

        if(e.target.classList.contains('is-favorite')){

            e.target.classList.remove('is-favorite')
            e.target.textContent = '+';

            //remove from storage
            cocktailDB.removeFromStorage(e.target.dataset.id);

        }else{
            e.target.classList.add('is-favorite')
            e.target.textContent = '-';

            const cardBody = e.target.parentElement;

            const drinkInfo = {
                id: e.target.dataset.id,
                title: cardBody.querySelector('.card-title').textContent,
                image: cardBody.querySelector('.card-img-top').src
            }
            
            cocktailDB.saveToStorage(drinkInfo);



        }
    }
}

//display all the categories
function documentReady(){

    //display on load
    ui.isFavorites();

    const selectCat = document.querySelector('.search-category');
          if(selectCat){

             ui.displayCategory(); 
          }

    //display into favorites
    const favTable = document.querySelector('#favorites')
          if(favTable){
              const drinks = cocktailDB.getFromStorage();

              ui.getToFavorites(drinks);
          

    favTable.addEventListener('click', (e) => {
        e.preventDefault();

        if(e.target.classList.contains('get-recipe')){

                // allCocktails.getSingleRecipe(e.target.getAttribute('data-id'))
            cocktailapi.getSingleRecipe(e.target.dataset.id)
            .then((recipe) => {
                const singleRecipe = recipe.recipe.drinks[0];
                ui.displaySingleRecipe(singleRecipe);
            }) 

        }else{

            // remove from favorite
            ui.removeFavorite(e.target.parentElement.parentElement);
            // console.log(e.target.parentElement.parentElement)

            //remove from storage
            cocktailDB.removeFromStorage(e.target.dataset.id);
        }
    })

  }
}

