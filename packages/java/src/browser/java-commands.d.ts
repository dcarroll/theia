import { CommandContribution, CommandRegistry, Command } from '@theia/core/lib/common';
import { Workspace } from "@theia/languages/lib/common";
/**
 * Show Java references
 */
export declare const SHOW_JAVA_REFERENCES: Command;
/**
 * Apply Workspace Edit
 */
export declare const APPLY_WORKSPACE_EDIT: Command;
export declare class JavaCommandContribution implements CommandContribution {
    protected readonly workspace: Workspace;
    constructor(workspace: Workspace);
    registerCommands(commands: CommandRegistry): void;
}
