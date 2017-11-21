import URI from "../common/uri";
/**
 * An endpoint provides URLs for http and ws, based on configuration ansd defaults.
 */
export declare class Endpoint {
    protected readonly options: Endpoint.Options;
    protected readonly location: Endpoint.Location;
    static readonly PROTO_HTTPS: string;
    static readonly PROTO_HTTP: string;
    static readonly PROTO_WS: string;
    static readonly PROTO_WSS: string;
    static readonly PROTO_FILE: string;
    constructor(options?: Endpoint.Options, location?: Endpoint.Location);
    getWebSocketUrl(): URI;
    getRestUrl(): URI;
    protected readonly pathname: string;
    protected readonly host: string;
    protected readonly port: string;
    protected getSearchParam(name: string, defaultValue: string): string;
    protected readonly wsScheme: string;
    protected readonly httpScheme: string;
    protected readonly path: string;
}
export declare namespace Endpoint {
    class Options {
        host?: string;
        wsScheme?: string;
        httpScheme?: string;
        path?: string;
    }
    class Location {
        host: string;
        pathname: string;
        search: string;
        protocol: string;
    }
}
