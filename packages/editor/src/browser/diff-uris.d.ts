import URI from "@theia/core/lib/common/uri";
export declare namespace DiffUris {
    function encode(left: URI, right: URI, name?: string): URI;
    function decode(uri: URI): URI[];
    function isDiffUri(uri: URI): boolean;
}
