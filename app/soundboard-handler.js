import { createFirstPlayList, getPlaylist, createNewPlaylist } from "./soundboard-logic.js";

const playlistModal = document.querySelector('playlist-modal');
const topBar = document.querySelector('top-bar');

const topShadowRoot = topBar.shadowRoot;
const playlistModalShadowRoot = playlistModal.shadowRoot;

const addSongButton = topShadowRoot.querySelector('#addSongButton');
const createPlaylistButton = topShadowRoot.querySelector('#createPlaylistButton');
const closeModalButton = playlistModalShadowRoot.querySelector('.closeButton');
const formModal = playlistModalShadowRoot.querySelector('.playlistForm');

const appContainer = document.querySelector('.appContainer')

createFirstPlayList();
const playlists = await getPlaylist();


console.log(topBar.shadowRoot.querySelector('#addSongButton'));
console.log(topBar.shadowRoot.querySelector('#createPlaylistButton'));
console.log(appContainer);
console.log(playlists);


playlists.forEach(playlist => {
    const playlistButton = document.createElement('playlist-button');
    playlistButton.textContent = playlist.nombre;
    appContainer.appendChild(playlistButton);

});

addSongButton.addEventListener('click', () => {
    console.log('add song');
});

createPlaylistButton.addEventListener('click', () => {
    console.log('create playlist');
    playlistModal.classList.toggle('show');
});

closeModalButton.addEventListener('click', () => {
    playlistModal.classList.remove('show');
})

formModal.addEventListener('submit', (e) => {
    //e.preventDefault();
    console.log('submit');
    console.log(formModal.name.value);
    createNewPlaylist({nombre: formModal.name.value});
    playlistModal.classList.remove('show');
    formModal.reset();
})

