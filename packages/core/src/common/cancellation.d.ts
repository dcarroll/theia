import { Event } from './event';
export interface CancellationToken {
    readonly isCancellationRequested: boolean;
    readonly onCancellationRequested: Event<void>;
}
export declare namespace CancellationToken {
    const None: CancellationToken;
    const Cancelled: CancellationToken;
}
export declare class CancellationTokenSource {
    private _token;
    readonly token: CancellationToken;
    cancel(): void;
    dispose(): void;
}
export declare function cancelled(): Error;
export declare function isCancelled(err: Error | undefined): boolean;
export declare function checkCancelled(token?: CancellationToken): void;
