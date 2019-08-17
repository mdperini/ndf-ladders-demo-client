import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { TransactionService } from 'src/client/services/transaction.service';
import { GridService } from 'src/client/services/grid.service';
import { ColDef, GridOptions } from 'ag-grid-community';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-transaction-grid',
  templateUrl: './transaction-grid.component.html'
})
export class TransactionGridComponent implements OnInit, OnDestroy {
  @ViewChild('vcAgGridAngular') vcAgAridAngular: any;
  columnDefs: ColDef[];
  defaultColDef: any;
  gridOptions: GridOptions;
  refreshSubscription: Subscription;
  rowData: any;

  constructor(
    private gridService: GridService,
    private transactionService: TransactionService) {
  }

  ngOnInit() {

    this.applyColumnDefinitions(this.gridService.getColumnDefinitions());
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

      if (columnDefinition.cellClass) {
        definition.cellClass = columnDefinition.cellClass;
      }

      if (columnDefinition.filter) {
        definition.filter = columnDefinition.filter;
      }

      if (columnDefinition.sort) {
        definition.sort = columnDefinition.sort;
      }

      this.columnDefs.push(definition);
    });

    this.defaultColDef =  {
      // set filtering on for all cols
      filter: true,
      // all columns sortable
      sortable: true,
      // all columns resizable
      resizable: true,

      rowSelection: 'single',

      minWidth: 120
    };
  }

  private setUpGrid() {
    this.gridOptions = {
      // components: {
      //   loadingRenderer: function (params) {
      //     if (params.value !== undefined) {
      //       return params.value;
      //     } else {
      //       return 'Loading...'
      //     }
      //   }

      // },
      enableColResize: true,
      rowBuffer: 0,
      // debug: this.debug,
      groupUseEntireRow: true,
      rowSelection: 'single',
      rowDeselection: true,
      // columnDefs: this.ColumnDef,
      rowModelType: 'infinite',
      paginationPageSize: 100,
      cacheOverflowSize: 2,
      maxConcurrentDatasourceRequests: 2,
      infiniteInitialRowCount: 1,
      maxBlocksInCache: 2,
      rowHeight: 30,
      headerHeight: 30,
      defaultColDef: {
        editable: false
      },
      onGridReady: () => {
        this.gridOptions.columnApi.setColumnVisible('side', true);
        this.gridOptions.columnApi.setColumnVisible('Side', true);
        // this.subscribeToBlotterData();
        // this.subscribeToLayoutConfig();
        // this.filterStateService.initFilters(this.filterTopic);
        // if (this.gridEvents) {
        //   this.gridEvents.emit(BlotterGridEvents.GridReady)
        // }
      },
      // onDragStopped: (e: DragStoppedEvent) => {
      //   this.handleColumnMoved(e);
      // }
    };
  }
}

