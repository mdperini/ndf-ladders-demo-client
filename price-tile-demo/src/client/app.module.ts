import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CurrencyPickerComponent } from './component/currency-picker/currency-picker.component';

import { PriceTileComponent } from './component/price-tile/price-tile.component';
import { PriceQuoteComponent } from './component/price-quote/price-quote.component';
import { WorkspaceComponent } from './component/workspace/workspace.component';
import { TransactionGridComponent } from './component/transaction-grid/transaction-grid.component';
import { TokenInterceptor } from './services/interceptor';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { StaticDataService } from './services/static-data.service';

import { AuInputModule } from 'au-input';

import { AgGridModule } from 'ag-grid-angular';

import { DatePipe, DecimalPipe, CurrencyPipe } from '@angular/common';

import { NumericFormatter } from './component/pipes/number-formatter.pipe';
import { StringFormatter } from './component/pipes/string-formatter.pipe';
import { PipsFormatterPipe } from './component/pipes/formatprice.pipe';
import { PipsFormatterComponent } from './component/pips-formatter/pips-formatter.component';
import { LadderTenorComponent } from './component/ladder-tenor/ladder-tenor.component';
import { LadderQuoteComponent } from './component/ladder-quote/ladder-quote.component';

export function loadstaticData(staticDataService: StaticDataService) {
  return () => {
    return staticDataService.getCCY();
  };
}

@NgModule({
  declarations: [
    AppComponent,
    CurrencyPickerComponent,
    PriceTileComponent,
    PriceQuoteComponent,
    WorkspaceComponent,
    TransactionGridComponent,
    PipsFormatterPipe,
    PipsFormatterComponent,
    LadderTenorComponent,
    LadderQuoteComponent
  ],
  imports: [
    BrowserModule,
    AuInputModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    AgGridModule.withComponents([])
  ],
  providers: [
    CurrencyPipe,
    DatePipe,
    DecimalPipe,
    NumericFormatter,
    StringFormatter,
    {
      provide: APP_INITIALIZER,
      useFactory: loadstaticData,
      deps: [StaticDataService],
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
