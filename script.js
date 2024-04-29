const DB_POKEMON_LIST_URL = 'https://pokeapi.co/api/v2/pokemon?limit=9&offset=0'
const DB_POKEMON_URL = 'https://pokeapi.co/api/v2/pokemon/';
const DB_POKEMON_SPECIES_URL = 'https://pokeapi.co/api/v2/pokemon-species/'
let currentPokemon;
let currentPokemonID;

let listOfPokemons = [];
let pokemons = [];

async function init() {
    await loadPokemons();
    renderPokemonCard();
}

async function loadPokemons() {
    await fetchListOfPokemon();
    await savePokemonData();
}

async function savePokemonData() {
    for (let i = 0; i < listOfPokemons.length; i++) {
        const element = listOfPokemons[i];
        await getCurrentPokemonData(element.name);
        pushDataToArray_pokemons();
    }
}

function pushDataToArray_pokemons() {
    pokemons.push({
        'name': currentPokemon.name,
        'type': currentPokemon.types[0].type.name,
        'indexNumber': currentPokemon.id,
        'image': currentPokemon.sprites.other.home.front_default
    })
}

async function getCurrentPokemonData(name) {
    await fetchPokemon(name);
    await fetchPokemonSpecies(name);
}

function renderPokemonCard() {
    for (let i = 0; i < pokemons.length; i++) {
        const element = pokemons[i];
        createPokemonCard(element, i);
    }
}

function createPokemonCard(pokemon, id) {
    const content = document.getElementById('content');
    content.innerHTML += templateOf_pokemoncard(id);
    addInformationToPokemonCard(pokemon, id);
}

function addInformationToPokemonCard(pokemon, id) {
    document.getElementById('pokemonName' + id).innerHTML = pokemon.name;
    document.getElementById('element' + id).innerHTML = pokemon.type;
    document.getElementById('indexnumber' + id).innerHTML = '#' + pokemon.indexNumber;
    document.getElementById('image' + id).src = pokemon.image;
    changeBackgroundColor(pokemon, id);
}

function changeBackgroundColor(pokemon, id) {
    let type = pokemon.type;
    document.getElementById('pokemoncard' + id).style.backgroundColor = CARD_COLOR[type];
}

async function fetchPokemon(name) {
    let response = await fetch(DB_POKEMON_URL + name);
    currentPokemon = await response.json();
}

async function fetchPokemonSpecies(name) {
    let response = await fetch(DB_POKEMON_SPECIES_URL + name);
    currentPokemonID = await response.json();
}

async function fetchListOfPokemon() {
    let response = await fetch(DB_POKEMON_LIST_URL);
    responseAsJson = await response.json();
    listOfPokemons = responseAsJson.results
}