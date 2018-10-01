import { Component } from '@angular/core';


import { IonicPage, MenuController } from 'ionic-angular';

/**
 * Generated class for the HamburgerMenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-hamburger-menu',
  templateUrl: 'hamburger-menu.html',
})
export class HamburgerMenuPage {

  constructor( menu: MenuController) {
    menu.enable(true);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HamburgerMenuPage');
  }

}
