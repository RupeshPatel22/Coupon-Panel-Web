import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as apiUrls from 'src/app/core/apiUrls';
import { apiEndPoints } from '../models/constants/constant.type';

@Injectable({
  providedIn: 'root',
})

export class CouponService {
  service$: BehaviorSubject<string> = new BehaviorSubject(null);
  service: string;
  
  constructor(private http: HttpClient) {
    this.service$.next(localStorage.getItem('service'));
    this.service$.subscribe((data) => (this.service = data?.toLowerCase()));
  }

  /**
   * Method that makes API call to create new coupon
   * @param data
   * @returns
   */
  createCoupon(data: any): Observable<any> {
    return this.http
      .post(apiUrls.postCouponEndPoint(apiEndPoints[this.service]), data)
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  /**
   * Method that gets all coupons data
   * @param data
   * @returns
   */
  getCouponsData(data: any): Observable<any> {
    return this.http
      .post(apiUrls.postFilterCouponEndPoint(apiEndPoints[this.service]), data)
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  /**
   * Method that maps restaurants with campaign
   * @param data
   * @returns
   */
  postOutletsOptin(data: any): Observable<any> {
    return this.http
      .post(apiUrls.postOutletsOptinEndPoint(apiEndPoints[this.service]), data)
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  /**
   * Method that removes restaurants from campaign
   * @param data
   * @returns
   */
  postOutletsOptout(data: any): Observable<any> {
    return this.http
      .post(apiUrls.postOutletsOptoutEndPoint(apiEndPoints[this.service]), data)
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  /**
   * Method that gets coupon details by ID
   * @param id
   * @returns response
   */
  getCouponDetailsById(id: number): Observable<any> {
    return this.http
      .get(apiUrls.getCouponDetailsByIdEndPoint(id, apiEndPoints[this.service]))
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  /**
   * Method that gets coupon outlet mapping details
   * @param data
   * @returns response
   */
  getCouponOutletMappingDetails(data: any): Observable<any> {
    return this.http
      .post(
        apiUrls.postFilterCouponOutletMappingEndPoint(
          apiEndPoints[this.service]
        ),
        data
      )
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

   /**
   * Method that delete coupon details by ID
   * @param couponId
   * @returns response
   */
  deleteCouponById(couponId: number): Observable<any> {
    return this.http.delete(apiUrls.deleteCouponByIdEndPoint(couponId,apiEndPoints[this.service])).pipe(
      map((response) => {
        return response;
      })
    )
  }
}
