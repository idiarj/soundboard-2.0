class Playlist extends HTMLElement {
    constructor(){
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(this.#getTemplate().content.cloneNode(true));
        this.#loadStyles();
        //this.showPlaylist();
    }

    #getTemplate(){
        const template = document.createElement('template');
        template.innerHTML = `
            <div class="songsContainer">
            </div>
        `;
        return template;
    }

    #loadStyles(){
        const link = document.creatpleElement('link');
        link.setAttribute('rel', 'stylesheet');
        link.setAttribute('href', './components/styles/playlist.css');
        this.shadowRoot.appendChild(link);
    }

    // showPlaylist(){
    //     const playlistButton = this.shadowRoot.querySelector('.playlistButton');
    //     playlistButton.addEventListener('click', () => {
    //         // Ocultar todas las playlists
    //         console.log(document.querySelectorAll('playlist-container .songsContainer'));
    //         document.querySelectorAll('playlist-container').forEach(container => {
    //             console.log('hola')
    //             console.log(container);
    //             console.log(container.shadowRoot);
    //             const shadowRootContainer = container.shadowRoot;
    //             const songsContainer = shadowRootContainer.querySelector('.songsContainer');
    //             songsContainer .classList.remove('show');
    //         });

    //         // Mostrar la playlist actual
    //         const songsContainer = this.shadowRoot.querySelector('.songsContainer');
    //         songsContainer.classList.toggle('show');
    //     });
    // }


    loadSongs(){
        const id = this.getAttribute('playlist-id');

    }
}


export default Playlist;