
class CocktailDB {

    //save drinks to local storage
    saveToStorage(drink){

        const drinks = this.getFromStorage()

            drinks.push(drink);

        localStorage.setItem('drinks', JSON.stringify(drinks));

    }

    removeFromStorage(id){

        const drinks = this.getFromStorage();

        //loop through and delete
        drinks.forEach((drink, index) => {

            if(id === drink.id){
                drinks.splice(index, 1);
            }
        });

        // set to storage
        localStorage.setItem('drinks', JSON.stringify(drinks));
    }


    //get drinks from local storage
    getFromStorage(){

        let drinks;

        if(localStorage.getItem('drinks') === null){
            drinks = [];
        }else{
            drinks = JSON.parse(localStorage.getItem('drinks'))
        }
        return drinks;
    }
}