import { Extension, ResolvedExtension } from '../common/extension-manager';
import { Message } from '@phosphor/messaging/lib';
import { VirtualWidget } from '@theia/core/lib/browser';
import { h } from '@phosphor/virtualdom/lib';
export declare class ExtensionDetailWidget extends VirtualWidget {
    protected readonly resolvedExtension: ResolvedExtension;
    constructor(resolvedExtension: ResolvedExtension);
    onActivateRequest(msg: Message): void;
    protected onUpdateRequest(msg: Message): void;
    protected render(): h.Child;
    protected createExtensionClassName(): string;
    protected createButtonContainer(): h.Child;
    protected createButtons(extension: Extension): h.Child[];
}
