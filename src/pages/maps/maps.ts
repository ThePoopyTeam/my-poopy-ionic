import { BathroomsProvider } from './../../providers/bathrooms/bathrooms';
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
  Polyline,
  HtmlInfoWindow
  } from '@ionic-native/google-maps'
import { CadastroBanheiroPage } from '../cadastro-banheiro/cadastro-banheiro';
import { PaginaBanheiroPage } from '../pagina-banheiro/pagina-banheiro';


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
  

  constructor(
      private platform: Platform,
      private navController: NavController,
      private bathroomProvider: BathroomsProvider,
      private storage: Storage) {
    this.platform.ready().then(() => {
      this.getBathroom();
    });
  }

  adicionaBanheiro() {
    this.navController.setRoot(CadastroBanheiroPage);
  };


  private loadMap(markers) {
    // This code is necessary for browser
    Environment.setEnv({
      'API_KEY_FOR_BROWSER_RELEASE': 'AIzaSyAAA-CoZcaF2tT2DKPCTnQPepP2tgIoSSQ',
      'API_KEY_FOR_BROWSER_DEBUG': 'AIzaSyAAA-CoZcaF2tT2DKPCTnQPepP2tgIoSSQ'
    });
  

    LocationService.getMyLocation().then((location: MyLocation) => {
      const options: GoogleMapOptions = {
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

      const baseArray: BaseArrayClass<any> = new BaseArrayClass(markers);

      

      baseArray.forEach((position: any, idx: number) => {
        const htmlInfoWindow = new HtmlInfoWindow();

        const frame: HTMLElement = document.createElement('div');
        frame.innerHTML = [
          '<h3>' + position.title + '</h3>',
          '<p>' + position.snippet + '</p>',
          '<button>Teste</button>'
        ].join("");
        frame.getElementsByTagName("button")[0].addEventListener("click", () => {
          this.navController.push(PaginaBanheiroPage);
        });
        htmlInfoWindow.setContent(frame, {
          width: "auto",
          height: "auto"
        });


        const marker: Marker = this.map.addMarkerSync({
          position: position,
          icon: 'red',
          animation: GoogleMapsAnimation.BOUNCE,

        });
        
        

        marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
          htmlInfoWindow.open(marker);
          this.origin = location.latLng;
          this.dest = marker.getPosition();
          
          const request = { // Novo objeto google.maps.DirectionsRequest, contendo:
            origin: this.origin, // origem
            destination: this.dest, // destino
            travelMode: google.maps.TravelMode.WALKING // meio de transporte, nesse caso, apé
          };

          this.directionsService.route(request, (result, status) => {
            if (status == google.maps.DirectionsStatus.OK) {
              const plyPath = [];
              const legs: any[] = result.routes[0].legs;
              legs.forEach(leg => {
                leg.steps.forEach(step => {
                  const nextSegment = step.path;
                    for (let k = 0; k < nextSegment.length; k++) {
                      plyPath.push(nextSegment[k].toJSON())
                    }
                });
              });
              this.map.addPolyline({
                points: plyPath,
                'color': 'blue',
                'width': 5,
                'geodesic': true
              });
            }

          });
        });
      }) 
    })
  }

  private getBathroom() {
    this.bathroomProvider.findAll().subscribe((bathroom: any[]) => {
      this.storage.setItem('banheiros', JSON.stringify(bathroom));
      const markers = bathroom.map(bath => {
        return {
          lat: bath.lat,
          lng: bath.lon,
          title: bath.nome,
          snippet: bath.endereco
        }
      });

      this.loadMap(markers);
    });
  }
}

