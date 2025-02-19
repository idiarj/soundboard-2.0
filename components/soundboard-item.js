class soundboard_item extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(this.#getTemplate().content.cloneNode(true));
    }

    #getTemplate() {
        const template = document.createElement('template');
        template.innerHTML = `
            <div class="soundboard-item">
                <h1><slot></slot></h1>
                <audio src="" controls></audio>
            </div>
        `;
        return template;
    }
}



export default soundboard_item;