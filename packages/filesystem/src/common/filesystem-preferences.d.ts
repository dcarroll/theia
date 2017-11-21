import { interfaces } from "inversify";
import { PreferenceProxy, PreferenceService, PreferenceSchema } from '@theia/preferences-api';
export declare const filesystemPreferenceSchema: PreferenceSchema;
export interface FileSystemConfiguration {
    'files.watcherExclude': {
        [globPattern: string]: boolean;
    };
}
export declare const defaultFileSystemConfiguration: FileSystemConfiguration;
export declare const FileSystemPreferences: symbol;
export declare type FileSystemPreferences = PreferenceProxy<FileSystemConfiguration>;
export declare function createFileSystemPreferences(preferences: PreferenceService): FileSystemPreferences;
export declare function bindFileSystemPreferences(bind: interfaces.Bind): void;
