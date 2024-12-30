import { IStoreSchemas } from "../interfaces";

export const StoreSchemas: IStoreSchemas = {
    'contacts': {
        keyPath: 'id',
        indices: ['name', 'phone']
    }
};