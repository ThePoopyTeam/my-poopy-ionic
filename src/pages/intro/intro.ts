import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { Storage } from '@ionic/storage';
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
  slides = [
    {
      title: "Mapa",
      description: "Cupcake ipsum dolor sit amet candy canes. Topping danish wafer cake cookie donut candy canes wafer icing. Sugar plum gummi bears marzipan caramels.",
      image: "assets/imgs/350x450.png",
    },
    {
      title: "Visualização do Banheiro",
      description: "Cupcake ipsum dolor sit amet candy canes. Topping danish wafer cake cookie donut candy canes wafer icing. Sugar plum gummi bears marzipan caramels.",
      image: "assets/imgs/350x450.png",
    },
    {
      title: "Vá até o Banheiro",
      description: "Cupcake ipsum dolor sit amet candy canes. Topping danish wafer cake cookie donut candy canes wafer icing. Sugar plum gummi bears marzipan caramels.",
      image: "assets/imgs/350x450.png",
    },
    {
      title: "Avaliando Banheiro",
      description: "Cupcake ipsum dolor sit amet candy canes. Topping danish wafer cake cookie donut candy canes wafer icing. Sugar plum gummi bears marzipan caramels.",
      image: "assets/imgs/350x450.png",
    },
    {
      title: "Cadastrando Banheiro",
      description: "Cupcake ipsum dolor sit amet candy canes. Topping danish wafer cake cookie donut candy canes wafer icing. Sugar plum gummi bears marzipan caramels.",
      image: "assets/imgs/350x450.png",
    },
  ];
  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IntroPage');

    this.storage.get('intro-done').then(done => {
      if (done) {
        this.navCtrl.push(LoginPage);
      }
    });
    
  }

  goToTabsPage() {
    //push another page onto the history stack
    //causing the nav controller to animate the new page in
    this.storage.set('intro-done', true);
    this.navCtrl.push(LoginPage);
    
    

  }

}
