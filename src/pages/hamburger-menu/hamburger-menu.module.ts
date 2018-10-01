import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HamburgerMenuPage } from './hamburger-menu';

@NgModule({
  declarations: [
    HamburgerMenuPage,
  ],
  imports: [
    IonicPageModule.forChild(HamburgerMenuPage),
  ],
})
export class HamburgerMenuPageModule {}
