import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges, 
  OnDestroy
} from '@angular/core';
import { Subscription } from 'rxjs';
import { PricingService } from 'src/client/services/pricing.service';
import { TransactionService } from 'src/client/services/transaction.service';

@Component({
  selector: 'app-price-tile',
  templateUrl: './price-tile.component.html'
})
export class PriceTileComponent implements OnInit, OnChanges, OnDestroy {
  @Input() symbol: string;
  @Output() ccySelected = new EventEmitter<any>();
  @Output() ccyRemove = new EventEmitter<any>();
  priceSubscription: Subscription;
  executionSubscription: Subscription;

  bidRate: any;
  termRate: any;
  amount = 10000;

  constructor(
    private pricingService: PricingService,
    private transactionService: TransactionService
  ) {}

  ngOnInit() {}

  ngOnDestroy() {
    if (this.priceSubscription) {
      this.priceSubscription.unsubscribe();
    }

    if (this.executionSubscription) {
      this.executionSubscription.unsubscribe();
    }
  }

  ngOnChanges() {
    this.subscribeToLivePrices();
  }

  subscribeToLivePrices() {
    if (this.priceSubscription) {
      this.priceSubscription.unsubscribe();
      this.bidRate = null;
      this.termRate = null;
    }

    this.priceSubscription = this.pricingService
      .getLivePrices(this.symbol)
      .subscribe((x: any) => {
       this.bidRate = x.bidRate.toFixed(5);
       this.termRate = x.termRate.toFixed(5);
       console.log(`quote ${x.symbol} ${this.symbol} ${this.bidRate} ${this.termRate} `);
      });
  }

  postTransaction(side) {
    this.executionSubscription = this.transactionService
      .postTransaction(this.symbol, side, this.amount)
      .subscribe(
        (res) => {
          console.log(`res ${JSON.stringify(res)}`);
          this.transactionService.OnNext();
        },
        (err) => {
          console.log(err);
        }
      );
  }

  onSelected($event) {
    this.ccySelected.emit($event);
  }

  onRemove(value) {
    this.ccyRemove.emit(value);
  }
}

