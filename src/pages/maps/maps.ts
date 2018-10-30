import {Component} from '@angular/core'
import {IonicPage, Platform, NavController} from 'ionic-angular'
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapOptions,
  Marker,
  Environment, 
  LocationService, 
  MyLocation,
  ILatLng,
  LatLng,
  GoogleMapsEvent,
  BaseArrayClass,
  GoogleMapsAnimation,
  Polyline
  } from '@ionic-native/google-maps'
import { CadastroBanheiroPage } from '../cadastro-banheiro/cadastro-banheiro';


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
  

  constructor(public googlemaps: GoogleMaps, platform: Platform, public navController: NavController) {
    platform.ready().then(() => {
      this.loadMap()
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

      ///fim load map
      
      let markers: any[] = [
        { lat: -30.140937, lng: -51.129785, title: "Banheiro Bloco 5 - IFRS Campus Restinga", snippet: "Rua Alberto Hoffmann, 285 - Restinga" },
        { lat: -30.141128, lng: -51.129964, title: "Banheiro Bloco 4 - IFRS Campus Restinga", snippet: "Rua Alberto Hoffmann, 285 - Restinga" },
        { lat: -30.141312, lng: -51.130147, title: "Banheiro Bloco 3 - IFRS Campus Restinga", snippet: "Rua Alberto Hoffmann, 285 - Restinga" },
        { lat: -30.141440, lng: -51.130330, title: "Banheiro corredor - IFRS Campus Restinga", snippet: "Rua Alberto Hoffmann, 285 - Restinga" },
        { lat: -30.131731, lng: -51.235523, title: "Ipanema Sports", snippet: "Av. Cel. Marcos, 2353 - Ipanema" }
      ];

      let baseArray: BaseArrayClass<any> = new BaseArrayClass(markers);

      baseArray.forEach((position: any, idx: number) => {
        console.log(position.title);

        let marker: Marker = this.map.addMarkerSync({
          position: position,
          icon: 'red',
          title: position.title,
          snippet: position.snippet,
          animation: GoogleMapsAnimation.BOUNCE,
        })
        marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
          

          this.origin = location.latLng

          this.dest = marker.getPosition()

          const request = { // Novo objeto google.maps.DirectionsRequest, contendo:
            origin: this.origin, // origem
            destination: this.dest, // destino
            travelMode: google.maps.TravelMode.WALKING // meio de transporte, nesse caso, apé
          };

          let promisePyPath = new Promise((resolve, reject) => {
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


                resolve(plyPath)
              }
            })


          })

          
          Promise.all([promisePyPath]).then(response => {
            const plyPath: any = response[0]
              const teste = this.map.addPolyline({
                points: plyPath,
                'color': 'blue',
                'width': 5,
                'geodesic': true
              })

              console.log(teste)
              
          })

        })
      })   

      
      

      
    })
  }


  adicionaBanheiro() {
    this.navController.setRoot(CadastroBanheiroPage);
  };
}

