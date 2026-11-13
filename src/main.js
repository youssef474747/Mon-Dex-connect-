import { getPokemons, getPokemon } from "./api.js";
import { createCards } from "./ui.js";

let offset = 0;
let loadedPokemons = [];
let selectedType = "all";

const filters = document.getElementById("filters");
const loadMoreBtn = document.getElementById("load-more");

// Afficher les Pokémon selon le filtre
function filterPokemons() {
    const filteredPokemons = loadedPokemons.filter(function(pokemon) {
        return selectedType === "all" || pokemon.type === selectedType;
    });

    createCards(filteredPokemons);
}

// Charger les premiers Pokémon
async function init() {
    try {
        const pokemons = await getPokemons(offset);

        loadedPokemons = pokemons;
        createCards(pokemons);

    } catch (error) {
        console.error("Erreur :", error);
    }
}

// Charger 20 Pokémon supplémentaires
loadMoreBtn.addEventListener("click", async function() {
    try {
        const nextOffset = offset + 20;

        const pokemons = await getPokemons(nextOffset);

        loadedPokemons.push(...pokemons);
        offset = nextOffset;

        filterPokemons();

    } catch (error) {
        console.error("Erreur :", error);
    }
});

// Filtrer par type
filters.addEventListener("click", function(event) {
    const button = event.target.closest("button");

    if (!button) return;

    selectedType = button.dataset.type;

    filterPokemons();
});

// Lancer l'application
init();
