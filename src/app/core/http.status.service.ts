import {BehaviorSubject, Observable} from 'rxjs';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpStatusService {

  private readonly requestInFlight$: BehaviorSubject<number>;
  private readonly onFlight$: BehaviorSubject<boolean>;
  private count: number;

  constructor() {
    this.count = 0;
    this.onFlight$ = new BehaviorSubject(false);
    this.requestInFlight$ = new BehaviorSubject(this.count);
    this.requestInFlight$.asObservable().subscribe(operator => {
      this.count += operator;
      this.onFlight$.next(Math.max(0, this.count) > 0);
    });
  }

  onFlight(): Observable<boolean> {
    return this.onFlight$.asObservable();
  }

  initFlight() {
    this.requestInFlight$.next(1);
  }

  endFlight() {
    this.requestInFlight$.next(-1);
  }
}
