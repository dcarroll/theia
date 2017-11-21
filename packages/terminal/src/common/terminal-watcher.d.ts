import { Event } from '@theia/core/lib/common/event';
import { IBaseTerminalClient, IBaseTerminalExitEvent, IBaseTerminalErrorEvent } from './base-terminal-protocol';
export declare class TerminalWatcher {
    getTerminalClient(): IBaseTerminalClient;
    private onTerminalExitEmitter;
    private onTerminalErrorEmitter;
    readonly onTerminalExit: Event<IBaseTerminalExitEvent>;
    readonly onTerminalError: Event<IBaseTerminalErrorEvent>;
}
