import { Component } from '@angular/core';
import { IonicPage, NavController, Platform } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

import { MapsPage } from '../maps/maps';

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

  rootPage:any = MapsPage;
  homePage:any;
  cadastroPage:any;

  constructor(public navCtrl: NavController, public httpClient: HttpClient, 
    public Platform: Platform) {

    // Ações No Menu - side bar
    this.homePage = MapsPage;
    this.cadastroPage = CadastroBanheiroPage;

  }

  // vai usar o proprio botão de voltar do celular
  goBack() {
    this.navCtrl.pop();
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

}// fim da classe
