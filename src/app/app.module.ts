import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { AndroidPermissions } from '@ionic-native/android-permissions';

import { IntroPageModule } from '../pages/intro/intro.module';
import { LoginPageModule } from '../pages/login/login.module';
import { MapsPageModule } from '../pages/maps/maps.module';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { GooglePlus } from '@ionic-native/google-plus';

const firebaseConfig = {
  apiKey: "AIzaSyAAA-CoZcaF2tT2DKPCTnQPepP2tgIoSSQ",
  authDomain: "mypoopyproject-198f6.firebaseapp.com",
  databaseURL: "https://mypoopyproject-198f6.firebaseio.com",
  projectId: "mypoopyproject-198f6",
  storageBucket: "mypoopyproject-198f6.appspot.com",
  messagingSenderId: "192689498859"
}


@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    IntroPageModule, 
    LoginPageModule,
    MapsPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    GooglePlus,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AndroidPermissions,
  ]
})
export class AppModule {}
