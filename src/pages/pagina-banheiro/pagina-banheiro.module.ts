import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PaginaBanheiroPage } from './pagina-banheiro';
import { SocialSharing } from '@ionic-native/social-sharing';

@NgModule({
  declarations: [
    PaginaBanheiroPage,
  ],
  imports: [
    IonicPageModule.forChild(PaginaBanheiroPage),
  ],
})
export class PaginaBanheiroPageModule {}
