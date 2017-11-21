import { EditorManager } from './editor-manager';
import { StatusBar } from '@theia/core/lib/browser/status-bar/status-bar';
import { FileIconProvider } from '@theia/filesystem/lib/browser/icons/file-icons';
import { Position } from 'vscode-languageserver-types';
import { FrontendApplicationContribution } from '@theia/core/lib/browser';
import { Languages } from '@theia/languages/lib/common';
import { DisposableCollection } from '@theia/core';
export declare class EditorContribution implements FrontendApplicationContribution {
    protected readonly statusBar: StatusBar;
    protected readonly editorManager: EditorManager;
    protected readonly iconProvider: FileIconProvider;
    protected readonly languages: Languages;
    protected toDispose: DisposableCollection;
    constructor(statusBar: StatusBar, editorManager: EditorManager, iconProvider: FileIconProvider, languages: Languages);
    onStart(): void;
    protected addStatusBarWidgets(): Promise<void>;
    protected setCursorPositionStatus(position: Position): void;
}
