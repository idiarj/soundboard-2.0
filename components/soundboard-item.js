class soundboard_item extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        
    }


    connectedCallback() {
        this.render();
    }

    render(){
        this.shadowRoot.innerHTML = `
        <div class="soundboard-item">
            <div>
            Audio
            </div>
            <audio controls></audio>    
        </div>
        `
    }
}



export default soundboard_item;