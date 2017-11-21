import { JsonPreferenceServer } from '../json-preference-server';
import URI from '@theia/core/lib/common/uri';
import { FileSystemNode } from "@theia/filesystem/lib/node/node-filesystem";
import { FileSystemWatcherServer, DidFilesChangedParams, WatchOptions, FileSystemWatcherClient } from '@theia/filesystem/lib/common/filesystem-watcher-protocol';
import { Logger } from '@theia/core/lib/common/logger';
export declare class JsonPrefHelper {
    readonly logger: Logger;
    readonly fileWatcher: FileSystemWatcherServerstub;
    fileSystem: FileSystemNode;
    constructor();
    getFS(): FileSystemNode;
    getWatcher(): FileSystemWatcherServerstub;
    createJsonPrefServer(preferenceFileUri: URI): JsonPreferenceServer;
    private createFileSystemWatcher();
}
export declare class FileSystemWatcherServerstub implements FileSystemWatcherServer {
    protected client: FileSystemWatcherClient;
    watchFileChanges(uri: string, options?: WatchOptions): Promise<number>;
    unwatchFileChanges(watcher: number): Promise<void>;
    setClient(client: FileSystemWatcherClient): void;
    dispose(): void;
    fireEvents(event: DidFilesChangedParams): void;
}
