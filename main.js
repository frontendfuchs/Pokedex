let allPokemon = [];
let currentPokemonIndex = 0;

async function getData() {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=40&offset=0');
    const responseFromJson = await response.json();

    console.log(responseFromJson.results);
    renderPokemonCards(responseFromJson.results);
    
}


async function renderPokemonCards(pokemonList) {
    const containerRef = document.getElementById("pokemon-cards-container");
    containerRef.innerHTML = "";
    allPokemon = [];

    for (let index = 0; index < pokemonList.length; index++) {
        const pokemonResponse = await fetch(pokemonList[index].url);
        const pokemonData = await pokemonResponse.json();

         allPokemon.push(pokemonData);
        
        const pokemonTypes = getPokemonTypes(pokemonData);
        containerRef.innerHTML += getPokemonCardTemplate(pokemonData,index,pokemonTypes[0]);
        renderPokemonTypes(pokemonTypes, index);
    }
}


function getPokemonTypes(pokemonData){
    let pokemonTypes = [];
    
    for (let typeIndex = 0; typeIndex < pokemonData.types.length; typeIndex++) {
        pokemonTypes.push(pokemonData.types[typeIndex].type.name);         
    }
    return pokemonTypes;
}

function renderPokemonTypes(pokemonTypes,index){
    const pokemonTypesRef = document.getElementById(`pokemon-types-${index}`);
    pokemonTypesRef.innerHTML="";
    
    for (pokemonType of pokemonTypes) {
        pokemonTypesRef.innerHTML += getPokemonTypesTemplate(pokemonType) 
    }
}

function openPokemonDialog(index) {
    currentPokemonIndex = index;

    const dialogRef = document.getElementById("dialog");
    dialogRef.innerHTML = getPokemonDialogTemplate(allPokemon[currentPokemonIndex]);
    dialogRef.showModal();
}

function closePokemonDialog() {
    document.getElementById("dialog").close();
}

function getDialogTypesTemplate(types) {
    let html = "";

    for (let i = 0; i < types.length; i++) {
        html += `
            <div class="pokemon-type-${types[i].type.name}">
                <p>${types[i].type.name}</p>
            </div>
        `;
    }
    return html;
}

function showPreviousPokemon() {
    if (currentPokemonIndex === 0) {
        currentPokemonIndex = allPokemon.length - 1;
    } else {
        currentPokemonIndex--;
    }

    const dialogRef = document.getElementById("dialog");
    dialogRef.innerHTML = getPokemonDialogTemplate(allPokemon[currentPokemonIndex]);
}

function showNextPokemon() {
    if (currentPokemonIndex === allPokemon.length - 1) {
        currentPokemonIndex = 0;
    } else {
        currentPokemonIndex++;
    }

    const dialogRef = document.getElementById("dialog");
    dialogRef.innerHTML = getPokemonDialogTemplate(allPokemon[currentPokemonIndex]);
}


getData();

