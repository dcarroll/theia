/// <reference types="node" />
import * as fs from 'fs-extra';
import URI from '@theia/core/lib/common/uri';
import { FileStat, FileSystem, FileSystemClient } from '../common/filesystem';
export declare class FileSystemNodeOptions {
    encoding: string;
    recursive: boolean;
    overwrite: boolean;
    moveToTrash: true;
    static DEFAULT: FileSystemNodeOptions;
}
export declare class FileSystemNode implements FileSystem {
    protected readonly options: FileSystemNodeOptions;
    constructor(options?: FileSystemNodeOptions);
    protected client: FileSystemClient | undefined;
    setClient(client: FileSystemClient | undefined): void;
    getFileStat(uri: string): Promise<FileStat>;
    exists(uri: string): Promise<boolean>;
    resolveContent(uri: string, options?: {
        encoding?: string;
    }): Promise<{
        stat: FileStat;
        content: string;
    }>;
    setContent(file: FileStat, content: string, options?: {
        encoding?: string;
    }): Promise<FileStat>;
    protected isInSync(file: FileStat, stat: FileStat): Promise<boolean>;
    move(sourceUri: string, targetUri: string, options?: {
        overwrite?: boolean;
    }): Promise<FileStat>;
    copy(sourceUri: string, targetUri: string, options?: {
        overwrite?: boolean;
        recursive?: boolean;
    }): Promise<FileStat>;
    createFile(uri: string, options?: {
        content?: string;
        encoding?: string;
    }): Promise<FileStat>;
    createFolder(uri: string): Promise<FileStat>;
    touchFile(uri: string): Promise<FileStat>;
    delete(uri: string, options?: {
        moveToTrash?: boolean;
    }): Promise<void>;
    getEncoding(uri: string): Promise<string>;
    getRoots(): Promise<FileStat[]>;
    getCurrentUserHome(): Promise<FileStat>;
    dispose(): void;
    protected doGetStat(uri: URI, depth: number): Promise<FileStat | undefined>;
    protected doCreateFileStat(uri: URI, stat: fs.Stats): Promise<FileStat>;
    protected doCreateDirectoryStat(uri: URI, stat: fs.Stats, depth: number): Promise<FileStat>;
    protected doGetChildren(uri: URI, depth: number): Promise<FileStat[]>;
    /**
     * Return `true` if it's possible for this URI to have children.
     * It might not be possible to be certain because of permission problems or other filesystem errors.
     */
    protected mayHaveChildren(uri: URI): Promise<boolean>;
    protected doGetEncoding(option?: {
        encoding?: string;
    }): Promise<string>;
    protected doGetOverwrite(option?: {
        overwrite?: boolean;
    }): Promise<boolean>;
    protected doGetRecursive(option?: {
        recursive?: boolean;
    }): Promise<boolean>;
    protected doGetMoveToTrash(option?: {
        moveToTrash?: boolean;
    }): Promise<boolean>;
    protected doGetContent(option?: {
        content?: string;
    }): Promise<string>;
}
