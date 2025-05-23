import { Component } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { AuthService } from '../../core/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import {
  MenuController,
  IonHeader, IonContent, IonToolbar, IonTitle, IonCard, IonSkeletonText,
  IonCardContent, IonChip, IonCardHeader, IonButtons, IonCardTitle, IonCardSubtitle, IonMenuButton
} from "@ionic/angular/standalone";
import Swal from 'sweetalert2';
import { FooterComponent } from "../../components/footer/footer.component";

@Component({
  selector: 'app-dashboard-cliente',
  templateUrl: './dashboard-cliente.page.html',
  styleUrls: ['./dashboard-cliente.page.scss'],
  standalone: true,
  imports: [IonMenuButton, IonCardSubtitle, IonCardTitle, IonButtons, IonCardHeader, IonChip, IonToolbar, IonContent, IonHeader, IonTitle, IonCard, IonSkeletonText,
    IonCardContent, CommonModule, FooterComponent]
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
