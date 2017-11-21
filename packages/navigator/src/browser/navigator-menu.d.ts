import { MenuContribution, MenuModelRegistry, MenuPath } from "@theia/core/lib/common";
import { OpenerService } from '@theia/core/lib/browser';
export declare const NAVIGATOR_CONTEXT_MENU: MenuPath;
export declare namespace NavigatorContextMenu {
    const OPEN: string[];
    const OPEN_WITH: string[];
    const CLIPBOARD: string[];
    const MOVE: string[];
    const NEW: string[];
}
export declare class NavigatorMenuContribution implements MenuContribution {
    protected readonly openerService: OpenerService;
    constructor(openerService: OpenerService);
    registerMenus(registry: MenuModelRegistry): void;
}
