import { NpmRegistry, NpmRegistryConfig, NodePackage, PublishedNodePackage } from './npm-registry';
import { Extension, ExtensionPackage } from './extension-package';
export declare type ApplicationPackageTarget = 'browser' | 'electron';
export declare class ApplicationPackageConfig extends NpmRegistryConfig {
    readonly target: ApplicationPackageTarget;
}
export declare type ApplicationLog = (message?: any, ...optionalParams: any[]) => void;
export declare class ApplicationPackageOptions {
    readonly projectPath: string;
    readonly log?: ApplicationLog;
    readonly error?: ApplicationLog;
    readonly registry?: NpmRegistry;
}
export declare type ApplicationModuleResolver = (modulePath: string) => string;
export declare class ApplicationPackage {
    protected readonly options: ApplicationPackageOptions;
    static defaultConfig: ApplicationPackageConfig;
    readonly projectPath: string;
    readonly log: ApplicationLog;
    readonly error: ApplicationLog;
    constructor(options: ApplicationPackageOptions);
    protected _registry: NpmRegistry | undefined;
    readonly registry: NpmRegistry;
    readonly target: ApplicationPackageTarget;
    protected _config: ApplicationPackageConfig | undefined;
    readonly config: ApplicationPackageConfig;
    protected _pck: NodePackage | undefined;
    readonly pck: NodePackage;
    protected _frontendModules: Map<string, string> | undefined;
    protected _frontendElectronModules: Map<string, string> | undefined;
    protected _backendModules: Map<string, string> | undefined;
    protected _backendElectronModules: Map<string, string> | undefined;
    protected _extensionPackages: ReadonlyArray<ExtensionPackage> | undefined;
    /**
     * Extension packages in the topological order.
     */
    readonly extensionPackages: ReadonlyArray<ExtensionPackage>;
    getExtensionPackage(extension: string): ExtensionPackage | undefined;
    findExtensionPackage(extension: string): Promise<ExtensionPackage | undefined>;
    resolveExtensionPackage(extension: string): Promise<ExtensionPackage | undefined>;
    protected newExtensionPackage(raw: PublishedNodePackage): ExtensionPackage;
    readonly frontendModules: Map<string, string>;
    readonly frontendElectronModules: Map<string, string>;
    readonly backendModules: Map<string, string>;
    readonly backendElectronModules: Map<string, string>;
    protected computeModules<P extends keyof Extension, S extends keyof Extension = P>(primary: P, secondary?: S): Map<string, string>;
    relative(path: string): string;
    path(...segments: string[]): string;
    readonly packagePath: string;
    lib(...segments: string[]): string;
    srcGen(...segments: string[]): string;
    backend(...segments: string[]): string;
    frontend(...segments: string[]): string;
    isBrowser(): boolean;
    isElectron(): boolean;
    ifBrowser<T>(value: T): T | undefined;
    ifBrowser<T>(value: T, defaultValue: T): T;
    ifElectron<T>(value: T): T | undefined;
    ifElectron<T>(value: T, defaultValue: T): T;
    readonly targetBackendModules: Map<string, string>;
    readonly targetFrontendModules: Map<string, string>;
    setDependency(name: string, version: string | undefined): boolean;
    save(): Promise<void>;
    protected _moduleResolver: undefined | ApplicationModuleResolver;
    /**
     * A node module resolver in the context of the application package.
     */
    readonly resolveModule: ApplicationModuleResolver;
    resolveModulePath(moduleName: string, ...segments: string[]): string;
}
