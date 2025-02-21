class exportPlaylist extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(this.#getTemplate().content.cloneNode(true));
        this.#loadStyles();
        //this.#addEventListeners();
    }

    #getTemplate() {
        const template = document.createElement('template');
        template.innerHTML = `
            <section class="modalSection">
                <h2>Export a playlist</h2>
                <select></select>
                <button class="exportButton">Export</button>
            </section>
        `;
        return template;
    }

    #loadStyles(){
        const link = document.createElement('link');
        link.setAttribute('rel', 'stylesheet');
        link.setAttribute('href', './components/styles/export-playlist.css');
        this.shadowRoot.appendChild(link);
    }
}

export default exportPlaylist;