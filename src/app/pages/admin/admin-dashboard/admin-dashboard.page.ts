import { Component, OnInit } from '@angular/core';
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
export class AdminDashboardPage implements OnInit {
  trainers$!: Observable<any[]>;
  customers$!: Observable<any[]>;

  constructor(private adminService: AdminService) {}

  ngOnInit() {
    this.trainers$ = this.adminService.getAllTrainers().pipe(
      map(res => res.status === 'success' ? res.data : [])
    );
    this.customers$ = this.adminService.getAllCustomers().pipe(
      map(res => res.status === 'success' ? res.data : [])
    );
  }
}
