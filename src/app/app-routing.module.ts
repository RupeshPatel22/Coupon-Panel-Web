import { Page500Component } from './shared/components/page500/page500.component';
import { Page400Component } from './shared/components/page400/page400.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Page404Component } from './shared/components/page404/page404.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { Services } from './shared/models/constants/constant.type';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./modules/coupon-panel/coupon-panel.module').then(m => m.CouponPanelModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    loadChildren: ()=> import('./modules/login/login.module').then(m => m.LoginModule),
    canActivate:[AuthGuard]
  },
  {
    path: 'page400',
    component:Page400Component,
    data: {title: 'Bad Request'}

  },
  {
    path: 'page500',
    component:Page500Component,
    data: {title: "Internal Server Error"}
  },
  {
    path: '**',
    pathMatch:'full',
    component:Page404Component,
    data: {title: "Invalid Path"}
  } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
