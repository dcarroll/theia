import { FrontendApplicationContribution, FrontendApplication } from "@theia/core/lib/browser";
import { WidgetManager } from '@theia/core/lib/browser/widget-manager';
export declare class OutlineViewContribution implements FrontendApplicationContribution {
    protected readonly widgetManager: WidgetManager;
    constructor(widgetManager: WidgetManager);
    initializeLayout(app: FrontendApplication): Promise<void>;
}
