import { Component } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { AuthService } from '../../core/auth.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import {
  MenuController,
  IonHeader,  IonContent, IonToolbar, IonIcon, IonTitle,  IonLabel, IonCard, IonSkeletonText,
  IonFooter, IonCardContent, IonChip, IonTabBar, IonTabButton, IonCardHeader, IonButtons, IonCardTitle, IonCardSubtitle, IonMenuButton
} from "@ionic/angular/standalone";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard-cliente',
  templateUrl: './dashboard-cliente.page.html',
  styleUrls: ['./dashboard-cliente.page.scss'],
  standalone: true,
  imports: [RouterLink, IonMenuButton, IonCardSubtitle, IonCardTitle, IonButtons, IonCardHeader, IonTabButton, IonTabBar, IonChip, IonIcon, IonToolbar, IonContent, IonHeader, IonTitle,  IonLabel, IonCard, IonSkeletonText, IonFooter
    , IonCardContent, CommonModule

  ]
})

export class DashboardClientePage {
  upcomingBookings$!: Observable<any[]>;

  constructor(private menuCtrl: MenuController, private customerSvc: CustomerService, private auth: AuthService, private router: Router) {

    this.upcomingBookings$ = this.customerSvc.getUpcomingBookings();


  }


  ionViewWillEnter() {
    this.menuCtrl.close();
    this.upcomingBookings$ = this.customerSvc.getUpcomingBookings();


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
