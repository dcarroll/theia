import { MenuPath } from "../common/menu";
export declare type Anchor = MouseEvent | {
    x: number;
    y: number;
};
export declare function toAnchor(anchor: HTMLElement | {
    x: number;
    y: number;
}): Anchor;
export declare const ContextMenuRenderer: symbol;
export interface ContextMenuRenderer {
    render(menuPath: MenuPath, anchor: Anchor, onHide?: () => void): void;
}
