import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  userDataLoading = new BehaviorSubject(null);
  currentUser: any;

  constructor( ) { }

  getCurrentUser() {
    
  }

}
