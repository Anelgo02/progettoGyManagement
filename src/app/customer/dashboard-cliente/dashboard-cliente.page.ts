import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { AuthService } from '../../core/auth.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import {
  MenuController,
  IonHeader, IonItem, IonContent, IonToolbar, IonIcon, IonMenu, IonTitle, IonList, IonLabel, IonButton, IonCard, IonSkeletonText,
  IonFooter, IonCardContent, IonChip, IonTabBar, IonTabButton, IonCardHeader, IonButtons, IonCardTitle, IonCardSubtitle, IonMenuButton
} from "@ionic/angular/standalone";

@Component({
  selector: 'app-dashboard-cliente',
  templateUrl: './dashboard-cliente.page.html',
  styleUrls: ['./dashboard-cliente.page.scss'],
  standalone: true,
  imports: [RouterLink,IonMenuButton, IonCardSubtitle, IonCardTitle, IonButtons, IonCardHeader, IonTabButton, IonTabBar, IonChip, IonIcon, IonToolbar, IonContent, IonItem, IonHeader, IonMenu, IonTitle, IonList, IonLabel, IonButton, IonCard, IonSkeletonText, IonFooter
    , IonCardContent, CommonModule
    // Ionic UI + Angular
    // ...come nel tuo esempio originale
  ]
})

export class DashboardClientePage implements OnInit {
  upcomingBookings$!: Observable<any[]>;

  constructor(private menuCtrl: MenuController, private customerSvc: CustomerService, private auth: AuthService, private router: Router) { }

  ngOnInit() {
  
}

  ionViewWillEnter() {
    this.menuCtrl.close();

    this.auth.user$.pipe().subscribe(user => {
      if (!user) {
        this.router.navigate(['/login']);
      } else {
        this.upcomingBookings$ = this.customerSvc.getUpcomingBookings();
      }
    });

    this.menuCtrl.close();
  }

  

  logout() {
    this.menuCtrl.close().then(() => {
      this.auth.logout().subscribe(() => {
        this.router.navigate(['/login']);
      });
    });
  }

  recensisci() {
    this.menuCtrl.close().then(() => {
      this.router.navigate(['/customer/review-page']);
    }); // chiude il menu

  }
}
