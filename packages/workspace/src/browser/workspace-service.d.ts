import URI from "@theia/core/lib/common/uri";
import { FileSystem, FileStat, FileSystemWatcher } from "@theia/filesystem/lib/common";
import { WorkspaceServer } from "../common";
import { FrontendApplication, FrontendApplicationContribution } from '@theia/core/lib/browser';
/**
 * The workspace service.
 */
export declare class WorkspaceService implements FrontendApplicationContribution {
    protected readonly fileSystem: FileSystem;
    protected readonly watcher: FileSystemWatcher;
    protected readonly server: WorkspaceServer;
    private _root;
    constructor(fileSystem: FileSystem, watcher: FileSystemWatcher, server: WorkspaceServer);
    protected updateTitle(uri: URI): void;
    /**
     * on unload, we set our workspace root as the last recently used on the backend.
     * @param app
     */
    onStop(app: FrontendApplication): void;
    /**
     * returns the most recently used workspace root or undefined if no root is known.
     */
    readonly root: Promise<FileStat | undefined>;
    /**
     * Opens the given URI as the current workspace root.
     */
    open(uri: URI, options?: WorkspaceInput): void;
    protected doOpen(uri: URI, options?: WorkspaceInput): Promise<void>;
    /**
     * `true` if the argument URI points to an existing directory. Otherwise, `false`.
     */
    protected isValidRoot(uri: string | undefined): Promise<boolean>;
    /**
     * Transforms the `uri` argument into a [FileStat](FileStat). If the given URI argument is invalid, then the promise will be rejected.
     */
    protected toFileStat(uri: string): Promise<FileStat>;
    protected openWindow(uri: URI, options?: WorkspaceInput): void;
    protected reloadWindow(): void;
    protected openNewWindow(): void;
    protected shouldPreserveWindow(options?: WorkspaceInput): boolean;
}
export interface WorkspaceInput {
    /**
     * Tests whether the same window should be used or a new one has to be opened after setting the workspace root. By default it is `false`.
     */
    preserveWindow?: boolean;
}
