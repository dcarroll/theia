export declare type Deferred<T> = {
    [P in keyof T]: Promise<T[P]>;
};
export declare type RecursivePartial<T> = {
    [P in keyof T]?: RecursivePartial<T[P]>;
};
export declare type MaybeArray<T> = T | T[];
export declare type MaybePromise<T> = T | Promise<T>;
export declare type Prioritizeable<T> = {
    readonly priority: number;
    readonly value: T;
};
export declare namespace Prioritizeable {
    type GetPriority<T> = (value: T) => MaybePromise<number>;
    function toPrioritizeable<T>(rawValue: MaybePromise<T>, getPriority: GetPriority<T>): Promise<Prioritizeable<T>>;
    function toPrioritizeable<T>(rawValue: MaybePromise<T>[], getPriority: GetPriority<T>): Promise<Prioritizeable<T>[]>;
    function prioritizeAll<T>(values: MaybePromise<T>[], getPriority: GetPriority<T>): Promise<Prioritizeable<T>[]>;
    function isValid<T>(p: Prioritizeable<T>): boolean;
    function compare<T>(p: Prioritizeable<T>, p2: Prioritizeable<T>): number;
}
