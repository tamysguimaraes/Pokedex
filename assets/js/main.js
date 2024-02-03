const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const maxRecords = 151
const limit = 10
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>
            
            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
                     <button id="btndetail" type="button" onClick = ShowDetail(${pokemon.number})>
                     Details
                     </button>   
            </div>
       
        
            </li>
    `
}

function convertPokemonToDetail(pokemon) {
    let height=pokemon.Details.height/10;
    let weight=pokemon.Details.weight/10;
    return `

    <table class="tg">
<thead>
  <tr>
    <td><h3>#${pokemon.number} ${pokemon.name} </h3></td>
  </tr>
  <tr>
    <td><h5>Abilities:</h5></td>
  </tr>
  <tr>
  ${pokemon.Details.abilities.map((type) => `<td>${type}</td>`).join('')}
  </tr>
  <tr>
    <td><h5>Heigth: </h5> </td><td>${height} m </td>
  </tr>
  <tr>
    <td><h5>Weight: </h5></td><td>${weight} kg </td>
  </tr>
</thead>
</table>
    `
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})

function ShowDetail(pokemonNumber){
//alert(pokemonNumber)
pokeApi.getPokemonDetailByID(pokemonNumber).then((pokemon) => {
    
    const newHtml = convertPokemonToDetail(pokemon)
    const $output = document.getElementById('output')
    $output.innerHTML = newHtml
    $("#myModal").modal()
})
}