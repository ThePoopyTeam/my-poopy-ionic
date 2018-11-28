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
  email;

  user: Observable<firebase.User>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private userProvider: UsersProvider,
    private toast: ToastController,
    public storage: Storage,
    //login google
    private afAuth: AngularFireAuth,
    private gplus: GooglePlus,
    private platform: Platform,
    //Facebook
    public facebook: Facebook, ) {

    this.storage.get('uid').then(done => {
      if (!done) {

        this.uid = true
      } else {
        this.navCtrl.setRoot(MapsPage);
        this.uid = false
      }
    });


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

  /*
  * Login com o Facebook
  */
  fbLogin() {
    this.facebook.login(['email']).then(res => {
      const fc = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
      firebase.auth().signInWithCredential(fc).then(fs => {
        this.toast.create({ message: 'Usuário logado com sucesso. ', position: 'botton', duration: 3000 }).present();
        console.log(JSON.stringify(fs.providerData[0].email))
        this.storage.set('uid', true);
        this.storage.set('uidNumber', fs.uid.toString());
        this.nome = this.storage.set('name', fs.displayName.toString());
        this.imagem = this.storage.set('photo', fs.photoURL.toString());
        this.imagem = this.storage.set('email', fs.providerData[0].email.toString());
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

  googleLogin() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(res => {
        console.log('FROM ---GOOGLE----')
        console.log(res);

        // nome, email, photoURL
        console.log(res.user.displayName)
        console.log(res.user.email)
        console.log(res.user.photoURL)
        console.log(res.user.uid)

        //passando dados para o storage
        this.storage.set('uid', true)
        this.storage.set('userName', res.user.displayName)
        this.storage.set('emailUser', res.user.email)
        this.storage.set('userPhoto', res.user.photoURL)
        this.storage.set('uidNumber', res.user.uid)

        //adicionando ao model
        this.model = new User();
        this.model.nome = res.user.displayName;
        this.model.email = res.user.email;
        this.model.imagem = res.user.photoURL;
        this.model.experiencia = 0;
        this.model.uid = res.user.uid;

        //chamando a classe provider para passar os dados para o banco
        this.userProvider.createAccount(
          this.model.nome,
          this.model.email,
          this.model.imagem,
          this.model.experiencia,
          this.model.uid
        ).then((result:any) => {
          this.navCtrl.push(MapsPage);
          console.log('Arquivo salvo no provider')
        }).catch((error:any) => {
          console.log(error.error)
        });        
      })
  }

  logoutOfGoogle() {
    this.afAuth.auth.signOut();
  }
  
}

export class User {
  nome: String;
  email: String;
  imagem: String;
  experiencia: Number;
  uid: String;
}