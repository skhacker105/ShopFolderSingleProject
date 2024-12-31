export class SupportUtils {

    public static BasicDataTypeSerializer<T>(data: T | undefined): string | undefined {
        if (!data) return;
        return data.toString();
    }

    public static BasicDataTypeDeserializer<T>(data: string | undefined): T | undefined {
        if (!data) return;
        
        if (typeof (undefined as T) === 'string') return data as T;
        else if (typeof (undefined as T) === 'number') return +data as T;
        else if (typeof (undefined as T) === 'boolean') return data as T;

        return;
    }
}