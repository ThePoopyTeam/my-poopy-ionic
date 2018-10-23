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
  Environment, 
  LocationService, 
  MyLocationOptions, 
  MyLocation,
  ILatLng,
  Polyline,
  PolylineOptions } from '@ionic-native/google-maps'
import { CadastroBanheiroPage } from '../cadastro-banheiro/cadastro-banheiro';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { CadastroBanheiroPage } from '../cadastro-banheiro/cadastro-banheiro';
import { IntroPage } from '../intro/intro';

declare var google;

@IonicPage()
@Component({
  selector: 'page-maps',
  templateUrl: 'maps.html',
  
})
export class MapsPage {
  map: GoogleMap;
  directionsService = new google.maps.DirectionsService
  origin: ILatLng;
  dest: ILatLng;
  teste;

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
        
      } 
     
      

      this.map = GoogleMaps.create('map_canvas', options);
      
      let marker: Marker = this.map.addMarkerSync({
        title: 'Ipanema Sports', 
        snippet: "Av. Cel. Marcos, 2353",        
        icon: 'blue',
        animation: 'DROP',
        position: {
          lat: -30.1316736,
          lng: -51.2347836
        }
      });

      this.origin = location.latLng
      console.log('marker:')
      console.log(marker.getPosition().lat)
      console.log(marker.getPosition().lng)

      this.dest = {
        lat: marker.getPosition().lat,
        lng: marker.getPosition().lng
      }

      const request = { // Novo objeto google.maps.DirectionsRequest, contendo:
        origin: this.origin, // origem
        destination: this.dest, // destino
        travelMode: google.maps.TravelMode.WALKING // meio de transporte, nesse caso, apé
      };

      this.directionsService.route(request, function (result, status) {
        if (status == google.maps.DirectionsStatus.OK) {
          const plyPath = [];
          const legs = result.routes[0].legs;
          for (let i = 0; i < legs.length; i++) {
            var steps = legs[i].steps;
            
            for (let j = 0; j < steps.length; j++) {
              var nextSegment = steps[j].path;
              
              for (let k = 0; k < nextSegment.length; k++) {
                
                
                plyPath.push(nextSegment[k].toJSON())
              }
            } 
          }

          console.log('plyPath')
          console.log(plyPath) 
          this.teste = plyPath
          console.log('teste')
          console.log(this.teste) 

        }
      });

      console.log('teste fora')
      console.log(this.teste) 

      let points = [
        {
          lat: - 30.129030000000004,
          lng: -51.233650000000004
        },
        {
          lat: -30.129430000000003,
          lng: -51.234100000000005,
        },
        { lat: -30.129700000000003, lng: -51.23436 },
        { lat: -30.130190000000002, lng: -51.234820000000006 },
        { lat: -30.130950000000002, lng: -51.235580000000006 },
        { lat: -30.131320000000002, lng: -51.23603000000001 },
        { lat: -30.131370000000004, lng: -51.235890000000005 },
        { lat: -30.131420000000002, lng: -51.23575 },
        { lat: -30.131500000000003, lng: -51.23556000000001 },
        { lat: -30.131580000000003, lng: -51.235380000000006 },
        { lat: -30.13162, lng: -51.23525000000001 },
        { lat: -30.131670000000003, lng: -51.235110000000006 },
        { lat: -30.131770000000003, lng: -51.23483 }
      ];



      this.map.addPolyline({
        points: points,
        'color': '#AA00FF',
        'width': 10,
        'geodesic': true
      });
    })
  }
  adicionaBanheiro() {
    this.navController.setRoot(CadastroBanheiroPage);
    console.log('entrou');
  };
}

