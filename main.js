let allPokemon = [];  // every pokemon is fetched gets pushed into allPokemon,contains the full pokemon data objects that we later need for cards, dialog, stats and abilities

let currentPokemonIndex = 0;  //stores which pokemon is currently shown inside the dialog
let offset = 0; // offset and limit are used for pagination, so loadMorePokemon()
const limit = 20;
let filteredPokemon = []; // filteredPokemon is a second array for search results


// the first api endpoint only gives a short list with name + url
// we pass responseFromJson.results to renderPokemonCards()
// and inside that function we fetch every single pokemon again by its own url
// we show the loading overlay before the fetch starts
// and hide it again in finally, so it also disappears
async function getData() {
  showLoadingSpinner();

   try{ 

  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`,
  );
  const responseFromJson = await response.json();

  await renderPokemonCards(responseFromJson.results);

  filteredPokemon = allPokemon;} finally {disableLoadingSpinner();

  }
}


// this function gets the pokemon list from the first api call
// then we loop through that list and fetch the full details for each single pokemon
// after fetching, we push every full pokemon object into allPokemon
// we use currentIndex for ids and for opening the correct dialog later
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

// this function loads the next pokemons
// offset gets increased by limit, so the next api request skips the already loaded pokemon
function loadMorePokemon() {
    offset += limit;
    getData();
}

// this function extracts the type names from one pokemon object
// pokemonData is one single pokemon object with many properties
function getPokemonTypes(pokemonData) {
  let pokemonTypes = [];

  for (let typeIndex = 0; typeIndex < pokemonData.types.length; typeIndex++) {
    pokemonTypes.push(pokemonData.types[typeIndex].type.name);
  }
  return pokemonTypes;
}

// this function renders the visible type inside one pokemon card
// index is the card index that we use to find the correct container
// we clear the type container first so it does not duplicate content on re-render
function renderPokemonTypes(pokemonTypes, index) {
  const pokemonTypesRef = document.getElementById(`pokemon-types-${index}`);
  pokemonTypesRef.innerHTML = "";

  for (pokemonType of pokemonTypes) {
    pokemonTypesRef.innerHTML += getPokemonTypesTemplate(pokemonType);
  }
}

// this function opens the dialog for the clicked pokemon card
// index is the index from allPokemon, we store that index globally in currentPokemonIndex
// important for the next and previous buttons in the dialog
// we need to know which pokemon is currently active
// after that we render the full dialog for exactly this pokemon
function openPokemonDialog(index) {
  currentPokemonIndex = filteredPokemon.indexOf(allPokemon[index]);

  const dialogRef = document.getElementById("dialog");
  dialogRef.innerHTML = getPokemonDialogTemplate(
    filteredPokemon[currentPokemonIndex],
  );
  dialogRef.showModal();
}

// this function closes the open dialog
// we access the dialog directly by id and call the close() method
function closePokemonDialog() {
  document.getElementById("dialog").close();
}

// this function builds the html string for the pokemon types inside the dialog
// html starts as an empty string and gets filled step by step in the loop

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

// this function switches the dialog to the previous pokemon
// if we are currently at the first pokemon, we jump to the last one
// after changing currentPokemonIndex we re-render the dialog content
function showPreviousPokemon() {
  if (currentPokemonIndex === 0) {
    currentPokemonIndex = filteredPokemon.length - 1;
  } else {
    currentPokemonIndex--;
  }

  const dialogRef = document.getElementById("dialog");
  dialogRef.innerHTML = getPokemonDialogTemplate(
    filteredPokemon[currentPokemonIndex],
  );
}

// this function switches the dialog to the next pokemon
// if we are at the last pokemon, we jump back to the first one
// this only works with pokemon that are already inside allPokemon
// not with pokemon that are not loaded yet from the api
function showNextPokemon() {
  if (currentPokemonIndex === filteredPokemon.length - 1) {
    currentPokemonIndex = 0;
  } else {
    currentPokemonIndex++;
  }

  const dialogRef = document.getElementById("dialog");
  dialogRef.innerHTML = getPokemonDialogTemplate(
    filteredPokemon[currentPokemonIndex],
  );
}


// this function creates the stats tab html for one pokemon
// stats is the stats array from the api
// each entry contains a stat object and the base_stat value
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

// this function creates the abilities tab html for one pokemon
// abilities is also the  api array and each ability name is nested inside .ability.name
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

// this function controls the tab switching inside the dialog
// tabId is the id of the tab content that should become visible
// clickedButton is the exact button that was clicked
// first we remove "active" from all tab contents and all buttons
// after that we activate only the selected content and the clicked button
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

/* DIALOG EVENT */
const dialog = document.getElementById("dialog");

dialog.addEventListener("click", (event) => {
  if (event.target === dialog) {
    dialog.close();
  }
});


// this function checks the search input while the user is typing
// trim() removes spaces at the beginning and end so empty spaces are not counted as real input
// search only becomes allowed from 3 characters on, before that the search button stays disabled
// if the input is completely empty again, we reset filteredPokemon back to allPokemon
// and render the full list again
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

// this function is the actual search after clicking the search button
// we convert the input to lower case so the search becomes case-insensitive
// .filter() goes through the full allPokemon array and checks every loaded pokemon
// the function returns only the pokemon whose names include the typed search text
// the result gets stored in filteredPokemon and then renderFilteredPokemon() shows only that result list
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

// this function renders only the pokemon that are currently inside filteredPokemon
// first we clear the whole card container so the old cards disappear
// then we loop through filteredPokemon and build the cards again
//index here is only the index inside filteredPokemon
// but for opening the correct dialog we need the index from allPokemon
// that is why we use allPokemon.indexOf(pokemonData)
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

// shows the loading overlay before the fetch starts
// the overlay is hidden by default with the css class "d-none"
// removing that class makes it visible
function showLoadingSpinner() {
  document.getElementById("loading-overlay").classList.remove("d-none");
}

// hides the loading overlay after loading is finished
// adding the css class "d-none" hides the overlay again
function disableLoadingSpinner() {
  document.getElementById("loading-overlay").classList.add("d-none");
}