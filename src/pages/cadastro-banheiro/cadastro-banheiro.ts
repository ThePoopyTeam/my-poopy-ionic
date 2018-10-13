import { Component } from '@angular/core';
import { IonicPage, NavController, Platform } from 'ionic-angular';
import { HttpClient,} from '@angular/common/http';
import { Observable } from 'rxjs/Observable'
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

  public catacteristicas: any;

  constructor(public navCtrl: NavController, public httpClient: HttpClient, 
    public Platform: Platform) {

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

}// fim da classe
