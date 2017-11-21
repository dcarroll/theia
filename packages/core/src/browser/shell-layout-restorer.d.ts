import { FrontendApplication, FrontendApplicationContribution } from './frontend-application';
import { WidgetManager } from './widget-manager';
import { StorageService } from './storage-service';
import { LayoutData } from './shell';
import { ILogger } from '../common/logger';
import { CommandContribution, CommandRegistry } from '../common/command';
/**
 * A contract for widgets that want to store and restore their inner state, between sessions.
 */
export interface StatefulWidget {
    /**
     * Called on unload to store the inner state.
     */
    storeState(): object;
    /**
     * Called when the widget got created by the storage service
     */
    restoreState(oldState: object): void;
}
export declare namespace StatefulWidget {
    function is(arg: any): arg is StatefulWidget;
}
export declare class ShellLayoutRestorer implements CommandContribution {
    protected widgetManager: WidgetManager;
    protected logger: ILogger;
    protected storageService: StorageService;
    private storageKey;
    private shouldStoreLayout;
    constructor(widgetManager: WidgetManager, logger: ILogger, storageService: StorageService);
    registerCommands(commands: CommandRegistry): void;
    initializeLayout(app: FrontendApplication, contributions: FrontendApplicationContribution[]): Promise<void>;
    storeLayout(app: FrontendApplication): void;
    protected isWidgetsProperty(property: string): boolean;
    /**
     * Turns the layout data to a string representation.
     */
    protected deflate(data: LayoutData): string;
    /**
     * Creates the layout data from its string representation.
     */
    protected inflate(layoutData: string): Promise<LayoutData>;
}
