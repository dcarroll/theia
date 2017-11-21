import { MessageService } from "@theia/core";
import { FrontendApplication, FrontendApplicationContribution } from "@theia/core/lib/browser";
import { ExtensionManager } from '../common';
import { WidgetManager } from '@theia/core/lib/browser/widget-manager';
export declare class ExtensionContribution implements FrontendApplicationContribution {
    protected readonly widgetManager: WidgetManager;
    protected readonly extensionManager: ExtensionManager;
    protected readonly messageService: MessageService;
    constructor(widgetManager: WidgetManager, extensionManager: ExtensionManager, messageService: MessageService);
    initializeLayout(app: FrontendApplication): Promise<void>;
}
