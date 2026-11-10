const BASE_URL = "https://pokeapi.co/api/v2";

async function fetchData(url) {
    try {
        const response = await fetch(url);
        if(!response.ok){
            throw new Error(`Erreur $(response.status)`);
        }
        const data = await response.json();
        return data ;
    }catch (error){
        throw error ;
    }
}