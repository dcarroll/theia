import URI from "../common/uri";
import { ContributionProvider, MaybePromise } from "../common";
export interface OpenerOptions {
}
export declare const OpenHandler: symbol;
/**
 * `OpenHandler` should be implemented to provide a new opener.
 */
export interface OpenHandler {
    /**
     * A unique id of this handler.
     */
    readonly id: string;
    /**
     * A human-readable name of this handler.
     */
    readonly label?: string;
    /**
     * A css icon class of this handler.
     */
    readonly iconClass?: string;
    /**
     * Test whether this handler can open the given URI for given options.
     * Return a positive number if this handler can open; otherwise it cannot.
     * Never reject.
     *
     * A returned value indicating a priorify of this handler.
     */
    canHandle(uri: URI, options?: OpenerOptions): MaybePromise<number>;
    /**
     * Open a widget for the given URI and options.
     * Resolve to an opened widget or undefined, e.g. if a page is opened.
     * Never reject if `canHandle` return a positive number; otherwise should reject.
     */
    open(uri: URI, options?: OpenerOptions): MaybePromise<object | undefined>;
}
export declare const OpenerService: symbol;
/**
 * `OpenerService` provide an access to existing openers.
 */
export interface OpenerService {
    /**
     * Return all registered openers.
     * Never reject.
     */
    getOpeners(): Promise<OpenHandler[]>;
    /**
     * Return all openers able to open the given URI for given options
     * ordered according their priority.
     * Never reject.
     */
    getOpeners(uri: URI, options?: OpenerOptions): Promise<OpenHandler[]>;
    /**
     * Return an opener with the higher priority for the given URI.
     * Reject if such does not exist.
     */
    getOpener(uri: URI, options?: OpenerOptions): Promise<OpenHandler>;
}
export declare function open(openerService: OpenerService, uri: URI, options?: OpenerOptions): Promise<object | undefined>;
export declare class DefaultOpenerService implements OpenerService {
    protected readonly handlersProvider: ContributionProvider<OpenHandler>;
    constructor(handlersProvider: ContributionProvider<OpenHandler>);
    getOpener(uri: URI, options?: OpenerOptions): Promise<OpenHandler>;
    getOpeners(uri?: URI, options?: OpenerOptions): Promise<OpenHandler[]>;
    protected prioritize(uri: URI, options?: OpenerOptions): Promise<OpenHandler[]>;
    protected getHandlers(): OpenHandler[];
}
