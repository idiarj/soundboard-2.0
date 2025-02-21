

import { getPlaylists, exportPlaylistf } from '../app/soundboard-logic.js';
class exportPlaylist extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(this.#getTemplate().content.cloneNode(true));
        this.#loadStyles();
        this.loadPlaylists();
        this.#addEventListeners();
    }

    #getTemplate() {
        const template = document.createElement('template');
        template.innerHTML = `
            <section class="modalSection">
                <h2>Export a playlist</h2>
                <button class="closeButton">Close</button>
                <select></select>
                <button class="exportButton">Export</button>
            </section>
        `;
        return template;
    }

    #loadStyles(){
        const link = document.createElement('link');
        link.setAttribute('rel', 'stylesheet');
        link.setAttribute('href', './components/styles/exportPlaylists.css');
        this.shadowRoot.appendChild(link);
    }

    async loadPlaylists() {
        const playlists = await getPlaylists();
        console.log(playlists);
        const select = this.shadowRoot.querySelector('select');
        playlists.forEach(playlist => {
            const option = document.createElement('option');
            option.textContent = playlist.nombre;
            option.setAttribute('value', playlist.id);
            select.appendChild(option);
        });
    }

    #addEventListeners() {
        const select = this.shadowRoot.querySelector('select');
        const exportButton = this.shadowRoot.querySelector('.exportButton');
        exportButton.addEventListener('click', async () => {
            const playlistId = select.value;
            console.log(playlistId);
            exportPlaylistf({playlistId});
        })
    }
}

export default exportPlaylist;