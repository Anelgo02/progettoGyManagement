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
  },
  {
    path: 'dashboard-personal-trainer',
    loadComponent: () => import('./pages/dashboard-personal-trainer/dashboard-personal-trainer.page').then( m => m.DashboardPersonalTrainerPage)
  },
  {
    path: 'registration-page',
    loadComponent: () => import('./pages/registration-page/registration-page.page').then( m => m.RegisterPage)
  },
  {
    path: 'userprofile-page',
    loadComponent: () => import('./pages/userprofile-page/userprofile-page.page').then( m => m.ProfilePage)
  },
  {
    path: 'review-page',
    loadComponent: () => import('./pages/review-page/review-page.page').then( m => m.ReviewPage)
  }





];

