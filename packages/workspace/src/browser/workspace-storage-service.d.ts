import { StorageService } from '@theia/core/lib/browser/storage-service';
import { WorkspaceService } from './workspace-service';
import { ILogger } from '@theia/core/lib/common';
export declare class WorkspaceStorageService implements StorageService {
    protected workspaceService: WorkspaceService;
    protected logger: ILogger;
    private prefix;
    private initialized;
    protected storageService: StorageService;
    constructor(workspaceService: WorkspaceService, logger: ILogger);
    setData<T>(key: string, data: T): Promise<void>;
    getData<T>(key: string, defaultValue?: T): Promise<T | undefined>;
    protected prefixWorkspaceURI(originalKey: string): string;
}
