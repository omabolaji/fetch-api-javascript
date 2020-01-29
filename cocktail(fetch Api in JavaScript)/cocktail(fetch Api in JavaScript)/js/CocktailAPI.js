class CocktailAPI {

    //get the cocktails drink by names through api
   async getCockTailDrinks(name){

        const apiResponse = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`);

        const cocktails = await apiResponse.json();

        return {
            cocktails
        }
   }

   //get drinks by ingredient
   async getCockTailIngredient(ingredient){

        const apiResponse = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`);

        const cocktails = await apiResponse.json();

        return {
            cocktails
        }
   }

   //get single recipe by id
   async getSingleRecipe(id){
        
        const apiResponse = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);

        const recipe = await apiResponse.json();

        return {
            recipe
        }
    }

    //get all the categories
   async getCategories(){

        const apiResponse = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');

        const categories = await apiResponse.json();

        return {
            categories
        }
    }

    //get drinks or recipe by category
    async getCocktailByCategory(category){

        const apiResponse = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`);

        const cocktails = await apiResponse.json();

        return {
            cocktails
        }
    }

    //get drinks by alcohol or non alcohol
    async getCocktailByAlcoholOrNonalcohol(option){

        const apiResponse = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=${option}`);

        const cocktails = await apiResponse.json();

        return {
            cocktails
        }
    }
}

    