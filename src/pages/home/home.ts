import { HttpClient } from '@angular/common/http';
import { GooglePlus } from '@ionic-native/google-plus';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  user: any = null;
  error: any = null;

  constructor(public navCtrl: NavController, 
              private googlePlus: GooglePlus,
              private httpClient: HttpClient) {

  }



  public loginGoogle() {
    // Faz a requisição para o login do gmail

    this.googlePlus.login({})
      .then(res => this.getUserDataByToken(res))
      .catch(err => this.error = err);
  }

  private getUserDataByToken(user) {
    // Se o login foi feito com sucesso aqui ele passa os dados iniciais do usuário;
    const token = user.token;

    // Faz uma requisição para o google para pegar mais dados do usuário
    this.httpClient.get(`https://www.googleapis.com/plus/v1/people/me?access_token=${token}`)
      .subscribe((userDataResponse: any) => {
        // Se a requisição foi feita com sucesso adiciona os novos dados do usuário e vai mostrar na tela
        // Deixei nessa ordem porque ai só vai mostrar na tela quando tiver todos os dados.
        this.user = user;
        this.user.name = userDataResponse.displayName;
        this.user.image = userDataResponse.image.url;
      });
  }


}
