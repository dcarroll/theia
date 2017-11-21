import { Event, Emitter, Disposable, DisposableCollection } from '@theia/core';
import * as protocol from './extension-protocol';
import { ExtensionChange } from './extension-protocol';
/**
 * The extension allows to:
 * - access its information from the repository;
 * - resolve the detailed information from the repository;
 * - test whether it is installed or outdated;
 * - install, uninstall and update it.
 *
 * The user code should access extensions and listen to their changes with the extension manager.
 */
export declare class Extension extends protocol.Extension {
    protected readonly server: protocol.ExtensionServer;
    protected readonly manager: ExtensionManager;
    protected readonly onDidChangedEmitter: Emitter<protocol.ExtensionChange>;
    constructor(extension: protocol.Extension, server: protocol.ExtensionServer, manager: ExtensionManager);
    readonly onDidChange: Event<ExtensionChange>;
    /**
     * Resolve the detailed information.
     *
     * Resolving can be used to refresh an already resolved extension.
     */
    resolve(): Promise<ResolvedExtension>;
    /**
     * Install the latest version of this extension.
     */
    install(): void;
    /**
     * Uninstall the extension.
     */
    uninstall(): void;
    /**
     * Update the extension to the latest version.
     */
    update(): void;
}
/**
 * The resolved extension allows to access its detailed information.
 */
export declare type ResolvedExtension = Extension & protocol.ResolvedExtension;
/**
 * The extension manager allows to:
 * - access installed extensions;
 * - look up extensions from the repository;
 * - listen to changes of:
 *   - installed extension;
 *   - and the installation process.

 */
export declare class ExtensionManager implements Disposable {
    protected readonly server: protocol.ExtensionServer;
    protected readonly onChangedEmitter: Emitter<protocol.ExtensionChange>;
    protected readonly onWillStartInstallationEmitter: Emitter<protocol.InstallationParam>;
    protected readonly onDidStopInstallationEmitter: Emitter<protocol.InstallationResult>;
    protected readonly toDispose: DisposableCollection;
    constructor(server: protocol.ExtensionServer);
    dispose(): void;
    /**
     * Resolve the detailed extension for the given name.
     */
    resolve(name: string): Promise<ResolvedExtension>;
    /**
     * List installed extensions if the given query is undefined or empty.
     * Otherwise look up extensions from the repository matching the given query
     * taking into the account installed extensions.
     */
    list(param?: protocol.SearchParam): Promise<Extension[]>;
    /**
     * Notify when extensions are installed, uninstalled or updated.
     */
    readonly onDidChange: Event<protocol.ExtensionChange>;
    protected fireDidChange(change: protocol.ExtensionChange): void;
    /**InsrallationResultInsrallationResult
     * Notify when the installation process is going to be started.
     */
    readonly onWillStartInstallation: Event<protocol.InstallationParam>;
    protected fireWillStartInstallation(param: protocol.InstallationParam): void;
    /**
     * Notify when the installation process has been finished.
     */
    readonly onDidStopInstallation: Event<protocol.InstallationResult>;
    protected fireDidStopInstallation(result: protocol.InstallationResult): void;
}
