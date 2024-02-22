import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CouponPanelComponent } from './coupon-panel.component';

describe('CouponPanelComponent', () => {
  let component: CouponPanelComponent;
  let fixture: ComponentFixture<CouponPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CouponPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CouponPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
