import { MenuContribution, MenuModelRegistry } from "@theia/core/lib/common";
import { MonacoCommandRegistry } from './monaco-command-registry';
export interface MonacoActionGroup {
    id: string;
    actions: string[];
}
export declare namespace MonacoMenus {
    const SELECTION: string[];
    const SELECTION_GROUP: MonacoActionGroup;
    const SELECTION_MOVE_GROUP: MonacoActionGroup;
    const SELECTION_CURSOR_GROUP: MonacoActionGroup;
    const SELECTION_GROUPS: MonacoActionGroup[];
}
export declare class MonacoEditorMenuContribution implements MenuContribution {
    protected readonly commands: MonacoCommandRegistry;
    constructor(commands: MonacoCommandRegistry);
    registerMenus(registry: MenuModelRegistry): void;
}
