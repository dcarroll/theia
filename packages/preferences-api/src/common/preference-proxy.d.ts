import { Disposable, Event } from '@theia/core/lib/common';
import { PreferenceService } from "./preference-service";
import { PreferenceSchema } from "./preference-contribution";
export declare type Configuration = {
    [preferenceName: string]: any;
};
export interface PreferenceChangeEvent<T> {
    readonly preferenceName: keyof T;
    readonly newValue?: T[keyof T];
    readonly oldValue?: T[keyof T];
}
export declare type PreferenceEventEmitter<T> = {
    readonly onPreferenceChanged: Event<PreferenceChangeEvent<T>>;
    readonly ready: Promise<void>;
};
export declare type PreferenceProxy<T> = Readonly<T> & Disposable & PreferenceEventEmitter<T>;
export declare function createPreferenceProxy<T extends Configuration>(preferences: PreferenceService, configuration: T, schema: PreferenceSchema): PreferenceProxy<T>;
export declare function validatePreference(schema: PreferenceSchema, preference: Object): boolean;
