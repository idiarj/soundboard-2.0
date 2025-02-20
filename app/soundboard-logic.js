import { indexedDB } from "../database/indexedDB.js";

const soundboardDB = new indexedDB('soundboardDB');

//soundboardDB.addRecord({data: {id: 1, recordName: 'test'}, store: 'sounds'});
export function createFirstPlayList(){
    soundboardDB.addRecord({data: {
        id: 'playlist0',
        nombre: 'All songs',
        songs: []
    }, store: 'playlist'})
}

export function createNewPlaylist({id, nombre, songs}){
    soundboardDB.addRecord({data: {
        id,
        nombre,
        songs
    }, store: 'playlist'})
}


export function addNewSong({name, src}){
    soundboardDB.addRecord({
        data: {
            id: name,
            name,
            src
        },
        store: 'sounds'
    })
}

export function addSongToPlaylist({playlistId, songId}){
    soundboardDB.getRecordById({id: playlistId, store: 'playlist'}).then(playlist => {
        playlist.songs.push(songId);
        //soundboardDB.addRecord({data: playlist, store: 'playlist'});
    })
}

createFirstPlayList();

// const record = await soundboardDB.getRecordById({id: 1, store: 'sounds'});
// console.log(record)