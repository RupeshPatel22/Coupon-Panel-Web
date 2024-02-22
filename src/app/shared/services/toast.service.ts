import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toastrService: ToastrService) { }

  public showSuccess(message): void {
    this.toastrService.success(message);
  }

  public showInfo(message): void {
    this.toastrService.info(message);
  }

  public showWarning(message): void {
    this.toastrService.warning(message);
  }

  public showError(message): void {
    this.toastrService.error(message);

  }
}
