import URI from "@theia/core/lib/common/uri";
import { DisposableCollection, ILogger, MaybePromise } from '@theia/core/lib/common';
import { FileSystem } from '@theia/filesystem/lib/common';
import { FileSystemWatcherServer, DidFilesChangedParams, FileChange } from '@theia/filesystem/lib/common/filesystem-watcher-protocol';
import { PreferenceChangedEvent, PreferenceClient, PreferenceServer } from '../common';
export declare const PreferenceUri: symbol;
export declare type PreferenceUri = MaybePromise<URI>;
export declare class JsonPreferenceServer implements PreferenceServer {
    protected readonly fileSystem: FileSystem;
    protected readonly watcherServer: FileSystemWatcherServer;
    protected readonly logger: ILogger;
    protected preferences: {
        [key: string]: any;
    } | undefined;
    protected client: PreferenceClient | undefined;
    protected readonly preferenceUri: Promise<string>;
    protected readonly toDispose: DisposableCollection;
    protected ready: Promise<void>;
    constructor(fileSystem: FileSystem, watcherServer: FileSystemWatcherServer, logger: ILogger, preferenceUri: PreferenceUri);
    dispose(): void;
    protected onDidFilesChanged(params: DidFilesChangedParams): void;
    /**
     * Checks to see if the preference file was modified
     */
    protected arePreferencesAffected(changes: FileChange[]): Promise<void>;
    protected reconcilePreferences(): Promise<void>;
    protected readPreferences(): Promise<any | undefined>;
    protected doReconcilePreferences(preferences: any | undefined): void;
    protected fireNew(preferences: any): void;
    protected fireRemoved(preferences: any): void;
    protected fireChanged(target: any, source: any): void;
    protected fireEvent(event: PreferenceChangedEvent): void;
    has(preferenceName: string): Promise<boolean>;
    get<T>(preferenceName: string): Promise<T | undefined>;
    setClient(client: PreferenceClient | undefined): void;
}
