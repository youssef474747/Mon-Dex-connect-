const BASE_URL = "https://pokeapi.co/api/v2";

async function fetchData(url) {
    try {
        const response = await fetch(url);
        if(!response.ok){
            throw new Error(`Erreur ${response.status}`);
        }
        const data = await response.json();
        return data ;
    }catch (error){
        throw error ;
    }
}

function transformPokemon(pokemon) {
    return {
        id: pokemon.id,
        name: pokemon.name,
        type: pokemon.types[0].type.name,
        image: pokemon.sprites.other["official-artwork"].front_default,

         stats:{
    hp: pokemon.stats[0].base_stat ,
    attack: pokemon.stats[1].base_stat ,
    defense : pokemon.stats[2].base_stat 
}
    };
}
