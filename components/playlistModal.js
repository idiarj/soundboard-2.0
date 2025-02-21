class PlaylistModal extends HTMLElement {
    constructor(){
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(this.#getTemplate().content.cloneNode(true));
    }


    #getTemplate(){
        const template = document.createElement('template');
        template.innerHTML = `
            <section class="modalSection>
                <h2>Crear Playlist</h2>
                <form>
                    <input type="text" name="name" placeholder="Nombre de la playlist">
                    <button>Crear</button>
                </form>
            </section>
        `;
        return template;
    }


    #loadStyles(){
        const link = document.creatpleElement('link');
        link.setAttribute('rel', 'stylesheet');
        link.setAttribute('href', './components/styles/playlistModal.css');
        this.shadowRoot.appendChild(link);
    }
}

export default PlaylistModal;