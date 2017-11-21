import { Event } from '../common/event';
export declare type SelectionListener = (newSelection: any) => void;
export interface SelectionProvider<T> {
    onSelectionChanged: Event<T | undefined>;
}
export declare class SelectionService implements SelectionProvider<any> {
    constructor();
    private currentSelection;
    private selectionListeners;
    selection: any;
    readonly onSelectionChanged: Event<any>;
}
