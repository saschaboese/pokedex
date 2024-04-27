function templateOf_pokemoncard(id) {
    return `
    <div class="pokemon-card" id="pokemoncard${id}">
    <div class="pokemon-indexnumber" id="indexnumber${id}">#25</div>
    <div class="pokemon-name" id="pokemonName${id}">Pikachu</div>
    <div class="pokemon-element" id="element${id}">Electric</div>
    <div class="pokemon-data">
        <div class="pokemon-data-category">
            <p>Experience = </p>
            <div class="pokemon-data-value" id="experience${id}">112</div>
        </div>
        <div class="pokemon-data-category">
            <p>Height = </p>
            <div class="pokemon-data-value" id="height${id}">4</div>
        </div>
        <div class="pokemon-data-category">
            <p>Weight = </p>
            <div class="pokemon-data-value" id="weight${id}">60</div>
        </div>
    </div>
    <div class="pokemon-image">
        <img src="./img/pikachu.png" alt="pikachu" id="image${id}">
    </div>
</div>
    `
}