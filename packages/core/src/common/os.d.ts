export declare const isWindows: boolean;
export declare const isOSX: boolean;
export declare type CMD = [string, string[]];
export declare function cmd(command: string, ...args: string[]): CMD;
