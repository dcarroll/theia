import { Widget } from '@phosphor/widgets';
import { ContributionProvider } from '../common/contribution-provider';
import { ILogger } from '../common';
export declare const WidgetFactory: symbol;
/**
 * `OpenHandler` should be implemented to provide a new opener.
 */
export interface WidgetFactory {
    readonly id: string;
    /**
     * Creates a widget and attaches it to the shell
     * The options need to be serializable JSON data.
     */
    createWidget(options?: any): Promise<Widget>;
}
export interface WidgetConstructionOptions {
    /**
     * the id of the widget factory to use.
     */
    factoryId: string;
    options?: any;
}
/**
 * Creates and manages widgets.
 */
export declare class WidgetManager {
    protected readonly factoryProvider: ContributionProvider<WidgetFactory>;
    protected logger: ILogger;
    private _cachedfactories;
    private widgets;
    private widgetPromises;
    constructor(factoryProvider: ContributionProvider<WidgetFactory>, logger: ILogger);
    getWidgets(factoryId: string): Widget[];
    getOrCreateWidget<T extends Widget>(factoryId: string, options?: any): Promise<T>;
    getDescription(widget: Widget): WidgetConstructionOptions | undefined;
    protected toKey(options: WidgetConstructionOptions): string;
    protected fromKey(key: string): WidgetConstructionOptions;
    private readonly factories;
}
