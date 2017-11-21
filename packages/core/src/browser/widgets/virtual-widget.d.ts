import { h } from "@phosphor/virtualdom";
import { DisposableCollection } from "../../common";
import { BaseWidget, Message } from "./widget";
export declare class VirtualWidget extends BaseWidget {
    protected readonly onRender: DisposableCollection;
    protected onUpdateRequest(msg: Message): void;
    protected render(): h.Child;
}
