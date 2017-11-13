import { Directive, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { HeatmapLayerManager } from './heatmap-layer-manager';
import { GoogleMapsAPIWrapper } from '@agm/core';


const INPUTS = [ 'data', 'dissipating', 'gradient', 'maxIntensity', 'opacity', 'radius', 'options' ];
const OUTPUTS = [];

@Directive({
  selector: 'appHeat',
  inputs: INPUTS,
  outputs: OUTPUTS,
})
export class HeatDirective implements OnInit, OnChanges, OnDestroy {

  private _addedToManager: boolean = false;
  private static _heatmapLayerOptions: string[] = [...INPUTS];

  data: any = null;
  dissipating: boolean = true;
  gradient: string[]|null = null;
  maxIntensity: number|null = null;
  radius: number|null = null;
  opacity: number = 1;
  nativeMap: any = null;

  constructor(
    private _manager: HeatmapLayerManager, private wrapper: GoogleMapsAPIWrapper
  ) {
    console.log(this)
  }

  ngOnInit() {
    if (this._addedToManager) {
      return;
    }
    var thisRef = this;

    this.wrapper.getNativeMap().then(function(map){
      thisRef.nativeMap = map;
      thisRef._manager.addHeatmapLayer(thisRef);
      thisRef._addedToManager = true;
     });

    
  }

  ngOnChanges(changes) {
    if (!this._addedToManager) {
      return;
    }

    this._updatePolygonOptions(changes);
  }


  private _updatePolygonOptions(changes: SimpleChanges) {
    const options = Object.keys(changes)
      .filter(k => HeatDirective._heatmapLayerOptions.indexOf(k) !== -1)
      .reduce((obj: any, k: string) => {
        obj[k] = changes[k].currentValue;
        return obj;
      }, {});
    if (Object.keys(options).length > 0) {
      this._manager.setOptions(this, options);
    }
  }

  ngOnDestroy() {
    this._manager.deleteHeatmapLayer(this);
  }

}
