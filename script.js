let startIndexToLoadPokemonsFromAPI = 0;
let endIndexToLoadPokemonsFromAPI = 9;
let DB_POKEMON_LIST_URL = `https://pokeapi.co/api/v2/pokemon?limit=${endIndexToLoadPokemonsFromAPI}&offset=${startIndexToLoadPokemonsFromAPI}`;
let DB_POKEMON_URL = 'https://pokeapi.co/api/v2/pokemon/';
let currentPokemon;
let listOfPokemons = [];
let pokemons = [];

async function init() {
    await loadAndSavePokemonData(0,9);
    renderPokemonCard(0,9);
}

async function loadAndSavePokemonData(startID,endID) {
    startLoadingIMG();
    await getListOfPokemon(0,10000);
    await savePokemonData(startID,endID);
    stopLoadingIMG();
}

async function savePokemonData(startID,endID) {
    for (startID; startID < endID; startID++) {
        const element = listOfPokemons[startID];
        await getCurrentPokemonData(element.name);
        pushDataToArray_pokemons();
    }
}

function pushDataToArray_pokemons() {
    pokemons.push({
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

function renderPokemonCard(startID,endID) {
    for (startID; startID < endID; startID++) {
        const pokemon = pokemons[startID];
        createPokemonCard(pokemon);
    }
}

function createPokemonCard(pokemon) {
    let PokemonID = pokemon.indexNumber;
    const content = document.getElementById('content');
    content.innerHTML += templateOf_pokemoncard(PokemonID);
    addInformationToPokemonCard(pokemon, PokemonID);
}

function addInformationToPokemonCard(pokemon, PokemonID) {
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

async function getListOfPokemon(startID,endID) {
    let response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${endID}&offset=${startID}`);
    responseAsJson = await response.json();
    listOfPokemons = responseAsJson.results;
}

async function loadMore() {
    let amountOfRenderdPokemons = document.querySelectorAll('.pokemon-card').length;
    let endIdToRender = amountOfRenderdPokemons + 9;
    startLoadingIMG();
    await savePokemonData(amountOfRenderdPokemons,endIdToRender);
    renderPokemonCard(amountOfRenderdPokemons,endIdToRender);
    stopLoadingIMG();
}

function startLoadingIMG() {
    document.getElementById('load').classList.replace('d-none', 'load');
}

function stopLoadingIMG() {
    document.getElementById('load').classList.replace('load', 'd-none');
}


function search() {
    let searchInput = document.getElementById('search').value;
    let findElement = pokemons.filter(item => item.name.toLowerCase().includes(searchInput.toLowerCase()));
    document.getElementById('content').innerHTML = '';

    findElement.forEach(pokemon => {
        createPokemonCard(pokemon);
    });
}