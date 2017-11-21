import { Event, Emitter } from "@theia/core/lib/common";
import URI from "@theia/core/lib/common/uri";
import { StorageService } from '@theia/core/lib/browser/storage-service';
import { FileSystemWatcher } from '@theia/filesystem/lib/common';
import { Marker } from '../common/marker';
export interface SearchFilter<D> {
    uri?: URI;
    owner?: string;
    dataFilter?: (data: D) => boolean;
}
export declare class MarkerCollection<T> {
    readonly uri: URI;
    readonly kind: string;
    protected readonly owner2Markers: Map<string, Readonly<Marker<T>>[]>;
    constructor(uri: URI, kind: string);
    getOwners(): string[];
    getMarkers(owner: string): Readonly<Marker<T>>[];
    setMarkers(owner: string, markerData: T[]): Marker<T>[];
    protected createMarker(owner: string, data: T): Readonly<Marker<T>>;
    findMarkers(filter: SearchFilter<T>): Marker<T>[];
    protected filterMarkers(filter: SearchFilter<T>, toFilter?: Marker<T>[]): Marker<T>[];
}
export declare abstract class MarkerManager<D extends object> {
    protected storageService: StorageService;
    protected fileWatcher: FileSystemWatcher | undefined;
    abstract getKind(): string;
    protected readonly uri2MarkerCollection: Map<string, MarkerCollection<D>>;
    protected readonly onDidChangeMarkersEmitter: Emitter<void>;
    readonly initialized: Promise<void>;
    constructor(storageService: StorageService, fileWatcher?: FileSystemWatcher | undefined);
    protected getStorageKey(): string | undefined;
    protected loadMarkersFromStorage(): Promise<void>;
    protected saveMarkersToStorage(): void;
    readonly onDidChangeMarkers: Event<void>;
    protected fireOnDidChangeMarkers(): void;
    setMarkers(uri: URI, owner: string, data: D[]): Promise<Marker<D>[]>;
    protected internalSetMarkers(uri: URI, owner: string, data: D[]): Marker<D>[];
    protected getCollection(uri: URI): MarkerCollection<D>;
    findMarkers(filter?: SearchFilter<D>): Marker<D>[];
    getUris(): Iterable<string>;
}
