import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as apiUrls from '../../core/apiUrls';

@Injectable({
  providedIn: 'root',
})

export class LoginService {

  constructor(private http: HttpClient) {}

  /**
   * Method that send otp
   * @param data 
   * @returns 
   */
  loginOtp(data: any): Observable<any> {   
    return this.http.post(apiUrls.postLoginOtpEndPoint,data).pipe(
      map((response) => {

        return response;
      })
    );
  }

  /**
   * Method to verify otp
   * @param data 
   * @returns 
   */
  loginVerify(data: any): Observable<any> {
    return this.http.post(apiUrls.postLoginVerifyEndPoint, data).pipe(
      map((response) => {
        return response;
      })
    );
  }
  
  /**
   * Method that sets authorisation token in local storage
   * @returns response
   */
  refreshAuthToken(): Observable<any> {
    const headers = new HttpHeaders({
      refresh_token: 'true',
    });
    return this.http
      .post(apiUrls.postRefreshTokenEndPoint, {}, { headers })
      .pipe(
        map((response) => {
          localStorage.setItem('token', response['result']['token']);
          localStorage.setItem(
            'refreshToken',
            response['result']['refresh_token']
          );
        })
      );
  }
}
