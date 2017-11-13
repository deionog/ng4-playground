import { Injectable } from '@angular/core';
import { GoogleMapsAPIWrapper } from '@agm/core';
import { HeatDirective } from './heat.directive';
import {} from '@types/googlemaps';
import {HeatmapLayer, HeatmapLayerOptions} from './heatmap/map-types';

declare var google: any;

/**
 * Manages all Heatmap Layers for a Google Map instance.
 */

@Injectable()
export class HeatmapLayerManager {
  private _layers: Map<HeatDirective, Promise<HeatmapLayer>> =
    new Map<HeatDirective, Promise<HeatmapLayer>>();
  constructor(
    private _wrapper:  GoogleMapsAPIWrapper
  ) {}


  addHeatmapLayer(layer: HeatDirective) {
    const map = layer.nativeMap;
    let heat = new google.maps.visualization.HeatmapLayer(<HeatmapLayerOptions>{
      map,
      data: layer.data,
      gradient: layer.gradient,
      radius: layer.radius,
      dissipating: layer.dissipating,
      maxIntensity: layer.maxIntensity,
      opacity: layer.opacity
    });
    
    heat = <HeatmapLayer>heat;
    heat.setMap(map);


    // const newLayer = this._wrapper.getNativeMap().then(map => {
    //     let heat = new google.maps.visualization.HeatmapLayer(<HeatmapLayerOptions>{
    //       map,
    //       data: layer.data,
    //       gradient: layer.gradient,
    //       radius: layer.radius,
    //       dissipating: layer.dissipating,
    //       maxIntensity: layer.maxIntensity,
    //       opacity: layer.opacity
    //     });
    //     console.log(map);
    //     heat = <HeatmapLayer>heat;
    //     console.log(heat);

    //     heat.setMap(map);
    //     return heat;
    // });
    // this._layers.set(layer, newLayer);
  }

  setOptions(layer: HeatDirective, options) {
    this._layers.get(layer)
      .then(l => l.setOptions(options))
  }

  deleteHeatmapLayer(layer: HeatDirective) {
    return this._layers.get(layer).then(l => {
      l.setMap(null);
      this._layers.delete(layer);
    });
  }
}