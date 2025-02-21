import { createFirstPlayList, getPlaylist } from "./soundboard-logic.js";

createFirstPlayList();
const playlists = await getPlaylist();

playlists.forEach(playlist => {
    const playlistButton = document.createElement('playlist-button');
    const appContainer = document.querySelector('.appContainer')
    console.log(appContainer);
    playlistButton.textContent = playlist.nombre;
    appContainer.appendChild(playlistButton);

});

const topBar = document.querySelector('top-bar');
console.log(topBar.shadowRoot.querySelector('.addSongButton'));
console.log(topBar.shadowRoot.querySelector('.createPlaylistButton'));

const addSongButton = topBar.shadowRoot.querySelector('.addSongButton');
const createPlaylistButton = topBar.shadowRoot.querySelector('.createPlaylistButton');

addSongButton.addEventListener('click', () => {
    console.log('add song');
});

createPlaylistButton.addEventListener('click', () => {
    console.log('create playlist');
    const playlistModal = document.querySelector('playlist-modal');
    playlistModal.classList.toggle('show');
});
console.log(playlists);