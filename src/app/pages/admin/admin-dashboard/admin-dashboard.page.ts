import { Component } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { Observable, map } from 'rxjs';
import {
  IonHeader,
  IonContent,
  IonTitle,
  IonToolbar,
  IonMenuButton,
  IonCard,
  IonCardSubtitle, IonSkeletonText, IonCardContent, IonCardHeader, IonCardTitle } from "@ionic/angular/standalone";
import { FooterComponent } from "../../../components/footer/footer.component";
import { CommonModule } from "@angular/common";

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.page.html',
  styleUrls: ['./admin-dashboard.page.scss'],
  standalone: true,
  imports: [IonCardTitle, IonCardHeader, IonCardContent, IonSkeletonText, 
    IonCardSubtitle,
    IonCard,
    IonTitle,
    IonContent,
    FooterComponent,
    IonHeader,
    IonToolbar,
    CommonModule,
    IonMenuButton
  ]
})
export class AdminDashboardPage {
  trainers$!: Observable<any[]>;
  customers$!: Observable<any[]>;

  constructor(private adminService: AdminService) {}

  ionViewWillEnter() {
    this.trainers$ = this.adminService.getAllTrainers();
    this.customers$ = this.adminService.getAllCustomers();
  }
}
