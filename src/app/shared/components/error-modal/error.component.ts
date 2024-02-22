import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ErrorService } from '../../services/error.service';
@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss'],
})
export class ErrorComponent {
  showModal: boolean;
  error: any;
  customMessage: string;
  shouldReload: boolean;
  constructor(
    private errorService: ErrorService,
    private userService: UserService
  ) {
    this.errorService.showModal.subscribe((data) => {
      if (data) {
        this.showModal = true;
        this.error = this.errorService.error;
        this.customMessage = this.errorService.customMessage;
        this.shouldReload = this.errorService.shouldReload;
      } else {
        this.showModal = false;
        this.error = null;
        this.customMessage = null;
        this.shouldReload = false;
      }
    });
  }
  /**
   * Method that closes error modal
   */
  close() {
    this.showModal = false;
    if (this.shouldReload) {
      window.location.href = '/auth';
    }
  }
  /**
   * Method that hides error modal
   */
  onHidden() {
    this.errorService.hideErrorModal();
  }
}
