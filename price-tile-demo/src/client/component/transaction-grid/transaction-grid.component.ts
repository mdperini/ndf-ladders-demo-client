import { Component, OnInit, OnDestroy } from '@angular/core';
import { TransactionService } from 'src/client/services/transaction.service';
import { CurrencyPipe, DatePipe, DecimalPipe } from '@angular/common';
import { ColDef } from 'ag-grid-community';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-transaction-grid',
  templateUrl: './transaction-grid.component.html'
})
export class TransactionGridComponent implements OnInit, OnDestroy {
  columnDefs: ColDef[];
  defaultColDef: any;
  refreshSubscription: Subscription;

  rowData: any;
  columnDefinitions = [
    {
      header: 'Symbol',
      name: 'symbol',
    },
    {
      header: 'Type',
      name: 'priceType'
    },
    {
      header: 'Side',
      name: 'side'
    },
    {
      header: 'Notional',
      name: 'amount',
      type: 'currency'
    },
    {
      header: 'Rate',
      name: 'rate',
      type: 'price'
    },
    {
      header: 'Transaction',
      name: 'date',
      type: 'date'
    }];

  constructor(
    private transactionService: TransactionService,
    private dateFormatter: DatePipe,
    private numberFormatter: DecimalPipe,
    private currencyPipe: CurrencyPipe) {
  }

  ngOnInit() {
    this.setColumns(this.columnDefinitions);
    this.getTransactions();
    this.refreshSubscription = this.transactionService.getOrderSubject()
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
    this.transactionService.getTransactions().then((result: any) => {
      this.rowData = result;
    });
  }

  setColumns(columns: any[]) {
    this.columnDefs = [];
    columns.forEach((column: any) => {
      // const definition: ColDef = { headerName: column, field: column, minWidth: 120};
      const definition: ColDef = { minWidth: 120};
      definition.headerName = column.header;
      definition.field = column.name;
      if (column.name === 'side') {
        definition.cellClassRules = {
          'rag-green': 'x == "BUY"',
          'rag-red': 'x == "SELL"'
        };
      } else  if (column.type === 'date') {
        definition.valueFormatter = (data) =>
        this.dateFormatter.transform(data.value, 'MMM dd yyyy hh:mm:ss');
        definition.sort = 'desc';
      } else if (column.type === 'currency') {
        definition.valueFormatter =
          (data) => this.currencyPipe.transform(data.value );
      } else if (column.type === 'price') {
       definition.valueFormatter =
          (data) => this.numberFormatter.transform(data.value, '1.2-5');
      }
      this.columnDefs.push(definition);
      this.defaultColDef =  {
        // all columns sortable
        sortable: true,
        // all columns resizable
        resizable: true,

        rowSelection: 'single'
      };
    });
  }
}
