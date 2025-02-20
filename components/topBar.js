class TopBar extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(this.#getTemplate().content.cloneNode(true));
    }
    
    #getTemplate(){
        const template = document.createElement('template');
        template.innerHTML = `
            <header>
                <h1>Soundboard</h1>
                <button class="addSongButton">Add song</button>
                <button class="createPlaylistButton">Create new playlist</button>
            </header>
        `;
        return template;
    }
}

export default TopBar;