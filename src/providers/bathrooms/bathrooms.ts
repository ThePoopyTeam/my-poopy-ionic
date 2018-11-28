import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
import { environment } from '../environments';

@Injectable()
export class BathroomsProvider {
  private API_URL = `${environment.api}bathroom`;
  private uid:string

  constructor(
      private http: HttpClient,
      private storage: Storage) { }

  createBathroom(bathroom) {
      console.log('CREATE')
      console.log('URL ==> ', this.API_URL);
      // this.storage.get('uidNumber').then(done => {
      //   console.log('Done => ', done);
      //   this.uid = done;
      // });

      const headers = { 
        headers: { 
          'Content-Type': 'application/json',
          'uid': 'q0tMl6ZQwpWAkCY9qkgk4Obh6R13'
        } 
      };
      console.log(JSON.stringify(bathroom));
      return this.http.post(this.API_URL, bathroom, headers);
  }


  findAll() {
    const headers = { 
      headers: { 
        'Content-Type': 'application/json',
        'uid': 'q0tMl6ZQwpWAkCY9qkgk4Obh6R13'
      } 
    };

    return this.http.get(this.API_URL, headers);
  }

}
