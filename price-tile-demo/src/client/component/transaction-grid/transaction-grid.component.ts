import { Component, OnInit, OnDestroy } from '@angular/core';
import { TransactionService } from 'src/client/services/transaction.service';
import { CurrencyPipe, DatePipe, DecimalPipe } from '@angular/common';
import { StringFormatter } from '../pipes/string-formatter.pipe';
import { NumericFormatter } from '../pipes/number-formatter.pipe';

import { ColDef } from 'ag-grid-community';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-transaction-grid',
  templateUrl: './transaction-grid.component.html'
})
export class TransactionGridComponent implements OnInit, OnDestroy {
  columnDefs: ColDef[];
  defaultColDef: any;
  gridOptions: any;
  refreshSubscription: Subscription;

  rowData: any;

  columnDefinitions = [
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
                      }
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
      valueFormatter: (data) => this.decimalPipe.transform(data.value, '1.2-5')
    },
    {
      header: 'Transaction',
      name: 'date',
      type: 'date',
      valueFormatter: (data) => this.dateFormatter.transform(data.value, 'MMM dd yyyy hh:mm:ss'),
      sort: 'desc'

    }];

  constructor(
    private transactionService: TransactionService,
    private dateFormatter: DatePipe,
    private decimalPipe: DecimalPipe,
    private numericFormatter: NumericFormatter,
    private currencyPipe: CurrencyPipe,
    private stringFormatter: StringFormatter) {
  }

  ngOnInit() {
    this.applyColumnDefinitions(this.columnDefinitions);
    this.getTransactions();
    this.refreshSubscription = this.transactionService.getOrderExecutedSubject()
                                                      .subscribe(() => {
                                                        this.getTransactions();
                                                      });
  }

  ngOnDestroy() {
    if (this.refreshSubscription) {
      this.refreshSubscription.unsubscribe();
    }
  }

  private getTransactions() {
    this.transactionService.getTransactions()
                           .then((result: any) => {
                              this.rowData = result;
                            });
  }

  applyColumnDefinitions(columnDefinitions: any[]) {
    this.columnDefs = [];
    columnDefinitions.forEach((columnDefinition: any) => {
      const definition: ColDef = {};
      definition.headerName = columnDefinition.header;
      definition.field = columnDefinition.name;

      if (columnDefinition.valueFormatter) {
        definition.valueFormatter = columnDefinition.valueFormatter;
      }

      if (columnDefinition.cellClassRules) {
        definition.cellClassRules = columnDefinition.cellClassRules;
      }

      if (columnDefinition.sort) {
        definition.sort = columnDefinition.sort;
      }

      this.columnDefs.push(definition);
    });


    this.defaultColDef =  {
      // all columns sortable
      sortable: true,
      // all columns resizable
      resizable: true,

      rowSelection: 'single',

      minWidth: 120
    };

    this.gridOptions = {
      /* Label columns */
      headerHeight: 20
    };
  }
}
