import { CommandRegistry, CompositeMenuNode, MenuModelRegistry, MenuPath } from '../../common';
export declare class ElectronMainMenuFactory {
    protected readonly commandRegistry: CommandRegistry;
    protected readonly menuProvider: MenuModelRegistry;
    constructor(commandRegistry: CommandRegistry, menuProvider: MenuModelRegistry);
    createMenuBar(): Electron.Menu;
    createContextMenu(menuPath: MenuPath): Electron.Menu;
    protected fillMenuTemplate(items: Electron.MenuItemConstructorOptions[], menuModel: CompositeMenuNode): Electron.MenuItemConstructorOptions[];
    protected execute(command: string): void;
    protected createOSXMenu(): Electron.MenuItemConstructorOptions;
}
