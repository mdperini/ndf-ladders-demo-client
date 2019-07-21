import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StaticDataService {
  readonly serverUrl = environment.serverUrl + '/currencypairs';
  ccyPairs: object;
  price: number;
  prevPrice: number;

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

  getPriceSubString(price: number, ccyPair: any, part: number) {
    if (!price || !ccyPair) {
      // display dashes until data is received
      return '--';
    }

    const strPrice = price.toString();

    if (part === 1) {
      return strPrice.substring(0, ccyPair.pipStartIdx);

     } else if (part === 2) {
      return strPrice.substring(ccyPair.pipStartIdx, ccyPair.pipStartIdx + ccyPair.pipLength);
     }

    return strPrice.substring(ccyPair.pipStartIdx + ccyPair.pipLength, strPrice.length);
  }

  setMarketDirection(price: number): string {
    let direction = 'up';

    if (this.prevPrice && price) {
      direction = (price >= this.prevPrice) ? 'up' : 'down';
     }

    return direction;
  }

  setPrice(price: number) {
    this.price = price;
  }

}
