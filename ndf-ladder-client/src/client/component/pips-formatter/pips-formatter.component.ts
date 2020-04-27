import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { StaticDataService } from 'src/client/services/static-data.service';

@Component({
  selector: 'app-pips-formatter',
  templateUrl: './pips-formatter.component.html'
})
export class PipsFormatterComponent implements OnInit, OnChanges {
  @Input() ccyPair: any;
  @Input() price: number;
  marketDirection: string;

  constructor(private staticDataService: StaticDataService) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes && changes.price && changes.price.currentValue) {
      this.marketDirection = this.staticDataService.setMarketDirection(this.price);
      this.staticDataService.setPrice(this.price);
    }
  }

  getPriceSubString(price: number, ccyPair: any, part: number) {
    return this.staticDataService.getPriceSubString(
              price,
              ccyPair,
              part);
  } 
}
