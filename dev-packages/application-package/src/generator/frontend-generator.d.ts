import { AbstractGenerator } from "./abstract-generator";
export declare class FrontendGenerator extends AbstractGenerator {
    generate(): Promise<void>;
    protected compileIndexHtml(frontendModules: Map<string, string>): string;
    protected compileIndexHead(frontendModules: Map<string, string>): string;
    protected compileIndexJs(frontendModules: Map<string, string>): string;
    protected compileElectronMain(): string;
}
