import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/shared/services/login.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Roles, Services } from 'src/app/shared/models/constants/constant.type';
import { Config } from 'ng-otp-input/lib/models/config';
import { NgOtpInputComponent } from 'ng-otp-input';
import { CouponService } from 'src/app/shared/services/coupon.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  isOtpSent: boolean;
  canResendOtp: boolean = true;
  sendOtpText = '';
  verifyOtpText = 'Verify Otp';
  timeLeft: number = 30;
  interval: any;
  otp: any;
  phoneNumber = new FormControl('', [Validators.required, Validators.pattern("[6-9][0-9]{9}")]);
  otpInputConfig: Config = {
    allowNumbersOnly: true,
    length: 5,
  };
  @ViewChild(NgOtpInputComponent) otpInputField: NgOtpInputComponent;

  constructor(private router: Router, private loginService: LoginService, private toastMsgService: ToastService,
    private couponService: CouponService) { }

  roles = {
    superadmin: 'Super Admin',
    admin: 'Admin'
  }
  error: HttpErrorResponse;
  ngOnInit() { }


  /**
 * Method that start timer of 30 secs to resend otp
 */
  startTimer() {
    this.canResendOtp = false;
    this.timeLeft--;
    this.sendOtpText = `${this.timeLeft} secs left`
    this.interval = setInterval(() => {
      this.timeLeft--;
      this.sendOtpText = `${this.timeLeft} secs left`
      if (this.timeLeft === 0) {
        this.sendOtpText = 'Resend OTP'
        this.stopTimer();
      }
    }, 1000)
  }

  /**
   * Method that stop timer for resend otp
   */
  stopTimer() {
    clearInterval(this.interval);
    this.timeLeft = 30;
    this.canResendOtp = true;
  }

  /**
   * Method to login the user
   */
  sentOtp() {
    if (!this.phoneNumber.valid) {
      this.toastMsgService.showWarning('Kindly enter valid contact number');
      return;
    }

    const loginData = {
      phone: `+91${this.phoneNumber.value}`,
    };

    this.loginService.loginOtp(loginData).subscribe(response => {
      this.startTimer();
      this.toastMsgService.showSuccess('OTP sent successfully');
      this.isOtpSent = true;

      // clear the OTP field
      if (this.otpInputField) {
        this.otpInputField.setValue('');
      }
    });
  }


  /**
  * Method that verifies login otp
  */
  verifyOtp() {
    const loginData = {
      phone: `+91${this.phoneNumber.value}`,
      otp: this.otp
    }
    this.loginService.loginVerify(loginData).subscribe(response => {
      this.stopTimer();
      localStorage.setItem('token', response['result']['token']);
      localStorage.setItem('refreshToken', response['result']['refresh_token']);
      localStorage.setItem('userName', response['result']['full_name']);
      const role = [];
      response['result']['role'].forEach(r => role.push(Roles[r]));
      localStorage.setItem('role', JSON.stringify(role));
      localStorage.setItem('service', Services.Food);
      this.couponService.service$.next(localStorage.getItem('service'));
      this.router.navigate(['coupon']);
      this.toastMsgService.showSuccess('Logged In Successfully');
    })

  }

  /**
   * Method that invokes on each otp input
   * and it stores the otp
   * @param event 
   */
  onOtpChange(event: string) {
    this.otp = event;
  }

  /**
   * Method that allow user to enter phone number again
   */
  signInAgain() {
    this.phoneNumber.reset();
    this.isOtpSent = false;
    this.stopTimer();
  }

  resetOtp(otpInput: any) {
    otpInput.setValue(''); // clear the value of the input field
  }

}
