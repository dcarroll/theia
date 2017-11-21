import { Message } from '@phosphor/messaging';
import { AbstractDialog, DialogProps } from "@theia/core/lib/browser";
import { FileStatNode } from '../file-tree';
import { LocationListRenderer } from '../location';
import { FileDialogModel } from './file-dialog-model';
import { FileDialogWidget } from './file-dialog-widget';
export declare const FileDialogFactory: symbol;
export interface FileDialogFactory {
    (props: FileDialogProps): FileDialog;
}
export declare const NAVIGATION_PANEL_CLASS = "theia-NavigationPanel";
export declare const CONTROL_PANEL_CLASS = "theia-ControlPanel";
export declare class FileDialogProps extends DialogProps {
}
export declare class FileDialog extends AbstractDialog<Readonly<FileStatNode> | undefined> {
    readonly widget: FileDialogWidget;
    protected readonly back: HTMLSpanElement;
    protected readonly forward: HTMLSpanElement;
    protected readonly locationListRenderer: LocationListRenderer;
    constructor(props: FileDialogProps, widget: FileDialogWidget);
    readonly model: FileDialogModel;
    protected createLocationListRenderer(): LocationListRenderer;
    protected onUpdateRequest(msg: Message): void;
    protected onAfterAttach(msg: Message): void;
    protected onActivateRequest(msg: Message): void;
    readonly value: Readonly<FileStatNode> | undefined;
}
