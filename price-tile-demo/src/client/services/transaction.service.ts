import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

import { Observable, Subject, Subscription } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  readonly serverUrl = environment.serverUrl + '/transactions';
  executedOrder: Subject<boolean>;

  constructor(private http: HttpClient) {
    this.executedOrder = new Subject();
  }

  getOrderExecutedSubject(): Subject<boolean> {
    return this.executedOrder;
  }

  OnNext() {
    this.executedOrder.next(true);
  }

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
