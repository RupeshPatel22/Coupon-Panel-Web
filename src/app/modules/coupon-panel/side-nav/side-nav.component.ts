import { ToastService } from './../../../shared/services/toast.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Services } from 'src/app/shared/models/constants/constant.type';
import { CouponService } from 'src/app/shared/services/coupon.service';
import { ServiceDisplayName, originalOrder } from './model/side-nav';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
})

export class SideNavComponent implements OnInit {
  showTradeDiscountSubMenu: boolean;
  showGrowthPacksSubMenu: boolean;
  userName: string;
  roles: string[];
  showUserProfile: boolean;
  serviceDisplayName = ServiceDisplayName
  service: string;
  readonly originalOrder = originalOrder;
  showSubMenu = {};
  navLinks = [
    {
      name: 'Coupons',
      icon: 'assets/icons/coupon-icon.svg',
      allowedRouteAccessTo: [
        Services.Food,
        Services.Grocery,
        Services.PND,
        Services.Pharmacy,
        Services.Paan,
        Services.Flower,
        Services.Pet
      ],
      subMenu: [
        {
          name: 'All Coupons',
          route: 'coupon',
          allowedRouteAccessTo: [
            Services.Food,
            Services.Grocery,
            Services.PND,
            Services.Pharmacy,
            Services.Paan,
            Services.Flower,
            Services.Pet
          ],
        },
        {
          name: 'Create Coupon',
          route: 'create-coupon',
          allowedRouteAccessTo: [
            Services.Food,
            Services.Grocery,
            Services.PND,
            Services.Pharmacy,
            Services.Paan,
            Services.Flower,
            Services.Pet
          ],
        },
      ],
    },
    {
      name: 'Subscriptions',
      icon: 'assets/icons/subscritpion-icon.svg',
      allowedRouteAccessTo: [
        Services.Food,
        Services.Grocery,
        Services.Pharmacy,
        Services.Paan,
        Services.Flower,
        Services.Pet
      ],
      subMenu: [
        {
          name: 'All Subscriptions',
          route: 'all-subscriptions',
          allowedRouteAccessTo: [
            Services.Food,
            Services.Grocery,
            Services.Pharmacy,
            Services.Paan,
            Services.Flower,
            Services.Pet
          ],
        },
        {
          name: 'configure Subscription',
          route: 'configure-subscription',
          allowedRouteAccessTo: [
            Services.Food,
            Services.Grocery,
            Services.Pharmacy,
            Services.Paan,
            Services.Flower,
            Services.Pet
          ],
        },
      ],
    },
  ];

  constructor(
    private router: Router,
    private toastMsgService: ToastService,
    private couponService: CouponService
  ) {}

  ngOnInit() {
    this.userName = localStorage.getItem('userName');
    this.roles = JSON.parse(localStorage.getItem('role'));
    this.service = this.couponService.service;
  }

  /**
   * Method that updates service based on selection
   * @param service
   */
  serviceSelectionChange(service: string) {
    this.service = service;
    localStorage.setItem('service', service);
    window.location.reload();
  }

  /**
   * Method that gets invoked when user logs out
   */
  logout() {
    localStorage.clear();
    this.router.navigate(['login']);
    this.toastMsgService.showSuccess('Logged Out Successfully');
  }
  
  /**
   * Method that maintain object with link name as key and boolean value
   * and then used to determine if nav-link is expanded or not
   * @param name
   */
  toggleSubMenu(name: string) {
    this.showSubMenu[name] = !this.showSubMenu[name];
  }
}
