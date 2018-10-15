import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { Facebook } from '@ionic-native/facebook';
import firebase from 'firebase';
import { GooglePlus } from '@ionic-native/google-plus';
import { AngularFireModule } from 'angularfire2';

import { IntroPageModule } from '../pages/intro/intro.module';
import { LoginPageModule } from '../pages/login/login.module';
import { MapsPageModule } from '../pages/maps/maps.module';
import { Geolocation } from '@ionic-native/geolocation';
import { CadastroBanheiroPageModule } from '../pages/cadastro-banheiro/cadastro-banheiro.module'

import { ConnectivityProvider } from '../providers/connectivity/connectivity';
import { GoogmeMapsClusterProvider } from '../providers/googme-maps-cluster/googme-maps-cluster';


export const firebaseConfig = {
  apiKey: "AIzaSyAAA-CoZcaF2tT2DKPCTnQPepP2tgIoSSQ",
  authDomain: "mypoopyproject-198f6.firebaseapp.com",
  databaseURL: "https://mypoopyproject-198f6.firebaseio.com",
  projectId: "mypoopyproject-198f6",
  storageBucket: "mypoopyproject-198f6.appspot.com",
  messagingSenderId: "192689498859"
};

firebase.initializeApp(firebaseConfig);

@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IntroPageModule, 
    LoginPageModule,
    MapsPageModule,
    CadastroBanheiroPageModule,
    AngularFireModule.initializeApp(firebaseConfig),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AndroidPermissions,
    Geolocation,
    ConnectivityProvider,
    GoogmeMapsClusterProvider,
    Facebook,
    GooglePlus
  ]
})
export class AppModule {}
