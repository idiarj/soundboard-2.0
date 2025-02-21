import { openDB } from "../dependencies/idb.js";

export class indexedDB {
    constructor(dbName){
        this.dbName = dbName;
        this.db = null;
        this.initPromise = this.#initDB();
    }

    async #initDB(){
        try {
            this.db = await openDB(this.dbName, 1, {
                upgrade(db) {
                    db.createObjectStore('sounds', {keyPath: 'id'});
                    db.createObjectStore('playlist', {keyPath: 'id'});
                }
            });
        } catch (error) {
            console.error('Error initializing the database', error);
            throw error;
        }
    }

    async addRecord({data, store}){
        try {
            await this.initPromise;
            await this.db.add(store, data);
            console.log('Record added to the database');
        } catch (error) {
            console.error('Error adding record to the database', error);
            throw error;
        }
    }

    async getRecords({store}){
        try {
            await this.initPromise;
            return await this.db.getAll(store);
        } catch (error) {
            console.error('Error getting records from the database', error);
            throw error;
        }
    }

    async deleteRecord({recordName, store}){
        try {
            await this.initPromise;
            await this.db.delete(store, recordName);
        } catch (error) {
            console.error('Error deleting record from the database', error);
            throw error;
        }
    }
    
    async getRecordById({id, store}){
        try {
            await this.initPromise;
            return await this.db.get(store, id);            
        } catch (error) {
            console.error('Error getting record by id from the database', error);
            throw error;
        }
    }

    async updateRecord({data, store}){
        try {
            await this.initPromise;
            await this.db.put(store, data);
            console.log('Record updated in the database');
        } catch (error) {
            console.error('Error updating record in the database', error);
            throw error;
        }
    }
}
