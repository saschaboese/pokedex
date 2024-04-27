const DB_POKEMON_URL = 'https://pokeapi.co/api/v2/pokemon/';
const DB_POKEMON_SPECIES_URL = 'https://pokeapi.co/api/v2/pokemon-species/'
let currentPokemon;
let currentPokemonID;

async function getPokemonData(name) {
    await fetchPokemon(name);
    await fetchPokemonSpecies(name);
}

async function fetchPokemon(name) {
    let response = await fetch(DB_POKEMON_URL + name);
    currentPokemon = await response.json();
}

async function fetchPokemonSpecies(name) {
    let response = await fetch(DB_POKEMON_SPECIES_URL + name);
    currentPokemonID = await response.json();
}

async function renderPokemonCard(pokemon,id) {
    await getPokemonData(pokemon);
    const content = document.getElementById('content');
    content.innerHTML += templateOf_pokemoncard(id);
    document.getElementById('pokemonName'+id).innerHTML = currentPokemon.name;
    document.getElementById('element'+id).innerHTML = currentPokemon.types[0].type.name;
    document.getElementById('indexnumber'+id).innerHTML = '#'+currentPokemon.id;
    document.getElementById('experience'+id).innerHTML = currentPokemon.base_experience;
    document.getElementById('height'+id).innerHTML = currentPokemon.height;
    document.getElementById('weight'+id).innerHTML = currentPokemon.weight;
    document.getElementById('image'+id).src = currentPokemon.sprites.other.home.front_default;
    document.getElementById('pokemoncard'+id).style.backgroundColor = currentPokemonID.color.name
}