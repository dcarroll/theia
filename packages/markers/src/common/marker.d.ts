export interface Marker<T> {
    /**
     * the uri this marker is associated with.
     */
    uri: string;
    owner: string;
    /**
     * the kind, e.g. 'problem'
     */
    kind?: string;
    data: T;
}
