import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { IonHeader, IonList, IonItem, IonLabel, IonContent, IonTitle, IonToolbar, IonMenuButton } from "@ionic/angular/standalone";
import { FooterComponent } from "../../components/footer/footer.component";
import { CommonModule } from "@angular/common";

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.page.html',
  styleUrls: ['./admin-dashboard.page.scss'],
  imports: [IonTitle, IonContent, IonLabel, IonItem, IonList, FooterComponent, IonHeader, IonToolbar, CommonModule, IonMenuButton],
})
export class AdminDashboardPage implements OnInit {
  trainers: any[] = [];
  customers: any[] = [];

  constructor(private adminService: AdminService) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.adminService.getAllTrainers().subscribe(res => {
      if (res.status === 'success') this.trainers = res.data;
    });

    this.adminService.getAllCustomers().subscribe(res => {
      if (res.status === 'success') this.customers = res.data;
    });
  }
}
