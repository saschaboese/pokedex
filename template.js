function createPokemonCard(id,pokemon) {
    return `
    <div class="pokemon-card" id="pokemoncard${id}" onclick="showStatistics('${pokemon['name']}')" style="background-color: ${CARD_COLOR[pokemon['type']]}">
    <div class="pokemon-indexnumber">#${pokemon['indexNumber']}</div>
    <div class="pokemon-name">${pokemon['name']}</div>
    <div class="pokemon-element">${pokemon['type']}</div>
    <div class="pokemon-image pokemon-image-${pokemon['name']}" id="pokemon-image${id}">
        <img src="${pokemon['image']}" alt="pikachu">
    </div>
    <div class="pokemon-statistics pokemon-statistic-${pokemon['name']} d-none" id="pokemon-statistic${id}">
        ${createStatistics(pokemon)}
    </div>
    </div>
    `
}

function createStatistics(pokemon) {
    return `
    <div class="pokemon-statistic">HP: 
        <div class="pokemon-statistic-borderOut">
            <div class="pokemon-statistic-borderIn" style="width:${pokemon['stats']['hp']}%">
                <div class="pokemon-statistic-value">${pokemon['stats']['hp']}%</div>
            </div>        
        </div>
    </div>
    <div class="pokemon-statistic">Attack: 
        <div class="pokemon-statistic-borderOut">
            <div class="pokemon-statistic-borderIn" style="width:${pokemon['stats']['attack']}%">
                <div class="pokemon-statistic-value">${pokemon['stats']['attack']}%</div>
            </div>        
        </div>
    </div>
    <div class="pokemon-statistic">Defense:
        <div class="pokemon-statistic-borderOut">
            <div class="pokemon-statistic-borderIn" style="width:${pokemon['stats']['defense']}%">
                <div class="pokemon-statistic-value">${pokemon['stats']['defense']}%</div>
            </div>        
        </div>
    </div>
    <div class="pokemon-statistic">Spez.-Attack:
        <div class="pokemon-statistic-borderOut">
            <div class="pokemon-statistic-borderIn" style="width:${pokemon['stats']['special-attack']}%">
                <div class="pokemon-statistic-value">${pokemon['stats']['special-attack']}%</div>
            </div>        
        </div>
    </div>
    <div class="pokemon-statistic">Spez.-Defense:
        <div class="pokemon-statistic-borderOut">
            <div class="pokemon-statistic-borderIn" style="width:${pokemon['stats']['special-defense']}%">
                <div class="pokemon-statistic-value">${pokemon['stats']['special-defense']}%</div>
            </div>        
        </div>
    </div>
    <div class="pokemon-statistic">Speed:
        <div class="pokemon-statistic-borderOut">
            <div class="pokemon-statistic-borderIn" style="width:${pokemon['stats']['speed']}%">
                <div class="pokemon-statistic-value">${pokemon['stats']['speed']}%</div>
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