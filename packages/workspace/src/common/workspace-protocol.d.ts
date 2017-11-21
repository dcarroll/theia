export declare const workspacePath = "/services/workspace";
/**
 * The JSON-RPC workspace interface.
 */
export declare const WorkspaceServer: symbol;
export interface WorkspaceServer {
    /**
     * Returns with a promise that resolves to the workspace root URI as a string. Resolves to `undefined` if the workspace root is not yet set.
     */
    getRoot(): Promise<string | undefined>;
    /**
     * Sets the desired string representation of the URI as the workspace root.
     */
    setRoot(uri: string): Promise<void>;
}
