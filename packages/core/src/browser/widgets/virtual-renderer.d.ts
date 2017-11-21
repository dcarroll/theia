import { h, VirtualNode } from "@phosphor/virtualdom";
export declare class VirtualRenderer {
    readonly host: HTMLElement;
    constructor(host?: HTMLElement);
    render(): void;
    protected doRender(): h.Child;
}
export declare namespace VirtualRenderer {
    function render(child: h.Child, host: HTMLElement): void;
    function flatten(children: h.Child[]): h.Child;
    function merge(left: h.Child | undefined, right: h.Child | undefined): h.Child;
    function toContent(children: h.Child): VirtualNode | VirtualNode[] | null;
}
