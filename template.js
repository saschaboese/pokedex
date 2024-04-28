function templateOf_pokemoncard(id) {
    return `
    <div class="pokemon-card" id="pokemoncard${id}">
    <div class="pokemon-indexnumber" id="indexnumber${id}">#25</div>
    <div class="pokemon-name" id="pokemonName${id}">Pikachu</div>
    <div class="pokemon-element" id="element${id}">Electric</div>
    <div class="pokemon-image">
        <img src="./img/pikachu.png" alt="pikachu" id="image${id}">
    </div>
</div>
    `
}