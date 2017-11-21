import { BaseWidget, Message } from './widgets';
export declare class DialogProps {
    readonly title: string;
}
export declare abstract class AbstractDialog<T> extends BaseWidget {
    protected readonly props: DialogProps;
    protected readonly titleNode: HTMLDivElement;
    protected readonly contentNode: HTMLDivElement;
    protected readonly closeCrossNode: HTMLElement;
    protected resolve: undefined | ((value: T) => void);
    protected reject: undefined | ((reason: any) => void);
    protected closeButton: HTMLButtonElement | undefined;
    protected acceptButton: HTMLButtonElement | undefined;
    constructor(props: DialogProps);
    protected appendCloseButton(text?: string): void;
    protected appendAcceptButton(text?: string): void;
    protected createCloseButton(text?: string): HTMLButtonElement;
    protected createAcceptButton(text?: string): HTMLButtonElement;
    protected createButton(text: string): HTMLButtonElement;
    protected onAfterAttach(msg: Message): void;
    protected onActivateRequest(msg: Message): void;
    open(): Promise<T>;
    protected onUpdateRequest(msg: Message): void;
    protected accept(): void;
    readonly abstract value: T;
    isValid(value: T): string;
    protected setErrorMessage(error: string): void;
    protected addCloseAction<K extends keyof HTMLElementEventMap>(element: HTMLElement, ...additionalEventTypes: K[]): void;
    protected addAcceptAction<K extends keyof HTMLElementEventMap>(element: HTMLElement, ...additionalEventTypes: K[]): void;
}
export declare class ConfirmDialogProps extends DialogProps {
    readonly msg: string;
    readonly cancel?: string;
    readonly ok?: string;
}
export declare class ConfirmDialog extends AbstractDialog<boolean> {
    protected readonly props: ConfirmDialogProps;
    constructor(props: ConfirmDialogProps);
    protected onCloseRequest(msg: Message): void;
    protected confirmed: boolean;
    readonly value: boolean;
}
export declare class SingleTextInputDialogProps extends DialogProps {
    readonly confirmButtonLabel?: string;
    readonly initialValue?: string;
    readonly validate?: (input: string) => string;
}
export declare class SingleTextInputDialog extends AbstractDialog<string> {
    protected readonly props: SingleTextInputDialogProps;
    protected readonly errorMessageNode: HTMLDivElement;
    protected readonly inputField: HTMLInputElement;
    constructor(props: SingleTextInputDialogProps);
    readonly value: string;
    isValid(value: string): string;
    protected onAfterAttach(msg: Message): void;
    protected onActivateRequest(msg: Message): void;
    protected setErrorMessage(error: string): void;
}
