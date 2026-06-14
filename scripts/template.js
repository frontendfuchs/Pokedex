
function getPokemonCardTemplate(pokemonData) {
    return `
        <div class="pokemon-card">
            <h2>${pokemonData.name}</h2>
            <p>#${pokemonData.id}</p>
        </div>
        <div class="pokemon-card-content">
                <div class="pokemon-image">
                    <img src="${pokemonData.sprites.other['official-artwork'].front_shiny}" alt="${pokemonData.name}">
                </div>
            </div>
    `;
}