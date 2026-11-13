let grid = document.getElementById("grid");
let creatureCount = document.getElementById("creature-count");
let detail = document.getElementById("detail");

function createCards(pokemons , append = false){
    if(!append){
       grid.innerHTML ="";
    }
    pokemons.forEach(function(pokemon){
        let card = document.createElement("div");
        card.className ="creature-card bg-white rounded-xl p-4 shadow-sm border cursor-pointer"
        card.dataset.id = pokemon.id ;
         card.innerHTML = `
            <img src="${pokemon.image}" alt="${pokemon.name}" class="w-full h-40 object-contain">
            <h3 class="font-bold text-lg mt-2 capitalize">${pokemon.name}</h3>
            <p>Type: ${pokemon.type}</p>
            <p>HP: ${pokemon.stats.hp}</p>
            <p>Attack: ${pokemon.stats.attack}</p>
            <p>Defense: ${pokemon.stats.defense}</p>
        `;
        grid.appendChild(card);
    });

    creatureCount.textContent = grid.children.length ;
}

function showLoading(){
    grid.innerHTML = `
    <p class = "class-span-full text-center">
    chargement des Pokémons... </p>

    `;
}

function showError(message){
    grid.innerHTML =`
    <p class ="class-span-full text-center text-red-500 ">
    ${message}
</p>
    `;
}


function showDetails(pokemon) {
    detail.innerHTML = `
        <div class="flex items-center justify-between">
            <span class="font-mono text-sm">Détail</span>

            <button id="close-details" type="button"
                class="btn-outline w-11 px-0 bg-red-500">
                X
            </button>
        </div>

        <img src="${pokemon.image}" alt="${pokemon.name}"
            class="w-full h-48 object-contain">

        <h2 class="font-display text-3xl font-extrabold capitalize">
            ${pokemon.name}
        </h2>

        <p>Type : ${pokemon.type}</p>
<div class="flex flex-col gap-4">
    ${createStatBar("HP", pokemon.stats.hp, "bg-red-500")}

    ${createStatBar("Attack", pokemon.stats.attack, "bg-green-800")}

    ${createStatBar("Defense", pokemon.stats.defense, "bg-blue-500")}
</div>
    `;

    document.getElementById("close-details").addEventListener("click", function() {
        detail.innerHTML = `
            <h2 class="font-display text-3xl font-extrabold">
                Sélectionnez un Pokémon
            </h2>
            <p>Cliquez sur une carte pour afficher les détails</p>
        `;
    });

}

   function createStatBar(label, value, color) {
    const percentage = Math.min((value / 255) * 100, 100);

    return `
        <div class="flex flex-col gap-1">
            <div class="flex justify-between text-sm font-bold">
                <span>${label}</span>
                <span>${value}</span>
            </div>

            <div class="h-3 w-full rounded-full bg-gray-200 overflow-hidden">
                <div
                    class="h-full rounded-full ${color}"
                    style="width: ${percentage}%">
                </div>
            </div>
        </div>
    `;
}

export { createCards, showLoading, showError, showDetails }