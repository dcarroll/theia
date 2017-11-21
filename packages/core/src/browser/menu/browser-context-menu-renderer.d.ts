import { MenuPath } from '../../common/menu';
import { ContextMenuRenderer, Anchor } from "../context-menu-renderer";
import { BrowserMainMenuFactory } from "./browser-menu-plugin";
export declare class BrowserContextMenuRenderer implements ContextMenuRenderer {
    private menuFactory;
    constructor(menuFactory: BrowserMainMenuFactory);
    render(menuPath: MenuPath, anchor: Anchor, onHide?: () => void): void;
}
