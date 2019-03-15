import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyBuyComponent } from './property-buy.component';

describe('PropertyBuyComponent', () => {
  let component: PropertyBuyComponent;
  let fixture: ComponentFixture<PropertyBuyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PropertyBuyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertyBuyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
