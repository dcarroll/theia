import { Message } from '@phosphor/messaging';
import { h, VirtualNode } from '@phosphor/virtualdom';
import { DisposableCollection } from '@theia/core';
import { VirtualWidget, OpenerService } from '@theia/core/lib/browser';
import { Extension, ExtensionManager } from '../common';
export declare class ExtensionWidget extends VirtualWidget {
    protected readonly extensionManager: ExtensionManager;
    protected readonly openerService: OpenerService;
    static SEARCH_DELAY: number;
    protected extensions: Extension[];
    protected readonly toDisposeOnFetch: DisposableCollection;
    protected readonly toDisposeOnSearch: DisposableCollection;
    protected ready: boolean;
    constructor(extensionManager: ExtensionManager, openerService: OpenerService);
    protected onActivateRequest(msg: Message): void;
    protected fetchExtensions(): void;
    protected render(): h.Child;
    protected renderSearchField(): VirtualNode;
    protected renderExtensionList(): VirtualNode;
    private renderExtension(extension);
    protected createExtensionClassName(extension: Extension): string;
    protected renderRow(...children: h.Child[]): h.Child;
    protected renderColumn(additionalClass?: string, ...children: h.Child[]): h.Child;
    protected createButton(extension: Extension): h.Child;
}
