import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, finalize, map} from 'rxjs/operators';
import {HttpStatusService} from "../http.status.service";

@Injectable({
  providedIn: 'root'
})
export class HttpStatusInterceptor implements HttpInterceptor {

  constructor(private status: HttpStatusService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.status.initFlight();
    return next.handle(request).pipe(
      map(event => event),
      catchError(error => throwError(error)),
      finalize(() => this.status.endFlight())
    );
  }
}
