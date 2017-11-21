import { FileSystem } from "@theia/filesystem/lib/common";
import { FileTree } from "@theia/filesystem/lib/browser";
export declare class FileNavigatorTree extends FileTree {
    protected readonly fileSystem: FileSystem;
    constructor(fileSystem: FileSystem);
}
