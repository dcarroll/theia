/// <reference types="@theia/monaco/src/typings/monaco/index" />
/// <reference types="monaco-editor-core/monaco" />
import { QuickOpenService, QuickOpenModel, QuickOpenOptions, QuickOpenItem, QuickOpenGroupItem } from "@theia/core/lib/browser";
export interface MonacoQuickOpenControllerOpts extends monaco.quickOpen.IQuickOpenControllerOpts {
    readonly prefix?: string;
    onType?(lookFor: string, acceptor: (model: monaco.quickOpen.QuickOpenModel) => void): void;
    onClose?(canceled: boolean): void;
}
export declare class MonacoQuickOpenService extends QuickOpenService {
    protected readonly container: HTMLElement;
    protected _widget: monaco.quickOpen.QuickOpenWidget | undefined;
    protected opts: MonacoQuickOpenControllerOpts | undefined;
    protected previousActiveElement: Element | undefined;
    constructor();
    open(model: QuickOpenModel, options?: QuickOpenOptions): void;
    internalOpen(opts: MonacoQuickOpenControllerOpts): void;
    protected readonly widget: monaco.quickOpen.QuickOpenWidget;
    protected attachQuickOpenStyler(): void;
    protected onClose(cancelled: boolean): void;
    protected onType(lookFor: string): Promise<void>;
}
export declare class MonacoQuickOpenControllerOptsImpl implements MonacoQuickOpenControllerOpts {
    protected readonly model: QuickOpenModel;
    protected readonly options: QuickOpenOptions.Resolved;
    constructor(model: QuickOpenModel, options?: QuickOpenOptions);
    readonly prefix: string;
    readonly inputAriaLabel: string;
    onClose(cancelled: boolean): void;
    private toOpenModel(lookFor, items);
    getModel(lookFor: string): monaco.quickOpen.QuickOpenModel;
    onType(lookFor: string, acceptor: (model: monaco.quickOpen.QuickOpenModel) => void): void;
    protected createEntry(item: QuickOpenItem, lookFor: string): monaco.quickOpen.QuickOpenEntry | undefined;
    protected matchesFuzzy(lookFor: string, value: string | undefined): monaco.quickOpen.IHighlight[] | undefined;
    getAutoFocus(lookFor: string): monaco.quickOpen.IAutoFocus;
}
export declare class QuickOpenEntry extends monaco.quickOpen.QuickOpenEntry {
    readonly item: QuickOpenItem;
    constructor(item: QuickOpenItem);
    getLabel(): string | undefined;
    getAriaLabel(): string | undefined;
    getDetail(): string | undefined;
    getDescription(): string | undefined;
    isHidden(): boolean;
    getResource(): monaco.Uri | undefined;
    getIcon(): string | undefined;
    getKeybinding(): monaco.keybindings.ResolvedKeybinding | undefined;
    run(mode: monaco.quickOpen.Mode): boolean;
}
export declare class QuickOpenEntryGroup extends monaco.quickOpen.QuickOpenEntryGroup {
    readonly item: QuickOpenGroupItem;
    constructor(item: QuickOpenGroupItem);
    getGroupLabel(): string;
    showBorder(): boolean;
}
