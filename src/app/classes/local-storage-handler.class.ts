import { BehaviorSubject } from "rxjs";
import { DesrializerFunction, SerializerFunction } from "../types";

export class LocalStorageHandler {
    public static createBehaviorSubjectHandler<T>(key: string, defaultValue: T | undefined, type: string, serializer: SerializerFunction<T | undefined>, deserializer: DesrializerFunction<T | undefined>)
        : BehaviorSubject<T | undefined> {

        const obj = new BehaviorSubject<T | undefined>(defaultValue);
        const currentValue = localStorage.getItem(key);
        if (currentValue) obj.next(deserializer(currentValue, type));

        obj.subscribe(value => {
            const serializedValue = serializer(value)
            if (serializedValue) localStorage.setItem(key, serializedValue);
        });
        return obj;
    }
}