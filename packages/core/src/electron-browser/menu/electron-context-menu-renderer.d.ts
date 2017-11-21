import { MenuPath } from "../../common";
import { ContextMenuRenderer, Anchor } from "../../browser";
import { ElectronMainMenuFactory } from "./electron-main-menu-factory";
export declare class ElectronContextMenuRenderer implements ContextMenuRenderer {
    private menuFactory;
    constructor(menuFactory: ElectronMainMenuFactory);
    render(menuPath: MenuPath, anchor: Anchor, onHide?: () => void): void;
}
