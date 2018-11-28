import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PaginaUsuarioPage } from './pagina-usuario';

@NgModule({
  declarations: [
    PaginaUsuarioPage,
  ],
  imports: [
    IonicPageModule.forChild(PaginaUsuarioPage),
  ],
})
export class PaginaUsuarioPageModule {}
