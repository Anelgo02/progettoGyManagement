import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { homeOutline, barbellOutline, searchOutline, notificationsOutline, settingsOutline } from 'ionicons/icons';
import { InjectionToken } from '@angular/core';
import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { environment } from './environments/environment';
import { authInterceptor } from './app/core/auth.interceptor';

export const API_BASE = new InjectionToken<string>('API_BASE');

addIcons({
  'home-outline': homeOutline,
  'barbell-outline': barbellOutline,
  'search-outline': searchOutline,
  'notifications-outline': notificationsOutline,
  'settings-outline': settingsOutline,
});

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideHttpClient(withInterceptors([authInterceptor])),
    { provide: API_BASE, useValue: environment.apiBase }   // "http://localhost:3000"
  ],
});
