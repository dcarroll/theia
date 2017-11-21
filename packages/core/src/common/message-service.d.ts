import { MessageClient } from "./message-service-protocol";
export declare class MessageService {
    protected readonly client: MessageClient;
    constructor(client: MessageClient);
    log(message: string, ...actions: string[]): Promise<string | undefined>;
    info(message: string, ...actions: string[]): Promise<string | undefined>;
    warn(message: string, ...actions: string[]): Promise<string | undefined>;
    error(message: string, ...actions: string[]): Promise<string | undefined>;
}
