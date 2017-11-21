import { ILogger } from '@theia/core';
import { FileSearchService } from '../common/file-search-service';
export declare class FileSearchServiceImpl implements FileSearchService {
    private logger;
    constructor(logger: ILogger);
    find(uri: string, searchPattern: string, options?: FileSearchService.Options): Promise<string[]>;
    private findRecursive(filePath, globalFilter, gitignore, options, acceptor);
    private getFiltered(basePath, options);
}
