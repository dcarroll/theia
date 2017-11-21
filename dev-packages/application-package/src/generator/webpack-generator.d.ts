import { AbstractGenerator } from './abstract-generator';
export declare class WebpackGenerator extends AbstractGenerator {
    generate(): Promise<void>;
    readonly configPath: string;
    protected resolve(moduleName: string, path: string): string;
    protected compileWebpackConfig(): string;
}
