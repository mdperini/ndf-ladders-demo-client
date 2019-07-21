import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { StaticDataService } from 'src/client/services/static-data.service';

@Component({
  selector: 'app-pips-formatter',
  templateUrl: './pips-formatter.component.html'
})
export class PipsFormatterComponent implements OnInit, OnChanges {
  @Input() ccyPair: any;
  @Input() price: number;

  prevPrice: number;
  marketDirection: string;

  constructor(private staticDataService: StaticDataService) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes && changes.price && changes.price.currentValue) {
      this.marketDirection = this.setMarketDirection();
      this.prevPrice = this.price;
    }
  }

  getPriceSubString(price: number, ccyPair: any, part: number) {
    return this.staticDataService.getPriceSubString(
              price,
              ccyPair,
              part);
  }

  setMarketDirection(): string {
    let direction = 'up';

    if (this.prevPrice && this.price) {
      direction = (this.price >= this.prevPrice) ? 'up' : 'down';
     }

    return direction;
  }
}
