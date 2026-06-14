
async function getData() {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=40&offset=0');
    const responseFromJson = await response.json();

    console.log(responseFromJson.results);
    renderPokemonCards(responseFromJson.results);
}


async function renderPokemonCards(pokemonList) {
    const container = document.getElementById("pokemon-cards-container");
    container.innerHTML = "";

    for (let i = 0; i < pokemonList.length; i++) {
        const pokemonResponse = await fetch(pokemonList[i].url);
        const pokemonData = await pokemonResponse.json();

        container.innerHTML += getPokemonCardTemplate(pokemonData);
    }
}

getData();