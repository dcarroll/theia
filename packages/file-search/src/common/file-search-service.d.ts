export declare const fileSearchServicePath = "/services/search";
/**
 * The JSON-RPC file search service interface.
 */
export interface FileSearchService {
    /**
     * finds files by a given search pattern
     */
    find(uri: string, searchPattern: string, options?: FileSearchService.Options): Promise<string[]>;
}
export declare const FileSearchService: symbol;
export declare namespace FileSearchService {
    interface Options {
        fuzzyMatch?: boolean;
        limit?: number;
        useGitignore?: boolean;
        defaultIgnorePatterns?: string[];
    }
}
