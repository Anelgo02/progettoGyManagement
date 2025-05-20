import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { AuthService } from '../../core/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import {
  IonHeader, IonItem, IonContent, IonToolbar, IonIcon, IonMenu, IonTitle, IonList, IonLabel, IonButton, IonCard, IonSkeletonText,
  IonFooter, IonCardContent, IonChip, IonTabBar, IonTabButton, IonCardHeader, IonButtons, IonCardTitle, IonCardSubtitle, IonMenuButton
} from "@ionic/angular/standalone";

@Component({
  selector: 'app-dashboard-cliente',
  templateUrl: './dashboard-cliente.page.html',
  styleUrls: ['./dashboard-cliente.page.scss'],
  standalone: true,
  imports: [IonMenuButton, IonCardSubtitle, IonCardTitle, IonButtons, IonCardHeader, IonTabButton, IonTabBar, IonChip, IonIcon, IonToolbar, IonContent, IonItem, IonHeader, IonMenu, IonTitle, IonList, IonLabel, IonButton, IonCard, IonSkeletonText, IonFooter
    , IonCardContent, CommonModule
    // Ionic UI + Angular
    // ...come nel tuo esempio originale
  ]
})
export class DashboardClientePage implements OnInit {
  upcomingBookings$!: Observable<any[]>;

  constructor(private customerSvc: CustomerService, private auth: AuthService, private router: Router) { }

  ngOnInit() {
    this.upcomingBookings$ = this.customerSvc.getUpcomingBookings();
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

  recensisci() {
    this.router.navigate(['/review-page']);
  }
}
