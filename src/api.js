const BASE_URL = "https://pokeapi.co/api/v2";

async function fetchData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Erreur ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
}

function transformPokemon(pokemon) {
    return {
        id: pokemon.id,
        name: pokemon.name,
        type: pokemon.types[0].type.name,
        image: pokemon.sprites.other["official-artwork"].front_default,

        stats: {
            hp: pokemon.stats[0].base_stat,
            attack: pokemon.stats[1].base_stat,
            defense: pokemon.stats[2].base_stat
        }
    };
}

async function getPokemons(offset = 0) {
const data = await fetchData(`${BASE_URL}/pokemon?limit=20&offset=${offset}`);
    const promises = data.results.map(async (pokemon) => {
        const pokemonData = await fetchData(pokemon.url);
        return transformPokemon(pokemonData);
    });
    const pokemons = await Promise.all(promises);
    return pokemons;
}
async function getPokemon(name) {
    const data = await fetchData(
    `${BASE_URL}/pokemon/${name.toLowerCase().trim()}`
);
    return transformPokemon(data);
}

export { getPokemons, getPokemon };

// filter type