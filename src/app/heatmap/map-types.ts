import {GoogleMap} from '@agm/core/services/google-maps-types';
import {} from '@types/googlemaps';

export interface HeatmapLayer extends google.maps.MVCObject {
    constructor(opts?: HeatmapLayerOptions);
    getData<T extends google.maps.LatLng | WeightedLocation>(): google.maps.MVCArray<T>;
    getMap(): GoogleMap;
    setMap(map: GoogleMap | null): void;
    setOptions(options: HeatmapLayerOptions): void;
    setData(data: google.maps.MVCArray<google.maps.LatLng|WeightedLocation> | google.maps.LatLng[] | WeightedLocation[]): void;
}

export interface HeatmapLayerOptions {
    map?: GoogleMap;
    data: any;
    dissipating?: boolean;
    gradient?: string[]|null;
    maxIntensity?: number|null;
    radius?: number|null;
    opacity?: number;
}

export interface WeightedLocation {
    location: google.maps.LatLng;
    weight: number;
}