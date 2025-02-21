class PlaylistModal extends HTMLElement {
    constructor(){
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(this.#getTemplate().content.cloneNode(true));
        this.#loadStyles();
    }


    #getTemplate(){
        const template = document.createElement('template');
        template.innerHTML = `
            <section class="modalSection">
                <h2>Create a playlist</h2>
                <form>
                    <input type="text" name="name" placeholder="New playlist name">
                    <button class="createButton">Create</button>
                </form>
                <button class="closeButton">Close</button>
            </section>
        `;
        return template;
    }


    #loadStyles(){
        const link = document.createElement('link');
        link.setAttribute('rel', 'stylesheet');
        link.setAttribute('href', './components/styles/playlistModal.css');
        this.shadowRoot.appendChild(link);
    }
}

export default PlaylistModal;