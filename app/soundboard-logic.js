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

export function createNewPlaylist({nombre, songs = []}){
    soundboardDB.addRecord({data: {
        id: `playlist-${generateUniqueId()}`,
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
        console.log(`Se añadió la canción ${song.name} a favoritos`);
        console.log(song);
        soundboardDB.updateRecord({data: {...song, favorite: true}, store: 'sounds'});
    })
}

export function removeFromFavorites({songId}) {
    soundboardDB.getRecordById({id: 'favorites', store: 'playlist'}).then(playlist => {
        playlist.songs = playlist.songs.filter(id => id !== songId);
        soundboardDB.updateRecord({data: playlist, store: 'playlist'});
    })

    soundboardDB.getRecordById({id: songId, store: 'sounds'}).then(song => {
        console.log(`Se eliminó la canción ${song.name} de favoritos`);
        console.log(song);
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


export function addNewSong({name, src}){
    const songId = `song-${generateUniqueId()}`;
    soundboardDB.addRecord({
        data: {
            id: songId,
            name,
            src
        },
        store: 'sounds'
    })
    //console.log(`Se añadió la canción ${name} con id ${songId}`);
    addSongToPlaylist({playlistId: 'playlist0', songId});
}

export function addSongToPlaylist({playlistId, songId}){
    soundboardDB.getRecordById({id: playlistId, store: 'playlist'}).then(playlist => {
        //console.log(playlist.songs);
        console.log(`Se añadió la canción ${songId} a la playlist ${playlist}`);
        playlist.songs.push(songId);
        //console.log(playlist);
        soundboardDB.updateRecord({data: playlist, store: 'playlist'});
        //soundboardDB.addRecord({data: playlist, store: 'playlist'});
    })
}

export async function getPlaylists(){
    const playlists = await soundboardDB.getRecords({store: 'playlist'});
    //console.log(playlists);
    return playlists;
}

export async function getPlaylistSongs({playlistId}){
    const playlist = await soundboardDB.getRecordById({id: playlistId, store: 'playlist'});
    //console.log(playlist)
    //console.log(playlist.songs)
    const songs = await Promise.all(playlist.songs.map(async (songId) => {
        return await soundboardDB.getRecordById({id: songId, store: 'sounds'});
    }))
    return songs;
}



// const record = await soundboardDB.getRecordById({id: 1, store: 'sounds'});
// //console.log(record)