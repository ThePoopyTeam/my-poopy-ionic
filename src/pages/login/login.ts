import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { MapsPage } from '../maps/maps';
import { Facebook } from '@ionic-native/facebook';

import { UsersProvider } from './../../providers/users/users';

import { Storage } from '@ionic/storage';

//Login Google
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { GooglePlus } from '@ionic-native/google-plus';
import { Platform } from 'ionic-angular'

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
  uid: Boolean;
  nome;
  imagem;

  user: Observable<firebase.User>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public facebook: Facebook,
    private userProvider: UsersProvider,
    private toast: ToastController,
    public storage: Storage,
    //login google
    private afAuth: AngularFireAuth,
    private gplus: GooglePlus,
    private platform: Platform) {

    this.storage.get('uid').then(done => {
      if (!done) {

        this.uid = true
      } else {
        this.navCtrl.setRoot(MapsPage);
        this.uid = false
      }
    });


    //login com o google
    this.user = this.afAuth.authState;

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  ionViewCanEnter(): boolean {

    if (this.uid) {
      return false
    }
    return true

  }


  goToTabsPage() {
    //push another page onto the history stack
    //causing the nav controller to animate the new page in
    this.navCtrl.push(MapsPage);
  }

  fbLogin() {
    this.facebook.login(['email']).then(res => {
      const fc = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
      firebase.auth().signInWithCredential(fc).then(fs => {
        this.toast.create({ message: 'Usuário logado com sucesso. ', position: 'botton', duration: 3000 }).present();
        this.storage.set('uid', true);
        this.storage.set('uidNumber', fs.uid.toString());
        this.nome = this.storage.set('name', fs.displayName.toString());
        this.imagem = this.storage.set('photo', fs.photoURL.toString());
        this.navCtrl.push(MapsPage);

        /*
        this.model = new User();
        this.model.nome = fs.displayName.toString()
        this.model.email = fs.email.toString()
        this.model.imagem = fs.photoURL.toString()
        this.model.experiencia = 0
        this.model.uid = fs.uid.toString()
        
 
        //chama provider
        this.userProvider.createAccount(this.model.nome, this.model.email, this.model.imagem, this.model.experiencia, this.model.uid)
          .then((result: any) => {
            this.toast.create({ message: 'Usuário logado com sucesso. ', position: 'botton', duration: 3000 }).present();
            
            this.storage.set('uid', true);
            this.storage.set('uidNumber', this.model.uid);
            //Salvar o token no Ionic Storage para usar em futuras requisições.
            //Redirecionar o usuario para outra tela usando o navCtrl
            //this.navCtrl.pop();
            //this.navCtrl.setRoot()
            this.navCtrl.push(MapsPage);
          })
          .catch((error: any) => {
            this.toast.create({ message: 'Erro ao logar. Tente novamente!!!', position: 'botton', duration: 3000 }).present();
            console.log(error.error)
          });

          */


      }).catch(ferr => {
        this.toast.create({ message: 'Erro ao logar. Tente novamente!!!', position: 'botton', duration: 3000 }).present();
        console.log(ferr)
      })
    }).catch(err => {
      console.log(err)
    })
  }

  /*
  * LOGIN COM O GMAIL E LOGOUT
  */

  googleLogin2() {
    if (this.platform.is('cordova')) {
      this.nativeGoogleLogin();
    } else {
      this.webGoogleLogin();
    }
  }

  async nativeGoogleLogin(): Promise<void> {
    try {

      const gplusUser = await this.gplus.login({
        'webClientId': '192689498859-66libcec4t10p7m49igtn9lqg9f11tco.apps.googleusercontent.com',
        'offline': true,
        'scopes': 'profile email'
      })

      await
        this.afAuth.auth.signInWithCredential(firebase.auth.GoogleAuthProvider.credential(gplusUser.idToken))

    } catch (err) {
      console.log(err)
    }
  }


  async webGoogleLogin(): Promise<void> {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      const credential = await this.afAuth.auth.signInWithPopup(provider);

    } catch (err) {
      console.log(err)
    }

  }

  signOut() {
    this.afAuth.auth.signOut();
    if (this.platform.is('cordova')) {
      this.gplus.logout();
    }
  }


  // googleLogin(){
  //   console.log('apertou botão google')
  //   this.googleplus.login({
  //     'webClientId': '192689498859-66libcec4t10p7m49igtn9lqg9f11tco.apps.googleusercontent.com',
  //     'offline': true
  //   }).then(res => {
  //     const gc = firebase.auth.GoogleAuthProvider.credential(res.idToken);
  //     console.log('Log 1: ' + gc)
  //     firebase.auth().signInWithCredential(gc).then(suc => {
  //       this.toast.create({ message: 'Usuário logado com sucesso. ', position: 'botton', duration: 3000 }).present();

  //       this.storage.set('uid', true);
  //       this.storage.set('uidNumber', suc.uid.toString());
  //       this.navCtrl.push(MapsPage);
  //       /*

  //       this.model = new User();
  //       console.log(suc)
  //       this.model.nome = suc.displayName.toString()
  //       this.model.email = suc.providerData[0].email.toString()
  //       this.model.imagem = suc.photoURL.toString()
  //       this.model.experiencia = 0
  //       this.model.uid = suc.uid.toString()

  //       //chama provider
  //       this.userProvider.createAccount(this.model.nome, this.model.email, this.model.imagem, this.model.experiencia, this.model.uid)
  //         .then((result: any) => {
  //           this.toast.create({ message: 'Usuário logado com sucesso. ', position: 'botton', duration: 3000 }).present();

  //           this.storage.set('uid', true);
  //           this.storage.set('uidNumber', this.model.uid);

  //           //Salvar o token no Ionic Storage para usar em futuras requisições.
  //           //Redirecionar o usuario para outra tela usando o navCtrl
  //           //this.navCtrl.pop();
  //           //this.navCtrl.setRoot()
  //           this.navCtrl.push(MapsPage);
  //         })
  //         .catch((error: any) => {
  //           this.toast.create({ message: 'Erro ao logar. Tente novamente!!!', position: 'botton', duration: 3000 }).present();
  //           console.log(error.error)
  //         });

  //         */
  //     }).catch(ns => {
  //       this.toast.create({ message: 'Erro ao logar. Tente novamente!!!', position: 'botton', duration: 3000 }).present();
  //       console.log(ns)
  //     })
  //   }).catch(err => {
  //     console.log(err)
  //   })
  // }
}

export class User {
  nome: String;
  email: String;
  imagem: String;
  experiencia: Number;
  uid: String;
}