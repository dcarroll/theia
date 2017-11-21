import { MarkerManager } from '../marker-manager';
import { StorageService } from '@theia/core/lib/browser/storage-service';
import { FileSystemWatcher } from '@theia/filesystem/lib/common';
import { Diagnostic } from "vscode-languageserver-types";
export interface ProblemStat {
    errors: number;
    warnings: number;
}
export declare class ProblemManager extends MarkerManager<Diagnostic> {
    protected fileWatcher: FileSystemWatcher | undefined;
    getKind(): string;
    constructor(storageService: StorageService, fileWatcher?: FileSystemWatcher | undefined);
    getProblemStat(): ProblemStat;
}
