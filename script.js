const DB_POKEMON_LIST_URL = 'https://pokeapi.co/api/v2/pokemon?limit=50&offset=0'
const DB_POKEMON_URL = 'https://pokeapi.co/api/v2/pokemon/';
const DB_POKEMON_SPECIES_URL = 'https://pokeapi.co/api/v2/pokemon-species/'
let currentPokemon;
let currentPokemonID;

let listOfPokemons = [];

function init() {
    loadPokemons();
}

async function loadPokemons() {
    await fetchListOfPokemon();
    for (let i = 0; i < listOfPokemons.length; i++) {
        const element = listOfPokemons[i];
        await renderPokemonCard(element.name,i);
    }
}

async function renderPokemonCard(pokemon,id) {
    await getPokemonData(pokemon);
    const content = document.getElementById('content');
    content.innerHTML += templateOf_pokemoncard(id);
    addInformationToPokemonCard(id);
}

async function getPokemonData(name) {
    await fetchPokemon(name);
    await fetchPokemonSpecies(name);
}

function addInformationToPokemonCard(id) {
    document.getElementById('pokemonName'+id).innerHTML = currentPokemon.name;
    document.getElementById('element'+id).innerHTML = currentPokemon.types[0].type.name;
    document.getElementById('indexnumber'+id).innerHTML = '#'+currentPokemon.id;
    document.getElementById('image'+id).src = currentPokemon.sprites.other.home.front_default;
    document.getElementById('pokemoncard'+id).style.backgroundColor = currentPokemonID.color.name;
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