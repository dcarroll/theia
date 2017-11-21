import { GitRepositoryProvider } from './git-repository-provider';
import { FrontendApplication, FrontendApplicationContribution } from '@theia/core/lib/browser';
import { WidgetManager } from '@theia/core/lib/browser/widget-manager';
import { StatusBar } from "@theia/core/lib/browser/status-bar/status-bar";
import { Git } from '../common';
import { GitWatcher } from '../common/git-watcher';
import { DisposableCollection } from "@theia/core";
export declare const GIT_WIDGET_FACTORY_ID = "git";
export declare class GitFrontendContribution implements FrontendApplicationContribution {
    protected readonly widgetManager: WidgetManager;
    protected readonly repositoryProvider: GitRepositoryProvider;
    protected readonly git: Git;
    protected readonly gitWatcher: GitWatcher;
    protected readonly statusBar: StatusBar;
    protected toDispose: DisposableCollection;
    constructor(widgetManager: WidgetManager, repositoryProvider: GitRepositoryProvider, git: Git, gitWatcher: GitWatcher, statusBar: StatusBar);
    onStart(app: FrontendApplication): void;
    initializeLayout(app: FrontendApplication): Promise<void>;
}
