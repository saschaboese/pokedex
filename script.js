let startIndexToLoadPokemonsFromAPI = 0;
let endIndexToLoadPokemonsFromAPI = 9;
let DB_POKEMON_LIST_URL = `https://pokeapi.co/api/v2/pokemon?limit=${endIndexToLoadPokemonsFromAPI}&offset=${startIndexToLoadPokemonsFromAPI}`;
let DB_POKEMON_URL = 'https://pokeapi.co/api/v2/pokemon/';
let currentPokemon;
let pokemonURLs = [];
let pokemonData = [];

async function init() {
    await loadAndSavePokemonData(0, 9);
    renderPokemonCard(0, 9, 'content-section');
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
        content.innerHTML += createPokemonCard(pokemon.indexNumber);
        addDataToPokemonCard(pokemon, pokemon.indexNumber);
    }
}

function addDataToPokemonCard(pokemon, PokemonID) {
    document.getElementById('pokemonName' + PokemonID).innerHTML = pokemon.name;
    document.getElementById('element' + PokemonID).innerHTML = pokemon.type;
    document.getElementById('indexnumber' + PokemonID).innerHTML = '#' + pokemon.indexNumber;
    document.getElementById('image' + PokemonID).src = pokemon.image;
    changeBackgroundColor(pokemon, PokemonID);
}

function changeBackgroundColor(pokemon, PokemonID) {
    let type = pokemon.type;
    document.getElementById('pokemoncard' + PokemonID).style.backgroundColor = CARD_COLOR[type];
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
        searchPokemons.forEach(pokemon => {
            let pokemonID = pokemon.indexNumber + '_SEARCH';
            content.innerHTML += createPokemonCard(pokemonID);
            addDataToPokemonCard(pokemon, pokemonID);
        });
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

function showStatistics(pokemonID) {
    let pokemoncard_img = document.getElementById('pokemon-image' + pokemonID);
    let pokemoncard_statistic = document.getElementById('statistic' + pokemonID);
    pokemoncard_img.classList.toggle('d-none');
    pokemoncard_statistic.classList.toggle('d-none');

    let IdFromArray = pokemonID - 1;
    pokemoncard_statistic.innerHTML = createStatistics(pokemonData[IdFromArray]['stats']['hp'],pokemonData[IdFromArray]['stats']['attack'],pokemonData[IdFromArray]['stats']['defense'],pokemonData[IdFromArray]['stats']['special-attack'],pokemonData[IdFromArray]['stats']['special-defense'],pokemonData[IdFromArray]['stats']['speed']);
}

