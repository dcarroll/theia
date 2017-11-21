import 'humane-js/themes/jackedup.css';
import { MessageClient, MessageType } from '../common/message-service-protocol';
import { FrontendApplication, FrontendApplicationContribution } from './frontend-application';
export declare const MESSAGE_CLASS = "theia-Message";
export declare const MESSAGE_ITEM_CLASS = "theia-MessageItem";
export declare class HumaneMessageClient implements MessageClient, FrontendApplicationContribution {
    onStart(app: FrontendApplication): void;
    showMessage(type: MessageType, message: string, ...actions: string[]): Promise<string | undefined>;
    protected show(type: MessageType, message: string, ...actions: string[]): Promise<string | undefined>;
    protected hide(): Promise<void>;
    protected notificationClass(type: MessageType): string;
}
