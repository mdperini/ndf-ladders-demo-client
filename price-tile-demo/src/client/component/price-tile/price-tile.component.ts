import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges
} from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { PricingService } from 'src/client/services/pricing.service';
import { TransactionService } from 'src/client/services/transaction.service';

@Component({
  selector: 'app-price-tile',
  templateUrl: './price-tile.component.html'
})
export class PriceTileComponent implements OnInit, OnChanges {
  @Input() symbol: string;
  @Output() ccySelected = new EventEmitter<any>();
  @Output() ccyRemove = new EventEmitter<any>();
  subscription: Subscription;

  bidRate: any;
  termRate: any;
  amount = 10000;
  statusBar = '';

  constructor(
    private pricingService: PricingService,
    private transactionService: TransactionService
  ) {}

  ngOnInit() {}

  ngOnChanges() {
    console.log(`ngOnChanges ${this.symbol}`);
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.bidRate = null;
      this.termRate = null;
    }

    this.subscription = this.pricingService
      .getLivePrices(this.symbol)
      .subscribe((x: any) => {
       console.log(`x.symbol ${x.symbol} ${this.symbol}`); 
        this.bidRate = x.bidRate.toFixed(5);
        this.termRate = x.termRate.toFixed(5);
      });
     }


  postTransaction(side) {
    const result = this.transactionService
      .postTransaction(this.symbol, side, this.amount)
      .subscribe(
        (res) => {
          console.log(`res ${JSON.stringify(res)}`);
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

