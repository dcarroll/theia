import { Event, Emitter, Disposable, DisposableCollection } from '@theia/core/lib/common';
import { PreferenceServer, PreferenceChangedEvent, PreferenceChange } from './preference-protocol';
export { PreferenceChange };
export declare class PreferenceService implements Disposable {
    protected readonly server: PreferenceServer;
    protected prefCache: {
        [key: string]: any;
    };
    protected readonly toDispose: DisposableCollection;
    protected readonly onPreferenceChangedEmitter: Emitter<PreferenceChange>;
    protected resolveReady: () => void;
    readonly ready: Promise<void>;
    constructor(server: PreferenceServer);
    dispose(): void;
    protected onDidChangePreference(event: PreferenceChangedEvent): void;
    readonly onPreferenceChanged: Event<PreferenceChange>;
    has(preferenceName: string): boolean;
    get<T>(preferenceName: string): T | undefined;
    get<T>(preferenceName: string, defaultValue: T): T;
    getBoolean(preferenceName: string): boolean | undefined;
    getBoolean(preferenceName: string, defaultValue: boolean): boolean;
    getString(preferenceName: string): string | undefined;
    getString(preferenceName: string, defaultValue: string): string;
    getNumber(preferenceName: string): number | undefined;
    getNumber(preferenceName: string, defaultValue: number): number;
}
