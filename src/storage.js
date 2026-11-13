const STORAGE_KEY ="mon-dex-favorites" ;

function getFavorites(){
    try{
        const favorites = localStorage.getItem(STORAGE_KEY);
        return favorites ? JSON.perse(favorites) :[];
    } catch (error) {
        return [];
    }
}

suprimer 











export {
    getFavorites,
    toggleFavorite,
    isFavorite,
    saveLastSearch,
    getLastSearch
};