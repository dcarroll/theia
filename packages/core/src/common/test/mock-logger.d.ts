import { ILogger, Loggable } from '../logger';
export declare class MockLogger implements ILogger {
    setLogLevel(logLevel: number): Promise<void>;
    getLogLevel(): Promise<number>;
    isEnabled(logLevel: number): Promise<boolean>;
    ifEnabled(logLevel: number): Promise<void>;
    log(logLevel: number, arg2: string | Loggable, ...params: any[]): void;
    isTrace(): Promise<boolean>;
    ifTrace(): Promise<void>;
    trace(arg: string | Loggable, ...params: any[]): void;
    isDebug(): Promise<boolean>;
    ifDebug(): Promise<void>;
    debug(arg: string | Loggable, ...params: any[]): void;
    isInfo(): Promise<boolean>;
    ifInfo(): Promise<void>;
    info(arg: string | Loggable, ...params: any[]): void;
    isWarn(): Promise<boolean>;
    ifWarn(): Promise<void>;
    warn(arg: string | Loggable, ...params: any[]): void;
    isError(): Promise<boolean>;
    ifError(): Promise<void>;
    error(arg: string | Loggable, ...params: any[]): void;
    isFatal(): Promise<boolean>;
    ifFatal(): Promise<void>;
    fatal(arg: string | Loggable, ...params: any[]): void;
    child(obj: Object): ILogger;
}
