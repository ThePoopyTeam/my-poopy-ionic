import { Component, ViewChild } from '@angular/core';
import { Platform, AlertController, Nav, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AndroidPermissions } from '@ionic-native/android-permissions';

// import { IntroPage } from '../pages/intro/intro';

// Paginas do menu
import { CadastroBanheiroPage } from '../pages/cadastro-banheiro/cadastro-banheiro'
import { MapsPage } from '../pages/maps/maps';

@Component({
  templateUrl: 'app.html',
  selector: 'page-app'
})

export class MyApp {
  rootPage:any = MapsPage;

  constructor(
    public platform: Platform, 
    statusBar: StatusBar, 
    splashScreen: SplashScreen,
    androidPermissions: AndroidPermissions, 
    private alertCtrl: AlertController,
    ) {
    platform.ready().then(() => {
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
          console.log("tem permissão?  " + JSON.stringify(success));

          if (success.hasPermission == false) {
            console.log("Ainda não tem todas as permissões");
            this.alertaNotificacao();
          } else {
            console.log("Tem todas as permisões!");

          }
        }
      ); 
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

