import { environment } from '../../environments/environment';
import { IApiEndPoint } from '../shared/models/constants/constant.type';


//Login Otp API
export const postLoginOtpEndPoint = `${environment.baseUrl}/user/admin/auth/login/otp`;

//Login Verify API
export const postLoginVerifyEndPoint = `${environment.baseUrl}/user/admin/auth/login/verify`;

// API for Refresh Token
export const postRefreshTokenEndPoint = `${environment.baseUrl}/user/token/refresh`;

// Coupon APIs
export const postCouponEndPoint = (apiEndPoint: IApiEndPoint) => {
    return `${environment.baseUrl}/${apiEndPoint.service}/admin/coupon`;
};
export const postFilterCouponEndPoint = (apiEndPoint: IApiEndPoint) => {
    return `${environment.baseUrl}/${apiEndPoint.service}/admin/coupon/filter`;
};
export const postOutletsOptinEndPoint = (apiEndPoint: IApiEndPoint) => {
    return `${environment.baseUrl}/${apiEndPoint.service}/admin/coupon/${apiEndPoint.prefix}/optin`;
};
export const postOutletsOptoutEndPoint = (apiEndPoint: IApiEndPoint) => {
    return `${environment.baseUrl}/${apiEndPoint.service}/admin/coupon/${apiEndPoint.prefix}/optout`;
};
export const getCouponDetailsByIdEndPoint = (id: number, apiEndPoint: IApiEndPoint) => {
    return `${environment.baseUrl}/${apiEndPoint.service}/admin/coupon/${id}`;
};
export const postFilterCouponOutletMappingEndPoint = (apiEndPoint: IApiEndPoint) => {
    return  `${environment.baseUrl}/${apiEndPoint.service}/admin/coupon/${apiEndPoint.prefix}/filter`;
};

// APIs for client logs
export const postClientLog = `${environment.baseUrl}/core/client_log`;

//API that delete coupon
export const deleteCouponByIdEndPoint = (couponId: number, apiEndPoint: IApiEndPoint) => {
    return `${environment.baseUrl}/${apiEndPoint.service}/admin/coupon/${couponId}`;
}