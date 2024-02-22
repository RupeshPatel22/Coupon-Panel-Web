import * as moment from 'moment';
import { Services } from 'src/app/shared/models/constants/constant.type';
export class Coupon {
  couponId: number;
  couponName: string;
  couponHeader: string;
  couponDesc: string;
  couponStartDate: string;
  couponStartTime: string;
  couponEndDate: string;
  couponEndTime: string;
  couponLevel: string;
  termsAndConditions: string;
  discountType: string;
  discount: number; //in rupees or percentage
  discountSharePercentage: number;
  minOrderValue: number;
  maxDiscountUpto: number;
  maxUseCount: number;
  couponUsageIntervalinMins: number;
  discountSponseredBy: string;
  couponStatus: CouponStatus;
  isDeleted: boolean;
  couponValidFrom: string;
  couponValidTill: string;
  createdBy: string;
  createdByName: string;
  createdAt: string;
  customerId: string;
  orderId: string;
  creationReason: string;

  static fromJson(data): Coupon {
    const c: Coupon = new Coupon();
    c['couponId'] = data['id'];
    c['couponName'] = data['code'];
    c['couponHeader'] = data['header'];
    c['couponDesc'] = data['description'];
    c['termsAndConditions'] = data['terms_and_conditions'];
    c['discountType'] = data['type'];
    if (data['type'] === 'upto') {
      c['discount'] = data['discount_percentage'];
    } else {
      c['discount'] = data['discount_amount_rupees'];
    }
    c['couponStartDate'] = moment(data['start_time']).format('DD/MM/yyyy');
    c['couponStartTime'] = moment(data['start_time']).format('HH:mm');
    c['couponEndDate'] = moment(data['end_time']).format('DD/MM/yyyy');
    c['couponEndTime'] = moment(data['end_time']).format('HH:mm');
    c['couponValidFrom'] = data['start_time'];
    c['couponValidTill'] = data['end_time'];
    c['couponLevel'] = data['level'];
    c['createdBy'] = data['created_by'];
    c['maxUseCount'] = data['max_use_count'];
    c['couponUsageIntervalinMins'] = data['coupon_use_interval_minutes'];
    c['minOrderValue'] = data['min_order_value_rupees'];
    c['maxDiscountUpto'] = data['max_discount_rupees'];
    c['discountSharePercentage'] = data['discount_share_percent'];
    c['discountSponseredBy'] = data['discount_sponsered_by'];
    c['isDeleted'] = data['is_deleted'];
    c['createdAt'] = moment(data['created_at']).format('DD/MM/yyyy hh:mm A');
    c['couponStatus'] = calculateCouponStatus(
      data['start_time'],
      data['end_time'],
      data['is_deleted']
    );
    c['createdByName'] = data['created_by_name'];
    if(data['customer_id'])
    c['customerId'] = data['customer_id'];
    if(data['note']) {
      c['orderId'] = data['note']['order_id'];
      c['creationReason'] = data['note']['creation_reason'];
    }
    return c;
  }

  toJson(service: string) {
    const data = {};
    data['code'] = this.couponName;
    data['header'] = this.couponHeader;
    data['description'] = this.couponDesc;
    data['terms_and_conditions'] = this.termsAndConditions;
    data['type'] = this.discountType;
    if (this.discountType === 'upto') {
      data['discount_percentage'] = this.discount;
      data['max_discount_rupees'] = this.maxDiscountUpto;
    } else {
      data['discount_amount_rupees'] = this.discount;
    }
    data['start_time'] = moment(
      new Date(
        moment(this.couponStartDate).format('YYYY-MM-DD') +
        ' ' +
        moment(this.couponStartTime, 'HH:mm').format('HH:mm:ss')
      )
    ).unix();
    data['end_time'] = moment(
      new Date(
        moment(this.couponEndDate).format('YYYY-MM-DD') +
        ' ' +
        moment(this.couponEndTime, 'HH:mm').format('HH:mm:ss')
      )
    ).unix();
    if (service !== Services.PND) {
      data['level'] = this.couponLevel;
      data['discount_share_percent'] = this.discountSharePercentage;
    }
    data['max_use_count'] = this.maxUseCount;
    data['min_order_value_rupees'] = this.minOrderValue;
    if (this.maxUseCount > 1) {
      data['coupon_use_interval_minutes'] = this.couponUsageIntervalinMins;
    }
    if (this.couponLevel !== 'global' && service !== Services.PND) {
      data['discount_sponsered_by'] = this.discountSponseredBy;
    }
    if (this.couponLevel === 'global') {
      if(this.customerId)
      data['customer_id'] = this.customerId;
      // if(this.orderId){
      //   data['note'] = {order_id: this.orderId}
      // }
      // if( this.creationReason) {
      //   data['note'] = {creation_reason: this.creationReason}
      // }
      // if(this.orderId && this.creationReason) {
      //   data['note'] = {
      //     order_id: this.orderId,
      //     creation_reason: this.creationReason
      //   }
      // }
      data['note'] = this.orderId && this.creationReason
      ? { order_id: this.orderId, creation_reason: this.creationReason }
      : this.orderId
      ? { order_id: this.orderId }
      : this.creationReason
      ? { creation_reason: this.creationReason }
      : undefined;

    }
    return data;
  }
}
export class CouponMapping {
  id: number;
  couponId: number;
  couponCode: string;
  startDate: string;
  endDate: string;
  outletId: string;
  outletName: string;
  mappedBy: string;
  mappedByUserId: string;
  mappedByUserName: string;
  couponStatus: CouponStatus;
  isDeleted: boolean;

