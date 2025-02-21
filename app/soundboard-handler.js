import { createFirstPlayList, 
    getPlaylists, 
    createNewPlaylist, 
    addNewSong,
    getPlaylistSongs,
    createFavoritePlaylist } from "./soundboard-logic.js";

const body = document.querySelector('body');
const playlistModal = document.querySelector('playlist-modal');
const topBar = document.querySelector('top-bar');
const playlistButtonsContainer = document.querySelector('.playlistButtonContainer');
const playlistContainer = document.querySelector('playlist-container');

console.log(playlistButtonsContainer);

const topShadowRoot = topBar.shadowRoot;
const playlistModalShadowRoot = playlistModal.shadowRoot;

const createPlaylistButton = topShadowRoot.querySelector('#createPlaylistButton');
const closeModalButton = playlistModalShadowRoot.querySelector('.closeButton');
const formModal = playlistModalShadowRoot.querySelector('.playlistForm');
const inputSong = topShadowRoot.querySelector('.buttonContainer .hiddenInput');

createFirstPlayList();
createFavoritePlaylist();
const playlists = await getPlaylists();

for (const playlist of playlists) {
    const playlistButton = document.createElement('playlist-button');
    const playlistContainer = document.createElement('playlist-container');
    //console.log(playlist);
    playlistButton.textContent = playlist.nombre;
    playlistButton.setAttribute('playlist-id', playlist.id);

    playlistContainer.setAttribute('id', playlist.id);

    const songs = await getPlaylistSongs({playlistId: playlist.id});
    //console.log(songs)
    songs.forEach(song => {
        //console.log(song);
        const songButton = document.createElement('soundboard-item');
        songButton.textContent = song.name;
        songButton.setAttribute('song-id', song.id);
        songButton.shadowRoot.querySelector('audio').setAttribute('src', song.src);
        playlistContainer.shadowRoot.querySelector('div').appendChild(songButton);
    })
    body.appendChild(playlistContainer);
    playlistButtonsContainer.appendChild(playlistButton);
}

// Llama a esta función después de que se hayan agregado los botones de la playlist
function handlePlaylistButtons() {
    const playlistButtons = playlistButtonsContainer.querySelectorAll('playlist-button');
    console.log(playlistButtons);

    // Aquí puedes agregar la lógica que depende de playlistButtons
    playlistButtons.forEach(button => {
        button.addEventListener('click', () => {
            console.log(button);
            console.log(`Playlist button ${button.getAttribute('playlist-id')} clicked`);
            
            // Ocultar todas las playlists
            document.querySelectorAll('playlist-container').forEach(container => {
                container.shadowRoot.querySelector('.songsContainer').classList.remove('show');
            });

            // Mostrar la playlist actual
            const playlistContainer = document.getElementById(button.getAttribute('playlist-id'));
            playlistContainer.shadowRoot.querySelector('.songsContainer').classList.toggle('show');
            console.log(document.getElementById(button.getAttribute('playlist-id')))
        });
    });
}

// Llama a la función después de un pequeño retraso para asegurarte de que los elementos se hayan agregado al DOM
setTimeout(handlePlaylistButtons, 0);

createPlaylistButton.addEventListener('click', () => {
    //console.log('create playlist');
    playlistModal.classList.toggle('show');
});

closeModalButton.addEventListener('click', () => {
    playlistModal.classList.remove('show');
})

formModal.addEventListener('submit', (e) => {
    //e.preventDefault();
    //console.log('submit');
    //console.log(formModal.name.value);
    createNewPlaylist({nombre: formModal.name.value});
    playlistModal.classList.remove('show');
    formModal.reset();
})

//console.log(inputSong);

inputSong.addEventListener('change', (e) => {
    let data;
    //console.log('change');
    //console.log(e.target.files);
    const file = e.target.files[0];
    const fileNameWithoutExtension = file.name.replace(/\.[^/.]+$/, ""); // Quitar la extensión
    //console.log(fileNameWithoutExtension);
    const reader = new FileReader();
    reader.onload = (e) => {
        data = e.target.result;
        //console.log(data)
        addNewSong({name: fileNameWithoutExtension, src: data});
        //console.log('Song added');
    }
    reader.readAsDataURL(file);
});

