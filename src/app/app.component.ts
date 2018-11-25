import { Component } from '@angular/core';
import { Platform, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AndroidPermissions } from '@ionic-native/android-permissions';

import { Storage } from '@ionic/storage';
// Paginas do menu
import { CadastroBanheiroPage } from '../pages/cadastro-banheiro/cadastro-banheiro'
import { IntroPage } from '../pages/intro/intro';
import { LoginPage } from '../pages/login/login';
import { MapsPage } from '../pages/maps/maps';
import { PaginaBanheiroPage } from '../pages/pagina-banheiro/pagina-banheiro';
import { PaginaUsuarioPage } from '../pages/pagina-usuario/pagina-usuario';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  templateUrl: 'app.html',
  selector: 'page-app'
})

export class MyApp {
  //bota um if aqui, se tem uid no storage vai para mapa se não para intro

  rootPage:any;
  homePage:any;
  cadastroPage:any;
  paginaBanheiroPage:any;
  paginaUsuarioPage:any;
  loginPage:any;
  nome:any;
  imagem: any;
  
  constructor(
    public platform: Platform, 
    statusBar: StatusBar, 
    splashScreen: SplashScreen,
    androidPermissions: AndroidPermissions, 
    private alertCtrl: AlertController,
    private storage: Storage,
    private afAuth: AngularFireAuth
    ) {
    platform.ready().then(() => {
       //this.storage.set('intro-done', false)
       //this.storage.set('uid', false)


      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      
      androidPermissions.requestPermissions([
        androidPermissions.PERMISSION.CAMERA,
        androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION,
        androidPermissions.PERMISSION.ACCESS_FINE_LOCATION,
        androidPermissions.PERMISSION.INTERNET,
        androidPermissions.PERMISSION.READ_CONTACTS
      ]).then(
        success => {
          if (success.hasPermission == false) {
             this.storage.set('intro-done', false)
             this.storage.set('uid', false)
            this.alertaNotificacao();
          } else {
          }
        }
      ); 
      
      //   this.storage.get('intro-done').then(done => {
      //     if (!done) {
      //       console.log('intro-done - Entrou Done intro')
      //       this.rootPage = IntroPage
      //     } else {
      //       console.log('intro-done - Entrou Done Login')
      //       this.rootPage = LoginPage
      //       this.storage.get('uid').then(done => {
      //         if (!done) {
      //           this.rootPage = LoginPage
      //           console.log('uid - Entrou Done Login')
      //         } else {
      //           this.rootPage = MapsPage
      //           console.log('uid - Entrou Done Maps')
      //         }
      //       });
      //     }
      //  });

      this.rootPage = MapsPage
    });
    
    // Ações No Menu - side bar
    this.homePage = MapsPage;
    this.cadastroPage = CadastroBanheiroPage;
    this.paginaBanheiroPage = PaginaBanheiroPage;
    this.paginaUsuarioPage = PaginaUsuarioPage;
    
    this.storage.get('name').then((done) => {
      this.nome = done
    })
    this.storage.get('photo').then((done) => {
      this.imagem = done
    });
   
  }

  alertaNotificacao() {
    let alert = this.alertCtrl.create({
      title: 'Permissões necessárias!',
      subTitle: 'Para você acessar o aplicativo, você precisa aceitar todas as permissões! Ou o aplicativo não irá funcionar.',
      buttons: [
        {
          text: "Ok",
          handler: () => { this.platform.exitApp() }
        }
      ]
    });
    alert.present();
  }
  
 
 
}

