import {Component} from '@angular/core'
import {IonicPage} from 'ionic-angular'
import {Geolocation} from '@ionic-native/geolocation'

declare var google;

@IonicPage()
@Component({
  selector: 'page-maps',
  templateUrl: 'maps.html',
  
})
export class MapsPage {
  
  map: any;
  marker: any

  constructor(private geolocation: Geolocation) { }
 
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
}