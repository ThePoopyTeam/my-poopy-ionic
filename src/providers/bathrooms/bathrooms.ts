import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

/*
  Generated class for the BathroomsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class BathroomsProvider {
  private API_URL = 'https://mypoopy.herokuapp.com/';

  constructor(public http: HttpClient) {
    console.log('Hello BathroomsProvider Provider');
  }

  createBathroom(nome: String, endereco: String, caracte: String, lat: Number, lon: Number, hAb:String, hFe: String) {
    return new Promise((resolve, reject) => {
      var data = {
        nome: nome,
        endereco: endereco,
        caracte: caracte,
        lat: lat,
        lon: lon,
        hAb:hAb,
        hFe:hFe
      };

      
      
      this.http.post(this.API_URL + 'api/bathroom/', data, { headers: { 'Content-Type': 'application/json', 'uid': uid.toString() } })
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

}
