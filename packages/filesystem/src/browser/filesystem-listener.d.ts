import { FileStat, FileSystemClient, FileSystem } from "../common";
export declare class FileSystemListener implements FileSystemClient {
    protected filesystem: FileSystem;
    listen(filesystem: FileSystem): void;
    shouldOverwrite(file: FileStat, stat: FileStat): Promise<boolean>;
}
