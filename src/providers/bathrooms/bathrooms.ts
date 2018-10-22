import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';


/*
  Generated class for the BathroomsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class BathroomsProvider {
  private API_URL = 'https://mypoopy.herokuapp.com/';
  uid:string

  constructor(public http: HttpClient, public storage: Storage) {
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

      this.storage.get('uidNumber').then(done => {
        this.uid = done
      });
      
      this.http.post(this.API_URL + 'api/bathroom/', data, { headers: { 'Content-Type': 'application/json', 'uid': this.uid } })
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

}
