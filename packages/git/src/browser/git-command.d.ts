import { CommandContribution, CommandRegistry } from "@theia/core/lib/common";
import { GitQuickOpenService } from './git-quick-open-service';
import { GitRepositoryProvider } from './git-repository-provider';
export declare namespace GIT_COMMANDS {
    const FETCH: {
        id: string;
        label: string;
    };
    const PULL: {
        id: string;
        label: string;
    };
    const PUSH: {
        id: string;
        label: string;
    };
    const MERGE: {
        id: string;
        label: string;
    };
}
export declare class GitCommandHandlers implements CommandContribution {
    protected readonly quickOpenService: GitQuickOpenService;
    protected readonly repositoryProvider: GitRepositoryProvider;
    constructor(quickOpenService: GitQuickOpenService, repositoryProvider: GitRepositoryProvider);
    registerCommands(registry: CommandRegistry): void;
    protected readonly repositorySelected: boolean;
}
