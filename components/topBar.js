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
                    <label for="addSongButton" class="styledButton">Add a new song</label>
                    <input type="file" id="addSongButton" class="hiddenInput" />
                </div>
                <div class="buttonContainer">
                    <button id="createPlaylistButton">Create new playlist</button>
                </div>
                <div class="buttonContainer">
                    <button id="changeWallpaperButton">Change wallpaper</button>
                </div>
                <div class="buttonContainer">
                    <label for="importJson" class="styledButton">Import playlist (as JSON)</label>
                    <input type="file" id="importJson" class="hiddenInput" />
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