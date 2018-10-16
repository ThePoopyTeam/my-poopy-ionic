import {Component} from '@angular/core'
import {IonicPage, NavController} from 'ionic-angular'
import {Geolocation} from '@ionic-native/geolocation'

import { CadastroBanheiroPage } from '../cadastro-banheiro/cadastro-banheiro';
import { IntroPage } from '../intro/intro';


declare var google;

@IonicPage()
@Component({
  selector: 'page-maps',
  templateUrl: 'maps.html',
  
})
export class MapsPage {
  
  map: any;
  marker: any;
  rootPage: MapsPage;

  homePage:any;
  cadastroPage:any;
  introPage:any;

  constructor(private geolocation: Geolocation, public navCtrl: NavController) { 

    // Ações do menu rápido
    this.homePage = MapsPage;
    this.cadastroPage = CadastroBanheiroPage;
    this.introPage = IntroPage;

  }
 
  ionViewDidLoad() {
    this.geolocation.getCurrentPosition()
      .then((resp) => {
        const position = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
 
        const mapOptions = {
          zoom: 16,
          center: position,
          disableDefaultUI: true
        }
 
        this.map = new google.maps.Map(document.getElementById('map'), mapOptions);
 
        this.marker = new google.maps.Marker({
          position: position,
          map: this.map
        });
 
      }).catch((error) => {
        console.log('Erro ao recuperar sua posição', error);
      });
  }


  goToOtherPage(opcao) {
    this.navCtrl.push(opcao);
  }

}