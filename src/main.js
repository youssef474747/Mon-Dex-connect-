import { getPokemons, getPokemon } from "./api.js";
import { createCards, showLoading, showError } from "./ui.js";

let offset = 0;
let loadedPokemons = [];
let selectedType = "all";
let allPokemons = [];
let isSearching = false;

const filters = document.getElementById("filters");
const loadMoreBtn = document.getElementById("load-more");
const searchInput = document.getElementById("search");

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
        showLoading();

        const pokemons = await getPokemons(offset);

        loadedPokemons = pokemons;
        allPokemons = [...pokemons];

        createCards(pokemons);

    } catch (error) {
        showError("Erreur lors du chargement");
    }
}

// Charger 20 Pokémon supplémentaires
loadMoreBtn.addEventListener("click", async function() {
    try {
        if (isSearching) {
            isSearching = false;
            loadedPokemons = [...allPokemons];
        }

        const nextOffset = offset + 20;

        const pokemons = await getPokemons(nextOffset);

        loadedPokemons.push(...pokemons);
        allPokemons.push(...pokemons);

        offset = nextOffset;

        filterPokemons();

    } catch (error) {
        showError("Erreur lors du chargement");
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

// RECHERCH

searchInput.addEventListener("input", function() {
    const name = searchInput.value.toLowerCase().trim();

    const results = loadedPokemons.filter(function(pokemon) {
        return pokemon.name.includes(name);
    });

    createCards(results);
});