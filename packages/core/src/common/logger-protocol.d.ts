import { JsonRpcServer } from './messaging/proxy-factory';
export declare const ILoggerServer: symbol;
export declare const loggerPath = "/services/logger";
export declare const LoggerServerOptions: symbol;
export interface ILoggerServer extends JsonRpcServer<ILoggerClient> {
    setLogLevel(id: number, logLevel: number): Promise<void>;
    getLogLevel(id: number): Promise<number>;
    log(id: number, logLevel: number, message: string, params: any[]): Promise<void>;
    child(obj: object): Promise<number>;
}
export declare const ILoggerClient: symbol;
export interface ILogLevelChangedEvent {
    oldLogLevel: number;
    newLogLevel: number;
}
export interface ILoggerClient {
    onLogLevelChanged(event: ILogLevelChangedEvent): void;
}
