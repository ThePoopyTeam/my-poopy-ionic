import { NativeGeocoder } from '@ionic-native/native-geocoder';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CadastroBanheiroPage } from './cadastro-banheiro';


@NgModule({
  declarations: [
    CadastroBanheiroPage,
  ],
  imports: [
    IonicPageModule.forChild(CadastroBanheiroPage)
  ],
  providers: [ 
    NativeGeocoder
  ]
})
export class CadastroBanheiroPageModule {}
