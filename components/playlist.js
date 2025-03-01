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
            <div class="songsContainer">
            </div>
        `;
        return template;
    }

    #loadStyles(){
        const link = document.createElement('link');
        link.setAttribute('rel', 'stylesheet');
        link.setAttribute('href', './components/styles/playlist.css');
        this.shadowRoot.appendChild(link);
    }


}


export default Playlist;