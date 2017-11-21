/**
 * Simple implementation of the deferred pattern.
 * An object that exposes a promise and functions to resolve and reject it.
 */
export declare class Deferred<T> {
    resolve: (value?: T) => void;
    reject: (err?: any) => void;
    promise: Promise<T>;
}
