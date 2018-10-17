import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';

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
      description: "Nesta tela será exibida a tua posição no mapa e todos os banheiros que se encontram na tua volta.",
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
    {
      title: "Avaliando Banheiro",
      description: "Que tal aquela notinha para o banheiro utilizado, para as próximas pessoas que usarem saberem o que você achou dele. Não se preocupe a sua identidade será mantida.",
      image: "assets/imgs/350x450.png",
    },
    {
      title: "Cadastrando Banheiro",
      description: "Descobriu um banheiro novo? Que tal adicionar ele no app para que mais pessoas usem ele.",
      image: "assets/imgs/350x450.png",
    },
  ];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IntroPage');
  }

  goToTabsPage() {
    //push another page onto the history stack
    //causing the nav controller to animate the new page in
    this.navCtrl.push(LoginPage);
  }

}
