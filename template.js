function templateOf_pokemoncard(id) {
    return `
    <div class="pokemon-card" id="pokemoncard${id}" onclick="showStats()">
    <div class="pokemon-indexnumber" id="indexnumber${id}">#25</div>
    <div class="pokemon-name" id="pokemonName${id}">Pikachu</div>
    <div class="pokemon-element" id="element${id}">Electric</div>
    <div class="pokemon-image">
        <img src="./img/pikachu.png" alt="pikachu" id="image${id}">
    </div>
</div>
    `
}

const CARD_COLOR = {
    'fire': '#6f1919',
    'grass': '#0f640f',
    'water': '#12166a',
    'bug': '#5f5520',
    'normal': '#8d8d8d',
    'poison': '#342e5c',
    'electric': '#c4ad38',
    'ground': '#3a330c',
    'fairy': '#bf4fbc',
    'fighting': '#c2bda0',
    'psychic': '#9d49b6',
    'rock': '#3a3936',
    'ghost': '#bda1ff',
    'ice': '#becbf7',
    'dragon': '#c68d2b',
    'flying': '#becbf7',
    'dark': '#161612',
    'steel': '#bfbfbf'
}