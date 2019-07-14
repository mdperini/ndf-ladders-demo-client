import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TransactionService } from 'src/client/services/transaction.service';
import { DatePipe, DecimalPipe } from '@angular/common';
import { ColDef } from 'ag-grid-community';

@Component({
  selector: 'app-transaction-grid',
  templateUrl: './transaction-grid.component.html'
})
export class TransactionGridComponent implements OnInit {
  columnDefs: ColDef[];
  // rowData = [
  //   { 'car': 'Audi', 'releaseDate': '2018-01-04', 'price': 99000 },
  //   { 'car': 'Tesla', 'releaseDate': '2020-03-01', 'price': 49000 },
  //   { 'bus': 'MAN', 'releaseDate': '2015-02-02', 'price': 1234500 },
  //   { 'bus': 'Volvo', 'releaseDate': '2016-06-03', 'price': 2234500 }
  // ];

  // columnDefs = [
  //   { headerName: 'Symbol', field: 'symbol', sortable: true },
  //   { headerName: 'Type', field: 'priceType' },
  //   { headerName: 'Amount', field: 'amount', sortable: true },
  //   { headerName: 'Side', field: 'side', sortable: true },
  //   { headerName: 'Date', field: 'date', dateFormatter: },
  //   { headerName: 'Rate', field: 'rate' }
  // ];

  // columnDefs = [
  //   { headerName: 'Make', field: 'make', sortable: true, filter: true },
  //   { headerName: 'Model', field: 'model', sortable: true, filter: true },
  //   { headerName: 'Price', field: 'price', sortable: true, filter: true }
  // ];

  // rowData = [
  //   { make: 'Toyota', model: 'Celica', price: 35000 },
  //   { make: 'Ford', model: 'Mondeo', price: 32000 },
  //   { make: 'Porsche', model: 'Boxter', price: 72000 }
  // ];

   rowData: any;
  constructor(
    private http: HttpClient,
    private transactionService: TransactionService,
    private dateFormatter: DatePipe,
    private numberFormatter: DecimalPipe
  ) {
    const columns = ['symbol', 'priceType', 'side', 'amount',  'rate', 'date'];
    // const columns = ['car', 'bus', 'releaseDate', 'price'];
    this.setColumns(columns);
  }

  ngOnInit() {
    // this.rowData = this.http.get('https://api.myjson.com/bins/15psn9');
    this.getTransactions();
  }

  private getTransactions() {
    this.transactionService.getTransactions().then((result: any) => {
      this.rowData = result;
    });
  }

  onClickRefresh() {
    this.getTransactions();
  }

  setColumns(columns: string[]) {
    this.columnDefs = [];
    columns.forEach((column: string) => {
      const definition: ColDef = { headerName: column, field: column, minWidth: 120};
      if (column === 'symbol') {
        definition.headerName = 'Symbol';
      } else if (column === 'priceType') {
        definition.headerName = 'Order Type';
      } else if (column === 'side') {
        definition.headerName = 'Side';
      } else if (column.endsWith('date')) {
        definition.headerName = 'Trade Date';
        definition.valueFormatter = (data) => this.dateFormatter.transform(data.value, 'MMM dd yyyy hh:mm:ss');
      } else if (column === 'amount') {
        definition.headerName = 'Dealt Amount';
        definition.valueFormatter = (data) => this.numberFormatter.transform(data.value, '1.0-2');
        definition.type = 'numericColumn';
      } else if (column === 'rate') {
        definition.headerName = 'Order Rate';
        definition.valueFormatter = (data) => this.numberFormatter.transform(data.value, '1.2-5');
        definition.type = 'numericColumn';
      }
      this.columnDefs.push(definition);
    });
  }
}
