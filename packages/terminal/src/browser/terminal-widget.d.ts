import { ILogger } from '@theia/core/lib/common';
import { Widget, BaseWidget, Message, WebSocketConnectionProvider, Endpoint } from '@theia/core/lib/browser';
import { WorkspaceService } from "@theia/workspace/lib/browser";
import { ITerminalServer } from '../common/terminal-protocol';
import { TerminalWatcher } from '../common/terminal-watcher';
import 'xterm/lib/addons/fit/fit';
import 'xterm/lib/addons/attach/attach';
export declare const TERMINAL_WIDGET_FACTORY_ID = "terminal";
export declare const TerminalWidgetOptions: symbol;
export interface TerminalWidgetOptions {
    endpoint: Endpoint.Options;
    id: string;
    caption: string;
    label: string;
    destroyTermOnClose: boolean;
    attachId?: number;
}
export interface TerminalWidgetFactoryOptions extends Partial<TerminalWidgetOptions> {
    created: string;
}
export declare class TerminalWidget extends BaseWidget {
    protected readonly workspaceService: WorkspaceService;
    protected readonly webSocketConnectionProvider: WebSocketConnectionProvider;
    protected readonly shellTerminalServer: ITerminalServer;
    protected readonly terminalWatcher: TerminalWatcher;
    protected readonly logger: ILogger;
    private terminalId;
    private term;
    private cols;
    private rows;
    private endpoint;
    constructor(workspaceService: WorkspaceService, webSocketConnectionProvider: WebSocketConnectionProvider, options: TerminalWidgetOptions, shellTerminalServer: ITerminalServer, terminalWatcher: TerminalWatcher, logger: ILogger);
    private getCSSPropertiesFromPage();
    protected registerResize(): void;
    /**
     * Create a new shell terminal in the back-end and attach it to a
     * new terminal widget.
     * If id is provided attach to the terminal for this id.
     */
    start(id?: number): Promise<void>;
    protected createWebSocket(pid: string): WebSocket;
    protected onActivateRequest(msg: Message): void;
    private resizeTimer;
    protected onResize(msg: Widget.ResizeMessage): void;
    protected monitorTerminal(id: number): void;
    protected connectSocket(id: number): void;
    private doResize();
}
