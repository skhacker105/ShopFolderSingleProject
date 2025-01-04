import { IStoreSchemas } from "../interfaces";
import { IDBSearchQuery } from "../types";

export class IndexedDBHandler {
    db?: IDBDatabase;
    dbName: string;
    storeSchemas: IStoreSchemas;

    constructor(dbName: string, storeSchemas: IStoreSchemas) {
        this.dbName = dbName;
        this.storeSchemas = storeSchemas; // { storeName: { keyPath: 'id', indices: ['name', 'email'] } }
    }

    init(): Promise<IndexedDBHandler> {
        return new Promise((resolve, reject) => { 
            const request = indexedDB.open(this.dbName, 1);

            request.onupgradeneeded = (event: any) => {
                const db = event.currentTarget.result;
                for (let schemaName in this.storeSchemas) {
                    if (!db.objectStoreNames.contains(schemaName)) {
                        const store = db.createObjectStore(schemaName, { keyPath: this.storeSchemas[schemaName].keyPath, autoIncrement: true });
                        this.storeSchemas[schemaName].indices.forEach((index) => store.createIndex(index, index, { unique: false }));
                    }
                }
            };

            request.onsuccess = () => {
                this.db = request.result;
                resolve(this);
            };

            request.onerror = (event: any) => reject(event.target.error);
        });
    }

    create(storeName: string, data: any): Promise<any> {
        return new Promise((resolve, reject) => {
            if (!this.db) return reject(new Error("Database is not initialized."));

            const transaction = this.db.transaction(storeName, 'readwrite');
            const store = transaction.objectStore(storeName);
            const request = store.add(data);

            request.onsuccess = () => resolve(request.result);
            request.onerror = (event: any) => reject(event.target.error);
        });
    }

    read(storeName: string, key: string): Promise<any> {
        return new Promise((resolve, reject) => {
            if (!this.db) return reject(new Error("Database is not initialized."));

            const transaction = this.db.transaction(storeName, 'readonly');
            const store = transaction.objectStore(storeName);
            const request = store.get(key);

            request.onsuccess = () => resolve(request.result);
            request.onerror = (event: any) => reject(event.target.error);
        });
    }

    update(storeName: string, data: any): Promise<any> {
        return new Promise((resolve, reject) => {
            if (!this.db) return reject(new Error("Database is not initialized."));

            const transaction = this.db.transaction(storeName, 'readwrite');
            const store = transaction.objectStore(storeName);
            const request = store.put(data);

            request.onsuccess = () => resolve(request.result);
            request.onerror = (event: any) => reject(event.target.error);
        });
    }

    delete(storeName: string, key: string): Promise<any> {
        return new Promise((resolve, reject) => {
            if (!this.db) return reject(new Error("Database is not initialized."));

            const transaction = this.db.transaction(storeName, 'readwrite');
            const store = transaction.objectStore(storeName);
            const request = store.delete(key);

            request.onsuccess = () => resolve(request.result);
            request.onerror = (event: any) => reject(event.target.error);
        });
    }

    search(storeName: string, query: IDBSearchQuery, indexName?: string): Promise<any[]> {
        return new Promise((resolve, reject) => {
            if (!this.db) return reject(new Error("Database is not initialized."));

            const transaction = this.db.transaction(storeName, 'readonly');
            const store = transaction.objectStore(storeName);
            const request = indexName? store.index(indexName).getAll(query) : store.getAll(query);

            request.onsuccess = () => resolve(request.result);
            request.onerror = (event: any) => reject(event.target.error);
        });
    }

    closeDatabase(): void {
        this.db?.close();
    }
}
