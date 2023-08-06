import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { LoadingInterceptor } from "./interceptor/loading.interceptor";

/**
 * Interceptores principales basados en http.
 */
export const HTTP_INTERCEPTORS_APP_MODULE = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: LoadingInterceptor,
    multi: true,
  },
];
