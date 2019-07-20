import { Component, OnInit, Input, Output, OnChanges, EventEmitter, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-price-quote',
  templateUrl: './price-quote.component.html'
})
export class PriceQuoteComponent implements OnInit, OnChanges {
  @Input() display: string;
  @Input() side: string;
  @Input() price: number;
  @Output() execute = new EventEmitter<string>();
  prevPrice: number;
  marketDirection: string;
  constructor() {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes && changes.price && changes.price.currentValue) {
      this.marketDirection = this.setMarketDirection();
      this.prevPrice = this.price;
    }
  }
  onClick($event) {
    this.execute.next(this.side);
  }

  getCurrentPrice(direction: string, from: number, to: number) {
    if (!this.price) {
      // display zero rate until data is received
      return (0.0).toFixed(10).substring(from, to);
    }
    return this.price.toString().substring(from, to);
  }

  setMarketDirection(): string {
    let direction = 'up';

    if (this.prevPrice && this.price) {
      direction = (this.price >= this.prevPrice) ? 'up' : 'down';
     }

    return direction;
  }

}

