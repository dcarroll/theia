import URI from "../common/uri";
import { ContributionProvider } from './contribution-provider';
import { Event } from "./event";
import { Disposable } from "./disposable";
import { MaybePromise } from "./types";
export interface Resource extends Disposable {
    readonly uri: URI;
    readContents(options?: {
        encoding?: string;
    }): Promise<string>;
    saveContents?(content: string, options?: {
        encoding?: string;
    }): Promise<void>;
    readonly onDidChangeContents?: Event<void>;
}
export declare const ResourceResolver: symbol;
export interface ResourceResolver {
    /**
     * Reject if a resource cannot be provided.
     */
    resolve(uri: URI): MaybePromise<Resource>;
}
export declare const ResourceProvider: symbol;
export declare type ResourceProvider = (uri: URI) => Promise<Resource>;
export declare class DefaultResourceProvider {
    protected readonly resolversProvider: ContributionProvider<ResourceResolver>;
    constructor(resolversProvider: ContributionProvider<ResourceResolver>);
    /**
     * Reject if a resource cannot be provided.
     */
    get(uri: URI): Promise<Resource>;
}
