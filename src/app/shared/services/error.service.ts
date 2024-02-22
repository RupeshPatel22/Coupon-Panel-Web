import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Error } from '../components/error-modal/error.constants';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root',
})

export class ErrorService {
  showModal = new BehaviorSubject(null);
  error: any;
  customMessage: string;
  shouldReload: boolean;
  httpErrorMessage: string;

  constructor(private toastMsgService: ToastService, private router: Router) {}

  /**
   * method that show error modal
   * @param error
   * @param customMessage
   * @param shouldReload
   */
  showErrorModal(error, customMessage?: string, shouldReload?: boolean) {
    if (error) {
      this.error = new Error(error);
    }
    if (customMessage) {
      this.customMessage = customMessage;
    }
    this.showModal.next(true);
    this.shouldReload = shouldReload;
  }

  /**
   * Method that hide error modal
   */
  hideErrorModal() {
    this.error = null;
    this.customMessage = null;
    this.shouldReload = false;
    this.showModal.next(false);
  }
  
  /**
   * Method that handle errors
   * @param error
   * @returns boolean
   */
  errorHandler(error: HttpErrorResponse): HttpErrorResponse {
    if (error.status === 401) {
      this.toastMsgService.showError('Your session is invalid. Kindly login again');
      localStorage.clear();
      this.router.navigate(['login']);
      if (error.url.includes('user/token/refresh')) window.location.reload();
    } else if (error.status === 500) {
      this.router.navigate(['page500']);
    } else {
      error['error']?.['errors']?.forEach((err) => {
        this.toastMsgService.showError(err.message);
      });
    }
    return error;
  }
}
