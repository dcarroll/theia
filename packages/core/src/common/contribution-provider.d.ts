import { interfaces } from "inversify";
export declare const ContributionProvider: symbol;
export interface ContributionProvider<T extends object> {
    getContributions(): T[];
}
export declare function bindContributionProvider(bind: interfaces.Bind, id: symbol): void;
