import { ToastService } from './../../../../shared/services/toast.service';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { CouponService } from 'src/app/shared/services/coupon.service';
import {
  couponLevelOptions,
  Coupon,
  discountSponseredByOptions,
  discountTypeOptions,
} from '../../model/coupon';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { Services } from 'src/app/shared/models/constants/constant.type';
import { FocusMonitor } from '@angular/cdk/a11y';

@Component({
  selector: 'app-coupon-form',
  templateUrl: './coupon-form.component.html',
  styleUrls: ['./coupon-form.component.scss'],
})

export class CouponFormComponent implements OnInit {
  currentDate: Date = new Date();
  minDate= new Date();
  couponForm = new FormGroup(
    {
      couponName: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(18)
      ]),
      couponHeader: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]),
      couponDesc: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]),
      couponLevel: new FormControl(null, [Validators.required]),
      termsAndConditions: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]),
      discountType: new FormControl(null, [Validators.required]),
      discount: new FormControl('', [Validators.required]),
      discountSharePercentage: new FormControl({ disabled: true, value: '' }, [
        Validators.required,
        Validators.max(100),
      ]),
      minOrderValue: new FormControl('', [Validators.required]),
      maxDiscountUpto: new FormControl({ disabled: true, value: '' }, [
        Validators.required,
      ]),
      couponStartDate: new FormControl('', [Validators.required]),
      couponStartTime: new FormControl('', [Validators.required]),
      couponEndDate: new FormControl('', [Validators.required]),
      couponEndTime: new FormControl('', [Validators.required]),
      maxUseCount: new FormControl('', [
        Validators.required,
        this.maxUseCountValidator(),
      ]),
      couponUsageIntervalinMins: new FormControl(
        { disabled: true, value: null },
        [Validators.required]
      ),
      discountSponseredBy: new FormControl({ disabled: true, value: null }, [
        Validators.required,
      ]),
      customerId: new FormControl(''),
      orderId: new FormControl(''),
      creationReason: new FormControl('')
    },
    { validators: [this.discountValidator(), this.dateTimeValidator()] }
  );
  addSlotsFrom = new FormGroup({
    openingHours: new FormControl(),
    closingHours: new FormControl(),
  });
  couponLevelOptions;
  discountTypeOptions = discountTypeOptions;
  discountSponseredByOptions;
  validFrom: Date;
  validTill: Date;
  selectedTimeSlotRestriction;
  showAddSlots: boolean;
  currentCouponId: number;
  disableAll: boolean;
  service: string;
  readonly Services = Services;
  isRestaurantLevelCoupon: boolean;
  isUptoDiscountType: boolean;
  showCouponUsageIntervalField: boolean;
  currentTime = moment(new Date()).format('h:mm a');


  constructor(
    private toastMsgService: ToastService,
    private couponService: CouponService,
    private activeRoute: ActivatedRoute
  ) {
    this.activeRoute.data.subscribe((data) => {
      if (data.kind === 'view') {
        this.disableAll = true;
      }
    });
    this.currentCouponId = Number(
      this.activeRoute.snapshot.paramMap.get('couponId')
    );
  }

  ngOnInit(): void {
    if (this.currentCouponId) {
      this.getCouponDetails();
    }
    this.couponLevelOptions = couponLevelOptions[this.couponService.service];
    this.discountSponseredByOptions =
      discountSponseredByOptions[this.couponService.service];
    this.service = this.couponService.service;
    if (this.service === Services.PND) {
      this.couponForm['controls']['couponLevel'].disable();
    }
  }

  /**
   * Method that converts input into uppercase
   * @param event
   */
  convertToUppercase(event: Event) {
    const target = event.target as HTMLInputElement;
    const start = target.selectionStart;
    target.value = target.value.toUpperCase();
    target.setSelectionRange(start, start);
  }

  /**
   * Method that gets coupon details by coupon id
   */
  getCouponDetails() {
    this.couponService
      .getCouponDetailsById(this.currentCouponId)
      .subscribe((res) => {
        let data: Coupon = new Coupon();
        data = Coupon.fromJson(res['result']['coupon_details']);
        this.couponForm.patchValue({
          couponName: data.couponName,
          couponHeader: data.couponHeader,
          couponDesc: data.couponDesc,
          couponLevel: data.couponLevel,
          termsAndConditions: data.termsAndConditions,
          discountType: data.discountType,
          discount: data.discount,
          discountSharePercentage: data.discountSharePercentage,
          minOrderValue: data.minOrderValue,
          maxDiscountUpto: data.maxDiscountUpto,
          couponStartDate: moment(data.couponStartDate, 'DD/MM/YYYY').format(
            'YYYY-MM-DD'
          ),
          couponStartTime: data.couponStartTime,
          couponEndDate: moment(data.couponEndDate, 'DD/MM/YYYY').format(
            'YYYY-MM-DD'
          ),
          couponEndTime: data.couponEndTime,
          maxUseCount: data.maxUseCount,
          couponUsageIntervalinMins: data.couponUsageIntervalinMins,
          discountSponseredBy: data.discountSponseredBy,
          customerId: data.customerId,
          orderId: data.orderId,
          creationReason: data.creationReason
        });

        if (this.service !== Services.PND) {
          this.onCouponLevelSelection();
        }

        this.onDiscountTypeSelection();
        this.couponForm
          .get('discountSharePercentage')
          .setValue(data.discountSharePercentage);

        if (this.disableAll) {
          this.couponForm.disable();
        }
      });
  }

  /**
   * Method that send create new coupon
   * @returns
   */
  createCoupon() {
    if (this.couponForm.status === 'INVALID') {
      this.couponForm.markAllAsTouched();
      return;
    }
    const formValues = this.couponForm.getRawValue();
    const data: Coupon = new Coupon();
    Object.assign(data, formValues);
    // if(!formValues.customerId){
    //     delete data.customerId;
    // }
    this.couponService
      .createCoupon(data.toJson(this.service))
      .subscribe((res) => {
        this.toastMsgService.showSuccess(
          `Coupon: ${res['result']['coupon_details']['code']} Created Successfully!!!`
        );
        this.couponForm.reset();
      });
  }

  /**
   * Method that enable-disable fields based on coupon-level selection
   */
  onCouponLevelSelection() {
    if (this.couponForm.get('couponLevel').value === 'global') {
      this.isRestaurantLevelCoupon = false;
      this.couponForm.get('discountSharePercentage').setValue(0);
      this.couponForm.get('discountSharePercentage').disable();
      this.couponForm.get('discountSponseredBy').disable();
    } else {
      this.isRestaurantLevelCoupon = true;
      this.couponForm.get('discountSharePercentage').setValue('');
      this.couponForm.get('discountSharePercentage').enable();
      this.couponForm.get('discountSponseredBy').enable();
    }
  }

  /**
   * Method that enable-disable fields based on discount-type selection
   */
  onDiscountTypeSelection() {
    if (this.couponForm.get('discountType').value === 'upto') {
      this.isUptoDiscountType = true;
      this.couponForm.get('maxDiscountUpto').enable();
    } else {
      this.isUptoDiscountType = false;
      this.couponForm.get('maxDiscountUpto').disable();
    }
  }

  /**
   * Method that validates maxUseCount field and
   * enable-disable couponUsageIntervalinMins field based on the maxUseCount
   * @returns
   */
  maxUseCountValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors => {
      const val = control.value;
      if (this.couponForm) {
        if (val < 1 || val > 100000) {
          this.showCouponUsageIntervalField = false;
          this.couponForm['controls']['couponUsageIntervalinMins'].disable();
          return { maxUseCount: true };
        }
        if (val == 1) {
          this.showCouponUsageIntervalField = false;
          this.couponForm['controls']['couponUsageIntervalinMins'].disable();
        }
        if (val > 1) {
          this.showCouponUsageIntervalField = true;
          this.couponForm['controls']['couponUsageIntervalinMins'].enable();
        }
      }
    };
  }

  /**
   * Method that validates discount field
   * @returns
   */
  discountValidator(): ValidatorFn {
    return (group: FormGroup): ValidationErrors => {
      if (this.couponForm) {
        if (
          group.get('discountType').value === 'upto' &&
          group['controls']['discount'].value > 100
        ) {
          group['controls']['discount'].setErrors({ max: { max: 100 } });
        }
      }
      return;
    };
  }
  
  /**
   * Method that validates start,end date and time
   * @returns
   */
  dateTimeValidator(): ValidatorFn {
    return (group: FormGroup): ValidationErrors => {
      if (this.couponForm) {
        let startDate = group['controls']['couponStartDate']['value'];
        let startTime = group['controls']['couponStartTime']['value'];
        let endDate = group['controls']['couponEndDate']['value'];
        let endTime = group['controls']['couponEndTime']['value'];
        startDate = moment(startDate).format('YYYY-MM-DD');
        startTime = moment(startTime, 'h:mm A').format('HH:mm:ss');
        const startDateTime = new Date(startDate + ' ' + startTime);
        endDate = moment(endDate).format('YYYY-MM-DD');
        endTime = moment(endTime, 'h:mm A').format('HH:mm:ss');
        const endDateTime = new Date(endDate + ' ' + endTime);
        if (this.currentDate > startDateTime) {
          group['controls']['couponStartTime'].setErrors({
            startTimeMore: true,
          });
        } else if (startDateTime > endDateTime) {
          group['controls']['couponEndTime'].setErrors({ endTimeMore: true });
        } else {
          group['controls']['couponStartTime'].setErrors(null);
          group['controls']['couponEndTime'].setErrors(null);
        }
        return;
      }
    };
  }

}
