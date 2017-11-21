import { ContainerModule, interfaces } from "inversify";
import { ApplicationProjectArgs } from './application-project-cli';
export declare const extensionKeyword = "theia-extension";
export declare function bindNodeExtensionServer(bind: interfaces.Bind, args?: ApplicationProjectArgs): void;
declare const _default: ContainerModule;
export default _default;
