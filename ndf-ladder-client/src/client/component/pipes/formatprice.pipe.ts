import { Pipe, PipeTransform } from '@angular/core';
import { StaticDataService } from 'src/client/services/static-data.service';

@Pipe({name: 'pipsFormatter'})
export class PipsFormatterPipe implements PipeTransform {

  constructor(private staticDataService: StaticDataService) { }
  transform(price: number, ccyPair: any): any {
    return `<span class="price-tile-pips-sm">
        ${this.staticDataService.getPriceSubString(price, ccyPair, 1)}
      </span>
      <span class="price-tile-pips-lg">
        ${this.staticDataService.getPriceSubString(price, ccyPair, 2)}
      </span>
      <span  class="price-tile-pips-sm">
        ${this.staticDataService.getPriceSubString(price, ccyPair, 3)}
      </span>`;
  }
}