  static fromJson(data: any): CouponMapping {
    const c: CouponMapping = new CouponMapping();
    c['id'] = data['id'];
    c['couponId'] = data['coupon_id'];
    c['couponCode'] = data['coupon_code'];
    c['startDate'] = data['start_time'];
    c['endDate'] = data['end_time'];
    c['outletId'] = data['restaurant_id'] || data['store_id'] || data['outlet_id'];
    c['outletName'] = data['restaurant_name'] || data['store_name'] || data['outlet_name'];
    c['mappedBy'] = data['mapped_by'];
    c['mappedByUserId'] = data['mapped_by_user_id'];
    c['mappedByUserName'] = data['mapped_by_name'];
    c['isDeleted'] = data['is_deleted'];
    c['couponStatus'] = calculateCouponStatus(
      data['start_time'],
      data['end_time'],
      data['is_deleted']
    );
    return c;
  }
}
export const discountTypeOptions = [
  { id: 'flat', name: 'Flat' },
  { id: 'upto', name: 'Upto' },
];
export const couponLevelOptions: { [key in Services]?: any } = {
  [Services.Food]: [
    { id: 'global', name: 'Global' },
    { id: 'restaurant', name: 'Restaurant' },
  ],
  [Services.Grocery]: [
    { id: 'global', name: 'Global' },
    { id: 'store', name: 'Store' },
  ],
  [Services.Pharmacy]: [
    { id: 'global', name: 'Global' },
    { id: 'outlet', name: 'Outlet' },
  ],
  [Services.Paan]: [
    { id: 'global', name: 'Global' },
    { id: 'outlet', name: 'Outlet'},
  ],
  [Services.Flower]: [
    { id: 'global', name: 'Global' },
    { id:'outlet', name: 'Outlet' }
  ],
  [Services.Pet]: [
    { id: 'global', name: 'Global'},
    { id: 'outlet', name:'Outlet'}
  ]
};
export const discountSponseredByOptions: { [key in Services]?: any } = {
  [Services.Food]: [
    { id: 'bank', name: 'Bank' },
    { id: 'restaurant', name: 'Restaurant' },
  ],
  [Services.Grocery]: [
    { id: 'bank', name: 'Bank' },
    { id: 'store', name: 'Store' },
  ],
  [Services.Pharmacy]: [
    { id: 'bank', name: 'Bank' },
    { id: 'outlet', name: 'Outlet' },
  ],
  [Services.Paan]: [
    {id: 'bank', name:'Bank'},
    { id: 'outlet', name:'Outlet'},
  ],
  [Services.Flower]: [
    { id:'bank', name:'Bank'},
    { id:'outlet', name:'Outlet'},
  ],
  [Services.Pet]: [
    { id: 'bank', name: 'Bank'},
    { id: 'outlet', name:'Outlet'}
  ]
};

export type CouponStatus = 'active' | 'upcoming' | 'expired';
export const CouponStatusList: { [key in CouponStatus]: string } = {
  active: 'Active',
  upcoming: 'Upcoming',
  expired: 'Expired',
};
function calculateCouponStatus(
  fromDate: string,
  toDate: string,
  isDeleted: boolean
): CouponStatus {
  const currentTime = new Date();
  const startTime = new Date(fromDate);
  const endTime = new Date(toDate);
  if (isDeleted) return 'expired';
  if (currentTime >= startTime && currentTime <= endTime) return 'active';
  if (currentTime <= startTime) return 'upcoming';
  if (currentTime >= endTime) return 'expired';
}

export const dateShortTimeFormat: string = 'dd/MM/YYYY h:mm a';

