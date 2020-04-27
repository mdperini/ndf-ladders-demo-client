import { Component, OnInit, Input, Output, OnChanges, EventEmitter, SimpleChanges } from '@angular/core';
import { StaticDataService } from 'src/client/services/static-data.service';

@Component({
  selector: 'app-price-quote',
  templateUrl: './price-quote.component.html'
})
export class PriceQuoteComponent implements OnInit, OnChanges {
  @Input() display: string;
  @Input() side: string;
  @Input() price: number;
  @Input() symbol: string;

  @Output() execute = new EventEmitter<string>();
  marketDirection: string;

  ccyPair = {
    symbol: 'EURUSD',
    bid: 'EUR',
    term: 'USD',
    totalFractionalDigits: 5,
    pipStartIdx: 4,
    pipLength: 2,
    basePrice: 1.1423
  };

  constructor(private staticDataService: StaticDataService) {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes && changes.symbol && changes.symbol.currentValue) {
      this.staticDataService.getCCY().then((ccyPairs: any[]) => {
         const result = ccyPairs.find((ccypair) => ccypair.symbol === this.symbol);
         if (result) {
          this.ccyPair = result;
        }
      });
    }

    if (changes && changes.price && changes.price.currentValue) {
      this.marketDirection = this.staticDataService.setMarketDirection(this.price);
      // console.log(`marketDirection ${this.marketDirection}`);
      this.staticDataService.setPrice(this.price);
    }
  }

  onClick($event) {
    this.execute.next(this.side);
  }
}

