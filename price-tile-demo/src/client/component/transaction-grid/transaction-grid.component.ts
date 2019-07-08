import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TransactionService } from 'src/client/services/transaction.service';

@Component({
  selector: 'app-transaction-grid',
  templateUrl: './transaction-grid.component.html'
})
export class TransactionGridComponent implements OnInit {
  columnDefs = [
    { headerName: 'Symbol', field: 'symbol', sortable: true },
    { headerName: 'Type', field: 'priceType' },
    { headerName: 'Amount', field: 'amount', sortable: true },
    { headerName: 'Side', field: 'side', sortable: true },
    { headerName: 'Date', field: 'date' },
    { headerName: 'Rate', field: 'rate' }
  ];

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
    private transactionService: TransactionService
  ) {}

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
}
