export type SerializerFunction<T> = (data: T) => string | undefined | null;
export type DesrializerFunction<T> = (data: string | undefined, type: string) => T | undefined;