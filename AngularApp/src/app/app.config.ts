import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { JwtInterceptor } from './Services/jwt-interceptor';
import { routes } from './app.routes';
import { provideHttpClient, HTTP_INTERCEPTORS,withInterceptorsFromDi } from '@angular/common/http';
import { provideNativeDateAdapter } from '@angular/material/core';
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()),
    provideNativeDateAdapter(),
    {provide:HTTP_INTERCEPTORS,useClass:JwtInterceptor,multi:true},
  
  ]
};
