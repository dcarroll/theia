import { Disposable, DisposableCollection, ILogger } from '@theia/core/lib/common';
import { FileChange, FileChangeType, FileSystemWatcherClient, FileSystemWatcherServer, WatchOptions } from '../common/filesystem-watcher-protocol';
export interface WatchError {
    readonly code: string;
    readonly filename: string;
}
export declare class ChokidarFileSystemWatcherServer implements FileSystemWatcherServer {
    protected readonly logger: ILogger;
    protected client: FileSystemWatcherClient | undefined;
    protected watcherSequence: number;
    protected readonly watchers: Map<number, Disposable>;
    protected readonly toDispose: DisposableCollection;
    protected changes: FileChange[];
    protected readonly fireDidFilesChangedTimeout: number;
    protected readonly toDisposeOnFileChange: DisposableCollection;
    protected printedENOSPCError: boolean;
    constructor(logger: ILogger);
    dispose(): void;
    watchFileChanges(uri: string, options?: WatchOptions): Promise<number>;
    unwatchFileChanges(watcherId: number): Promise<void>;
    setClient(client: FileSystemWatcherClient): void;
    protected toPaths(raw: string): string | string[];
    protected pushAdded(watcherId: number, path: string): void;
    protected pushUpdated(watcherId: number, path: string): void;
    protected pushDeleted(watcherId: number, path: string): void;
    protected pushFileChange(watcherId: number, path: string, type: FileChangeType): void;
    protected fireDidFilesChanged(): void;
    protected isWatchError(error: any): error is WatchError;
    /**
     * Given a watch error object, print a user-friendly error message that
     * explains what failed, and what can be done about it.
     *
     * @param error The error thrown by chokidar.
     */
    protected handleWatchError(error: WatchError): void;
}
