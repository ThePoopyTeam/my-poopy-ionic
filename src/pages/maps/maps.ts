import { BathroomsProvider } from './../../providers/bathrooms/bathrooms';
import { Storage } from '@ionic/storage';
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
import { PaginaUsuarioPage } from '../pagina-usuario/pagina-usuario';


declare var google;

@IonicPage()
@Component({
  selector: 'page-maps',
  templateUrl: 'maps.html',
  
})
export class MapsPage {

  //perfil do usuário
  nome: any;
  imagem:any;

  //mapa
  map: GoogleMap;
  directionsService = new google.maps.DirectionsService
  origin: ILatLng;
  dest: ILatLng;
  allPolylines: any[] = [];
  private requestRoute;
  

  constructor(
      private platform: Platform,
      private navController: NavController,
      private bathroomProvider: BathroomsProvider,
      private storage: Storage
    ) {

    this.platform.ready().then(() => {
      this.getBathroom();
    });

    this.storage.get('name').then((done) => {
      this.nome = done
    })
    this.storage.get('photo').then((done) => {
      this.imagem = done
    });

  }

  adicionaBanheiro() {
    this.navController.setRoot(CadastroBanheiroPage);
  };

  perfilUsuario() {
    this.navController.setRoot(PaginaUsuarioPage);
  } 


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
          `<div class="info-view">
            <h3 id="title">${position.title}</h3>
            <p>${position.snippet}</p>
            <button id="btn-rota" class="btn-style">Navegar</button>
          </div>`
        ].join("");

        frame.querySelector('#title').addEventListener('click', () => {
          this.navController.push(PaginaBanheiroPage, { banheiro: position });
        });

        frame.querySelector('#btn-rota').addEventListener('click', () => { 
          this.direction(this.requestRoute);
        });

        htmlInfoWindow.setContent(frame, {
          width: "250px",
          height: "auto",
          
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
          
          this.requestRoute = { // Novo objeto google.maps.DirectionsRequest, contendo:
            origin: this.origin, // origem
            destination: this.dest, // destino
            travelMode: google.maps.TravelMode.WALKING // meio de transporte, nesse caso, a pé
          };
        });



      });
    })
  }

  private direction(request) {
    this.directionsService.route(request, (result, status) => {
      if (this.allPolylines.length > 0) {
        const poly: Polyline = this.allPolylines.pop();
        poly.remove();
      }

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
          'color': 'rgb(0, 153, 255)',
          'width': 5,
          'geodesic': true
        }).then((res: Polyline) => this.allPolylines.push(res));
      }
    });
  }

  private getBathroom() {
    this.bathroomProvider.findAll().subscribe((bathroom: any[]) => {
      this.storage.set('banheiros', JSON.stringify(bathroom));
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

