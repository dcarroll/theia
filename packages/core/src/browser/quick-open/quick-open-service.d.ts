import { QuickOpenModel } from './quick-open-model';
export declare type QuickOpenOptions = Partial<QuickOpenOptions.Resolved>;
export declare namespace QuickOpenOptions {
    interface Resolved {
        readonly prefix: string;
        readonly placeholder: string;
        readonly fuzzyMatchLabel: boolean;
        readonly fuzzyMatchDetail: boolean;
        readonly fuzzyMatchDescription: boolean;
        readonly fuzzySort: boolean;
        onClose(canceled: boolean): void;
    }
    const defaultOptions: Resolved;
    function resolve(options?: QuickOpenOptions, source?: Resolved): Resolved;
}
export declare class QuickOpenService {
    /**
     * It should be implemented by an extension, e.g. by the monaco extension.
     */
    open(model: QuickOpenModel, options?: QuickOpenOptions): void;
}
