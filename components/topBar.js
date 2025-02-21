class TopBar extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(this.#getTemplate().content.cloneNode(true));
        this.#loadStyles();
    }
    
    #getTemplate(){
        const template = document.createElement('template');
        template.innerHTML = `
            <header>
                <h1>Soundboard</h1>
                <div class="buttonContainer">
                    <button id="addSongButton">Add song</button>
                </div>
                <div class="buttonContainer">
                    <button id="createPlaylistButton">Create new playlist</button>
                </div>
                <div class="buttonContainer">
                    <button id="createPlaylistButton">Change wallpaper</button>
                </div>
                <div class="buttonContainer">
                    <button id="importJson">Import playlist (as JSON)</button>
                </div>
                <div class="buttonContainer">
                    <button id="exportJson">Export playlist (as JSON)</button>
                </div>
            </header>
        `;
        return template;
    }

    #loadStyles(){
        const link = document.createElement('link');
        link.setAttribute('rel', 'stylesheet');
        link.setAttribute('href', './components/styles/topBar.css');
        this.shadowRoot.appendChild(link);
    }
}

export default TopBar;