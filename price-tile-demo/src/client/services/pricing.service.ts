import { Injectable } from '@angular/core';
import * as nes from '@hapi/nes/lib/client';
import { Subject, Subscription } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PricingService {
  client: any;
  subscription: Subscription;
  bidRate: any;
  termRate: any;

  constructor() {}

  async connect() {
    if (!this.client) {
      this.client = new nes.Client(environment.webSocketUrl);
      await this.client.connect();
    }
    return this.client;
  }

  getLivePrices(symbol) {
    const subject = new Subject();

    this.connect().then(() => {
      const handler = (update, flags) => {
        // console.log('price', update);

        subject.next(update);
      };
      this.client.subscribe('/price/' + symbol, handler);
    });

    return subject;
  }
}
