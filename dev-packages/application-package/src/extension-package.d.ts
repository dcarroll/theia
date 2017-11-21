import { NpmRegistry, PublishedNodePackage, NodePackage } from './npm-registry';
export interface Extension {
    frontend?: string;
    frontendElectron?: string;
    backend?: string;
    backendElectron?: string;
}
export declare class ExtensionPackage {
    readonly raw: PublishedNodePackage & Partial<RawExtensionPackage>;
    protected readonly registry: NpmRegistry;
    constructor(raw: PublishedNodePackage & Partial<RawExtensionPackage>, registry: NpmRegistry);
    readonly name: string;
    readonly version: string;
    readonly description: string;
    readonly theiaExtensions: Extension[];
    readonly installed: boolean;
    readonly dependent: string | undefined;
    readonly transitive: boolean;
    readonly parent: ExtensionPackage | undefined;
    protected view(): Promise<RawExtensionPackage.ViewState>;
    protected readme?: string;
    getReadme(): Promise<string>;
    protected resolveReadme(): Promise<string>;
    getLatestVersion(): Promise<string | undefined>;
    protected versionRange?: string;
    getVersionRange(): Promise<string | undefined>;
    protected resolveVersionRange(): Promise<string | undefined>;
    getAuthor(): string;
    isOutdated(): Promise<boolean>;
}
export interface RawExtensionPackage extends PublishedNodePackage {
    installed?: RawExtensionPackage.InstalledState;
    view?: RawExtensionPackage.ViewState;
    theiaExtensions: Extension[];
}
export declare namespace RawExtensionPackage {
    interface InstalledState {
        version: string;
        packagePath: string;
        transitive: boolean;
        parent?: ExtensionPackage;
    }
    class ViewState {
        protected readonly registry: NpmRegistry;
        readme?: string;
        tags?: {
            [tag: string]: string;
        };
        constructor(registry: NpmRegistry);
        readonly latestVersion: string | undefined;
    }
    function is(pck: NodePackage | undefined): pck is RawExtensionPackage;
    function view(registry: NpmRegistry, name: string, version?: string): Promise<RawExtensionPackage | undefined>;
}
