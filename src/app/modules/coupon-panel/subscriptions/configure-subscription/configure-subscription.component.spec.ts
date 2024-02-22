import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigureSubscriptionComponent } from './configure-subscription.component';

describe('ConfigureSubscriptionComponent', () => {
  let component: ConfigureSubscriptionComponent;
  let fixture: ComponentFixture<ConfigureSubscriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigureSubscriptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigureSubscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
