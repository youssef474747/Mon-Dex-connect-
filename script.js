
let grid = document.getElementById("grid");
let search = document.getElementById("search");
let filters = document.getElementById("filters");
let detail = document.getElementById("detail");
let teamContainer = document.getElementById("team");
let teamCount = document.getElementById("team-count");
let creatureCount = document.getElementById("creature-count");
let form = document.getElementById("creature-form");

let selectedType = "Tous";
let searchText = "";
let team = [];

// 1. getType()
function getType(type) {
    type = type.toLowerCase();

    if (type === "feu") {
        return "fire";
    } else if (type === "eau") {
        return "water";
    } else if (type === "plante") {
        return "grass";
    } else if (type === "électrik" || type === "electrik") {
        return "electric";
    } else if (type === "glace") {
        return "ice";
    } else if (type === "ténèbres" || type === "tenebres") {
        return "dark";
    }

    return type;
}

// 2. createCards()
function createCards(cre) {
    let monsters = creatures.filter(function(creature) {
        let name = creature.name.toLowerCase();
        let text = searchText.toLowerCase();

        let matchesSearch = name.includes(text);
        let matchesType = false;

        if (selectedType === "Tous") {
            matchesType = true;
        } else if (getType(creature.type) === getType(selectedType)) {
            matchesType = true;
        }

        return matchesSearch && matchesType;
    });

    grid.innerHTML = "";

    monsters.forEach(function(creature) {
        let card = document.createElement("div");

        card.className =
    "creature-card bg-blue 400 rounded-xl p-4 shadow-sm border cursor-pointer";
        card.dataset.id = creature.id;

        card.innerHTML = `
            <img src="${creature.image}" alt="${creature.name}"
                class="w-full h-40 object-contain">

            <h3 class="font-bold text-lg mt-2">${creature.name}</h3>

            <p>Type : ${creature.type}</p>
            <p>Niveau : ${creature.level}</p>

            <button type="button" data-action="add"
                class="mt-3 px-4 py-2 rounded-lg bg-gray-800 text-white">
                Ajouter à l'équipe
            </button>
        `;

        grid.appendChild(card);
    });

    if (creatureCount !== null) {
        creatureCount.textContent = monsters.length;
    }
}
createCards()

// 3. showDetails()

function showDetails(creature) {
    let defense = creature.stats.defense;

    if (defense === undefined) {
        defense = creature.stats.defence;
    }

    let stats = [
        {
            name: "HP",
            value: creature.stats.hp,
            color: "bg-green-500"
        },
        {
            name: "Attaque",
            value: creature.stats.attack,
            color: "bg-red-500"
        },
        {
            name: "Défense",
            value: defense,
            color: "bg-blue-500"
        }
    ];

    let statsHTML = "";

    stats.forEach(function(stat) {
        let percentage = stat.value;

        if (percentage > 100) {
            percentage = 100;
        }

        statsHTML += `
            <div class="mb-4">
                <div class="flex justify-between items-center mb-1">
                    <span class="font-semibold text-gray-700">
                        ${stat.name}
                    </span>

                    <span class="font-bold text-gray-900">
                        ${stat.value}
                    </span>
                </div>

                <div class="w-full bg-gray-200 rounded-full h-3">
                    <div
                        class="${stat.color} h-3 rounded-full transition-all duration-500"
                        style="width: ${percentage}%">
                    </div>
                </div>
            </div>
        `;
    });

    detail.innerHTML = `
        <div class="bg-white rounded-2xl p-5 shadow-md border border-gray-200">

            <img src="${creature.image}" alt="${creature.name}"
                class="w-full h-48 object-contain">

            <h2 class="text-2xl font-bold text-gray-900 mt-3">
                ${creature.name}
            </h2>

            <div class="flex gap-2 mt-2 mb-5">
                <span class="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-semibold">
                    ${creature.type}
                </span>

                <span class="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-semibold">
                    Niveau ${creature.level}
                </span>
            </div>

            <h3 class="text-lg font-bold mb-4 text-gray-800">
                Statistiques
            </h3>

            ${statsHTML}

            <p class="mt-5 text-gray-600 leading-relaxed">
                ${creature.description}
            </p>

        </div>
    `;
}

// 4. Recherche par nom
search.addEventListener("input", function() {
    searchText = search.value;
    createCards();
});

// 5. Filtrer par type
filters.addEventListener("click", function(event) {
    let button = event.target.closest("button");

    if (button === null) {
        return;
    }

    selectedType = button.dataset.type;

    if (selectedType === undefined) {
        selectedType = button.textContent.trim();
    }

    createCards();
});

grid.addEventListener("click", function(event) {
    let card = event.target.closest(".creature-card");

    if (card === null) {
        return;
    }

    let creature = creatures.find(function(item) {
        return item.id === card.dataset.id;
    });

    if (creature === undefined) {
        return;
    }

    if (event.target.dataset.action === "add") {
        addToTeam(creature);
        return;
    }

    showDetails(creature);
});


// 7. Ajouter une créature à l'équipe
function addToTeam(creature) {
    let alreadyExists = team.some(function(item) {
        return item.id === creature.id;
    });

    if (alreadyExists) {
        alert("Cette créature est déjà dans l'équipe.");
        return;
    }

    if (team.length >= 6) {
        alert("L'équipe ne peut pas dépasser 6 créatures.");
        return;
    }

    team.push(creature);
    displayTeam();
}


// 8. Afficher l'équipe
function displayTeam() {
    teamContainer.innerHTML = "";

    team.forEach(function(creature) {
        let item = document.createElement("div");

        item.className =
            "flex items-center justify-between gap-2 p-2 rounded-lg bg-white border";

        item.innerHTML = `
            <div class="flex items-center gap-2">
                <img src="${creature.image}" alt="${creature.name}"
                    class="w-12 h-12 object-contain">

                <span class="font-bold">${creature.name}</span>
            </div>

            <button type="button" data-action="remove"
                data-id="${creature.id}"
                class="px-3 py-1 rounded bg-red-600 text-white">
                Supprimer
            </button>
        `;

        teamContainer.appendChild(item);
    });

    teamCount.textContent = team.length;}

    
// 9. Supprimer une créature de l'équipe
teamContainer.addEventListener("click", function(event) {
    let button = event.target.closest("button");

    if (button === null) {
        return;
    }

    if (button.dataset.action === "remove") {
        let id = button.dataset.id;

        team = team.filter(function(creature) {
            return creature.id !== id;
        });

        displayTeam();
    }
});