import { getPokemons, getPokemon } from "./api.js";
import { createCards, showLoading, showError, showDetails } from "./ui.js";
import { saveLastSearch, getLastSearch, toggleFavorite } from "./storage.js";

let offset = 0;
let loadedPokemons = [];
let selectedType = "all";
let allPokemons = [];
let isSearching = false;

const filters = document.getElementById("filters");
const loadMoreBtn = document.getElementById("load-more");
const searchInput = document.getElementById("search");
const clearSearchBtn = document.getElementById("clear-search");

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

const lastSearch = getLastSearch();

searchInput.value = lastSearch;

if (lastSearch) {
    const results = loadedPokemons.filter(function(pokemon) {
        return pokemon.name.includes(lastSearch);
    });

    createCards(results);
} else {
    createCards(pokemons);
}

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

    // Sauvegarder la recherche
    saveLastSearch(name);

    const results = loadedPokemons.filter(function(pokemon) {
        return pokemon.name.includes(name);
    });

    createCards(results);
});
// afficher les details

const grid =document.getElementById("grid");
grid.addEventListener("click" , async function(event){
    const favoriteButton = event.target.closest(".favorite-btn");
    if(favoriteButton){
        const id =Number(favoriteButton.dataset.id);
        const pokemon = loadedPokemons.find(function(item){
            return item.id === id ;
        });
        if(!pokemon)return ;
        const favorites = toggleFavorite(pokemon);
        const saved = favorites.some(function(item){
            return item.id === id ;
        });

        favoriteButton.textContent = saved ? "❤️" : "♡";
        return ;
    }
    const card = event.target.closest(".creature-card");
    if(!card) return ;

    try{
        const pokemon = await getPokemon(card.dataset.id);
        showDetails(pokemon);
    }catch(error){
        alert("Erreur lors du chargement des details ");
    }
});


// Effacer la recherche
clearSearchBtn.addEventListener("click", function() {
    searchInput.value = "";
    saveLastSearch("");
    filterPokemons();
});