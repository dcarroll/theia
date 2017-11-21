import URI from "@theia/core/lib/common/uri";
import { Resource, ResourceResolver } from '@theia/core/lib/common';
import { JavaClientContribution } from "./java-client-contribution";
export declare class JavaResource implements Resource {
    uri: URI;
    protected readonly clientContribution: JavaClientContribution;
    constructor(uri: URI, clientContribution: JavaClientContribution);
    dispose(): void;
    readContents(options: {
        encoding?: string;
    }): Promise<string>;
}
export declare class JavaResourceResolver implements ResourceResolver {
    protected readonly clientContribution: JavaClientContribution;
    constructor(clientContribution: JavaClientContribution);
    resolve(uri: URI): JavaResource;
}
