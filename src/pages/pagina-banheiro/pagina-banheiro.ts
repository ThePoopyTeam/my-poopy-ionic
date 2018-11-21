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
  image: string = "https://lh5.googleusercontent.com/VHab3mjMKymyOOSCZLizTxdP2tNSkg5RhAbXBdwz-pGgoMI0fZ7kZvMT12wG9GF2MkdCMh021Kz4_80m9G9G=w1920-h969";
  url:string = "http://www.mypoopy.com";
  number:string = null;

  //tabs
  editarTab: any;
  reportarTab: any;
  avaliarTab: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private socialSharing: SocialSharing) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PaginaBanheiroPage');
  }

  shareViaWhatsApp() {

    this.socialSharing.shareViaWhatsApp(this.messager, 
      this.image, this.url).then(()=> {
      console.log('Mensagem enviada!')
      }).catch((error)=> {
      console.log('erro: ' + error)
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
