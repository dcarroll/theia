/// <reference types="node" />
import * as http from 'http';
import { ContainerModule } from "inversify";
import { ContributionProvider, ConnectionHandler } from '../../common';
import { BackendApplicationContribution } from "../backend-application";
export declare const messagingBackendModule: ContainerModule;
export declare class MessagingContribution implements BackendApplicationContribution {
    protected readonly handlers: ContributionProvider<ConnectionHandler>;
    constructor(handlers: ContributionProvider<ConnectionHandler>);
    onStart(server: http.Server): void;
}
