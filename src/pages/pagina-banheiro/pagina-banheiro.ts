import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
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
  image: string = "http://i.imgur.com/wGHstRB.jpg";
  url:string = "http://www.mypoopy.com";
  number:string = null;

  //tabs
  editarTab: any;
  reportarTab: any;
  avaliarTab: any;

  banheiro: BanheiroView = {
    name: '',
    end: '',
    hAberto: '',
    hFechado: '',
    caracteristicas: []
  }
  hasData = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private storage: Storage,
    private socialSharing: SocialSharing) {

  }

  ionViewDidLoad() {
    this.getBanheiros();
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


  private getBanheiros() {
    this.storage.get('banheiros').then(response => {
      const requestBath = this.navParams.get('banheiro');
      const banheiros: any[] = JSON.parse(response);
      const finding = banheiros.find(banheiro => 
                          (banheiro.lat === requestBath.lat) && (banheiro.lon === requestBath.lng));

      if (finding) {
        this.banheiro.name = finding.nome;
        this.banheiro.end = finding.endereco;
        this.banheiro.hAberto = finding.hAb;
        this.banheiro.hFechado = finding.hFe;
        this.banheiro.caracteristicas = finding.caracte;
        this.hasData = true;
      }
    });
  }

}

export interface BanheiroView {
  name: String;
  end: String;
  hAberto: String;
  hFechado: String;
  caracteristicas: any[];
}
