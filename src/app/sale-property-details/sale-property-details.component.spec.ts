import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalePropertyDetailsComponent } from './sale-property-details.component';

describe('SalePropertyDetailsComponent', () => {
  let component: SalePropertyDetailsComponent;
  let fixture: ComponentFixture<SalePropertyDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalePropertyDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalePropertyDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
