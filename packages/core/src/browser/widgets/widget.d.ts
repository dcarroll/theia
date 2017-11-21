import { Widget } from "@phosphor/widgets";
import { Message } from "@phosphor/messaging";
import { Disposable, DisposableCollection, Key } from '../../common';
export * from "@phosphor/widgets";
export * from "@phosphor/messaging";
export declare const DISABLED_CLASS = "theia-mod-disabled";
export declare const COLLAPSED_CLASS = "theia-mod-collapsed";
export declare const SELECTED_CLASS = "theia-mod-selected";
export declare class BaseWidget extends Widget {
    protected readonly toDispose: DisposableCollection;
    protected readonly toDisposeOnDetach: DisposableCollection;
    dispose(): void;
    protected onCloseRequest(msg: Message): void;
    protected onBeforeDetach(msg: Message): void;
    protected addUpdateListener<K extends keyof HTMLElementEventMap>(element: HTMLElement, type: K, useCapture?: boolean): void;
    protected addEventListener<K extends keyof HTMLElementEventMap>(element: HTMLElement, type: K, listener: EventListenerOrEventListenerObject<K>, useCapture?: boolean): void;
    protected addKeyListener<K extends keyof HTMLElementEventMap>(element: HTMLElement, keybinding: Key, action: () => void, ...additionalEventTypes: K[]): void;
    protected addClipboardListener<K extends 'cut' | 'copy' | 'paste'>(element: HTMLElement, type: K, listener: EventListenerOrEventListenerObject<K>): void;
}
export declare function setEnabled(element: HTMLElement, enabled: boolean): void;
export declare function createIconButton(...classNames: string[]): HTMLSpanElement;
export declare type EventListener<K extends keyof HTMLElementEventMap> = (this: HTMLElement, event: HTMLElementEventMap[K]) => any;
export interface EventListenerObject<K extends keyof HTMLElementEventMap> {
    handleEvent(evt: HTMLElementEventMap[K]): void;
}
export declare namespace EventListenerObject {
    function is<K extends keyof HTMLElementEventMap>(listener: any | undefined): listener is EventListenerObject<K>;
}
export declare type EventListenerOrEventListenerObject<K extends keyof HTMLElementEventMap> = EventListener<K> | EventListenerObject<K>;
export declare function addEventListener<K extends keyof HTMLElementEventMap>(element: HTMLElement, type: K, listener: EventListenerOrEventListenerObject<K>, useCapture?: boolean): Disposable;
export declare function addKeyListener<K extends keyof HTMLElementEventMap>(element: HTMLElement, keybinding: Key, action: () => void, ...additionalEventTypes: K[]): Disposable;
export declare function addClipboardListener<K extends 'cut' | 'copy' | 'paste'>(element: HTMLElement, type: K, listener: EventListenerOrEventListenerObject<K>): Disposable;
