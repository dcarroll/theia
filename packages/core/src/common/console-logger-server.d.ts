import { ILoggerServer, ILoggerClient } from './logger-protocol';
export declare class ConsoleLoggerServer implements ILoggerServer {
    setLogLevel(id: number, logLevel: number): Promise<void>;
    getLogLevel(id: number): Promise<number>;
    log(id: number, logLevel: number, message: string, params: any[]): Promise<void>;
    child(obj: object): Promise<number>;
    dispose(): void;
    setClient(client: ILoggerClient | undefined): void;
}
