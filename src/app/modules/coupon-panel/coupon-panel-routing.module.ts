import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Services } from 'src/app/shared/models/constants/constant.type';
import { CouponPanelComponent } from './coupon-panel.component';
import { CouponFormComponent } from './coupons/coupon-form/coupon-form.component';
import { CouponsComponent } from './coupons/coupons.component';
import { ConfigureSubscriptionComponent } from './subscriptions/configure-subscription/configure-subscription.component';
import { SubscriptionsComponent } from './subscriptions/subscriptions.component';
import { AuthGuard } from 'src/app/shared/guards/auth.guard';
const routes: Routes = [
  {
    path: '',
    component: CouponPanelComponent,
    children: [
      {
        path: 'coupon',
        component: CouponsComponent,
        data: {title: "Coupons"},
      },
      {
        path: 'create-coupon',
        component: CouponFormComponent,
        data: {title: "Create Coupons"},
      },
      {
        path: 'clone-coupon/:couponId',
        component: CouponFormComponent,
        data: { kind: 'clone' },
      },
      {
        path: 'view-coupon/:couponId',
        component: CouponFormComponent,
        data: { kind: 'view' , title:'View Coupon'},
      },
      {
        path: 'all-subscriptions',
        component: SubscriptionsComponent,
        data: {title:'Subscriptions'},
        canActivate: [AuthGuard]
      },
      {
        path: 'configure-subscription',
        component: ConfigureSubscriptionComponent,
        data: {title: "Configure Subscriptions"},
        canActivate: [AuthGuard]
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CouponPanelRoutingModule {}
