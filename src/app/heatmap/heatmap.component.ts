import { Component, OnInit, ElementRef } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import { GoogleMapsAPIWrapper } from '@agm/core';
import {} from '@types/googlemaps';
import { City } from './City';

const GREEN_GRADIENT = 'GREEN_GRADIENT';
const BLUE_GRADIENT = 'BLUE_GRADIENT';

const GRADIENTS = Object.freeze({
  [GREEN_GRADIENT]: null,
  [BLUE_GRADIENT]: [
    'rgba(0, 255, 255, 0)',
    'rgba(0, 255, 255, 1)',
    'rgba(0, 191, 255, 1)',
    'rgba(0, 127, 255, 1)',
    'rgba(0, 63, 255, 1)',
    'rgba(0, 0, 255, 1)',
    'rgba(0, 0, 223, 1)',
    'rgba(0, 0, 191, 1)',
    'rgba(0, 0, 159, 1)',
    'rgba(0, 0, 127, 1)',
    'rgba(63, 0, 91, 1)',
    'rgba(127, 0, 63, 1)',
    'rgba(191, 0, 31, 1)',
    'rgba(255, 0, 0, 1)'
  ]
});


const ROADMAP_TYPE = 'ROADMAP_TYPE';
const TERRAIN_TYPE = 'TERRAIN_TYPE';


const TYPES = Object.freeze({
  [ROADMAP_TYPE]: 'roadmap',
  [TERRAIN_TYPE]: 'terrain'
});


const DAY_STYLES = 'DAY_STYLES';
const NIGHT_STYLES = 'NIGHT_STYLES';

const STYLES = Object.freeze({
  [DAY_STYLES]: null,
  [NIGHT_STYLES]: null
});

@Component({
  selector: 'app-heatmap',
  templateUrl: './heatmap.component.html',
  styleUrls: ['./heatmap.component.css']
})
export class HeatmapComponent implements OnInit {

  lat: number = 37.774546;
  lng: number = -122.433523;
  
  data: any;
  dissipating: boolean = true;
  gradient: string[]|null = null;
  maxIntensity: number|null = null;
  radius: number|null = null;
  opacity: number = 1;
  
  constructor(private apiLoader: MapsAPILoader, private wrapper: GoogleMapsAPIWrapper, private _elem: ElementRef) { 

    this.gradient = GRADIENTS.BLUE_GRADIENT;
    this.radius = 5;
    this.data = [];
  }

  ngOnInit() {
    //this.wrapper.getNativeMap().then(map => console.log(map));

    //   const container = document.querySelector('.agm-map-container-inner');
    //   let center = map.getCenter();
    //  let heatmapData = [];
    this.apiLoader.load().then(()=>{
      this.getTop25Cities().forEach( city =>{
        this.data.push(this.generatePoint(city));
      });
    });

      


    //   let m = new google.maps.Map(container, {
    //     zoom: map.getZoom(),
    //     center: {lat: center.lat(), lng: center.lng()}
    //   });

    //   let heatmap = new google.maps.visualization.HeatmapLayer({
    //     data: heatmapData,
    //     map: m,
    //     dissipating: this.dissipating,
    //     gradient: this.gradient,
    //     //radius: this.radius,
    //     opacity: this.opacity
    //   })
    // });
  }

  generatePoint(city: City ){
    return new google.maps.LatLng(city.lat , city.lng); 
  }

  getTop25Cities(){
    return [
      new City("Oklahoma City", 25, 35.4676 , 97.5164 ),
      new City("Des Moines", 24, 41.6005 , -93.6091 ),
      new City("Seattle", 23, 47.6062 , -122.3321 ),
      new City("Las Vegas", 22, 36.1699 , -115.1398 ),
      new City("Jacksonville", 21, 30.3322 , -81.6557 ),
      new City("Phoenix", 20, 33.4484 , -112.0740 ),
      new City("Melbourne", 19, 28.0836 , -80.6081 ),
      new City("Fort Worth", 18, 32.7555 , -97.3308 ),
      new City("Miami", 17, 25.7617 , -80.1918 ),
      new City("Boise", 16, 43.6187 , -116.2146 ),
      new City("Charlotte", 15, 35.2271 , -80.8431 ),
      new City("Tampa", 14, 27.9506 , -82.4572 ),
      new City("Fayetteville", 13, 36.0822 , -94.1719 ),
      new City("Nashville", 12, 36.1627 , -86.7816 ),
      new City("Denver", 11, 39.7392 , -104.9903 ),
      new City("Raleigh and Durham", 10, 35.7796 , -78.6382 ),
      new City("Lakeland", 9, 28.0395 , -81.9498 ),
      new City("San Antonio", 8, 29.4241 , -98.4936 ),
      new City("Houston", 7, 29.7604 , -95.3698 ),
      new City("Daytona Beach", 6, 29.2108, -81.0228 ),
      new City("Charleston", 5, 32.7765 , -79.9311 ),
      new City("Orlando", 4, 28.5383 , -81.3792 ),
      new City("Austin", 3, 30.2672 , -97.7431 ),
      new City("Sarasota", 2, 27.3364, -82.5307 ),
      new City("Fort Myers", 1, 26.6406 , -81.8723 )
    ];
  }

}
