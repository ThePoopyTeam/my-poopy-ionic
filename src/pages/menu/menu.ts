import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { MapsPage } from '../maps/maps';
import { CadastroBanheiroPage } from '../cadastro-banheiro/cadastro-banheiro';

/**
 * Generated class for the MenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {

  maps: any;
  cadastroBanheiro: any;

  constructor(public menuCtrl: MenuController,public navCtrl: NavController) {
    this.maps = MapsPage,
    this.cadastroBanheiro = CadastroBanheiroPage
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');
  }

  openMenu() {
    this.menuCtrl.open();
  }

  closeMenu() {
    this.menuCtrl.close();
  }

  openPage(opcao) {
    this.navCtrl.push(opcao);
  }

}
