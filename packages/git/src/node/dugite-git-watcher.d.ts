import { Git } from '../common/git';
import { Repository } from '../common/model';
import { GitPreferences } from '../common/git-preferences';
import { GitWatcherServer, GitWatcherClient } from '../common/git-watcher';
import { FileSystemWatcherServer } from '@theia/filesystem/lib/common/filesystem-watcher-protocol';
export declare class DugiteGitWatcherServer implements GitWatcherServer {
    protected readonly git: Git;
    protected readonly preferences: GitPreferences;
    protected readonly filesystemWatcher: FileSystemWatcherServer;
    private watcherSequence;
    private client;
    private readonly watchers;
    private readonly status;
    constructor(git: Git, preferences: GitPreferences, filesystemWatcher: FileSystemWatcherServer);
    watchGitChanges(repository: Repository): Promise<number>;
    unwatchGitChanges(watcher: number): Promise<void>;
    dispose(): void;
    setClient(client?: GitWatcherClient): void;
}
