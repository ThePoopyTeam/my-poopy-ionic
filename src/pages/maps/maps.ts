import { Component, ViewChild } from '@angular/core';
import { IonicPage} from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { google } from 'google-maps';

/**
 * Generated class for the MapsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 declare var google: any

@IonicPage()
@Component({
  selector: 'page-maps',
  templateUrl: 'maps.html',
})
export class MapsPage {

  map: any;
  markers: any;

  constructor(private geolocation: Geolocation) {

  }

  ionViewDidLoad() {
    this.initMap()
  }

  initMap() {
    //pegando a posição inical da pessoa
    this.geolocation.getCurrentPosition().then(result => {
      this.loadMap(result.coords.latitude, result.coords.longitude);
    })
  }

  //carregar o map com as coordendas do usuario
  loadMap(lat, lng) {

    var posicaoInicial = { lat, lng };

    // criando o map e passando a configuração de como o mapa vai aparecer
    this.map = new google.maps.Map(
      document.getElementById('map'), {
        zoom: 15,
        center: posicaoInicial,
        disableDefaultUI: true
      }
    );

    this.markers = new google.maps.Marker({
      icon: '#1F8AFF',
      position: posicaoInicial
    });

    //adicionando o marcador ao mapa
    this.markers.setMap(this.map);

  }


}