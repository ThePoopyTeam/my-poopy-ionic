import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MapsPage } from './maps';
import { Geolocation } from '@ionic-native/geolocation';
import { MenuPage } from '../menu/menu';
import { MenuPageModule } from '../menu/menu.module'

@NgModule({
  declarations: [
    MapsPage,
    
  ],
  imports: [
    IonicPageModule.forChild(MapsPage),
    
  ],
  providers: [
    Geolocation,
  ]
})
export class MapsPageModule {}
