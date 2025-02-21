class PlaylistButton extends HTMLElement {
    constructor(){
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(this.#getTemplate().content.cloneNode(true));
        this.#loadStyles();
        this.showPlaylist();
    }


    #getTemplate(){
        const template = document.createElement('template');
        template.innerHTML = `
        <div class="buttonContainer">
            <button class="playlistButton">
                <slot></slot>
            </button>
        </div>

        `;
        return template;
    }   


    #loadStyles(){
        const link = document.createElement('link');
        link.setAttribute('rel', 'stylesheet');
        link.setAttribute('href', './components/styles/playlistButton.css');
        this.shadowRoot.appendChild(link);
    }

    showPlaylist(){
        const playlistButton = this.shadowRoot.querySelector('.playlistButton');
        playlistButton.addEventListener('click', () => {
            // Ocultar todas las playlists
            console.log(document.querySelectorAll('.appContainer'));
            document.querySelectorAll('.appContainer').forEach(container => {
                console.log('hola')
                console.log(container);
                console.log(container.shadowRoot);
                const shadowRootContainer = container.shadowRoot;
                const songsContainer = shadowRootContainer.querySelector('.songsContainer');
                songsContainer.classList.remove('show');
            });

            // Mostrar la playlist actual
            const songsContainer = this.shadowRoot.querySelector('.songsContainer');
            songsContainer.classList.toggle('show');
        });
    }
}

export default PlaylistButton