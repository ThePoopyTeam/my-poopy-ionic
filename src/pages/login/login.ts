import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController  } from 'ionic-angular';
import { MapsPage } from '../maps/maps';
import { Facebook } from '@ionic-native/facebook';
import firebase from 'firebase';
import { GooglePlus } from '@ionic-native/google-plus';

import { UsersProvider } from './../../providers/users/users';
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
  model: User;

  constructor(public navCtrl: NavController, public navParams: NavParams, public facebook: Facebook, public googleplus: GooglePlus, private userProvider: UsersProvider, private toast: ToastController) {
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
        //this.navCtrl.push(MapsPage);
        this.model = new User();
        this.model.nome = JSON.stringify(fs.displayName)
        this.model.email = JSON.stringify(fs.email)
        this.model.imagem = JSON.stringify(fs.photoURL)
        this.model.experiencia = 0
        this.model.uid = fs.uid.toString()//JSON.stringify(fs.uid)
        
        console.log('uid: ' + this.model.uid)
 
        //chama provider
        this.userProvider.createAccount(this.model.nome, this.model.email, this.model.imagem, this.model.experiencia, this.model.uid)
          .then((result: any) => {
            this.toast.create({ message: 'Usuário criado com sucesso. Token: ' + result.token, position: 'botton', duration: 3000 }).present();

            //Salvar o token no Ionic Storage para usar em futuras requisições.
            //Redirecionar o usuario para outra tela usando o navCtrl
            //this.navCtrl.pop();
            //this.navCtrl.setRoot()
            alert('Foi do login')
          })
          .catch((error: any) => {
            this.toast.create({ message: 'Erro ao criar o usuário. Erro: ' + error.error, position: 'botton', duration: 3000 }).present();

            alert('não Foi do login')
          });




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
        this.navCtrl.push(MapsPage);
      }).catch(ns => {
        alert("Google login not success");
      })
      }).catch(err => {
        alert(JSON.stringify(err));
      })
  }
}

export class User {
  nome: String;
  email: String;
  imagem: String;
  experiencia: Number;
  uid:String;
}