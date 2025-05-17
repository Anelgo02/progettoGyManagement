import { Routes } from '@angular/router';

export const routes: Routes = [
 

  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },

 
  {
    path: 'login',
    loadComponent: () => import('./pages/login-page/login-page').then((m) => m.LoginPage),
  },
  
  {
    path: 'dashboard',
    loadComponent: () => import('./pages/dashboard-cliente/dashboard-cliente.page').then( m => m.DashboardClientePage)
  }




];
