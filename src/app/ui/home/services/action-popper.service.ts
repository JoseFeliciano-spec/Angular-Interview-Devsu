import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ActionPopperService {
  private activePopperIdSubject = new BehaviorSubject<string | null>(null);
  activePopper$ = this.activePopperIdSubject.asObservable();

  setActivePopper(popperId: string | null) {
    this.activePopperIdSubject.next(popperId);
  }
}
