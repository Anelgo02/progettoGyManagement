import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/services/customer.service';
import { IonTitle, IonHeader, IonContent, IonToolbar, IonItem, IonLabel, IonList, IonMenuButton, IonButtons } from "@ionic/angular/standalone";
import { FooterComponent } from "../../components/footer/footer.component";
import { CommonModule } from "@angular/common";

@Component({
  selector: 'app-customer-booking-history',
  templateUrl: './customer-booking-history.page.html',
  styleUrls: ['./customer-booking-history.page.scss'],
  imports: [IonButtons, CommonModule, IonList, IonLabel, IonItem, IonToolbar, FooterComponent, IonTitle, IonHeader, IonContent, IonMenuButton, IonButtons],
})
export class CustomerBookingHistoryPage implements OnInit {
  bookings: any[] = [];

  constructor(private customerService: CustomerService) {}

  ngOnInit() {
    this.customerService.getPastBookings().subscribe(res => {
      this.bookings = res;
    });
  }
}
