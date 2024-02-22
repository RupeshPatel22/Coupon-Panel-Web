import { Clipboard } from '@angular/cdk/clipboard';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { Services } from 'src/app/shared/models/constants/constant.type';
import { CouponService } from 'src/app/shared/services/coupon.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { environment } from 'src/environments/environment';
import { CouponMapping, CouponStatus, CouponStatusList, dateShortTimeFormat } from '../model/coupon';

@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.scss'],
})

export class SubscriptionsComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'couponCode',
    'outletName',
    'mappedBy',
    'startDate',
    'endDate',
    'couponStatus',
    'isDeleted',
    // 'action',
  ];
  mappingDetailsList: MatTableDataSource<CouponMapping>;
  totalMappingData: number;
  pageIndex: number = 1;
  pageSize: number = 5;
  showFilterFields: boolean;
  search: string;
  filterByOutletId: string;
  filterByCouponStatus: CouponStatus[] = [];
  fromDate: Date;
  toDate: Date;
  service: string;
  maxDate = new Date();
  readonly couponStatusList = CouponStatusList;
  readonly dateShortTimeFormat = dateShortTimeFormat;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  fromTime: string;
  toTime: string;

  constructor(
    private couponService: CouponService,
    private toastMsgService: ToastService,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private clipboard: Clipboard
  ) {
    this.activeRoute.queryParams.subscribe((data) => {
      this.search = data['couponId'];
    });
  }

  ngOnInit(): void {
    this.getCouponOutletMappingData();
    this.service = this.couponService.service;
  }

  /**
   * Method that returns details of coupons mapped with outlet
   * @param filterFlag
   */
  getCouponOutletMappingData(filterFlag?: boolean) {
    const data = {};
    if (filterFlag) {
      this.pageIndex = 1;
      this.paginator.pageIndex = 0;
    }
    data['pagination'] = {
      page_index: this.pageIndex,
      page_size: this.pageSize,
    };
    data['filter'] = {};
    if (this.search) {
      data['filter']['coupon_id'] = this.search;
    }
    if (this.filterByOutletId) {
      if (this.couponService.service === Services.Food) {
        data['filter']['restaurant_id'] = this.filterByOutletId;
      } else if (this.couponService.service === Services.Grocery) {
        data['filter']['store_id'] = this.filterByOutletId;
      } else if (this.service === Services.Paan || this.service === Services.Flower || this.service === Services.Pharmacy || this.service === Services.Pet) {
        data['filter']['outlet_id'] = this.filterByOutletId;
      }
    }
    if (this.filterByCouponStatus.length) {
      data['filter']['timeline'] = this.filterByCouponStatus;
    }
    // if (this.fromDate && this.toDate) {
    //   data['filter']['duration'] = {
    //     start_date: moment(this.fromDate).unix(),
    //     end_date: moment(this.toDate).unix(),
    //   };
    // }
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

    this.couponService.getCouponOutletMappingDetails(data).subscribe((res) => {
      this.totalMappingData = res['result']['total_records'];
      const record: CouponMapping[] = [];
      for (const i of res['result']['records']) {
        record.push(CouponMapping.fromJson(i));
      }
      this.mappingDetailsList = new MatTableDataSource(record);
      this.mappingDetailsList.sort = this.sort;
    });
  }

  /**
   * Method that opt-out coupons from outlet
   * @param mappingDetails
   */
  optoutOutlet(mappingDetails: CouponMapping) {
    const data = {};
    data['coupon_id'] = mappingDetails.couponId;
    if (this.service === Services.Food) {
      data['restaurant_ids'] = [mappingDetails.outletId];
    } else if (this.service === Services.Grocery) {
      data['store_ids'] = [mappingDetails.outletId];
    } else if (this.service === Services.Paan || this.service === Services.Flower || this.service === Services.Pharmacy || this.service === Services.Pet) {
      data['outlet_ids'] = [mappingDetails.outletId];
    }
    this.couponService.postOutletsOptout(data).subscribe((res) => {
      mappingDetails['isDeleted'] = res['result']['records'][0]['is_deleted'];
      mappingDetails['couponStatus'] = 'expired';
      this.toastMsgService.showSuccess('Opt-Out Successfully for outlets!!!');
    });
  }

  /**
   * Method that gets invoked when page is changed
   * @param event
   */
  onPageChange(event) {
    this.pageIndex = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.getCouponOutletMappingData();
  }

  /**
   * Method that clears filter
   * @param field
   */
  clearFilterControls(field: 'all' | 'date' | 'fromTime' | 'toTime') {
    if ( field === 'all'){
      this.showFilterFields = false;
      this.search = this.filterByOutletId = null; 
      this.filterByCouponStatus = [];
      this.fromDate = this.toDate = null;
    } else if (field === 'date') { 
      this.fromDate = this.toDate = this.fromTime = this.toTime = null;
    } else if(field === 'fromTime') {
      this.fromTime = null;
    } else if(field === 'toTime') {
      this.toTime = null;
    }
    this.getCouponOutletMappingData();
  }

  /**
   * Method that opens one view dashboard in new tab
   * @param outletId
   */
  goToAdminDashbardWebsite(id: string, outletName: string) {
    const link = this.router.serializeUrl(
      this.router.createUrlTree([this.service, 'outlet-details'], {
        queryParams: { id, outletName },
      })
    );
    window.open(`${environment.adminDashboardBaseUrl}${link}`);
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
