import { Widget } from '@phosphor/widgets';
import { Message } from '@phosphor/messaging';
import { Event, MaybePromise } from '../common';
import { AbstractDialog } from './dialogs';
export interface Saveable {
    readonly dirty: boolean;
    readonly onDirtyChanged: Event<void>;
    save(): MaybePromise<void>;
}
export interface SaveableSource {
    readonly saveable: Saveable;
}
export declare namespace Saveable {
    function isSource(arg: any): arg is SaveableSource;
    function is(arg: any): arg is Saveable;
    function get(arg: any): Saveable | undefined;
    function getDirty(arg: any): Saveable | undefined;
    function isDirty(arg: any): boolean;
    function save(arg: any): Promise<void>;
    function apply(widget: Widget): void;
}
export declare function setDirty(widget: Widget, dirty: boolean): void;
export declare class ShouldSaveDialog extends AbstractDialog<boolean> {
    protected shouldSave: boolean;
    protected readonly dontSaveButton: HTMLButtonElement;
    constructor(widget: Widget);
    protected onAfterAttach(msg: Message): void;
    readonly value: boolean;
}
