import Uri from 'vscode-uri';
import { Path } from "./path";
export default class URI {
    private readonly codeUri;
    private _path;
    constructor(uri?: string | Uri);
    readonly displayName: string;
    /**
     * Return all uri from the current to the top most.
     */
    readonly allLocations: URI[];
    readonly parent: URI;
    resolve(path: string | Path): URI;
    /**
     * return a new URI replacing the current with the given scheme
     */
    withScheme(scheme: string): URI;
    /**
     * return this URI without a scheme
     */
    withoutScheme(): URI;
    /**
     * return a new URI replacing the current with the given authority
     */
    withAuthority(authority: string): URI;
    /**
     * return this URI without a authority
     */
    withoutAuthority(): URI;
    /**
     * return a new URI replacing the current with the given path
     */
    withPath(path: string | Path): URI;
    /**
     * return this URI without a path
     */
    withoutPath(): URI;
    /**
     * return a new URI replacing the current with the given query
     */
    withQuery(query: string): URI;
    /**
     * return this URI without a query
     */
    withoutQuery(): URI;
    /**
     * return a new URI replacing the current with the given fragment
     */
    withFragment(fragment: string): URI;
    /**
     * return this URI without a fragment
     */
    withoutFragment(): URI;
    readonly scheme: string;
    readonly authority: string;
    readonly path: Path;
    readonly query: string;
    readonly fragment: string;
    toString(skipEncoding?: boolean): string;
}
