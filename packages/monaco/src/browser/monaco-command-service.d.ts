/// <reference types="@theia/monaco/src/typings/monaco/index" />
/// <reference types="monaco-editor-core/monaco" />
import { CommandRegistry, Emitter, DisposableCollection } from '@theia/core/lib/common';
import ICommandEvent = monaco.commands.ICommandEvent;
import ICommandService = monaco.commands.ICommandService;
export declare const MonacoCommandServiceFactory: symbol;
export interface MonacoCommandServiceFactory {
    (): MonacoCommandService;
}
export declare class MonacoCommandService implements ICommandService {
    protected readonly commandRegistry: CommandRegistry;
    protected readonly onWillExecuteCommandEmitter: Emitter<ICommandEvent>;
    protected delegate: ICommandService | undefined;
    protected readonly delegateListeners: DisposableCollection;
    constructor(commandRegistry: CommandRegistry);
    readonly onWillExecuteCommand: monaco.IEvent<ICommandEvent>;
    setDelegate(delegate: ICommandService | undefined): void;
    executeCommand(commandId: any, ...args: any[]): monaco.Promise<any>;
}
