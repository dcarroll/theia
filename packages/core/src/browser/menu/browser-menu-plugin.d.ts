import { MenuBar as MenuBarWidget, Menu as MenuWidget, Widget } from "@phosphor/widgets";
import { CommandRegistry as PhosphorCommandRegistry } from "@phosphor/commands";
import { CommandRegistry, KeybindingRegistry, ActionMenuNode, CompositeMenuNode, MenuModelRegistry, MenuPath } from "../../common";
import { FrontendApplicationContribution, FrontendApplication } from "../frontend-application";
export declare class BrowserMainMenuFactory {
    protected readonly commandRegistry: CommandRegistry;
    protected readonly keybindingRegistry: KeybindingRegistry;
    protected readonly menuProvider: MenuModelRegistry;
    constructor(commandRegistry: CommandRegistry, keybindingRegistry: KeybindingRegistry, menuProvider: MenuModelRegistry);
    createMenuBar(): MenuBarWidget;
    createContextMenu(path: MenuPath): MenuWidget;
    protected createPhosporCommands(menu: CompositeMenuNode): PhosphorCommandRegistry;
    protected addPhosphorCommands(commands: PhosphorCommandRegistry, menu: CompositeMenuNode): void;
    protected addPhosphorCommand(commands: PhosphorCommandRegistry, menu: ActionMenuNode): void;
}
export declare class BrowserMenuBarContribution implements FrontendApplicationContribution {
    protected readonly factory: BrowserMainMenuFactory;
    constructor(factory: BrowserMainMenuFactory);
    onStart(app: FrontendApplication): void;
    protected createLogo(): Widget;
}
