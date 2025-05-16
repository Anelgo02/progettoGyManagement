import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },

  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },

  {
    path: 'prova',
    loadComponent: () => import('./components/header/header.component').then((m) => m.HeaderComponent),
  },
  {
    path: 'Login',
    loadComponent: () => import('./components/login-page/login-page.component').then((m) => m.LoginPageComponent),
  }

  
];
