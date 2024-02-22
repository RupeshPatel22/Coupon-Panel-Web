import { Clipboard } from '@angular/cdk/clipboard';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { Services } from 'src/app/shared/models/constants/constant.type';
import { CouponService } from 'src/app/shared/services/coupon.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { Coupon, CouponStatusList, couponLevelOptions, dateShortTimeFormat } from '../model/coupon';

@Component({
  selector: 'app-coupons',
  templateUrl: './coupons.component.html',
  styleUrls: ['./coupons.component.scss'],
})

export class CouponsComponent implements OnInit {
  couponsList: MatTableDataSource<Coupon>;
  displayedColumns: string[] = [
    // 'sr no',
    'couponId',
    'couponName',
    // 'couponHeader',
    'couponLevel',
    'createdBy',
    'createdAt',
    'couponValidFrom',
    'couponValidTill',
    'status',
    'isDeleted',
    'action'
  ];
  totalCoupons: number;
  pageIndex: number = 1;
  pageSize: number = 5;
  search: string;
  fromDate: Date;
  toDate: Date;
  service: string;
  maxDate = new Date();
  couponLevelOptions = couponLevelOptions;
  filterByCouponlevel: string;
  readonly couponStatusList = CouponStatusList;
  readonly dateShortTimeFormat = dateShortTimeFormat;
  readonly services = Services;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  showFilterFields: boolean;
  fromTime: string;
  toTime: string;
  hasCouponDeleted = [
    { id: 'true', name: 'Yes' },
    { id: 'false', name: 'No'}
  ];
  filterByIsDeleted: boolean;

  constructor(
    private couponService: CouponService,
    private router: Router,
    private toastMsgService: ToastService,
    private clipboard: Clipboard
  ) { }

  ngOnInit(): void {
    this.getCouponsData(false);
    this.service = this.couponService.service
    if (this.service === Services.PND) {
      this.displayedColumns = this.displayedColumns.filter(c => c !== 'couponLevel');
    }
  }

  /**
   * Method that gets coupons data
   * @param filterFlag
   */
  getCouponsData(filterFlag?: boolean) {
    const data = {};
    if (filterFlag) {
      this.pageIndex = 1;
      this.paginator.pageIndex = 0;
    }
    data['pagination'] = {
      page_index: this.pageIndex,
      page_size: this.pageSize,
    };
    if (this.search) {
      data['search_text'] = this.search;
    }
    data['filter'] = {};
    if (this.filterByCouponlevel) {
      data['filter']['level'] = this.filterByCouponlevel;
    }
    if (this.filterByIsDeleted) {
      data['filter']['is_deleted'] = this.filterByIsDeleted;
    }
    if(this.fromDate && !this.toDate) {
      this.toastMsgService.showError('Enter end date');
    }if(!this.fromDate && this.toDate) {
      this.toastMsgService.showError('Enter start date');
    }
    const fromDate = moment(this.fromDate).format('YYYY-MM-DD');
    const fromTime = moment(this.fromTime, 'h:mm A').format('HH:mm:ss');
    const toDate = moment(this.toDate).format('YYYY-MM-DD');
    const toTime = moment(this.toTime, 'h:mm A').format('HH:mm:ss');
    const fromDateTime = new Date(fromDate + ' ' + fromTime);
    const toDateTime = new Date(toDate + ' ' + toTime);
    if (this.fromDate && this.toDate) {
      const toDate = new Date (moment(this.toDate).format('YYYY-MM-DD') + ' ' + '23:59:59');
      data['filter']['duration'] = {
        start_date: this.fromTime? moment(fromDateTime).unix() : moment(fromDate).unix(),
        end_date: this.toTime? moment(toDateTime).unix() : moment(toDate).unix(),
      };
    } 
    this.couponService.getCouponsData(data).subscribe((res) => {
      this.totalCoupons = res['result']['total_records'];
      const record: Coupon[] = [];
      for (const i of res['result']['records']) {
        record.push(Coupon.fromJson(i));
      }
      this.couponsList = new MatTableDataSource(record);
      this.couponsList.sort = this.sort;
    });
  }

  /**
   * Method that gets invoked when page is change
   * @param event
   */
  onPageChange(event) {
    this.pageIndex = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.getCouponsData(false);
  }

  /**
   * Method that clears filter
   */
  // clearFilterControls() {
  //   this.search = '';
  //   this.fromDate = null;
  //   this.toDate = null;
  //   this.getCouponsData(false);
  // }

  /**
   * Method that clears filter
   */
  clearFilterControls(field: 'all' | 'date' | 'fromTime' | 'toTime') {
    if ( field === 'all'){
      this.showFilterFields = false;
      this.search = this.filterByCouponlevel = null;
      this.fromDate = this.toDate = null;
    } else if (field === 'date') { 
      this.fromDate = this.toDate = this.fromTime = this.toTime = null;
    } else if(field === 'fromTime') {
      this.fromTime = null;
    } else if(field === 'toTime') {
      this.toTime = null;
    }
    this.getCouponsData(false);
  }

  /**
   * Method that navigates to clone coupon page
   * @param couponId
   */
  goToCloneCouponPage(couponId: number) {
    this.router.navigate(['clone-coupon', couponId]);
  }

  /**
   * Method that navigates to view coupon page
   * @param couponId
   */
  goToViewCouponPage(couponId: number) {
    this.router.navigate(['view-coupon', couponId]);
  }

  /**
   * Method that navigates to all subscriptions page with couponId as query params
   * @param couponId
   */
  goToSubsriptionsPage(couponId: number) {
    this.router.navigate(['all-subscriptions'], { queryParams: { couponId } });
  }

  /**
   * Method that delete coupons data
   * @param couponId
   */
  deleteCoupon(couponId: number) {
    this.couponService.deleteCouponById(couponId).subscribe((res) => {
      this.toastMsgService.showSuccess(`Coupon Id: ${couponId} Deleted Successfully!`);
      this.getCouponsData();
    })
  }

  /**
   * Method that copies text
   * @param couponId
   */
  copyText(textToCopy: string) {
    this.clipboard.copy(textToCopy);
    this.toastMsgService.showSuccess(
      textToCopy + ' have been successfully copied to clipboard !!!'
    );
  }
}
