import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MapsPage } from './maps';
import { Geolocation } from '@ionic-native/geolocation';
import { GoogleMaps } from '@ionic-native/google-maps';

@NgModule({
  declarations: [
    MapsPage
  ],
  imports: [
    IonicPageModule.forChild(MapsPage),
    
  ],
  providers: [
    Geolocation,
    GoogleMaps
  ]
})
export class MapsPageModule {}
