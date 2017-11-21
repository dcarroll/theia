import { RequestType, NotificationType } from 'vscode-jsonrpc';
import { TextDocumentIdentifier, Command, MessageType } from "@theia/languages/lib/common";
export interface ActionableMessage {
    severity: MessageType;
    message: string;
    data?: any;
    commands?: Command[];
}
export declare namespace ClassFileContentsRequest {
    const type: RequestType<TextDocumentIdentifier, string | undefined, void, void>;
}
export declare namespace ActionableNotification {
    const type: NotificationType<ActionableMessage, void>;
}
