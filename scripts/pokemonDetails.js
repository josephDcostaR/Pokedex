
const pokemonDex = document.getElementById('pokemonDex')

function convertPokemonToDetailsHTML(pokemon) {
    return `
        <div class="pokemon-i">
            <div class="up-i">
                <img src="${pokemon.photo}" alt="${pokemon.name}-img">
                <span>${pokemon.name}</span>
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
                    <!-- Repita o mesmo padrão para as barras de status de ATK e DEF -->
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

// main2.js
document.addEventListener('DOMContentLoaded', () => {
    const pokemonDetailsContainer = document.getElementById('PokemonDex');
    
    if (pokemonDetailsContainer) {
        // Obtenha o ID do Pokémon da URL
        const urlParams = new URLSearchParams(window.location.search);
        const pokemonId = urlParams.get('id');
        
        // Verifique se o ID é válido
        if (pokemonId) {
            // Chame a função para carregar detalhes do Pokémon com base no ID
            loadPokemonDetails(pokemonId).then((pokemon) => {
                // Converte os detalhes do Pokémon para HTML e insere no container
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

// Função para carregar detalhes do Pokémon com base no ID
function loadPokemonDetails(pokemonId) {
    const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonId}/`;
    
    return pokeApi.getPokemonsDatails({ url: pokemonUrl });
}

