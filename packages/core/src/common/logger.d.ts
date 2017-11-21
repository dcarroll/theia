import { LoggerWatcher } from './logger-watcher';
import { ILoggerServer } from './logger-protocol';
export declare enum LogLevel {
    FATAL = 60,
    ERROR = 50,
    WARN = 40,
    INFO = 30,
    DEBUG = 20,
    TRACE = 10,
}
export declare let logger: ILogger;
export declare function setRootLogger(alogger: ILogger): void;
export declare type Log = (message: string, ...params: any[]) => void;
export declare type Loggable = (log: Log) => void;
export declare const LoggerFactory: symbol;
export declare type LoggerFactory = (options?: object) => ILogger;
export declare const LoggerOptions: symbol;
export declare const ILogger: symbol;
export interface ILogger {
    /**
     * Set the log level.
     *
     * @param loglevel - The loglevel to set. see Logger.LogLevel for
     * possible options.
     */
    setLogLevel(logLevel: number): Promise<void>;
    /**
     * Get the log level.
     *
     * @returns a Promise to the log level.
     */
    getLogLevel(): Promise<number>;
    /**
     * Test whether the given log level is enabled.
     */
    isEnabled(logLevel: number): Promise<boolean>;
    /**
     * Resolve if the given log is enabled.
     */
    ifEnabled(logLevel: number): Promise<void>;
    /**
     * Log a loggable with the given level if it is enabled.
     */
    log(logLevel: number, loggable: Loggable): void;
    /**
     * Log a message with the given level if it is enabled.
     *
     * @param logLevel - The loglevel to use.
     * @param message - The message format string.
     * @param params - The format string variables.
     */
    log(logLevel: number, message: string, ...params: any[]): void;
    /**
     * Test whether the trace level is enabled.
     */
    isTrace(): Promise<boolean>;
    /**
     * Resolve if the trace level is enabled.
     */
    ifTrace(): Promise<void>;
    /**
     * Log a loggable with the trace level if it is enabled.
     */
    trace(loggable: Loggable): void;
    /**
     * Log a message with the trace level if it is enabled.
     *
     * @param message - The message format string.
     * @param params - The format string variables.
     */
    trace(message: string, ...params: any[]): void;
    /**
     * Test whether the debug level is enabled.
     */
    isDebug(): Promise<boolean>;
    /**
     * Resolve if the debug level is enabled.
     */
    ifDebug(): Promise<void>;
    /**
     * Log a loggable with the debug level if it is enabled.
     */
    debug(loggable: Loggable): void;
    /**
     * Log a message with the debug level if it is enabled.
     *
     * @param message - The message format string.
     * @param params - The format string variables.
     */
    debug(message: string, ...params: any[]): void;
    /**
     * Test whether the info level is enabled.
     */
    isInfo(): Promise<boolean>;
    /**
     * Resolve if the info level is enabled.
     */
    ifInfo(): Promise<void>;
    /**
     * Log a loggable with the info level if it is enabled.
     */
    info(loggable: Loggable): void;
    /**
     * Log a message with the info level if it is enabled.
     *
     * @param message - The message format string.
     * @param params - The format string variables.
     */
    info(message: string, ...params: any[]): void;
    /**
     * Test whether the warn level is enabled.
     */
    isWarn(): Promise<boolean>;
    /**
     * Resolve if the warn level is enabled.
     */
    ifWarn(): Promise<void>;
    /**
     * Log a loggable with the warn level if it is enabled.
     */
    warn(loggable: Loggable): void;
    /**
     * Log a message with the warn level if it is enabled.
     *
     * @param message - The message format string.
     * @param params - The format string variables.
     */
    warn(message: string, ...params: any[]): void;
    /**
     * Test whether the error level is enabled.
     */
    isError(): Promise<boolean>;
    /**
     * Resolve if the error level is enabled.
     */
    ifError(): Promise<void>;
    /**
     * Log a loggable with the error level if it is enabled.
     */
    error(loggable: Loggable): void;
    /**
     * Log a message with the error level.
     *
     * @param message - The message format string.
     * @param params - The format string variables.
     */
    error(message: string, ...params: any[]): void;
    /**
     * Test whether the fatal level is enabled.
     */
    isFatal(): Promise<boolean>;
    /**
     * Resolve if the fatal level is enabled.
     */
    ifFatal(): Promise<void>;
    /**
     * Log a loggable with the fatal level if it is enabled.
     */
    fatal(loggable: Loggable): void;
    /**
     * Log a message with the fatal level if it is enabled.
     *
     * @param message - The message format string.
     * @param params - The format string variables.
     */
    fatal(message: string, ...params: any[]): void;
    /**
     * Create a child logger from this logger.
     *
     * @param obj - The options object to create the logger with.
     */
    child(obj: Object): ILogger;
}
export declare class Logger implements ILogger {
    protected readonly server: ILoggerServer;
    protected readonly loggerWatcher: LoggerWatcher;
    protected readonly factory: LoggerFactory;
    protected _logLevel: Promise<number>;
    protected readonly rootLoggerId: number;
    protected id: Promise<number>;
    /**
     * Build a new Logger.
     *
     * @param options - The options to build the logger with, see the
     * bunyan child method documentation for more information.
     */
    constructor(server: ILoggerServer, loggerWatcher: LoggerWatcher, factory: LoggerFactory, options: object | undefined);
    setLogLevel(logLevel: number): Promise<void>;
    getLogLevel(): Promise<number>;
    isEnabled(logLevel: number): Promise<boolean>;
    ifEnabled(logLevel: number): Promise<void>;
    log(logLevel: number, arg2: string | Loggable, ...params: any[]): void;
    protected getLog(logLevel: number): Promise<Log>;
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
    child(obj: object): ILogger;
}
