import { RequestType } from 'vscode-jsonrpc';
import { TextDocumentIdentifier, Command, MessageType } from "@theia/languages/lib/common";
export interface ActionableMessage {
    severity: MessageType;
    message: string;
    data?: any;
    commands?: Command[];
}
export declare namespace TextDocumentItemRequest {
    const type: RequestType<TextDocumentIdentifier, string | undefined, void, void>;
}
