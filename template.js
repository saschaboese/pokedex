function createPokemonCard(pokemonID) {
    return `
    <div class="pokemon-card" id="pokemoncard${pokemonID}" onclick="showStatistics(${pokemonID})">
    <div class="pokemon-indexnumber" id="indexnumber${pokemonID}">#0</div>
    <div class="pokemon-name" id="pokemonName${pokemonID}">Unknown</div>
    <div class="pokemon-element" id="element${pokemonID}">Unknown</div>
    <div class="pokemon-image" id="pokemon-image${pokemonID}">
        <img src="./img/pikachu.png" alt="pikachu" id="image${pokemonID}">
    </div>
        <div class="pokemon-statistics d-none" id="statistic${pokemonID}"></div>
    </div>
    `
}

function createStatistics(hp, attack, defense, special_attack, special_defense, speed) {
    return `
    <div class="pokemon-statistic">HP: 
        <div class="pokemon-statistic-borderOut">
            <div class="pokemon-statistic-borderIn" style="width:${hp}%">
                <div class="pokemon-statistic-value">${hp}%</div>
            </div>        
        </div>
    </div>
    <div class="pokemon-statistic">Attack: 
        <div class="pokemon-statistic-borderOut">
            <div class="pokemon-statistic-borderIn" style="width:${attack}%">
                <div class="pokemon-statistic-value">${attack}%</div>
            </div>        
        </div>
    </div>
    <div class="pokemon-statistic">Defense:
        <div class="pokemon-statistic-borderOut">
            <div class="pokemon-statistic-borderIn" style="width:${defense}%">
                <div class="pokemon-statistic-value">${defense}%</div>
            </div>        
        </div>
    </div>
    <div class="pokemon-statistic">Spez.-Attack:
        <div class="pokemon-statistic-borderOut">
            <div class="pokemon-statistic-borderIn" style="width:${special_attack}%">
                <div class="pokemon-statistic-value">${special_attack}%</div>
            </div>        
        </div>
    </div>
    <div class="pokemon-statistic">Spez.-Defense:
        <div class="pokemon-statistic-borderOut">
            <div class="pokemon-statistic-borderIn" style="width:${special_defense}%">
                <div class="pokemon-statistic-value">${special_defense}%</div>
            </div>        
        </div>
    </div>
    <div class="pokemon-statistic">Speed:
        <div class="pokemon-statistic-borderOut">
            <div class="pokemon-statistic-borderIn" style="width:${speed}%">
                <div class="pokemon-statistic-value">${speed}%</div>
            </div>        
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