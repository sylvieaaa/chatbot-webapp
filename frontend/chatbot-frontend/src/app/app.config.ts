import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { headersInterceptor } from './core/interceptors/headers.interceptor';
import { ToastrModule } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([headersInterceptor])),
    provideAnimations(),
    importProvidersFrom([
      ToastrModule.forRoot({
        timeOut: 2000, // Duration of toast visibility
        positionClass: 'toast-top-right',
        preventDuplicates: true, // Prevent duplicate toasts
      }),
    ]),
  ],
};
