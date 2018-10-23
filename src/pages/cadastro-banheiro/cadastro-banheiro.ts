import { Component } from '@angular/core';
import { IonicPage, NavController, Platform, ToastController, NavParams,  } from 'ionic-angular';
import { HttpClient,} from '@angular/common/http';
import { MapsPage } from '../maps/maps';

import { BathroomsProvider } from './../../providers/bathrooms/bathrooms'

import { Storage } from '@ionic/storage';
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
  model: Bathroom;
  public catacteristicas: any;
  
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

  constructor(public navController: NavController, public httpClient: HttpClient, 
    public Platform: Platform,
    private bathroomProvider: BathroomsProvider,
    public storage: Storage,
    private toast: ToastController,
    public navParams: NavParams) {

    // Ações No Menu - side bar
    this.homePage = MapsPage;
    this.cadastroPage = CadastroBanheiroPage;

  }

  // vai usar o proprio botão de voltar do celular
  goBack() {
    this.navController.pop();
  }

  openPage(opcao) {
    this.rootPage = opcao;
  }

   // lista de caracteristicas do banheiro 

  caracteristicas = [
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

  voltar(){
    this.navController.setRoot(MapsPage);
  }

  createBathroom (){
    console.log(this.navParams.data)
    this.model = new Bathroom();
    this.model.nome 
    this.model.endereco 
    this.model.caracte 
    this.model.lat = 22
    this.model.lon = 22
    this.model.hAb 
    this.model.hFe 


    //chama provider
    this.bathroomProvider.createBathroom(this.model.nome, this.model.endereco, this.model.caracte, this.model.lat, this.model.lon, this.model.hAb, this.model.hFe)
      .then((result: any) => {
        this.toast.create({ message: 'Banheiro cadastrado com sucesso. ', position: 'botton', duration: 3000 }).present();

        
        //Salvar o token no Ionic Storage para usar em futuras requisições.
        //Redirecionar o usuario para outra tela usando o navCtrl
        //this.navCtrl.pop();
        //this.navCtrl.setRoot()
        this.navController.push(MapsPage);
      })
      .catch((error: any) => {
        this.toast.create({ message: 'Erro ao cadastrar banheiro. Tente novamente!!!', position: 'botton', duration: 3000 }).present();
        console.log(error.error)
      });
  }

}// fim da classe

export class Bathroom {
  nome: String
  endereco: String
  caracte: String
  lat: Number
  lon: Number
  hAb: String
  hFe: String
}