
function getPokemonCardTemplate(pokemonData,index,pokemonType) {
    return `
        <div class="pokemon-card-${pokemonType}">
        <div class="pokemon-card">
            <h2>${pokemonData.name}</h2>
            <p>#${pokemonData.id}</p>
        </div>
        <div class="pokemon-card-content">
        <div id="pokemon-types-${index}"></div>
                <div class="pokemon-image">
                    <img src="${pokemonData.sprites.other['dream_world'].front_default}" alt="${pokemonData.name}">
                </div>
            </div>
        </div>
    `;
}

function getPokemonTypesTemplate(pokemonType) {
    return `
    <div class="pokemon-type-${pokemonType}">
    <p>${pokemonType}</p>
    </div>
    `; 
}