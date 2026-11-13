const STORAGE_KEY ="mon-dex-favorites" ;

function getFavorites(){
    try{
        const favorites = localStorage.getItem(STORAGE_KEY);
        return favorites ? JSON.perse(favorites) :[];
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
    return pokemon.some(function(pokemon){
        return pokemon.id === Number(id) ;

    });
}
export{ getFavorites , toggleFavorite , isFavorite} ;







export {
    getFavorites,
    toggleFavorite,
    isFavorite,
    saveLastSearch,
    getLastSearch
};