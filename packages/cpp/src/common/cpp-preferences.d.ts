import { interfaces } from "inversify";
import { PreferenceProxy, PreferenceService, PreferenceSchema } from '@theia/preferences/lib/common';
export declare const CppConfigSchema: PreferenceSchema;
export interface CppConfiguration {
    'cpp.clangdCompileCommandsPath': string;
    'cpp.clangdPath': string;
}
export declare const defaultCppConfiguration: CppConfiguration;
export declare const CppPreferences: symbol;
export declare type CppPreferences = PreferenceProxy<CppConfiguration>;
export declare function createCppPreferences(preferences: PreferenceService): CppPreferences;
export declare function bindCppPreferences(bind: interfaces.Bind): void;
