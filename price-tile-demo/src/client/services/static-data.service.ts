import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StaticDataService {
  readonly serverUrl = environment.serverUrl + '/currencypairs';
  ccyPairs: object;

  constructor(private http: HttpClient) {}

  getCCY() {
    return new Promise((resolve) => {
      if (!this.ccyPairs) {
        this.http
          .get(this.serverUrl)
          .toPromise()
          .then((result: any) => {
            this.ccyPairs = result;
            resolve(this.ccyPairs);
          });
      } else {
        resolve(this.ccyPairs);
      }
    });
  }
}
