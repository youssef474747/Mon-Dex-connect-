const STORAGE_KEY ="mon-dex-favorites" ;
const SEARCH_KEY = "mon-dex-last-search";
function getFavorites(){
    try{
        const favorites = localStorage.getItem(STORAGE_KEY);
        return favorites ? JSON.parse(favorites) :[];
    } catch (error) {
        return [];
    }
}

// suprimer fav
function toggleFavorite(pokemon){
    let favorites = getFavorites();
    const index = favorites.findIndex(function(item) {
        return item.id === pokemon.id ;
    });
    if(index !== -1){
        favorites.splice(index , 1);
    }else{
        favorites.push(pokemon);
    }
    localStorage.setItem(STORAGE_KEY , JSON.stringify(favorites));

return favorites ;
}

// verification
function isFavorite(id){
    const favorites =getFavorites();
    return favorites.some(function(pokemon){
        return pokemon.id === Number(id) ;

    });
}
function saveLastSearch(search) {
    console.log("Saving:", search);

    sessionStorage.setItem(SEARCH_KEY, search);

    console.log("Stored:", sessionStorage.getItem(SEARCH_KEY));
}
    

 function getLastSearch(){
    return sessionStorage.getItem(SEARCH_KEY) || "" ;
 }


export {
    getFavorites,
    toggleFavorite,
    isFavorite,
    saveLastSearch,
    getLastSearch
};