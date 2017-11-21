import URI from "@theia/core/lib/common/uri";
export interface UriSelection {
    readonly uri: URI;
}
export declare namespace UriSelection {
    function is(e: any): e is UriSelection;
    function getUri(selection: any): URI | undefined;
}
