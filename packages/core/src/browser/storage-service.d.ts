import { ILogger } from '../common/logger';
export declare const StorageService: symbol;
/**
 * The storage service provides an interface to some data storage that allows extensions to keep state among sessions.
 */
export interface StorageService {
    /**
     * Stores the given data under the given key.
     */
    setData<T>(key: string, data: T): Promise<void>;
    /**
     * Returns the data stored for the given key or the provided default value if nothing is stored for the given key.
     */
    getData<T>(key: string, defaultValue: T): Promise<T>;
    getData<T>(key: string): Promise<T | undefined>;
}
export declare class LocalStorageService implements StorageService {
    protected logger: ILogger;
    private storage;
    constructor(logger: ILogger);
    setData<T>(key: string, data?: T): Promise<void>;
    getData<T>(key: string, defaultValue?: T): Promise<T | undefined>;
    protected prefix(key: string): string;
}
