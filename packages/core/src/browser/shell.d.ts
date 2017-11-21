import { ISignal } from "@phosphor/signaling";
import { DockPanel, DockLayout, FocusTracker, TabBar, Title, Widget } from "@phosphor/widgets";
import { VirtualElement } from '@phosphor/virtualdom';
import { MenuPath } from "../common";
import { ContextMenuRenderer } from "./context-menu-renderer";
import { StatusBarImpl, StatusBarLayoutData } from "./status-bar/status-bar";
export declare const ApplicationShellOptions: symbol;
export interface LayoutData {
    mainArea?: DockLayoutData;
    leftBar?: SideBarData;
    rightBar?: SideBarData;
    statusBar?: StatusBarLayoutData;
}
export interface SideBarData {
    activeWidgets?: Widget[];
    widgets?: Widget[];
}
export interface DockLayoutData extends DockPanel.ILayoutConfig {
    activeWidgets?: Widget[];
}
export declare const MAINAREA_TABBAR_CONTEXT_MENU: MenuPath;
export declare const DockPanelTabBarRendererFactory: symbol;
export declare class DockPanelTabBarRenderer implements TabBar.IRenderer<any> {
    protected readonly contextMenuRenderer: ContextMenuRenderer;
    readonly closeIconSelector: string;
    protected _tabBar: TabBar<Widget> | undefined;
    constructor(contextMenuRenderer: ContextMenuRenderer);
    renderTab(data: TabBar.IRenderData<any>): VirtualElement;
    tabBar: TabBar<Widget>;
    handleContextMenuEvent(event: MouseEvent, title: Title<Widget>): void;
}
export declare class DockPanelRenderer implements DockLayout.IRenderer {
    protected readonly tabBarRendererFactory: () => DockPanelTabBarRenderer;
    constructor(tabBarRendererFactory: () => DockPanelTabBarRenderer);
    createTabBar(): TabBar<Widget>;
    createHandle(): HTMLDivElement;
}
/**
 * The application shell.
 */
export declare class ApplicationShell extends Widget {
    protected readonly _statusBar: StatusBarImpl;
    /**
     * Construct a new application shell.
     */
    constructor(dockPanelRenderer: DockPanelRenderer, _statusBar: StatusBarImpl, options?: Widget.IOptions | undefined);
    getLayoutData(): LayoutData;
    setLayoutData(layoutData?: LayoutData): void;
    protected registerWithFocusTracker(data: any): void;
    /**
     * A signal emitted when main area's current focus changes.
     */
    readonly currentChanged: ISignal<this, ApplicationShell.IChangedArgs>;
    /**
     * A signal emitted when main area's active focus changes.
     */
    readonly activeChanged: ISignal<this, ApplicationShell.IChangedArgs>;
    /**
     * The current widget in the shell's main area.
     */
    readonly currentWidget: Widget | null;
    /**
     * The active widget in the shell's main area.
     */
    readonly activeWidget: Widget | null;
    /**
     * True if left area is empty.
     */
    readonly leftAreaIsEmpty: boolean;
    /**
     * True if main area is empty.
     */
    readonly mainAreaIsEmpty: boolean;
    /**
     * True if right area is empty.
     */
    readonly rightAreaIsEmpty: boolean;
    /**
     * True if top area is empty.
     */
    readonly topAreaIsEmpty: boolean;
    /**
     * Activate a widget in the left area.
     */
    activateLeft(id: string): void;
    /**
     * Activate a widget in the main area.
     */
    activateMain(id: string): void;
    activateNextTab(): void;
    activatePreviousTab(): void;
    /**
     * Activate a widget in the right area.
     */
    activateRight(id: string): void;
    /**
     * Add a widget to the left content area.
     *
     * #### Notes
     * Widgets must have a unique `id` property, which will be used as the DOM id.
     */
    addToLeftArea(widget: Widget, options?: ApplicationShell.ISideAreaOptions): void;
    /**
     * Add a widget to the main content area.
     *
     * #### Notes
     * Widgets must have a unique `id` property, which will be used as the DOM id.
     * All widgets added to the main area should be disposed after removal (or
     * simply disposed in order to remove).
     */
    addToMainArea(widget: Widget): void;
    /**
     * Add a widget to the right content area.
     *
     * #### Notes
     * Widgets must have a unique `id` property, which will be used as the DOM id.
     */
    addToRightArea(widget: Widget, options?: ApplicationShell.ISideAreaOptions): void;
    /**
     * Add a widget to the top content area.
     *
     * #### Notes
     * Widgets must have a unique `id` property, which will be used as the DOM id.
     */
    addToTopArea(widget: Widget, options?: ApplicationShell.ISideAreaOptions): void;
    /**
     * Collapse the left area.
     */
    collapseLeft(): void;
    /**
     * Collapse the right area.
     */
    collapseRight(): void;
    /**
     * Close the current tab.
     */
    closeTab(): void;
    /**
     * Close the tabs right of the current one.
     */
    closeRightTabs(): void;
    /**
     * Close all tabs expect the current one.
     */
    closeOtherTabs(): void;
    /**
     * Close all tabs.
     */
    closeAllTabs(): void;
    /**
     * Test whether the current widget is dirty.
     */
    canSave(): boolean;
    /**
     * Save the current widget if it is dirty.
     */
    save(): Promise<void>;
    /**
     * Test whether there is a dirty widget.
     */
    canSaveAll(): boolean;
    /**
     * Save all dirty widgets.
     */
    saveAll(): Promise<void>;
    /**
     * Close all widgets in the main area.
     */
    closeAll(): void;
    /**
     * Checks to see if a tab is currently selected
     */
    hasSelectedTab(): boolean;
    private _currentTabBar();
    private _previousTabBar();
    private _nextTabBar();
    /**
     * Handle a change to the dock area current widget.
     */
    private _onCurrentChanged(sender, args);
    /**
     * Handle a change to the dock area active widget.
     */
    private _onActiveChanged(sender, args);
    protected track(widget: Widget): void;
    private _dockPanel;
    private _hboxPanel;
    private _hsplitPanel;
    private _leftHandler;
    private _rightHandler;
    private _topPanel;
    private _tracker;
    private _currentChanged;
    private _activeChanged;
}
/**
 * The namespace for `ApplicationShell` class statics.
 */
export declare namespace ApplicationShell {
    /**
     * The areas of the application shell where widgets can reside.
     */
    type Area = 'main' | 'top' | 'left' | 'right';
    /**
     * The options for adding a widget to a side area of the shell.
     */
    interface ISideAreaOptions {
        /**
         * The rank order of the widget among its siblings.
         */
        rank?: number;
    }
    /**
     * An arguments object for the changed signals.
     */
    type IChangedArgs = FocusTracker.IChangedArgs<Widget>;
}
