export interface Address {
    port: number;
    address: string;
}
export declare function start(serverPath: string): Promise<Address>;
export default start;
