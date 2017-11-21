/// <reference types="express" />
/// <reference types="node" />
import * as http from 'http';
import * as express from 'express';
import { ILogger } from "@theia/core/lib/common";
import { BackendApplicationContribution } from '@theia/core/lib/node';
export declare class MetricsBackendContribution implements BackendApplicationContribution {
    protected readonly logger: ILogger;
    constructor(logger: ILogger);
    configure(app: express.Application): void;
    onStart(server: http.Server): void;
}
