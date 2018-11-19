import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing'

@IonicPage()
@Component({
  selector: 'page-pagina-banheiro',
  templateUrl: 'pagina-banheiro.html',
})
export class PaginaBanheiroPage {

  //dados das caracteristicas apenas exemplos
  public catacteristicas: any;

  //compartilhar 
  messager:string = "Ficou apertado na rua? Sabia que pode ter uma banheiro perto de você!";
  image:string = "/assets/imgs/icone-perfil-banheiro.png";
  url:string = "google.com.br";
  number:string = null;

  //tabs
  editarTab: any;
  reportarTab: any;
  avaliarTab: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private socialSharing: SocialSharing) {

      this.shareViaWhatsApp()

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PaginaBanheiroPage');
  }

  shareViaWhatsApp() {

    this.socialSharing.shareViaWhatsApp(this.messager, 
      this.image, this.url).then(()=> {
      console.log('Message sent!')
    }).catch(()=> {
      console.log('error')
    });

  }

  //especifico contato

  shareViaWhatsAppToReceiver(){
      this.socialSharing.shareViaWhatsAppToReceiver(this.number, 
        this.messager, this.image, this.url).then(()=> {
        console.log('Message sent!')
      }).catch(()=> {
        console.log('error')
      });
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

}
