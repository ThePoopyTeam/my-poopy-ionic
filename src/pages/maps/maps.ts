import {Component, ViewChild, ElementRef} from '@angular/core'
import {IonicPage, Platform, NavController} from 'ionic-angular'
import {Geolocation} from '@ionic-native/geolocation'
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker,
  Environment, LocationService, MyLocationOptions, MyLocation } from '@ionic-native/google-maps'
import { CadastroBanheiroPage } from '../cadastro-banheiro/cadastro-banheiro';


@IonicPage()
@Component({
  selector: 'page-maps',
  templateUrl: 'maps.html',
  
})
export class MapsPage {
  
  map: GoogleMap;


  constructor(public googlemaps: GoogleMaps, platform: Platform, public navController: NavController) {
    platform.ready().then(() => {
      this.loadMap();
    });
  }

  loadMap() {

    // This code is necessary for browser
    Environment.setEnv({
      'API_KEY_FOR_BROWSER_RELEASE': 'AIzaSyAAA-CoZcaF2tT2DKPCTnQPepP2tgIoSSQ',
      'API_KEY_FOR_BROWSER_DEBUG': 'AIzaSyAAA-CoZcaF2tT2DKPCTnQPepP2tgIoSSQ'
    });
  

    LocationService.getMyLocation().then((location: MyLocation) => {
      console.log(location);
      let options: GoogleMapOptions = {
        camera: {
          target: location.latLng,
          zoom:16
        },
        controls:{
          'myLocationButton': true,
          'myLocation': true,   // (blue dot)
        },
        gestures: {
          scroll: true,
          tilt: false,
          rotate: true,
          zoom: true
        },
        
      };

      this.map = GoogleMaps.create('map_canvas', options);

    });
    
  }

  adicionaBanheiro() {
    this.navController.setRoot(CadastroBanheiroPage);
    console.log('entrou')
  }
}
  
  

