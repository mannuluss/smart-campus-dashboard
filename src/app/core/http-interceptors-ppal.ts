import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { LoadingInterceptor } from "./loader/interceptor/loading.interceptor";
import { AuthInterceptor } from "./auth/services/auth.interceptor";

/**
 * Interceptores principales basados en http.
 */
export const HTTP_INTERCEPTORS_APP_MODULE = [
  //Loading interceptor
  {
    provide: HTTP_INTERCEPTORS,
    useClass: LoadingInterceptor,
    multi: true,
  },
  // AuthInterceptor,
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
  }
];
