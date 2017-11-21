export declare const messageServicePath = "/services/messageService";
export declare enum MessageType {
    Error = 1,
    Warning = 2,
    Info = 3,
    Log = 4,
}
export declare const MessageClient: symbol;
export interface MessageClient {
    /**
     * Show a message of the given type and possible actions to the user.
     * Resolve to a chosen action.
     * Never reject.
     */
    showMessage(type: MessageType, message: string, ...actions: string[]): Promise<string | undefined>;
}
export declare class DispatchingMessageClient implements MessageClient {
    readonly clients: Set<MessageClient>;
    showMessage(type: MessageType, message: string, ...actions: string[]): Promise<string | undefined>;
}
