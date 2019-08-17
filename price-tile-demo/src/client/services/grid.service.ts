import { Injectable } from '@angular/core';
import { CurrencyPipe, DatePipe, DecimalPipe } from '@angular/common';
import { NumericFormatter } from '../component/pipes/number-formatter.pipe';
import { StringFormatter } from '../component/pipes/string-formatter.pipe';

@Injectable({
  providedIn: 'root'
})
export class GridService {

  private columnDefinitions = [
    {
      header: 'Symbol',
      name: 'symbol',
      valueFormatter: (data) => this.stringFormatter.transform(data.value, 3, '/')
    },
    {
      header: 'Type',
      name: 'priceType'
    },
    {
      header: 'Side',
      name: 'side',
      cellClassRules: {
                       'rag-green': 'x == "BUY"',
                       'rag-red': 'x == "SELL"'
                      },
                      hide: true,
                      suppressToolPanel: true
    },
    {
      header: 'Notional',
      name: 'amount',
      type: 'currency',
      valueFormatter: (data) => this.numericFormatter.transform(data.value)
    },
    {
      header: 'Rate',
      name: 'rate',
      type: 'price',
      valueFormatter: (data) => this.numberFormatter.transform(data.value )
    },
    {
      header: 'Transaction',
      name: 'date',
      type: 'date',
      valueFormatter: (data) => this.dateFormatter.transform(data.value, 'MMM dd yyyy hh:mm:ss'),
      sort: 'desc'

    }];

  constructor(private dateFormatter: DatePipe,
              private numberFormatter: DecimalPipe,
              private currencyPipe: CurrencyPipe,
              private stringFormatter: StringFormatter,
              private numericFormatter: NumericFormatter) { }

  getColumnDefinitions() {
    return this.columnDefinitions;
  }

}

