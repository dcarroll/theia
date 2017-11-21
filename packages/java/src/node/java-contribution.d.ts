/// <reference types="node" />
import { IConnection, BaseLanguageServerContribution } from "@theia/languages/lib/node";
export declare type ConfigurationType = 'config_win' | 'config_mac' | 'config_linux';
export declare const configurations: Map<NodeJS.Platform, ConfigurationType>;
export declare class JavaContribution extends BaseLanguageServerContribution {
    readonly id: string;
    readonly name: string;
    start(clientConnection: IConnection): void;
}
