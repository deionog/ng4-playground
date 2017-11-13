import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MyNewComponentComponent } from './my-new-component/my-new-component.component';
import { DataService } from './data.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AgmCoreModule, GoogleMapsAPIWrapper } from '@agm/core';
import { HeatDirective } from './heat.directive';
import { HeatmapLayerManager } from './heatmap-layer-manager';
import { HeatmapComponent } from './heatmap/heatmap.component';


@NgModule({
  declarations: [
    AppComponent,
    MyNewComponentComponent,
    HeatDirective,
    HeatmapComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBUyh4iYVk_MpAiwzDNm5gnUkjzabJn8AU',
      libraries: ['visualization']
    })
  ],
  providers: [DataService, GoogleMapsAPIWrapper, HeatmapLayerManager],
  bootstrap: [AppComponent]
})
export class AppModule { }
