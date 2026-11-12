let grid = document.getElementById("grid");
let creatureCount = document.getElementById("creature-count");

function createCards(pokemons){
    grid.innerHTML="";

    pokemons.forEach(function(pokemon){
        let card = document.createElement("div");
        card.className ="creature-card bg-white rounded-xl p-4 shadow-sm border cursor-pointer";
        card.dataset.id = pokemon.id ;
        card.innerHTML =`
        <img src="${pokemon.image}" alt ="${pokemon.name}" class ="w-full h-40 object-contain">
        <h3 class ="font-bold text-lg mt-2 capitalize">${pokemon.name} </h3>

          `;
          grid.appendChild(card);
    });
}
export { createCards };