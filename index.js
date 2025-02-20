import soundboard_item from "./components/soundboard-item.js";
import Playlist from "./components/playlist.js";
import TopBar from "./components/topBar.js";

customElements.define('playlist-container', Playlist);
customElements.define('soundboard-item', soundboard_item);
customElements.define('top-bar', TopBar);