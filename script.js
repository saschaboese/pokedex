let amountToLoadPokemonsFromAPI = 9;
let startIndexToLoadPokemonsFromAPI = 0;
const DB_POKEMON_LIST_URL = `https://pokeapi.co/api/v2/pokemon?limit=${amountToLoadPokemonsFromAPI}&offset=${startIndexToLoadPokemonsFromAPI}`;
const DB_POKEMON_URL = 'https://pokeapi.co/api/v2/pokemon/';
let currentPokemon;
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
    for (let i = startIndexToLoadPokemonsFromAPI; i < listOfPokemons.length; i++) {
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
        'image': currentPokemon.sprites.other.home.front_default,
        'stats': {
            'hp' : currentPokemon.stats[0].base_stat,
            'attack' : currentPokemon.stats[1].base_stat,
            'defense' : currentPokemon.stats[2].base_stat,
            'special-attack' : currentPokemon.stats[3].base_stat,
            'special-defense' : currentPokemon.stats[4].base_stat,
            'speed' : currentPokemon.stats[5].base_stat
        }
    })
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

async function getCurrentPokemonData(name) {
    await fetchPokemon(name);
}

async function fetchPokemon(name) {
    let response = await fetch(DB_POKEMON_URL + name);
    currentPokemon = await response.json();
}

async function fetchListOfPokemon() {
    let response = await fetch(DB_POKEMON_LIST_URL);
    responseAsJson = await response.json();
    listOfPokemons = responseAsJson.results
}