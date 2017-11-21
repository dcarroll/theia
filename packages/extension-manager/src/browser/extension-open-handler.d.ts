import URI from "@theia/core/lib/common/uri";
import { OpenHandler, WidgetManager, FrontendApplication } from "@theia/core/lib/browser";
import { ExtensionDetailWidget } from './extension-detail-widget';
export declare class ExtensionOpenHandler implements OpenHandler {
    protected readonly app: FrontendApplication;
    protected readonly widgetManager: WidgetManager;
    readonly id: string;
    constructor(app: FrontendApplication, widgetManager: WidgetManager);
    canHandle(uri: URI): number;
    open(uri: URI): Promise<ExtensionDetailWidget>;
}
