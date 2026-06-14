async function getData() {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=40&offset=0');
    const responseFromJson = await response.json();

    console.log(responseFromJson.results);
}

getData();