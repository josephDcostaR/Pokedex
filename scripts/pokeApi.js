
const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    const stats = pokeDetail.stats
    stats.forEach((stat) => {
        switch (stat.stat.name) {
            case "hp":
                pokemon.hp = calculatePercentage(stat.base_stat)
                break;
            case "attack":
                pokemon.attack = calculatePercentage(stat.base_stat);
                break;
            case "defense":
                pokemon.defense = calculatePercentage(stat.base_stat);
                break;
        }
    })
    return pokemon
}

function calculatePercentage(value) {
    const maxValue = 255;
    const maxPercenctage = 90;
    let percentage = (value / maxValue) * 100;

    if (percentage > maxPercenctage) {
        percentage = maxPercenctage;
    }

    return percentage;
}

pokeApi.getPokemonsDatails = (pokemon) => {
     return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

     return fetch(url)    
        .then((response) => {return response.json()})
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonsDatails))
        .then((datailRequests) => Promise.all(datailRequests))
        .then((pokemonDetails) => pokemonDetails)
}
        


