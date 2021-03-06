import { ApplicationPackageManager, ApplicationPackageOptions, NpmRegistry } from '@theia/application-package';
import { Disposable, DisposableCollection, Event, Emitter, ILogger, CancellationTokenSource, CancellationToken } from "@theia/core";
import { ServerProcess } from "@theia/core/lib/node";
import { FileSystemWatcherServer, DidFilesChangedParams } from "@theia/filesystem/lib/common/filesystem-watcher-protocol";
import { InstallationResult, InstallationParam } from '../common/extension-protocol';
import { NpmClient } from './npm-client';
export declare class ApplicationProjectOptions extends ApplicationPackageOptions {
    readonly autoInstall: boolean;
    readonly watchRegistry: boolean;
}
export declare class ApplicationProject implements Disposable {
    readonly options: ApplicationProjectOptions;
    protected readonly fileSystemWatcher: FileSystemWatcherServer;
    protected readonly logger: ILogger;
    protected readonly npmClient: NpmClient;
    protected readonly serverProcess: ServerProcess;
    protected readonly packageUri: string;
    protected readonly toDispose: DisposableCollection;
    protected readonly onChangePackageEmitter: Emitter<void>;
    protected readonly onWillInstallEmitter: Emitter<InstallationParam>;
    protected readonly onDidInstallEmitter: Emitter<InstallationResult>;
    protected readonly registry: NpmRegistry;
    constructor(options: ApplicationProjectOptions, fileSystemWatcher: FileSystemWatcherServer, logger: ILogger, npmClient: NpmClient, serverProcess: ServerProcess);
    dispose(): void;
    readonly onDidChangePackage: Event<void>;
    protected fireDidChangePackage(): void;
    protected isPackageChanged(param: DidFilesChangedParams): boolean;
    protected onDidFilesChanged(param: DidFilesChangedParams): void;
    createPackageManager(): ApplicationPackageManager;
    readonly onWillInstall: Event<InstallationParam>;
    protected fireWillInstall(param: InstallationParam): void;
    readonly onDidInstall: Event<InstallationResult>;
    protected fireDidInstall(result: InstallationResult): void;
    protected autoInstall(): Promise<void>;
    protected installed: Promise<void>;
    protected installationTokenSource: CancellationTokenSource;
    scheduleInstall(): Promise<void>;
    protected install(token?: CancellationToken): Promise<void>;
    protected restart(token?: CancellationToken): Promise<void>;
    protected build(token?: CancellationToken): Promise<void>;
    protected prepareBuild(token?: CancellationToken): Promise<void>;
    protected doBuild(token?: CancellationToken): Promise<void>;
    protected readonly reverting: boolean;
    protected backup(): void;
    protected revert(token?: CancellationToken): void;
    protected readonly backupPath: string;
    protected readonly packagePath: string;
}
