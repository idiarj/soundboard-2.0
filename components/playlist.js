class Playlist extends HTMLElement {
    constructor(){
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(this.#getTemplate().content.cloneNode(true));
        this.#loadStyles();
    }

    #getTemplate(){
        const template = document.createElement('template');
        template.innerHTML = `
            <button class="playlistButton">
                <slot></slot>
            </button>
            <div class="songsContainer">
            <soundboard-item>
                Audio 1
            </soundboard-item>
            <soundboard-item>
                Audio 2
            </soundboard-item>
            <soundboard-item>
                Audio 3
            </soundboard-item>
            <soundboard-item>
                Audio 4
            </soundboard-item>
            </div>
        `;
        return template;
    }

    #loadStyles(){
        const link = document.createElement('link');
        link.setAttribute('rel', 'stylesheet');
        link.setAttribute('href', './styles/playlist.css');
        this.shadowRoot.appendChild(link);
    }

    showPlaylist(){
        const playlistButton = this.shadowRoot.querySelector('.playlistButton');
        playlistButton.addEventListener('click', ()=>{
            const songsContainer = this.shadowRoot.querySelector('.songsContainer');
            songsContainer.classList.toggle('show');
        });

    }
}


export default Playlist;