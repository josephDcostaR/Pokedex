const pokemonList = document.getElementById('pokemonList')

const loadMoreButton = document.getElementById('loadMoreButton')

const limit = 5
let offset = 0
const maxRecords = 151


function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}" data-pokemon-id="${pokemon.number}">
            <a href="index2.html?id=${pokemon.number}" class="pokemon-link">
                <span class="number">#${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>
            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>
                
                    <img src="${pokemon.photo}" alt="${pokemon.name}">
            </div>
            </a>
        </li>
    `;
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('');
        if (pokemonList) {
            pokemonList.innerHTML += newHtml;

            // Adiciona event listener para cada elemento gerado
            const pokemonElements = document.querySelectorAll('.pokemon-link');
            pokemonElements.forEach((element) => {
                element.addEventListener('click', (event) => {
                    event.preventDefault();
                    const pokemonId = element.closest('li').getAttribute('data-pokemon-id');
                    // Agora você tem a ID do Pokémon clicado (pokemonId)
                    console.log('Pokemon ID:', pokemonId);
                    // Adicione o código para navegar para a segunda página ou fazer outras operações com a ID.
                    window.location.href = `index2.html?id=${pokemonId}`;
                });
            });
        } else {
            console.error('Elemento pokemonList não encontrado.');
        }
    });
}

loadPokemonItens(offset, limit);


document.addEventListener('DOMContentLoaded', () => {

    if (loadMoreButton) {
        loadMoreButton.addEventListener('click', () => {
            offset += limit
        
            const qtRecordNextPage = offset + limit
            if(qtRecordNextPage >= maxRecords){
                const newLimit = maxRecords - offset
                loadPokemonItens(offset, newLimit)
        
                loadMoreButton.parentElement.removeChild(loadMoreButton)
            }else{
                loadPokemonItens(offset, limit)
            }
        })
    } else {
        console.error('Elemento loadMoreButton não encontrado.');
    }
})








