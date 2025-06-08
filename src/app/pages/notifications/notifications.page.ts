import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/services/notification.service';
import { IonHeader, IonContent, IonToolbar, IonTitle, IonMenuButton, IonSkeletonText, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle } from "@ionic/angular/standalone";
import { CommonModule } from '@angular/common';
import { FooterComponent } from "../../components/footer/footer.component";

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
  standalone: true,
  imports: [IonHeader, IonContent, IonToolbar, IonTitle, IonMenuButton, CommonModule, FooterComponent, IonSkeletonText, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle]
})
export class NotificationsPage {
  notifications: any[] = [];

  constructor(private notificationService: NotificationService) { }


  ionViewWillEnter() {
  this.notificationService.getNotifications().subscribe(res => {
    this.notifications = res.data;

    const unread = res.data.filter((n: any) => !n.is_read);
    if (unread.length > 0) {
      unread.forEach((n: { id: number })  => {
        this.notificationService.markAsRead(n.id).subscribe(); // aggiorna anche count
      });
    }
  });
}


}
