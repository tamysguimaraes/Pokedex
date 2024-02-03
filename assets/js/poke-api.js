
const pokeApi = {}

function convertPokeApiDetailToPokemon(pokemDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokemDetail.id
    pokemon.name = pokemDetail.name

    const types = pokemDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokemDetail.sprites.other.dream_world.front_default

    return pokemon
}

function convertPokeApiDetailByIDToPokemon(pokemDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokemDetail.id
    pokemon.name = pokemDetail.name
    pokemon.Details= new Details()

    const detalhe = new Details()

    const habilidades = pokemDetail.abilities.map((ability) => ability.ability.name)
    detalhe.abilities = habilidades;
    detalhe.base_experience=pokemDetail.base_experience;
    detalhe.height=pokemDetail.height;
    detalhe.weight = pokemDetail.weight
    
   
    pokemon.Details=detalhe;
    return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails)
}

pokeApi.getPokemonDetailByID = (pokemonNumber) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonNumber}/ `
    return fetch(url)
        .then((response) => response.json())
        .then(convertPokeApiDetailByIDToPokemon)
}