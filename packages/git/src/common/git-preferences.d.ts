import { interfaces } from 'inversify';
import { PreferenceProxy } from '@theia/preferences-api';
import { PreferenceSchema } from '@theia/preferences-api/lib/common/';
export interface GitConfiguration {
    /**
     * The time-interval (in milliseconds) to poll for the status changes in the local working directory.
     */
    'git.pollInterval': number;
}
export declare const GitPreferenceSchema: PreferenceSchema;
export declare const GitPreferences: symbol;
export declare type GitPreferences = PreferenceProxy<GitConfiguration>;
export declare function bindGitPreferences(bind: interfaces.Bind): void;
