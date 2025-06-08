import { Component } from '@angular/core';
import { CustomerService } from 'src/app/services/customer.service';
import { Observable } from 'rxjs';
import {
  IonTitle,
  IonHeader,
  IonContent,
  IonToolbar,
  IonMenuButton,
  IonButtons, IonSkeletonText, IonCard, IonCardSubtitle, IonChip, IonCardContent } from '@ionic/angular/standalone';
import { FooterComponent } from '../../../components/footer/footer.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-customer-booking-history',
  templateUrl: './customer-booking-history.page.html',
  styleUrls: ['./customer-booking-history.page.scss'],
  standalone: true,
  imports: [IonCardContent, IonChip, IonCardSubtitle, IonCard, IonSkeletonText, 
    IonButtons,
    CommonModule,
    IonToolbar,
    FooterComponent,
    IonTitle,
    IonHeader,
    IonContent,
    IonMenuButton,
  ],
})
export class CustomerBookingHistoryPage {
  bookings$!: Observable<any[]>;

  constructor(private customerService: CustomerService) {}

  ionViewWillEnter() {
    this.bookings$ = this.customerService.getPastBookings();
  }
}

