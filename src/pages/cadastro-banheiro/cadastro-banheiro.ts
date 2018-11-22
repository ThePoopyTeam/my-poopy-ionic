import { Component } from '@angular/core';
import { IonicPage, NavController, Platform, ToastController,  Toggle, AlertController } from 'ionic-angular';
import { MapsPage } from '../maps/maps';
import { BathroomsProvider } from './../../providers/bathrooms/bathrooms'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { NativeGeocoder, NativeGeocoderForwardResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder';


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
  
  banheiroForm: FormGroup;
  caractList: Caracteristica [] = [];
  isValidToSend = false;

  model: Bathroom;
  catacteristicas: any;
  nome: string = ""
  endereco: String = ""
  caracte: String = ""
  lat: Number = 0
  lon: Number = 0
  hAb: String = ""
  hFe: String = ""
  rootPage:any = MapsPage;
  homePage:any;
  cadastroPage:any;
  caracteristicas: Caracteristica [] = [
    {
      nome: "Feminino",
      icone: "assets/caracteristicas/mulher.png"
    },
    {
      nome: "Masculino",
      icone: "assets/caracteristicas/masculino.png"
    },
    {
      nome: "Familia",
      icone: "assets/caracteristicas/familia.png"
    },
    {
      nome: "Unissex",
      icone: "assets/caracteristicas/iconeunissex.png"
    },
    {
      nome: "PCD",
      icone: "assets/caracteristicas/deficiente.png"
    },
  ];
  


  constructor(
    private nativeGeocoder: NativeGeocoder,
    private navController: NavController, 
    private fb: FormBuilder,
    private alertCtrl: AlertController,
    private bathroomProvider: BathroomsProvider,
    private toast: ToastController) {

      // Ações No Menu - side bar
      this.homePage = MapsPage;
      this.cadastroPage = CadastroBanheiroPage;

      this.banheiroForm = fb.group({
        nome: [null, Validators.compose([
          Validators.required,
          Validators.maxLength(50)])],
        endereco: [null, Validators.compose([
          Validators.required,
          Validators.maxLength(150)])],
        hAb: [null, Validators.required],
        hFe: [null, Validators.required],
      });
  }

  // vai usar o proprio botão de voltar do celular
  goBack() {
    this.navController.pop();
  }

  openPage(opcao) {
    this.rootPage = opcao;
  }

  changeToTrue(event: Toggle, caracteristica: Caracteristica) {
    const isChacked = event.checked;
    if (isChacked) {
      this.caractList.push(caracteristica);
      this.isValidToSend = true;
    } else {
      const caractIndex = this.caractList.findIndex(caract => caract.nome === caracteristica.nome);
      this.caractList.splice(caractIndex, 1);

      if (this.caractList.length === 0) {
        this.isValidToSend = false;
      }
    }
  }

   // lista de caracteristicas do banheiro 

  voltar(){
    this.navController.setRoot(MapsPage);
  }

  createBathroom (bathForm){
    const options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 5
    };
    this.nativeGeocoder.forwardGeocode(bathForm.endereco, options)
      .then((coordinates: NativeGeocoderForwardResult[]) =>{
        const bath = new Bathroom();
        bath.nome = bathForm.nome;
        bath.endereco = bathForm.endereco;
        bath.hAb = bathForm.hAb;
        bath.hFe = bathForm.hFe;
        bath.caracte = this.caractList;
        bath.lat = parseFloat(coordinates[0].latitude);
        bath.lon = parseFloat(coordinates[0].longitude);

        this.bathroomProvider.createBathroom(bath).subscribe(response => {
          this.alertaNotificacao();
        });
      }).catch((error: any) => console.log('Error => ', error));    
  }

  private alertaNotificacao() {
    let alert = this.alertCtrl.create({
      title: 'Banheiro cadastrado com sucesso',
      subTitle: 'Clique em OK para retornar para o mapa.',
      buttons: [
        {
          text: "Ok",
          handler:()=>this.voltar()
        }
      ]
    });
    alert.present();
  }

}// fim da classe

export class Bathroom {
    public nome: string;
    public endereco: string;
    public caracte: Caracteristica[];
    public lat: number;
    public lon: number;
    public hAb: string;
    public hFe: string;
}

export interface Caracteristica {
  nome: string;
  icone: string;
}