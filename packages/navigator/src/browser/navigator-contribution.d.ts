import { SelectionService } from "@theia/core/lib/common";
import { FrontendApplicationContribution, FrontendApplication } from "@theia/core/lib/browser";
import { WorkspaceService } from "@theia/workspace/lib/browser";
import { FileNavigatorWidget } from './navigator-widget';
import { StorageService } from '@theia/core/lib/browser/storage-service';
import { WidgetFactory, WidgetManager } from '@theia/core/lib/browser/widget-manager';
import { Widget } from '@phosphor/widgets';
export declare class FileNavigatorContribution implements FrontendApplicationContribution, WidgetFactory {
    protected readonly workspaceService: WorkspaceService;
    protected readonly selectionService: SelectionService;
    protected readonly fileNavigator: FileNavigatorWidget;
    protected readonly widgetManager: WidgetManager;
    protected storageService: StorageService;
    id: string;
    constructor(workspaceService: WorkspaceService, selectionService: SelectionService, fileNavigator: FileNavigatorWidget, widgetManager: WidgetManager, storageService: StorageService);
    initializeLayout(app: FrontendApplication): Promise<void>;
    createWidget(): Promise<Widget>;
}
