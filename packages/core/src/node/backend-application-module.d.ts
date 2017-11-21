import { ContainerModule, interfaces } from "inversify";
import { RemoteMasterProcessFactory } from './cluster';
export declare function bindServerProcess(bind: interfaces.Bind, masterFactory: RemoteMasterProcessFactory): void;
export declare const backendApplicationModule: ContainerModule;
