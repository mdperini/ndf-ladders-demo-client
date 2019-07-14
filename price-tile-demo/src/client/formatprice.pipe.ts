import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'formatPrice'})
export class PricePipe implements PipeTransform {
  transform(price: number, side: string): any {
    return `<span class="price-tile-amount">${this.getCurrentPrice(price, side, 0, 4)}</span>
        <span class="price-tile-amount-tick" [ngClass]="marketDirection">${this.getCurrentPrice(price, side, 4, 6)}</span>
        <span  class="price-tile-amount">${this.getCurrentPrice(price, side, 6, 7)}</span>`;
  }

  getCurrentPrice(price: number, direction: string, from: number, to: number) {
    if (!price) {
      // display zero rate until data is received
      return (0.0).toFixed(10).substring(from, to);
    }
    return price.toString().substring(from, to);
  }
}
