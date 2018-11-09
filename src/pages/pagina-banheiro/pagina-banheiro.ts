import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

// import { faCoffee } from '@fortawesome/free-solid-svg-icons';

/**
 * Generated class for the PaginaBanheiroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pagina-banheiro',
  templateUrl: 'pagina-banheiro.html',
})
export class PaginaBanheiroPage {

  // faCoffee = faCoffee;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PaginaBanheiroPage');
  }

}
