import { CommandContribution, CommandRegistry, Command } from "@theia/core/lib/common";
export declare namespace EditorCommands {
    /**
     * Show editor references
     */
    const SHOW_REFERENCES: Command;
}
export declare class EditorCommandContribution implements CommandContribution {
    registerCommands(registry: CommandRegistry): void;
}
