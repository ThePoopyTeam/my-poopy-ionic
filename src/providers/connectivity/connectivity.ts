import { environment } from './../../environments/environment.prod';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
/*
  Generated class for the ConnectivityProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ConnectivityProvider {

  constructor(private httpClient: HttpClient) { }


  post(uri: string, body: any, uid: string) {
    const headers = this.configureHeaders(uid);
    return this.httpClient.post(`${environment.BASE_URL}/${uri}`, body, headers);
  }

  private configureHeaders(uid: string) {
      return {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'uid': uid
        })
      };
  }


}
