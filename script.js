document.addEventListener('DOMContentLoaded', function () {
    // Endpoint GET com a lista de personagens
    const endpoint = 'https://hp-api.onrender.com/api/characters';

    // Referências aos elementos do DOM
    const filterInput = document.getElementById('filterInput');
    const filterButton = document.getElementById('filterButton');
    const characterList = document.getElementById('characterList');

    // Função para carregar a lista de personagens
    function loadCharacters() {
        axios.get(endpoint)
            .then(response => {
                const characters = response.data;

                // Limpa a lista de personagens
                characterList.innerHTML = '';

                // Itera sobre a lista de personagens e cria cartões para cada um
                characters.forEach(character => {
                    const card = document.createElement('div');
                    card.classList.add('col-md-6', 'mb-4');

                    card.innerHTML = `
                        <div class="card">
                            <img src="${character.image}" class="card-img-top" alt="${character.name}">
                            <div class="card-body">
                                <h5 class="card-title">${character.name}</h5>
                                <a href="templates/character.html?id=${character.id}" class="btn btn-primary">Detalhes</a>
                            </div>
                        </div>
                    `;

                    characterList.appendChild(card);
                });
            })
            .catch(error => {
                console.error('Erro ao carregar personagens', error);
            });
    }

    // Carrega a lista de personagens ao carregar a página
    loadCharacters();

    // Função para filtrar personagens por nome
    function filterCharacters() {
        const searchTerm = filterInput.value.toLowerCase();

        axios.get(endpoint)
            .then(response => {
                const characters = response.data;

                // Filtra os personagens pelo nome
                const filteredCharacters = characters.filter(character => {
                    return character.name.toLowerCase().includes(searchTerm);
                });

                // Atualiza a lista de personagens com o resultado do filtro
                characterList.innerHTML = '';

                filteredCharacters.forEach(character => {
                    const card = document.createElement('div');
                    card.classList.add('col-md-6', 'mb-4');

                    card.innerHTML = `
                        <div class="card">
                            <img src="${character.image}" class="card-img-top" alt="${character.name}">
                            <div class="card-body">
                                <h5 class="card-title">${character.name}</h5>
                                <a href="templates/character.html?id=${character.id}" class="btn btn-primary">Detalhes</a>
                            </div>
                        </div>
                    `;

                    characterList.appendChild(card);
                });
            })
            .catch(error => {
                console.error('Erro ao filtrar personagens', error);
            });
    }

    // Configura o evento de clique no botão de filtro
    filterButton.addEventListener('click', filterCharacters);
});
