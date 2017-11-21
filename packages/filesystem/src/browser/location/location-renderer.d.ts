import { h } from '@phosphor/virtualdom';
import { VirtualRenderer } from "@theia/core/lib/browser";
import URI from "@theia/core/lib/common/uri";
import { LocationService } from "./location-service";
export declare const LOCATION_LIST_CLASS = "theia-LocationList";
export declare class LocationListRenderer extends VirtualRenderer {
    readonly service: LocationService;
    constructor(service: LocationService, host?: HTMLElement);
    render(): void;
    protected doRender(): h.Child;
    protected renderLocation(uri: URI): h.Child;
    protected onLocationChanged(e: Event): void;
    readonly locationList: HTMLSelectElement | undefined;
}
