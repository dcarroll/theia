import { JsonRpcServer } from "@theia/core";
export declare const preferencesPath = "/services/preferences";
export declare const PreferenceServer: symbol;
export interface PreferenceServer extends JsonRpcServer<PreferenceClient> {
}
export interface PreferenceClient {
    onDidChangePreference(event: PreferenceChangedEvent): void;
}
export interface PreferenceChangedEvent {
    changes: PreferenceChange[];
}
export interface PreferenceChange {
    readonly preferenceName: string;
    readonly newValue?: any;
    readonly oldValue?: any;
}
