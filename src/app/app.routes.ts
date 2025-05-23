import { Routes } from '@angular/router';
import { RoleGuard } from './guards/role.guard'; 

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },

  {
    path: 'login',
    loadComponent: () => import('./pages/login-page/login-page').then((m) => m.LoginPage),
  },

  {
    path: 'registration-page',
    loadComponent: () => import('./pages/registration-page/registration-page.page').then((m) => m.RegisterPage),
  },

  // === ROTTE PROTETTE PER CUSTOMER ===
  {
    path: 'customer/dashboard',
    loadComponent: () => import('./customer/dashboard-cliente/dashboard-cliente.page').then(m => m.DashboardClientePage),
    canActivate: [RoleGuard],
    data: { role: 'customer' }
  },
  {
    path: 'customer/profile-page',
    loadComponent: () => import('./customer/userprofile-page/userprofile-page.page').then(m => m.ProfilePage),
    canActivate: [RoleGuard],
    
  },
  {
    path: 'customer/review-page',
    loadComponent: () => import('./customer/review-page/review-page.page').then(m => m.ReviewPage),
    canActivate: [RoleGuard],
    data: { role: 'customer' }
  },
  {
    path: 'customer/booking-page',
    loadComponent: () => import('./customer/booking-page/booking-page.page').then(m => m.BookingPage),
    canActivate: [RoleGuard],
    data: { role: 'customer' }
  },

  {
    path: 'customer/trainer-selection',
    loadComponent: () => import('../app/customer/trainer-selection/trainer-selection.page').then( m => m.TrainerSelectionPage),
    canActivate: [RoleGuard],
    data: { role: 'customer' }
  },

  

  // === ROTTA PER TRAINER ===
  {
    path: 'trainer/dashboard',
    loadComponent: () => import('./trainer/dashboard-personal-trainer/dashboard-personal-trainer.page').then(m => m.DashboardTrainerPage),
    canActivate: [RoleGuard],
    data: { role: 'trainer' }
  },
 
  {
    path: 'trainer/ptreview-page',
    loadComponent: () => import('./trainer/ptreview-page/ptreview-page.page').then( m => m.TrainerReviewsPage)
  }

];
