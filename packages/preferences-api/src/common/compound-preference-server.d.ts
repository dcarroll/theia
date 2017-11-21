import { PreferenceServer, PreferenceClient, PreferenceChangedEvent } from './preference-protocol';
export declare class CompoundPreferenceServer implements PreferenceServer {
    protected readonly servers: PreferenceServer[];
    protected client: PreferenceClient | undefined;
    constructor(...servers: PreferenceServer[]);
    protected onDidChangePreference(event: PreferenceChangedEvent): void;
    dispose(): void;
    setClient(client: PreferenceClient | undefined): void;
}
