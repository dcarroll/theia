import { Resource, ResourceResolver, MaybePromise, Emitter, Event, DisposableCollection } from "@theia/core";
import URI from "@theia/core/lib/common/uri";
import { FileSystem, FileStat } from "./filesystem";
import { FileSystemWatcher } from "./filesystem-watcher";
export declare class FileResource implements Resource {
    readonly uri: URI;
    protected stat: FileStat;
    protected readonly fileSystem: FileSystem;
    protected readonly fileSystemWatcher: FileSystemWatcher;
    protected readonly toDispose: DisposableCollection;
    protected readonly onDidChangeContentsEmitter: Emitter<void>;
    constructor(uri: URI, stat: FileStat, fileSystem: FileSystem, fileSystemWatcher: FileSystemWatcher);
    dispose(): void;
    readContents(options?: {
        encoding?: string;
    }): Promise<string>;
    saveContents(content: string, options?: {
        encoding?: string;
    }): Promise<void>;
    readonly onDidChangeContents: Event<void>;
}
export declare class FileResourceResolver implements ResourceResolver {
    protected readonly fileSystem: FileSystem;
    protected readonly fileSystemWatcher: FileSystemWatcher;
    constructor(fileSystem: FileSystem, fileSystemWatcher: FileSystemWatcher);
    resolve(uri: URI): MaybePromise<FileResource>;
}
