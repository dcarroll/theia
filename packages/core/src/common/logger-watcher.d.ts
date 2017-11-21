import { Event } from './event';
import { ILoggerClient, ILogLevelChangedEvent } from './logger-protocol';
export declare class LoggerWatcher {
    getLoggerClient(): ILoggerClient;
    private onLogLevelChangedEmitter;
    readonly onLogLevelChanged: Event<ILogLevelChangedEvent>;
}
