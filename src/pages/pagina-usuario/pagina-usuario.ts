import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { MapsPage } from '../maps/maps';
/**
 * Generated class for the PaginaUsuarioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pagina-usuario',
  templateUrl: 'pagina-usuario.html',
})
export class PaginaUsuarioPage {
  nome: any;
  imagem: any;
  email:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PaginaUsuarioPage');

    this.storage.get('name').then((done) => {
      this.nome = done
      console.log("nome: " + this.nome);
    })
    this.storage.get('photo').then((done) => {
      this.imagem = done
      console.log("imagem: " + this.imagem);
    })

    this.storage.get('email').then((done) => {
      this.email = done
      console.log("email: " + this.email);
    })

  }

  voltar() {
    this.navCtrl.setRoot(MapsPage);
  };

}
