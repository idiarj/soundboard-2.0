import { indexedDB } from "../database/indexedDB.js";
import { generateUniqueId } from "../utils/generateId.js";

const soundboardDB = new indexedDB('soundboardDB');

//soundboardDB.addRecord({data: {id: 1, recordName: 'test'}, store: 'sounds'});
export async function createFirstPlayList(){
    const firstPlaylist = await soundboardDB.getRecordById({id: 'playlist0', store: 'playlist'});
    if(firstPlaylist) return;
    soundboardDB.addRecord({data: {
        id: 'playlist0',
        nombre: 'All songs',
        songs: []
    }, store: 'playlist'})
}

export async function createFavoritePlaylist(){
    const favoritePlaylist = await soundboardDB.getRecordById({id: 'favorites', store: 'playlist'});
    if(favoritePlaylist) return;
    soundboardDB.addRecord({data: {
        id: 'favorites',
        nombre: 'Liked songs',
        songs: []
    }, store: 'playlist'})
}

export function createNewPlaylist({id, nombre, songs = []}){
    const playlistId = id ?? `playlist-${generateUniqueId()}`;
    soundboardDB.addRecord({data: {
        id: playlistId,
        nombre,
        songs
    }, store: 'playlist'})
}

export function addToFavorites({songId}) {
    soundboardDB.getRecordById({id: 'favorites', store: 'playlist'}).then(playlist => {
        playlist.songs.push(songId);
        soundboardDB.updateRecord({data: playlist, store: 'playlist'});
    })

    soundboardDB.getRecordById({id: songId, store: 'sounds'}).then(song => {
        //console.log(`Se añadió la canción ${song.name} a favoritos`);
        //console.log(song);
        soundboardDB.updateRecord({data: {...song, favorite: true}, store: 'sounds'});
    })
}

export function removeFromFavorites({songId}) {
    soundboardDB.getRecordById({id: 'favorites', store: 'playlist'}).then(playlist => {
        playlist.songs = playlist.songs.filter(id => id !== songId);
        soundboardDB.updateRecord({data: playlist, store: 'playlist'});
    })

    soundboardDB.getRecordById({id: songId, store: 'sounds'}).then(song => {
        //console.log(`Se eliminó la canción ${song.name} de favoritos`);
        //console.log(song);
        soundboardDB.updateRecord({data: {...song, favorite: false}, store: 'sounds'});
    })
}

export function toggleFavorite({songId}) {
    soundboardDB.getRecordById({id: songId, store: 'sounds'}).then(song => {
        if(song.favorite){
            removeFromFavorites({songId});
        } else {
            addToFavorites({songId});
        }
    })
}

export async function isFavorite({songId}) {
    const song = await soundboardDB.getRecordById({id: songId, store: 'sounds'});
    //console.log('la cancion')
    //console.log(song);
    return song.favorite;
}


export async function addNewSong({id, name, src}){
    if (!name || !src) return;
    
    if (!src.startsWith('data:audio/mpeg;base64,')) {
        alert('El archivo no es un audio');
        return;
    }
    
    if (id) {
        const songs = await soundboardDB.getRecords({ store: 'sounds' });
        const songAlreadyExists = songs.some(song => song.id === id);
        if (songAlreadyExists) {
            alert('La canción ya existe');
            return;
        }
    }
   console.log('llego id', id)
    const songId = id ?? `song-${generateUniqueId()}`;
    soundboardDB.addRecord({
        data: {
            id: songId,
            name,
            src
        },
        store: 'sounds'
    })
    console.log(`Se añadió la canción ${name} con id ${songId}`);
    addSongToPlaylist({playlistId: 'playlist0', songId});
}

export async function addSongToPlaylist({ playlistId, songId }) {
    console.log('Llegó playlistId:', playlistId);

    // Obtener la playlist desde IndexedDB
    const playlist = await soundboardDB.getRecordById({ id: playlistId, store: 'playlist' });

    console.log('Playlist antes de agregar:', playlist);

    // Asegurar que songs sea un array
    if (!Array.isArray(playlist.songs)) {
        playlist.songs = [];
    }

    // Agregar el nuevo songId sin reemplazar
    playlist.songs.push(songId);

    console.log('Playlist actualizada con nueva canción:', playlist);

    // Guardar los cambios en IndexedDB
    await soundboardDB.updateRecord({ data: playlist, store: 'playlist' });
}


export async function getPlaylists(){
    const playlists = await soundboardDB.getRecords({store: 'playlist'});
    ////console.log(playlists);
    return playlists;
}

export async function getPlaylistSongs({playlistId}){
    const playlist = await soundboardDB.getRecordById({id: playlistId, store: 'playlist'});
    ////console.log(playlist)
    ////console.log(playlist.songs)
    const songs = await Promise.all(playlist.songs.map(async (songId) => {
        return await soundboardDB.getRecordById({id: songId, store: 'sounds'});
    }))
    return songs;
}

export async function removeFromPlaylist({songId, playlistId}) {
    soundboardDB.getRecordById({id: playlistId, store: 'playlist'}).then(playlist => {
        playlist.songs = playlist.songs.filter(id => id !== songId);
        soundboardDB.updateRecord({data: playlist, store: 'playlist'}).then(() => {
            document.dispatchEvent(new CustomEvent('playlistUpdated', { detail: { playlistId } }));
        });
    });
}

export async function exportPlaylistf({playlistId}) {
    const playlist = await soundboardDB.getRecordById({id: playlistId, store: 'playlist'});
    playlist.songs = await Promise.all(playlist.songs.map(async (songId) => {
        return await soundboardDB.getRecordById({id: songId, store: 'sounds'});
    }));
    console.log(playlist);
    const playlistJson = JSON.stringify(playlist, null, 2);
    const blob = new Blob([playlistJson], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${playlist.nombre}.json`;
    a.click();
    URL.revokeObjectURL(url);
}

export async function importPlaylist({file}) {
    const reader = new FileReader();
    reader.onload = async (e) => {
        const playlist = JSON.parse(e.target.result);
        console.log(playlist);
        // const playlistId = `playlist-${generateUniqueId()}`;
        // soundboardDB.addRecord({data: {
        //     id: playlistId,
        //     nombre: playlist.nombre,
        //     songs: playlist.songs.map(song => song.id)
        // }, store: 'playlist'});
        // playlist.songs.forEach(song => {
        //     soundboardDB.addRecord({data: song, store: 'sounds'});
        // });
        // location.reload();
    }
    reader.readAsText(file);
}