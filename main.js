
async function getData() {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=40&offset=0');
    const responseFromJson = await response.json();

    console.log(responseFromJson.results);
    renderPokemonCards(responseFromJson.results);
    
}


async function renderPokemonCards(pokemonList) {
    const containerRef = document.getElementById("pokemon-cards-container");
    containerRef.innerHTML = "";

    for (let index = 0; index < pokemonList.length; index++) {
        const pokemonResponse = await fetch(pokemonList[index].url);
        const pokemonData = await pokemonResponse.json();
        

        containerRef.innerHTML += getPokemonCardTemplate(pokemonData,index);
        renderPokemonTypes(pokemonData,index)
    }
}

getData();

function renderPokemonTypes(pokemonData,index){
    const pokemonTypesRef = document.getElementById(`pokemon-types-${index}`);
    pokemonTypesRef.innerHTML="";

    for (let typeIndex = 0; typeIndex < pokemonData.types.length; typeIndex++) {
        let pokemonType = pokemonData.types[typeIndex].type.name;
        pokemonTypesRef.innerHTML += getPokemonTypesTemplate(pokemonType)    
    }
}

