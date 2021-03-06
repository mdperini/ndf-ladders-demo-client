import { Component, OnInit } from '@angular/core';
import { UserPreferenceService } from '../../services/user-preference.service';

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html'
})

export class WorkspaceComponent implements OnInit {
  layoutConfig = [];
  constructor(private userPreference: UserPreferenceService) {}

  ngOnInit() {
    this.userPreference
      .getUserPreferences()
      .toPromise()
      .then((result: any) => {
        this.layoutConfig = result;
      });
  }

  onCcySelected(priceTile, value) {
    priceTile.symbol = value;
    console.log('state change', this.layoutConfig);
    this.savePreferences();
  }

  onAdd($Event) {
    this.layoutConfig.push({
      symbol: 'EURUSD'
    });
    this.savePreferences();
  }

  onCcyRemove(priceTile) {
    this.layoutConfig = this.layoutConfig.filter((x) => x !== priceTile);
    this.savePreferences();
  }

  savePreferences() {
    this.userPreference
      .saveUserPreferences(this.layoutConfig)
      .toPromise()
      .then(() => {
        console.log('savePreferences');
      });
  }
}
