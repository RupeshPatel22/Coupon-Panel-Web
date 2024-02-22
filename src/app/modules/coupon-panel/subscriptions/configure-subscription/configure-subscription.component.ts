import { ToastService } from './../../../../shared/services/toast.service';
import {
  FormGroup,
  FormControl,
  Validators,
  ValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { CouponService } from 'src/app/shared/services/coupon.service';
import { Services } from 'src/app/shared/models/constants/constant.type';
import { MatTableDataSource } from '@angular/material/table';
import { Coupon } from '../../model/coupon';

@Component({
  selector: 'app-configure-subscription',
  templateUrl: './configure-subscription.component.html',
  styleUrls: ['./configure-subscription.component.scss'],
})

export class ConfigureSubscriptionComponent implements OnInit {
  currentDate: Date = new Date();
  minDate = new Date();
  currentTime = moment(new Date()).format('h:mm a');
  optinOutletsForm = new FormGroup(
    {
      couponId: new FormControl('', [Validators.required]),
      outletIds: new FormControl('', [Validators.required]),
      startDate: new FormControl(''),
      startTime: new FormControl(''),
      endDate: new FormControl(''),
      endTime: new FormControl(''),
    },
    { validators: [this.dateTimeValidator()] }
  );
  optoutOutletsForm = new FormGroup({
    mappingIds: new FormControl('', [Validators.required]),
  });
  addSlotsFrom = new FormGroup({
    openingHours: new FormControl(),
    closingHours: new FormControl(),
  });
  discountTypeSelection = [
    { id: 1, name: 'Flat' },
    { id: 2, name: 'Upto' },
  ];
  validFrom: Date;
  validTill: Date;
  selectedTimeSlotRestriction;
  showAddSlots: boolean;
  service: string;
  couponDetail: MatTableDataSource<Coupon> = new MatTableDataSource();
  displayedColumns = ['couponId', 'couponName', 'couponLevel', 'createdBy', 'couponStatus', 'couponStartDate', 'couponStartTime', 'couponEndDate', 'couponEndTime'];
  isCouponDetail: boolean;

  constructor(
    private toastMsgService: ToastService,
    private couponService: CouponService
  ) { }

  ngOnInit(): void {
    this.service = this.couponService.service;
  }

  /**
   * Method that maps outlets with coupon
   * @returns
   */
  optinOutlets() {
    if (this.optinOutletsForm.status === 'INVALID') {
      this.optinOutletsForm.markAllAsTouched();
      return;
    }
    const data = {};
    data['coupon_id'] = this.optinOutletsForm.get('couponId').value;
    if (this.service === Services.Food) {
      data['restaurant_ids'] = this.optinOutletsForm
        .get('outletIds')
        .value.split(',');
    } else if (this.service === Services.Grocery) {
      data['store_ids'] = this.optinOutletsForm
        .get('outletIds')
        .value.split(',');
    }
    else if (this.service === Services.Paan || this.service === Services.Flower || this.service === Services.Pharmacy || this.service === Services.Pet) {
      data['outlet_ids'] = this.optinOutletsForm
        .get('outletIds')
        .value.split(',');
    }
    if (this.optinOutletsForm.get('startDate').value) {
      data['mapping_duration'] = {};
      let date = moment(this.optinOutletsForm.get('startDate').value).format(
        'YYYY-MM-DD'
      );
      let time = moment(
        this.optinOutletsForm.get('startTime').value,
        'h:mm A'
      ).format('HH:mm:ss');
      data['mapping_duration']['start_time'] = moment(
        new Date(date + ' ' + time)
      ).unix();
      date = moment(this.optinOutletsForm.get('endDate').value).format(
        'YYYY-MM-DD'
      );
      time = moment(
        this.optinOutletsForm.get('endTime').value,
        'h:mm A'
      ).format('HH:mm:ss');
      data['mapping_duration']['end_time'] = moment(
        new Date(date + ' ' + time)
      ).unix();
    }
    this.couponService.postOutletsOptin(data).subscribe((res) => {
      this.toastMsgService.showSuccess('Opt-In Successfully for outlets!!!');
      this.optinOutletsForm.reset();
    });
  }

  /**
   * Method that remove outlets from particular coupon
   * @returns
   */
  optoutOutlets() {
    if (this.optoutOutletsForm.status === 'INVALID') {
      this.optoutOutletsForm.markAllAsTouched();
      return;
    }
    const data = {};
    data['coupon_mapping_ids'] = this.optoutOutletsForm.get('mappingIds').value.split(',');;
    // if (this.service === Services.Food) {
    //   data['restaurant_ids'] = this.optoutOutletsForm
    //     .get('outletIds')
    //     .value.split(',');
    // } else if (this.service === Services.Grocery) {
    //   data['store_ids'] = this.optoutOutletsForm
    //     .get('outletIds')
    //     .value.split(',');
    // } else if (this.service === Services.Pharmacy) {
    //   data['store_ids'] = this.optoutOutletsForm
    //     .get('outletIds')
    //     .value.split(',');
    // }
    this.couponService.postOutletsOptout(data).subscribe((res) => {
      this.toastMsgService.showSuccess('Opt-Out Successfully for outlets!!!');
      this.optoutOutletsForm.reset();
    });
  }

  /**
   * Method that validates start,end date and time
   * @returns
   */
  dateTimeValidator(): ValidatorFn {
    return (group: FormGroup): ValidationErrors => {
      if (this.optinOutletsForm) {
        let startDate = group['controls']['startDate']['value'];
        let startTime = group['controls']['startTime']['value'];
        let endDate = group['controls']['endDate']['value'];
        let endTime = group['controls']['endTime']['value'];
        startDate = moment(startDate).format('YYYY-MM-DD');
        startTime = moment(startTime, 'h:mm A').format('HH:mm:ss');
        const startDateTime = new Date(startDate + ' ' + startTime);
        endDate = moment(endDate).format('YYYY-MM-DD');
        endTime = moment(endTime, 'h:mm A').format('HH:mm:ss');
        const endDateTime = new Date(endDate + ' ' + endTime);
        if (this.currentDate > startDateTime) {
          group['controls']['startTime'].setErrors({ startTimeMore: true });
        } else if (startDateTime > endDateTime) {
          group['controls']['endTime'].setErrors({ endTimeMore: true });
        } else {
          group['controls']['startTime'].setErrors(null);
          group['controls']['endTime'].setErrors(null);
        }
        return;
      }
    };
  }

  /**
   * Method that get coupon detail by coupon id
   */
  getCouponDetail() {
    const couponId = this.optinOutletsForm.get('couponId').value;
    this.couponService.getCouponDetailsById(couponId).subscribe((res) => {
      if (couponId) {
        this.isCouponDetail = true;
        let data: Coupon[] = [];
        data.push(Coupon.fromJson(res['result']['coupon_details']));
        this.couponDetail = new MatTableDataSource(data);
      }
    })
  }

  /**
   * Method that hide coupon detail input value change
   */
  onInputValueChange() {
    this.optinOutletsForm.get('couponId').value.length;
    this.isCouponDetail = false;
  }
}
