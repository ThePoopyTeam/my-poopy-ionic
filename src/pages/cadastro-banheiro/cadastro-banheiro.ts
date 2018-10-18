import { Component } from '@angular/core';
import { IonicPage, NavController, Platform, ToastController } from 'ionic-angular';
import { HttpClient,} from '@angular/common/http';
import { Observable } from 'rxjs/Observable'
import { MapsPage } from '../maps/maps';

import { BathroomsProvider } from './../../providers/bathrooms/bathrooms'
/**
 * Generated class for the CadastroBanheiroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cadastro-banheiro',
  templateUrl: 'cadastro-banheiro.html',
})
export class CadastroBanheiroPage {
  model: Bathroom;
  public catacteristicas: any;
  
  nome: string = ""
  endereco: String = ""
  caracte: String = ""
  lat: Number = 0
  lon: Number = 0
  hAb: String = ""
  hFe: String = ""

  constructor(public navController: NavController, public httpClient: HttpClient, 
    public Platform: Platform,
    private bathroomProvider: BathroomsProvider,
    public storage: Storage,
    private toast: ToastController,) {

    this.getData();
  }

  getData(){
    let path = 'src/pages/cadastro-banheiro/cadastro-banheiro.json';
    let url = 'https://jsonplaceholder.typicode.com/photos'

    let data: Observable<any> = this.httpClient.get(url);
    data.subscribe(
      result => {
        this.catacteristicas = result;
        console.log(result);

      }
    )
  }

  doInfinite(infiniteScroll) {
    console.log('Begin async operation');

    setTimeout(() => {
      for (let i = 0; i < 30; i++) {
        this.catacteristicas.push( this.catacteristicas.length );
      }

      console.log('Async operation has ended');
      infiniteScroll.complete();
    }, 500);
  }

  voltar(){
    this.navController.setRoot(MapsPage);
  }

  createBathroom (){
    this.model = new Bathroom();
    this.model.nome = 'tt'
    this.model.endereco = 'tt'
    this.model.caracte = 'tt'
    this.model.lat = 22
    this.model.lon = 22
    this.model.hAb = 'tt'
    this.model.hFe = 'tt'


    //chama provider
    this.bathroomProvider.createBathroom(this.model.nome, this.model.endereco, this.model.caracte, this.model.lat, this.model.lon, this.model.hAb, this.model.hFe)
      .then((result: any) => {
        this.toast.create({ message: 'Banheiro cadastrado com sucesso. ', position: 'botton', duration: 3000 }).present();

        this.storage.set('uid', true);
        //Salvar o token no Ionic Storage para usar em futuras requisições.
        //Redirecionar o usuario para outra tela usando o navCtrl
        //this.navCtrl.pop();
        //this.navCtrl.setRoot()
        this.navController.push(MapsPage);
      })
      .catch((error: any) => {
        this.toast.create({ message: 'Erro ao cadastrar banheiro. Tente novamente!!!', position: 'botton', duration: 3000 }).present();
        console.log(error.error)
      });
  }

}// fim da classe

export class Bathroom {
  nome: String
  endereco: String
  caracte: String
  lat: Number
  lon: Number
  hAb: String
  hFe: String
}