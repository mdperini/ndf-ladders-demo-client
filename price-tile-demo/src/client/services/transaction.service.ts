import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  readonly serverUrl = environment.serverUrl + '/transactions';

  constructor(private http: HttpClient) {}

  getTransactions() {
    return new Promise((resolve) => {
      this.http
        .get(this.serverUrl)
        .toPromise()
        .then((result: any) => {
          resolve(result);
        });
    });
  }

  postTransaction(symbol: string, side: string, amount: number) {
    const payload = {
      symbol: `${symbol}`,
      priceType: 'SPOT',
      side: side.toUpperCase(),
      amount
    };

    console.log(`http post ${JSON.stringify(payload)}`);

    return this.http.post(this.serverUrl, JSON.stringify(payload));
  }
}
