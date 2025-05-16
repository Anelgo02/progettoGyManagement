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
<<<<<<< HEAD
    path: 'prova',
    loadComponent: () => import('./components/header/header.component').then((m) => m.HeaderComponent),
  },
=======
    path: 'Login',
    loadComponent: () => import('./components/login-page/login-page.component').then((m) => m.LoginPageComponent),
  }
>>>>>>> 01ef95b258fba1383f39c5f91c587d5ab9f7c66e

  
];
