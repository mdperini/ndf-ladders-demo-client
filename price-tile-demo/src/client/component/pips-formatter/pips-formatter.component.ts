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

  setMarketDirection(): string {
    let direction = 'up';

    if (this.prevPrice && this.price) {
      direction = (this.price >= this.prevPrice) ? 'up' : 'down';
     }

    return direction;
  }
}
