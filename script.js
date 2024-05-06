let startIndexToLoadPokemonsFromAPI = 0;
let endIndexToLoadPokemonsFromAPI = 9;
let DB_POKEMON_LIST_URL = `https://pokeapi.co/api/v2/pokemon?limit=${endIndexToLoadPokemonsFromAPI}&offset=${startIndexToLoadPokemonsFromAPI}`;
let DB_POKEMON_URL = 'https://pokeapi.co/api/v2/pokemon/';
let currentPokemon;
let pokemonURLs = [];
let pokemonData = [];

async function init() {
    await loadAndSavePokemonData(0, 9);
    renderPokemonCard(0, 9, 'content-section', pokemonData);
}

async function loadAndSavePokemonData(startID, endID) {
    startLoadingIMG();
    await getListOfPokemon(0, 10000);
    await savePokemonData(startID, endID, pokemonURLs, pokemonData);
    stopLoadingIMG();
}

async function savePokemonData(startID, endID, arrayURLs, arrayData) {
    for (startID; startID < endID; startID++) {
        const element = arrayURLs[startID];
        await getCurrentPokemonData(element.name);
        pushDataToArray_pokemons(arrayData);
    }
}

function pushDataToArray_pokemons(arrayData) {
    arrayData.push({
        'name': currentPokemon.name,
        'type': currentPokemon.types[0].type.name,
        'indexNumber': currentPokemon.id,
        'image': currentPokemon.sprites.other.home.front_default,
        'stats': {
            'hp': currentPokemon.stats[0].base_stat,
            'attack': currentPokemon.stats[1].base_stat,
            'defense': currentPokemon.stats[2].base_stat,
            'special-attack': currentPokemon.stats[3].base_stat,
            'special-defense': currentPokemon.stats[4].base_stat,
            'speed': currentPokemon.stats[5].base_stat
        }
    })
}

function renderPokemonCard(startID, endID, section) {
    const content = document.getElementById(section);
    for (startID; startID < endID; startID++) {
        const pokemon = pokemonData[startID];
        content.innerHTML += createPokemonCard(startID,pokemon);
    }
}

async function getCurrentPokemonData(name) {
    let response = await fetch(DB_POKEMON_URL + name);
    currentPokemon = await response.json();
}

async function getListOfPokemon(startID, endID) {
    let response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${endID}&offset=${startID}`);
    responseAsJson = await response.json();
    pokemonURLs = responseAsJson.results;
}

async function loadMore() {
    let amountOfRenderdPokemons = document.querySelectorAll('.pokemon-card').length;
    let endIdToRender = amountOfRenderdPokemons + 9;
    startLoadingIMG();
    await savePokemonData(amountOfRenderdPokemons, endIdToRender, pokemonURLs, pokemonData);
    renderPokemonCard(amountOfRenderdPokemons, endIdToRender, 'content-section');
    stopLoadingIMG();
}

function startLoadingIMG() {
    document.getElementById('load').classList.replace('d-none', 'load');
}

function stopLoadingIMG() {
    document.getElementById('load').classList.replace('load', 'd-none');
}

let searchPokemons = [];

async function search() {
    clearArrayAndContent();
    let searchInput = document.getElementById('search').value;
    const content = document.getElementById('search-section');
    if (searchInput.length >= 3) {
        toggleDisplayOnSections('search-section');
        let findElement = pokemonURLs.filter(item => item.name.toLowerCase().includes(searchInput.toLowerCase()));
        await savePokemonData(0, findElement.length, findElement, searchPokemons);
        for (let i = 0; i < searchPokemons.length; i++) {
            const pokemon = searchPokemons[i];
            content.innerHTML += createPokemonCard(i,pokemon);
        }
    } else {
        toggleDisplayOnSections('content-section');
    }
}

function clearArrayAndContent() {
    const content = document.getElementById('search-section');
    content.innerHTML = '';
    searchPokemons = [];
}

function clearSearchInput() {
    document.getElementById('search').value = '';
    clearArrayAndContent();
    toggleDisplayOnSections('content-section');
}

function toggleDisplayOnSections(toggle) {
    if (toggle == 'content-section') {
        document.getElementById('content-section').classList.remove('d-none');
        document.getElementById('search-section').classList.add('d-none');
        document.getElementById('load-more-button').classList.remove('d-none');
    } else {
        document.getElementById('content-section').classList.add('d-none');
        document.getElementById('search-section').classList.remove('d-none');
        document.getElementById('load-more-button').classList.add('d-none');
    }
}

function showStatistics(name) {
    let pokemoncard_img = document.querySelectorAll('.pokemon-image-'+name);
    let pokemoncard_statistic = document.querySelectorAll('.pokemon-statistic-'+name);
    pokemoncard_img.forEach(pokemon => {
        pokemon.classList.toggle('d-none');
    });
    pokemoncard_statistic.forEach(pokemon => {
        pokemon.classList.toggle('d-none');
    });
}