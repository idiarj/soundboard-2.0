import { getPlaylists, addSongToPlaylist, toggleFavorite } from "../app/soundboard-logic.js";
const favorito = '../assets/favorito.png';
const noFavorito = '../assets/no_favorito.png';

class soundboard_item extends HTMLElement {
    constructor() {
        super();
        this.favorito = false;
        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(this.#getTemplate().content.cloneNode(true));
        this.#loadStyles();
        this.loadPlaylists();
        this.updateFavoritoImage();
        this.#addEventListeners();
    }

    #getTemplate() {
        const template = document.createElement('template');
        template.innerHTML = `
            <div class="soundboard-item">
                <h1><slot></slot></h1>
                <audio src="" controls></audio>
                <select></select>
                <button class="add-button">Añadir a la playlist</button>
                <img class="favorito-img" src="" alt="favorito">
            </div>
        `;
        return template;
    }

    #loadStyles(){
        const link = document.createElement('link');
        link.setAttribute('rel', 'stylesheet');
        link.setAttribute('href', './components/styles/soundboard-item.css');
        this.shadowRoot.appendChild(link);
    }

    async loadPlaylists() {
        const select = this.shadowRoot.querySelector('select');
        const playlists = await getPlaylists();
        const songId = this.getAttribute('song-id');
        let hasAvailablePlaylists = false;
    
        playlists.forEach(playlist => {
            if (!playlist.songs.includes(songId) && playlist.id !== 'favorites') {
                const option = document.createElement('option');
                option.textContent = playlist.nombre;
                option.setAttribute('value', playlist.id);
                select.appendChild(option);
                hasAvailablePlaylists = true;
            }
        });
    
        if (!hasAvailablePlaylists) {
            select.setAttribute('disabled', true);
        }
    }

    updateFavoritoImage() {
        const img = this.shadowRoot.querySelector('.favorito-img');
        img.src = this.favorito ? favorito : noFavorito;
    }

    #addEventListeners() {
        const img = this.shadowRoot.querySelector('.favorito-img');
        img.addEventListener('click', () => {
            this.favorito = !this.favorito;
            this.updateFavoritoImage();
            console.log(`favorito: ${this.favorito}`);
            toggleFavorite({ songId: this.getAttribute('song-id') });
        });

        const select = this.shadowRoot.querySelector('select');
        const addButton = this.shadowRoot.querySelector('.add-button');
        addButton.addEventListener('click', async () => {
            const songId = this.getAttribute('song-id');
            const playlistId = select.value;
            addSongToPlaylist({ songId, playlistId });
            alert('Canción agregada a la playlist');
        });
    }
}

export default soundboard_item;