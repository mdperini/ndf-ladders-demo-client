import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-price-quote',
  templateUrl: './price-quote.component.html'
})
export class PriceQuoteComponent implements OnInit {
  @Input() side: string;
  @Input() price: number;
  @Output() buySellClick = new EventEmitter<string>();

  constructor() {}

  ngOnInit() {}

  onBuySellClick($event) {
    this.buySellClick.emit(this.side);
  }
}
