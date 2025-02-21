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

export function createNewPlaylist({nombre, songs = []}){
    soundboardDB.addRecord({data: {
        id: generateUniqueId(),
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
        console.log(`Se añadió la canción ${songId} a la playlist ${playlist}`);
        playlist.songs.push(songId);
        //soundboardDB.addRecord({data: playlist, store: 'playlist'});
    })
}

export async function getPlaylist(){
    const playlist = await soundboardDB.getRecords({store: 'playlist'});
    console.log(playlist);
    return playlist;
}



// const record = await soundboardDB.getRecordById({id: 1, store: 'sounds'});
// console.log(record)