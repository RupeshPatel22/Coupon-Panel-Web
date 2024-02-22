import { LoginComponent } from './login.component';
import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { Services } from 'src/app/shared/models/constants/constant.type';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    data: {title: "Coupon Login"}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule {
}
