import { MenuContribution, MenuModelRegistry, MenuPath } from "@theia/core";
export declare const EDITOR_CONTEXT_MENU: MenuPath;
export declare namespace EditorContextMenu {
    const UNDO_REDO: string[];
}
export declare class EditorMenuContribution implements MenuContribution {
    registerMenus(registry: MenuModelRegistry): void;
}
