import { Disposable, DisposableCollection, Emitter, Event } from '@theia/core/lib/common';
import URI from '@theia/core/lib/common/uri';
import { DidFilesChangedParams, FileChangeType, FileSystemWatcherServer, WatchOptions } from './filesystem-watcher-protocol';
import { FileSystemPreferences } from "./filesystem-preferences";
export { FileChangeType };
export interface FileChange {
    uri: URI;
    type: FileChangeType;
}
export declare class FileSystemWatcher implements Disposable {
    protected readonly server: FileSystemWatcherServer;
    protected readonly preferences: FileSystemPreferences;
    protected readonly toDispose: DisposableCollection;
    protected readonly toRestartAll: DisposableCollection;
    protected readonly onFileChangedEmitter: Emitter<FileChange[]>;
    constructor(server: FileSystemWatcherServer, preferences: FileSystemPreferences);
    /**
     * Stop watching.
     */
    dispose(): void;
    protected onDidFilesChanged(event: DidFilesChangedParams): void;
    /**
     * Start file watching under the given uri.
     *
     * Resolve when watching is started.
     * Return a disposable to stop file watching under the given uri.
     */
    watchFileChanges(uri: URI): Promise<Disposable>;
    /**
      * Emit when files under watched uris are changed.
      */
    readonly onFilesChanged: Event<FileChange[]>;
    protected createWatchOptions(): Promise<WatchOptions>;
    protected getIgnored(): Promise<string[]>;
}
