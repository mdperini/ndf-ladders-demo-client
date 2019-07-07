import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceTileComponent } from './price-tile.component';

describe('PriceTileComponent', () => {
  let component: PriceTileComponent;
  let fixture: ComponentFixture<PriceTileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PriceTileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PriceTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
