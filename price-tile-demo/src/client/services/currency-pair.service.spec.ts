import { TestBed } from '@angular/core/testing';

import { CurrencyPairService } from './currency-pair.service';

describe('CurrencyPairService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CurrencyPairService = TestBed.get(CurrencyPairService);
    expect(service).toBeTruthy();
  });
});
