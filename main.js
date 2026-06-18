let allPokemon = [];
let currentPokemonIndex = 0;
let offset = 0;
const limit = 20;
let filteredPokemon = [];

async function getData() {
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`,
  );
  const responseFromJson = await response.json();

  console.log(responseFromJson.results);

  // renderPokemonCards(responseFromJson.results);
  await renderPokemonCards(responseFromJson.results);
}

async function renderPokemonCards(pokemonList) {
  const containerRef = document.getElementById("pokemon-cards-container");

  for (let index = 0; index < pokemonList.length; index++) {
    const pokemonResponse = await fetch(pokemonList[index].url);
    const pokemonData = await pokemonResponse.json();

    allPokemon.push(pokemonData);

    const currentIndex = allPokemon.length - 1;
    const pokemonTypes = getPokemonTypes(pokemonData);

    containerRef.innerHTML += getPokemonCardTemplate(
      pokemonData,
      currentIndex,
      pokemonTypes[0],
    );
    renderPokemonTypes(pokemonTypes, currentIndex);
  }
}

function loadMorePokemon() {
    offset += limit;
    getData();
}

function getPokemonTypes(pokemonData) {
  let pokemonTypes = [];

  for (let typeIndex = 0; typeIndex < pokemonData.types.length; typeIndex++) {
    pokemonTypes.push(pokemonData.types[typeIndex].type.name);
  }
  return pokemonTypes;
}

function renderPokemonTypes(pokemonTypes, index) {
  const pokemonTypesRef = document.getElementById(`pokemon-types-${index}`);
  pokemonTypesRef.innerHTML = "";

  for (pokemonType of pokemonTypes) {
    pokemonTypesRef.innerHTML += getPokemonTypesTemplate(pokemonType);
  }
}

function openPokemonDialog(index) {
  currentPokemonIndex = index;

  const dialogRef = document.getElementById("dialog");
  dialogRef.innerHTML = getPokemonDialogTemplate(
    allPokemon[currentPokemonIndex],
  );
  dialogRef.showModal();
}

function closePokemonDialog() {
  document.getElementById("dialog").close();
}

function getDialogTypesTemplate(types) {
  let html = "";

  for (let i = 0; i < types.length; i++) {
    html += `
            <div class="poke-type pokemon-type-${types[i].type.name}">
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
  dialogRef.innerHTML = getPokemonDialogTemplate(
    allPokemon[currentPokemonIndex],
  );
}

function showNextPokemon() {
  if (currentPokemonIndex === allPokemon.length - 1) {
    currentPokemonIndex = 0;
  } else {
    currentPokemonIndex++;
  }

  const dialogRef = document.getElementById("dialog");
  dialogRef.innerHTML = getPokemonDialogTemplate(
    allPokemon[currentPokemonIndex],
  );
}

function getStatsTemplate(stats) {
  let html = '<div class="stats-content">';

  for (let i = 0; i < stats.length; i++) {
    html += `
            <div class="stats-row">
                <span class="stats-label">${stats[i].stat.name}:</span>
                <span class="stats-value">${stats[i].base_stat}</span>
            </div>
        `;
  }

  html += "</div>";
  return html;
}

function getAbilitiesTemplate(abilities) {
  let html = '<div class="abilities-content">';

  for (let i = 0; i < abilities.length; i++) {
    html += `
            <div class="abilities-row">
                <span class="abilities-value">${abilities[i].ability.name}</span>
            </div>
        `;
  }

  html += "</div>";
  return html;
}

function openTab(tabId, clickedButton) {
  const allTabContents = document.querySelectorAll(".tab-content");
  const allTabButtons = document.querySelectorAll(".tab-btn");

  for (let i = 0; i < allTabContents.length; i++) {
    allTabContents[i].classList.remove("active");
  }

  for (let i = 0; i < allTabButtons.length; i++) {
    allTabButtons[i].classList.remove("active");
  }

  document.getElementById(tabId).classList.add("active");
  clickedButton.classList.add("active");
}

const dialog = document.getElementById("dialog");

dialog.addEventListener("click", (event) => {
  if (event.target === dialog) {
    dialog.close();
  }
});

function searchInput() {
  let value = document.getElementById("pokemon-search").value.trim();

  if (value.length >= 3) {
    document.getElementById("search-button").disabled = false;
    document.getElementById("search-message").textContent = "";
  } else {
    document.getElementById("search-button").disabled = true;

    if (value.length === 0) {
      document.getElementById("search-message").textContent = "";
      filteredPokemon = allPokemon;
      renderFilteredPokemon();
    } else {
      document.getElementById("search-message").textContent =
        "Bitte mindestens 3 Buchstaben eingeben.";
    }
  }
}

function searchPokemon() {
  let value = document.getElementById("pokemon-search").value.toLowerCase().trim();

  filteredPokemon = allPokemon.filter(function (pokemon) {
    return pokemon.name.toLowerCase().includes(value);
  });

  if (filteredPokemon.length === 0) {
    document.getElementById("search-message").textContent =
      "Kein passendes Pokémon gefunden.";
  } else {
    document.getElementById("search-message").textContent = "";
  }

  renderFilteredPokemon();
}

function renderFilteredPokemon() {
  let container = document.getElementById("pokemon-cards-container");
  container.innerHTML = "";

  for (let index = 0; index < filteredPokemon.length; index++) {
    let pokemonData = filteredPokemon[index];
    let pokemonTypes = getPokemonTypes(pokemonData);
    let originalIndex = allPokemon.indexOf(pokemonData);

    container.innerHTML += getPokemonCardTemplate(
      pokemonData,
      originalIndex,
      pokemonTypes[0]
    );

    renderPokemonTypes(pokemonTypes, originalIndex);
  }
}

getData();
filteredPokemon = allPokemon;
renderFilteredPokemon();
