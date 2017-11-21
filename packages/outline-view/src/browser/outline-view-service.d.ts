import { Event, Emitter } from '@theia/core';
import { WidgetFactory } from '@theia/core/lib/browser';
import { OutlineViewWidget, OutlineViewWidgetFactory, OutlineSymbolInformationNode } from './outline-view-widget';
import { Widget } from '@phosphor/widgets';
export declare class OutlineViewService implements WidgetFactory {
    protected factory: OutlineViewWidgetFactory;
    id: string;
    protected widget?: OutlineViewWidget;
    protected readonly onDidChangeOutlineEmitter: Emitter<OutlineSymbolInformationNode[]>;
    protected readonly onDidChangeOpenStateEmitter: Emitter<boolean>;
    protected readonly onDidSelectEmitter: Emitter<OutlineSymbolInformationNode>;
    protected readonly onDidOpenEmitter: Emitter<OutlineSymbolInformationNode>;
    constructor(factory: OutlineViewWidgetFactory);
    readonly onDidSelect: Event<OutlineSymbolInformationNode>;
    readonly onDidOpen: Event<OutlineSymbolInformationNode>;
    readonly onDidChangeOutline: Event<OutlineSymbolInformationNode[]>;
    readonly onDidChangeOpenState: Event<boolean>;
    readonly open: boolean;
    publish(roots: OutlineSymbolInformationNode[]): void;
    createWidget(): Promise<Widget>;
}
