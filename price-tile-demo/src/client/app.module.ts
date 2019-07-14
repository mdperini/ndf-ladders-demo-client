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

import { AgGridModule } from 'ag-grid-angular';

import { DatePipe, DecimalPipe } from '@angular/common';

import { PricePipe } from './formatprice.pipe';

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
    PricePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    AgGridModule.withComponents([])
   
  ],
  providers: [
    DatePipe,
    DecimalPipe,
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
