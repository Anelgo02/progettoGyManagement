
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/auth.service';
//import { TrainerService } from '../../services/trainer.service';
import Swal from 'sweetalert2';
import {
  MenuController,
  IonMenuButton, IonCardSubtitle, IonCardTitle, IonButtons, IonCardHeader,
  IonTabButton, IonTabBar, IonChip, IonIcon, IonToolbar, IonContent,
  IonItem, IonHeader, IonMenu, IonTitle, IonList, IonLabel,
  IonButton, IonCard, IonSkeletonText, IonFooter, IonCardContent
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-dashboard-trainer',
  templateUrl: './dashboard-personal-trainer.page.html',
  styleUrls: ['./dashboard-personal-trainer.page.scss'],
  standalone: true,
  imports: [
    RouterLink, IonMenuButton, IonCardSubtitle, IonCardTitle, IonButtons, IonCardHeader,
    IonTabButton, IonTabBar, IonChip, IonIcon, IonToolbar, IonContent,
    IonItem, IonHeader, IonMenu, IonTitle, IonList, IonLabel,
    IonButton, IonCard, IonSkeletonText, IonFooter, IonCardContent, CommonModule
  ]
})
export class DashboardTrainerPage {
  nextSessions$!: Observable<any[]>;

  constructor(
    private menuCtrl: MenuController,
    private auth: AuthService,
    private router: Router,
   // private trainerService: TrainerService
  ) {}

  ionViewWillEnter() {
    this.menuCtrl.close();
  }

  logout() {
    this.menuCtrl.close().then(() => {
      this.auth.logout().subscribe(() => {
        this.router.navigate(['/login']);
      });
    });
  }

  gestisciSlot() {
    this.menuCtrl.close().then(() => {
      this.router.navigate(['/trainer/manage-slots']);
    });
  }

  vediClienti() {
    this.menuCtrl.close().then(() => {
      this.router.navigate(['/trainer/clients']);
    });
  }
}
