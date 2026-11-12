import { getPokemons } from "./api.js";
import { createCards } from "./ui.js";

async function init(){
    const pokemons = await getPokemons();
    createCards(pokemons);
  
}
  init();
