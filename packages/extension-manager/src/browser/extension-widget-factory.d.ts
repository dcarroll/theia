import { WidgetFactory, FrontendApplication } from "@theia/core/lib/browser";
import { ExtensionManager } from '../common';
import { ExtensionDetailWidget } from './extension-detail-widget';
export declare class ExtensionWidgetOptions {
    readonly name: string;
}
export declare class ExtensionWidgetFactory implements WidgetFactory {
    protected readonly app: FrontendApplication;
    protected readonly extensionManager: ExtensionManager;
    readonly id: string;
    constructor(app: FrontendApplication, extensionManager: ExtensionManager);
    createWidget(options: ExtensionWidgetOptions): Promise<ExtensionDetailWidget>;
}
