import URI from "../../common/uri";
import { Keybinding } from '../../common/keybinding';
export interface Highlight {
    start: number;
    end: number;
}
export declare enum QuickOpenMode {
    PREVIEW = 0,
    OPEN = 1,
    OPEN_IN_BACKGROUND = 2,
}
export declare class QuickOpenItem {
    getTooltip(): string | undefined;
    getLabel(): string | undefined;
    getLabelHighlights(): Highlight[];
    getDescription(): string | undefined;
    getDescriptionHighlights(): Highlight[] | undefined;
    getDetail(): string | undefined;
    getDetailHighlights(): Highlight[] | undefined;
    isHidden(): boolean;
    getUri(): URI | undefined;
    getIconClass(): string | undefined;
    getKeybinding(): Keybinding | undefined;
    run(mode: QuickOpenMode): boolean;
}
export declare class QuickOpenGroupItem extends QuickOpenItem {
    getGroupLabel(): string | undefined;
    showBorder(): boolean;
}
export interface QuickOpenModel {
    onType(lookFor: string, acceptor: (items: QuickOpenItem[]) => void): void;
}
