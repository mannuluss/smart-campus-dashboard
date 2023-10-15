import {
  HttpErrorResponse,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoaderService } from '../services/loader.service';
import { Overlay } from '@angular/cdk/overlay';
import { Subscription, catchError, throwError, finalize } from 'rxjs';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  constructor(
    private loaderService: LoaderService,
    private overlay: Overlay,
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const instancia = new LoaderService(this.overlay);
    //start loader
    const spinnerShow = () =>
      (req.method === 'GET' || req.headers.get('SIMULATE-LOADER') === 'GET') &&
      req.headers.get('SIMULATE-LOADER') !== 'NONGET'
        ? instancia.spinner$.subscribe()
        : instancia.spinnerNoGet$.subscribe();

    const spinnerSubscription: Subscription = !req.headers.get('HIDE-LOADER')
      ? spinnerShow()
      : null;
    const request = req;

    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => throwError(err)),
      finalize(() => spinnerSubscription?.unsubscribe()),
    );
  }
}
