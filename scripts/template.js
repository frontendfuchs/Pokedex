
function getPokemonCardTemplate(pokemonData,index,pokemonType) {
    return `
        <div class="pokemon-card-${pokemonType}" onclick="openPokemonDialog(${index})">
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

function getPokemonDialogTemplate(pokemonData) {
    return `
        <div class="pokemon-dialog ${pokemonData.types[0].type.name}">
            <button class="close-btn" onclick="closePokemonDialog()">X</button>
            <button class="arrow-btn left" onclick="showPreviousPokemon()">&#10094;</button>
            <button class="arrow-btn right" onclick="showNextPokemon()">&#10095;</button>
            <div class="pokemon-dialog-header">
                <h2>${pokemonData.name}</h2>
                <p>#${pokemonData.id}</p>
            </div>
            <div class="pokemon-dialog-image">
                <img src="${pokemonData.sprites.other['dream_world'].front_default}" alt="${pokemonData.name}">
            </div>
            <div class="pokemon-dialog-types">
                ${getDialogTypesTemplate(pokemonData.types)}
            </div>
            <div class="pokemon-dialog-infos">
                <p>Height: ${pokemonData.height}</p>
                <p>Weight: ${pokemonData.weight}</p>
            </div>
        </div>
    `;
}
