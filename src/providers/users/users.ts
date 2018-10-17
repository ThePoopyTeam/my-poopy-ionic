import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the UsersProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UsersProvider {
  private API_URL = 'https://mypoopy.herokuapp.com/';

  constructor(public http: HttpClient) {
    console.log('Hello UsersProvider Provider');
  }

  createAccount(nome:String, email: String, imagem: String, experiencia: Number, uid: String) {
    return new Promise((resolve, reject) => {
      var data = {
        nome: nome,
        email: email,
        imagem: imagem,
        experiencia:experiencia
      };

      console.log('uid create acount: ' + uid )
     

      
      console.log(data)
      
      this.http.post(this.API_URL + 'api/user/', data, { headers: { 'Content-Type': 'application/json', 'uid': uid.toString() }})
        .subscribe((result: any) => {
          alert('Foi')
          resolve(result.json());
           
        },
          (error) => {
            alert('não Foi')
            reject(error.json());
            
          });
    });
  }

}
