import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { Storage } from '@ionic/storage';
import { MapsPage } from '../maps/maps';
/**
 * Generated class for the IntroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-intro',
  templateUrl: 'intro.html',
})
export class IntroPage {
  firstaccess: Boolean;
  slides = [
    {
      title: "Mapa",
      description: "Nesta tela será exibida a sua posição no mapa e todos os banheiros que se encontram na tua volta.",
      image: "assets/imgs/350x450.png",
    },
    {
      title: "Visualização do Banheiro",
      description: "Ao clicar em cima do banheiro você poderá ver uma prévia do banheiro, como o endereço e o nome do lugar onde ele se encontra.",
      image: "assets/imgs/350x450.png",
    },
    {
      title: "Vá até o Banheiro",
      description: "É simples de traçar a sua rota até o banheiro e chegar facilmente a ele.",
      image: "assets/imgs/350x450.png",
    },
    
  ];

  ultimoSlide = [
    {
      title: "Cadastrando Banheiro",
      description: "Descobriu um banheiro novo? Que tal adicionar ele no app para que mais pessoas usem ele.",
      image: "assets/imgs/350x450.png",
    },
  ];
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage) {
    
    this.storage.get('intro-done').then(done => {
      if (!done) {
        
        this.firstaccess = true
      } else {
        this.navCtrl.setRoot(LoginPage);
        this.firstaccess = false
      }
    });

    this.storage.get('uid').then(done => {
      if (!done) {

        
      } else {
        this.navCtrl.setRoot(MapsPage);
         
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IntroPage');    
  }

  ionViewCanEnter(): boolean {
    
    if(this.firstaccess) {
      return false
    }
    return true
    
  }

  goToTabsPage() {
    //push another page onto the history stack
    //causing the nav controller to animate the new page in
    this.navCtrl.push(LoginPage);
    this.storage.set('intro-done', true);
  }

}
