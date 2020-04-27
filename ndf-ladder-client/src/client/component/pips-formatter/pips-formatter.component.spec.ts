import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PipsFormatterComponent } from './pips-formatter.component';

describe('PipsFormatterComponent', () => {
  let component: PipsFormatterComponent;
  let fixture: ComponentFixture<PipsFormatterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PipsFormatterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PipsFormatterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
