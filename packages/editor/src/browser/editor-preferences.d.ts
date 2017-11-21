import { interfaces } from "inversify";
import { PreferenceProxy, PreferenceService, PreferenceSchema, PreferenceChangeEvent } from '@theia/preferences-api';
export declare const editorPreferenceSchema: PreferenceSchema;
export interface EditorConfiguration {
    'editor.tabSize': number;
    'editor.lineNumbers': 'on' | 'off';
    'editor.renderWhitespace': 'none' | 'boundary' | 'all';
    'editor.autoSave': 'on' | 'off';
    'editor.autoSaveDelay': number;
}
export declare type EditorPreferenceChange = PreferenceChangeEvent<EditorConfiguration>;
export declare const defaultEditorConfiguration: EditorConfiguration;
export declare const EditorPreferences: symbol;
export declare type EditorPreferences = PreferenceProxy<EditorConfiguration>;
export declare function createEditorPreferences(preferences: PreferenceService): EditorPreferences;
export declare function bindEditorPreferences(bind: interfaces.Bind): void;
