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

  // === ROTTE PER CUSTOMER ===
  {
    path: 'customer/dashboard',
    loadComponent: () => import('./pages/customer/dashboard-cliente/dashboard-cliente.page').then(m => m.DashboardClientePage),
    canActivate: [RoleGuard],
    data: { role: 'customer' }
  },
  {
    path: 'customer/profile-page',
    loadComponent: () => import('./pages/customer/userprofile-page/userprofile-page.page').then(m => m.ProfilePage),
    canActivate: [RoleGuard],
    
  },
  {
    path: 'customer/review-page',
    loadComponent: () => import('./pages/customer/review-page/review-page.page').then(m => m.ReviewPage),
    canActivate: [RoleGuard],
    data: { role: 'customer' }
  },
  {
    path: 'customer/booking-page',
    loadComponent: () => import('./pages/customer/booking-page/booking-page.page').then(m => m.BookingPage),
    canActivate: [RoleGuard],
    data: { role: 'customer' }
  },

  {
    path: 'customer/trainer-selection',
    loadComponent: () => import('./pages/customer/trainer-selection/trainer-selection.page').then( m => m.TrainerSelectionPage),
    canActivate: [RoleGuard],
    data: { role: 'customer' }
  },

   {
    path: 'customer/booking-history',
    loadComponent: () => import('./pages/customer/customer-booking-history/customer-booking-history.page').then( m => m.CustomerBookingHistoryPage),
    canActivate: [RoleGuard],
    data: { role: 'customer' }
  },

  

  // === ROTTE PER TRAINER ===
  {
    path: 'trainer/dashboard',
    loadComponent: () => import('./pages/trainer/dashboard-personal-trainer/dashboard-personal-trainer.page').then(m => m.DashboardTrainerPage),
    canActivate: [RoleGuard],
    data: { role: 'trainer' }
  },
 

  {
    path: 'trainer/create-slot',
    loadComponent: () => import('./pages/trainer/create-slot/create-slot.page').then( m => m.CreateSlotPage),
    canActivate: [RoleGuard],
    data: { role: 'trainer' }
  },
  
  {
    path: 'trainer/trainer-reviews',
    loadComponent: () => import('./pages/trainer/trainer-reviews/trainer-reviews.page').then( m => m.TrainerReviewsPage),
    canActivate: [RoleGuard],
    data: { role: 'trainer' }
  },
  {
    path: 'trainer/trainer-clients',
    loadComponent: () => import('./pages/trainer/trainer-clients/trainer-clients.page').then( m => m.TrainerClientsPage),
    canActivate: [RoleGuard],
    data: { role: 'trainer' }
  },

  {
    path: 'gestione-slot',
    loadComponent: () => import('./pages/trainer/gestione-slot/gestione-slot.page').then( m => m.GestioneSlotPage),
    canActivate: [RoleGuard],
    data: { role: 'trainer' }
  },


  // === ROTTE PER ADMIN ===
  {
    path: 'admin/dashboard',
    loadComponent: () => import('./pages/admin/admin-dashboard/admin-dashboard.page').then(m => m.AdminDashboardPage),
    canActivate: [RoleGuard],
    data: { role: 'admin' }
  },

  {
    path: 'customer/notifications',
    loadComponent: () => import('./pages/notifications/notifications.page').then( m => m.NotificationsPage),
    canActivate: [RoleGuard],
    data: { role: 'customer' }
  },

  {
    path: '**',
    loadComponent: () => import('./pages/error-page/error-page.page').then(m => m.ErrorPagePage),
    
  },
  
 
  


  

  
 

  




];
