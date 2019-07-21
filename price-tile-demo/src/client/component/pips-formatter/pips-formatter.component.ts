import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-pips-formatter',
  templateUrl: './pips-formatter.component.html'
})
export class PipsFormatterComponent implements OnInit, OnChanges {
  @Input() ccyPair: any;
  @Input() price: number;

  prevPrice: number;
  marketDirection: string;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes && changes.price && changes.price.currentValue) {
      this.marketDirection = this.setMarketDirection();
      this.prevPrice = this.price;
    }
  }

  getPriceSubString(price: number, ccyPair: any, part: number) {
    if (!this.price || !this.ccyPair) {
      // display zero rate until data is received
      return this.getDefaultPriceSubString(part);
    }

    const strPrice = price.toString();

    if (part === 1) {
      return strPrice.substring(0, ccyPair.pipStartIdx);

     } else if (part === 2) {
      return strPrice.substring(ccyPair.pipStartIdx, ccyPair.pipStartIdx + ccyPair.pipLength);
     }

    return strPrice.substring(ccyPair.pipStartIdx + ccyPair.pipLength, strPrice.length);
  }

  getDefaultPriceSubString(part: number): string {
   // display zero rate until data is received
   if (part === 1) {
    return (0.0).toFixed(10).substring(0, 4);

   } else if (part === 2) {
    return (0.0).toFixed(10).substring(4, 6);
   }

   return (0.0).toFixed(10).substring(6, 7);
  }

  setMarketDirection(): string {
    let direction = 'up';

    if (this.prevPrice && this.price) {
      direction = (this.price >= this.prevPrice) ? 'up' : 'down';
     }

    return direction;
  }


}
