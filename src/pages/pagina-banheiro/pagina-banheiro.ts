import { Component, Input } from '@angular/core';
import { Storage } from '@ionic/storage';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing'

@IonicPage()
@Component({
  selector: 'page-pagina-banheiro',
  templateUrl: 'pagina-banheiro.html',
})
export class PaginaBanheiroPage {

  //avaliação
  @Input() numStarts: number = 5;
  @Input() value: number = 2.5;

  stars: string[] = [];
  rater: any;

  //dados das caracteristicas apenas exemplos
  public catacteristicas: any;

  //compartilhar 
  messager:string = "Ficou apertado na rua? Sabia que pode ter uma banheiro perto de você!";
  image: string = "http://i.imgur.com/wGHstRB.jpg";
  url:string = "http://www.mypoopy.com";
  number:string = null;

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

  //AVALIAÇÃO DOS BANHEIROS
  ngAfterViewInit(){
    this.calcStars();
    
  }

  calcStars(){

    let tmp = this.value;
    for(let i=0; i<this.numStarts; i++, tmp--) {
      if(tmp>1){
			  this.stars.push("star")
		  }else if (tmp  >0 && tmp<1) {
			  this.stars.push("star-half")
		  }else {
			  this.stars.push("star-outline")
		  }
    }

  }

  starClicked(index){
    console.log("index: " + (index + 1));

    //adicionando a nota a variavel rater.
    if ( index + 1 == 1) {
      this.rater = 0
      console.log("nota: " + this.rater)
    }else if( index + 1 == 2) {
      this.rater = 2.5
      console.log("nota: " + this.rater)
    }else if ( index + 1 == 3) {
      this.rater = 5.0
      console.log("nota: " + this.rater)
    }else if (index + 1 == 4) {
      this.rater = 7.5
      console.log("nota: " + this.rater)
    }else if (index + 1 == 5) {
      this.rater = 10.0
      console.log("nota: " + this.rater)
    }
  }

}

export interface BanheiroView {
  name: String;
  end: String;
  hAberto: String;
  hFechado: String;
  caracteristicas: any[];
}
