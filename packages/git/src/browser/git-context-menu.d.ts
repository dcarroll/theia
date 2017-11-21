import { MenuContribution, MenuModelRegistry, MenuPath } from "@theia/core";
export declare const GIT_CONTEXT_MENU: MenuPath;
export declare class GitContextMenu implements MenuContribution {
    registerMenus(menus: MenuModelRegistry): void;
}
