
function getPokemonCardTemplate(pokemonData,index,pokemonType) {
    return `
        <div class="poke-card pokemon-card-${pokemonType}" onclick="openPokemonDialog(${index})">
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
    <div class="poke-type pokemon-type-${pokemonType}">
    <p>${pokemonType}</p>
    </div>
    `; 
}

function getPokemonDialogTemplate(pokemonData) {
    return `
        <div class="pokemon-dialog ${pokemonData.types[0].type.name}">
        <button class="close-btn" onclick="closePokemonDialog()">✕</button>
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
            <div class="dialog-bottom">
                ${getDialogTabsTemplate(pokemonData)}
            </div>
        </div>
    `;
}

function getDialogTabsTemplate(pokemonData) {
    return `
        <div class="dialog-tabs">
            <button class="tab-btn active" onclick="openTab('about', this)">About</button>
            <button class="tab-btn" onclick="openTab('stats', this)">Stats</button>
            <button class="tab-btn" onclick="openTab('abilities', this)">Abilities</button>
        </div>

        <div id="about" class="tab-content active">
            ${getAboutTemplate(pokemonData)}
        </div>

        <div id="stats" class="tab-content">
            ${getStatsTemplate(pokemonData.stats)}
        </div>

        <div id="abilities" class="tab-content">
            ${getAbilitiesTemplate(pokemonData.abilities)}
        </div>
    `;
}

function getAboutTemplate(pokemonData) {
  return `
        <div class="about-content">
            <p class="about-row"><span class="about-label">Name:</span> <span class="about-value">${pokemonData.name}</span></p>
            <p class="about-row"><span class="about-label">Height:</span> <span class="about-value">${pokemonData.height * 10} cm</span></p>
            <p class="about-row"><span class="about-label">Weight:</span> <span class="about-value">${pokemonData.weight / 10} kg</span></p>
        </div>
    `;
}