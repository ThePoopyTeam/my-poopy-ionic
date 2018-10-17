import {Component, ViewChild, ElementRef} from '@angular/core'
import {IonicPage, Platform} from 'ionic-angular'
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


@IonicPage()
@Component({
  selector: 'page-maps',
  templateUrl: 'maps.html',
  
})
export class MapsPage {
  
  map: GoogleMap;
  //map: any;
  //marker: any

  constructor(public googlemaps: GoogleMaps, platform: Platform) {
    platform.ready().then(() => {
      this.loadMap();
    });
  }

  loadMap() {

    // This code is necessary for browser
    Environment.setEnv({
      'API_KEY_FOR_BROWSER_RELEASE': '(your api key for `https://`)',
      'API_KEY_FOR_BROWSER_DEBUG': '(your api key for `http://`)'
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
        }
        
      };

      this.map = GoogleMaps.create('map_canvas', options);

    });
    
  }
}
  
  

