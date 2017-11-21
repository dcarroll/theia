import { VirtualWidget } from '../widgets';
import { CommandService } from '../../common';
import { h } from '@phosphor/virtualdom';
import { LabelParser } from '../label-parser';
export interface StatusBarLayoutData {
    entries: StatusBarEntryData[];
}
export interface StatusBarEntryData {
    id: string;
    entry: StatusBarEntry;
}
export interface StatusBarEntry {
    /**
     * For icons we use fontawesome. Get more information and the class names
     * here: http://fontawesome.io/icons/
     * To set a text with icon use the following pattern in text string:
     * $(fontawesomeClasssName)
     * To use animated icons use the following pattern:
     * $(fontawesomeClassName~typeOfAnimation)
     * Type of animation can be either spin or pulse.
     * Look here for more information to animated icons:
     * http://fontawesome.io/examples/#animated
     */
    text: string;
    alignment: StatusBarAlignment;
    tooltip?: string;
    command?: string;
    arguments?: any[];
    priority?: number;
}
export declare enum StatusBarAlignment {
    LEFT = 0,
    RIGHT = 1,
}
export interface StatusBarEntryAttributes {
    className?: string;
    title?: string;
    onclick?: () => void;
    onmouseover?: () => void;
    onmouseout?: () => void;
}
export declare const STATUSBAR_WIDGET_FACTORY_ID = "statusBar";
export declare const StatusBar: symbol;
export interface StatusBar {
    setElement(id: string, entry: StatusBarEntry): void;
    removeElement(id: string): void;
}
export declare class StatusBarImpl extends VirtualWidget implements StatusBar {
    protected readonly commands: CommandService;
    protected readonly entryService: LabelParser;
    protected entries: Map<string, StatusBarEntry>;
    constructor(commands: CommandService, entryService: LabelParser);
    setElement(id: string, entry: StatusBarEntry): void;
    removeElement(id: string): void;
    getLayoutData(): StatusBarLayoutData;
    setLayoutData(data: StatusBarLayoutData | undefined): void;
    protected render(): h.Child;
    protected createAttributes(entry: StatusBarEntry): StatusBarEntryAttributes;
    protected renderElement(entry: StatusBarEntry): h.Child;
}
