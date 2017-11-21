import { Disposable } from './disposable';
import { CommandRegistry } from './command';
import { ContributionProvider } from './contribution-provider';
export interface MenuAction {
    commandId: string;
    label?: string;
    icon?: string;
    order?: string;
}
export declare type MenuPath = string[];
export declare const MAIN_MENU_BAR: MenuPath;
export declare const MenuContribution: symbol;
export interface MenuContribution {
    registerMenus(menus: MenuModelRegistry): void;
}
export declare class MenuModelRegistry {
    protected readonly contributions: ContributionProvider<MenuContribution>;
    protected readonly commands: CommandRegistry;
    protected readonly root: CompositeMenuNode;
    constructor(contributions: ContributionProvider<MenuContribution>, commands: CommandRegistry);
    onStart(): void;
    registerMenuAction(menuPath: MenuPath, item: MenuAction): Disposable;
    registerSubmenu(menuPath: MenuPath, label: string): Disposable;
    protected findGroup(menuPath: MenuPath): CompositeMenuNode;
    protected findSubMenu(current: CompositeMenuNode, menuId: string): CompositeMenuNode;
    getMenu(menuPath?: MenuPath): CompositeMenuNode;
}
export interface MenuNode {
    readonly label?: string;
    /**
     * technical identifier
     */
    readonly id: string;
    readonly sortString: string;
}
export declare class CompositeMenuNode implements MenuNode {
    readonly id: string;
    label: string | undefined;
    protected readonly _children: MenuNode[];
    constructor(id: string, label?: string | undefined);
    readonly children: ReadonlyArray<MenuNode>;
    addNode(node: MenuNode): Disposable;
    readonly sortString: string;
    readonly isSubmenu: boolean;
}
export declare class ActionMenuNode implements MenuNode {
    readonly action: MenuAction;
    protected readonly commands: CommandRegistry;
    constructor(action: MenuAction, commands: CommandRegistry);
    readonly id: string;
    readonly label: string;
    readonly icon: string | undefined;
    readonly sortString: string;
}
