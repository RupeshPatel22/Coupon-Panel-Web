import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CouponPanelRoutingModule } from './coupon-panel-routing.module';
import { CouponPanelComponent } from './coupon-panel.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { CouponsComponent } from './coupons/coupons.component';
import { MaterialModule } from 'src/material.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { CouponFormComponent } from './coupons/coupon-form/coupon-form.component';
import { SubscriptionsComponent } from './subscriptions/subscriptions.component';
import { ConfigureSubscriptionComponent } from './subscriptions/configure-subscription/configure-subscription.component';
@NgModule({
  declarations: [
    CouponPanelComponent,
    SideNavComponent,
    CouponsComponent,
    CouponFormComponent,
    SubscriptionsComponent,
    ConfigureSubscriptionComponent,
  ],
  imports: [
    CommonModule,
    CouponPanelRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    PipesModule,
    ComponentsModule,
    NgxMaterialTimepickerModule,
  ],
  exports: [NgSelectModule, PipesModule],
})
export class CouponPanelModule {}
