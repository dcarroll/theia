import URI from "@theia/core/lib/common/uri";
export declare namespace ExtensionUri {
    const scheme = "extension";
    function toUri(extensionName: string): URI;
    function toExtensionName(uri: URI): string;
}
