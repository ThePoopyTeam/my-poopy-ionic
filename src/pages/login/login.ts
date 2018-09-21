import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MapsPage } from '../maps/maps';
import { Facebook } from '@ionic-native/facebook';
import firebase from 'firebase';
import { GooglePlus } from '@ionic-native/google-plus';
import { AngularFireModule } from 'angularfire2';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public facebook: Facebook, public googleplus: GooglePlus) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  goToTabsPage() {
    //push another page onto the history stack
    //causing the nav controller to animate the new page in
    this.navCtrl.push(MapsPage);
  }

  fbLogin(){
    this.facebook.login(['email']).then(res => {
      const fc = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
      firebase.auth().signInWithCredential(fc).then(fs => {
        alert("Fb login success");
        alert(JSON.stringify(fs));
        this.navCtrl.push(MapsPage);
      }).catch(ferr => {
        alert("FB login not success")
      })
    }).catch(err =>{
      alert(JSON.stringify(err));
    })
  }

  googleLogin(){
    this.googleplus.login({
      'webClientId': '192689498859-66libcec4t10p7m49igtn9lqg9f11tco.apps.googleusercontent.com',
      'offline' : true
    }).then(res => {
      const gc = firebase.auth.GoogleAuthProvider.credential(res.idToken);
      firebase.auth().signInWithCredential(gc).then(suc => {
        alert("Google login success");
        alert(JSON.stringify(suc));
      }).catch(ns => {
        alert("Google login not success");
      })
      }).catch(err => {
        alert(JSON.stringify(err));
      })
  }
}
