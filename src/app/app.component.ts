import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';
import { trigger,state,style,transition,animate,keyframes } from "@angular/animations";

@Component({
  selector: 'app-root',
  template: `
  <p [@myAwesomeAnimation]='state' (click)="animateMe()">I will animate!</p>
  <agm-map [latitude]="lat" [longitude]="lng">
    <app-heatmap></app-heatmap>
    <agm-marker [latitude]="lat" [longitude]="lng">
    <agm-info-window [disableAutoPan]="true">
      Hi, this is the content of the <strong>info window</strong>
    </agm-info-window>
    </agm-marker>
  </agm-map>
  `,
  styles: [`
    p{
      width: 200px;
      background:lightgray;
      margin: 100px auto;
      text-align:center;
      padding:20px;
      font-size:1.5em;
    }

    agm-map {
      height: 500px;
    }
  `],

  animations: [
    trigger('myAwesomeAnimation',[
      state('small', style({
        transform: 'scale(1)',
      })),
      state('large', style({
        transform: 'scale(1.2)',
      })),

      transition('small <=> large', animate('300ms ease-in', keyframes([
        style({opacity: 0, transform: 'translateY(-75%)', offset: 0}),
        style({opacity: 1, transform: 'translateY(35%)', offset: .5}),
        style({opacity: 1, transform: 'translateY(0)', offset: 1}),
      ]))),
    ]),
  ]
})
export class AppComponent implements OnInit{

  state: string = 'small';
  lat: number = 37.774546;
  lng: number = -122.433523;

  constructor(){
  }

  ngOnInit() {
    
    
    
  }

  animateMe(){
    this.state = (this.state === 'small' ? 'large' : 'small');
  }

}
