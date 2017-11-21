import { ApplicationPackage } from '../application-package';
export declare abstract class AbstractGenerator {
    protected readonly pck: ApplicationPackage;
    constructor(pck: ApplicationPackage);
    protected compileFrontendModuleImports(modules: Map<string, string>): string;
    protected compileBackendModuleImports(modules: Map<string, string>): string;
    protected compileModuleImports(modules: Map<string, string>, fn: 'import' | 'require'): string;
    protected ifBrowser(value: string, defaultValue?: string): string;
    protected ifElectron(value: string, defaultValue?: string): string;
    protected write(path: string, content: string): Promise<void>;
    protected ifMonaco(value: () => string, defaultValue?: () => string): string;
}
