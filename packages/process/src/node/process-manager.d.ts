import { Process } from './process';
import { Emitter, Event } from '@theia/core/lib/common';
export declare class ProcessManager {
    protected readonly processes: Map<number, Process>;
    protected id: number;
    protected readonly deleteEmitter: Emitter<number>;
    register(process: Process): number;
    get(id: number): Process | undefined;
    delete(process: Process): void;
    readonly onDelete: Event<number>;
}
