import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

/**
 * Interceptor para agregar el id del usuario al header de la peticion.
 * Se utiliza para las peticiones que requieren autenticacion.
 *
 * Se excluyen las peticiones publicas (las peticiones deben tener "PUBLIC-REQUEST" en el header de la peticion).
 * @see AuthService
 */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    console.log('interceptor');
    // Se asigna el id del usuario al encabezado de la petición.
    if (!request.headers.has('PUBLIC-REQUEST')) {
      const modifiedRequest = request.clone({
        setHeaders: {
          idUser: this.authService.user?.id.toString(),
        },
      });

      return next.handle(modifiedRequest);
    }

    return next.handle(request);
  }
}
