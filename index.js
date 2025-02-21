import soundboard_item from "./components/soundboard-item.js";
import Playlist from "./components/playlist.js";
import TopBar from "./components/topBar.js";
import PlaylistButton from "./components/playlistButton.js";
import PlaylistModal from "./components/playlistModal.js";

customElements.define('playlist-container', Playlist);
customElements.define('playlist-button', PlaylistButton);
customElements.define('playlist-modal', PlaylistModal);
customElements.define('soundboard-item', soundboard_item);
customElements.define('top-bar', TopBar);
