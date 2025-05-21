import { Routes } from '@angular/router';

export const routes: Routes = [
 

  {
    path: '',
    redirectTo: 'customer/dashboard',    
    pathMatch: 'full',
  },

 
  {
    path: 'login',
    loadComponent: () => import('./pages/login-page/login-page').then((m) => m.LoginPage),
  },
  
  {
    path: 'customer/dashboard',
    loadComponent: () => import('./customer/dashboard-cliente/dashboard-cliente.page').then( m => m.DashboardClientePage)
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
    path: 'customer/profile-page',
    loadComponent: () => import('./customer/userprofile-page/userprofile-page.page').then( m => m.ProfilePage)
  },
  {
    path: 'customer/review-page',
    loadComponent: () => import('./customer/review-page/review-page.page').then( m => m.ReviewPage)
  },
  {
    path: 'booking-page',
    loadComponent: () => import('./customer/booking-page/booking-page.page').then( m => m.BookingPage)
  }




];

