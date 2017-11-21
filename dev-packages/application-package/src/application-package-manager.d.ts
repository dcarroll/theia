import { ApplicationPackage, ApplicationPackageOptions } from "./application-package";
import { WebpackGenerator, FrontendGenerator, BackendGenerator } from "./generator";
import { ApplicationProcess } from './application-process';
export declare class ApplicationPackageManager {
    readonly pck: ApplicationPackage;
    /** application process */
    readonly process: ApplicationProcess;
    /** manager process */
    protected readonly __process: ApplicationProcess;
    protected readonly webpack: WebpackGenerator;
    protected readonly backend: BackendGenerator;
    protected readonly frontend: FrontendGenerator;
    constructor(options: ApplicationPackageOptions);
    protected remove(path: string): Promise<void>;
    clean(): Promise<void>;
    generate(): Promise<void>;
    copy(): Promise<void>;
    build(args?: string[]): Promise<void>;
    start(args?: string[]): Promise<void>;
    startElectron(args: string[]): Promise<void>;
    startBrowser(args: string[]): Promise<void>;
}
