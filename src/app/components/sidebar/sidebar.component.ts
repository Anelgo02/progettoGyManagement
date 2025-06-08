import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonIcon, IonLabel, IonButton } from "@ionic/angular/standalone";
import { AuthService } from 'src/app/core/auth.service';
import { MenuController } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { NotificationService } from 'src/app/services/notification.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonIcon, IonLabel, IonButton, CommonModule],
  standalone: true,
})
export class SidebarComponent implements OnInit {
  user$: Observable<User | null>;
  unreadCount: number = 0;

  constructor(private auth: AuthService, private router: Router, private menuCtrl: MenuController, private notificationService: NotificationService) {
    this.user$ = this.auth.user$;

  }

    ngOnInit(): void {
    // Sub iniziale al BehaviorSubject per mostrare subito il pallino
    this.notificationService.unreadCount$.subscribe(count => {
      this.unreadCount = count;
    });

    // Recupera subito lo user attuale per caricare eventuali notifiche
    this.auth.user$.subscribe(user => {
      if (user?.role === 'customer') {
        this.notificationService.getNotifications().subscribe(); // inizializzazione
      }
    });
  }

  ionViewWillEnter() {
    this.auth.user$.subscribe(user => {
      if (user?.role === 'customer') {
        this.notificationService.getNotifications().subscribe(); // aggiorna se rientra
      }
    });
  }


  logout() {
    this.menuCtrl.close().then(() => {
      this.auth.logout().subscribe(() => {
        this.router.navigate(['/login']);
      });
    });
  }

  // Navigazione per customer

  visualizzaCronologia() {
    this.menuCtrl.close().then(() => {
      this.router.navigate(['/customer/booking-history']);
    });
  }

  recensisci() {
    this.menuCtrl.close().then(() => {
      this.router.navigate(['/customer/review-page']);
    });
  }

  notifiche() {
    this.menuCtrl.close().then(() => {
      this.router.navigate(['/customer/notifications']);
    });
  }

  selezionaPt() {
    this.menuCtrl.close().then(() => {
      this.router.navigate(['/customer/trainer-selection']);
    });
  }

  // Navigazione per trainer

  visualizzaClienti() {
    this.menuCtrl.close().then(() => {
      this.router.navigate(['/trainer/trainer-clients']);
    });
  }

  visualizzaRecensioni() {
    this.menuCtrl.close().then(() => {
      this.router.navigate(['/trainer/trainer-reviews']);
    });
  }

  gestioneSlot() {
    this.menuCtrl.close().then(() => {
      this.router.navigate(['/gestione-slot']);
    });
  }
}
