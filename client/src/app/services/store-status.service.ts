import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoreStatusService {

  // initial value from localStorage
  private storeSubject = new BehaviorSubject<boolean>(
    localStorage.getItem('storeOpen') === 'true'
  );

  // observable for all components
  storeStatus$ = this.storeSubject.asObservable();

  // update store status
  setStoreStatus(status: boolean): void {
    localStorage.setItem('storeOpen', String(status));
    this.storeSubject.next(status);
  }

  // get current value
  getCurrentStatus(): boolean {
    return this.storeSubject.value;
  }
}