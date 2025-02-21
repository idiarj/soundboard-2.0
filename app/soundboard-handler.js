import { createFirstPlayList, 
    getPlaylists, 
    createNewPlaylist, 
    addNewSong,
    getPlaylistSongs } from "./soundboard-logic.js";

const playlistModal = document.querySelector('playlist-modal');
const topBar = document.querySelector('top-bar');
const appContainer = document.querySelector('.appContainer');
const playlistButtons = document.querySelector('section playlist-button');
console.log(playlistButtons);

const topShadowRoot = topBar.shadowRoot;
const playlistModalShadowRoot = playlistModal.shadowRoot;

const createPlaylistButton = topShadowRoot.querySelector('#createPlaylistButton');
const closeModalButton = playlistModalShadowRoot.querySelector('.closeButton');
const formModal = playlistModalShadowRoot.querySelector('.playlistForm');
const inputSong = topShadowRoot.querySelector('.buttonContainer .hiddenInput');

const playlistButtonContainer = document.querySelector('.playlistButtonContainer')

createFirstPlayList();
const playlists = await getPlaylists();


console.log(topBar.shadowRoot.querySelector('#addSongButton'));
console.log(topBar.shadowRoot.querySelector('#createPlaylistButton'));
console.log(playlistButtonContainer);
console.log(playlists);


playlists.forEach(async (playlist) => {
    const playlistButton = document.createElement('playlist-button');
    console.log(playlist);
    playlistButton.textContent = playlist.nombre;
    playlistButton.setAttribute('playlist-id', playlist.id);
    const songs = await getPlaylistSongs({playlistId: playlist.id});
    console.log(songs)
    songs.forEach(song => {
        console.log(song);
        // const songButton = document.createElement('soundboard-item');
    })
    playlistButtonContainer.appendChild(playlistButton);
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


console.log(inputSong);


inputSong.addEventListener('change', (e) => {
    let data;
    console.log('change');
    console.log(e.target.files);
    const file = e.target.files[0];
    const fileNameWithoutExtension = file.name.replace(/\.[^/.]+$/, ""); // Quitar la extensión
    console.log(fileNameWithoutExtension);
    const reader = new FileReader();
    reader.onload = (e) => {
        data = e.target.result;
        console.log(data)
        addNewSong({name: fileNameWithoutExtension, src: data});
        console.log('Song added');
    }
    reader.readAsDataURL(file);

});

