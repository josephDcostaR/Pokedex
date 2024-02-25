
const pokemonDex = document.getElementById('pokemonDex')

function convertPokemonToDetailsHTML(pokemon) {
    return `
        <div class="pokemon-i">
            <div class="up-i">
                <span >
                <a class="btn-back" href="index.html">
                    voltar
                </a>
                </span>
                <img src="${pokemon.photo}" alt="${pokemon.name}-img">
                <span>${pokemon.name}</span>

                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>
                </div>
                
            </div>
            <div class="down-i  ${pokemon.type}" >
                <section class="info-pokemon">
                    <div class="HP">
                        <p>HP</p>
                        <div class="status-bar">
                            <div class="p-hp_exter">
                                <div class="p-hp_inter" id="hp_int" style="width: ${pokemon.hp}%"></div>
                            </div>
                        </div>
                    </div>
                   
                    <div class="ATK">
                        <p>ATK</p>
                        <div class="status-bar">
                            <div class="p-atk_exter">
                                <div class="p-atk_inter" id="atk_int" style="width: ${pokemon.attack}%"></div>
                            </div>
                        </div>
                    </div>
                    <div class="DEF">
                        <p>DEF</p>
                        <div class="status-bar">
                            <div class="p-def_exter">
                                <div class="p-def_inter" id="def_int" style="width: ${pokemon.defense}%"></div>
                            </div>
                        </div>
                    </div>
                 </section>   
            </div>
        </div>
    `;
}


document.addEventListener('DOMContentLoaded', () => {
    const pokemonDetailsContainer = document.getElementById('PokemonDex');
    
    if (pokemonDetailsContainer) {
       
        const urlParams = new URLSearchParams(window.location.search);
        const pokemonId = urlParams.get('id');
        
        if (pokemonId) {
            loadPokemonDetails(pokemonId).then((pokemon) => {
                const detailsHtml = convertPokemonToDetailsHTML(pokemon);
                pokemonDetailsContainer.innerHTML = detailsHtml;
            }).catch((error) => {
                console.error('Erro ao carregar detalhes do Pokémon:', error);
            });
        } else {
            console.error('ID do Pokémon não encontrado na URL.');
        }
    } else {
        console.error('Elemento PokemonDex não encontrado.');
    }
});

function loadPokemonDetails(pokemonId) {
    const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonId}/`;
    
    return pokeApi.getPokemonsDatails({ url: pokemonUrl });
}

