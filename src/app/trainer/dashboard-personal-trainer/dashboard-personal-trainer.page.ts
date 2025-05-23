
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Observable, catchError, map, of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/auth.service';
import Swal from 'sweetalert2';
import { TrainerService } from '../../services/trainer.service';
import {
  MenuController,
  IonMenuButton, IonCardSubtitle, IonCardTitle, IonButtons, IonCardHeader,
  IonTabButton, IonTabBar, IonChip, IonIcon, IonToolbar, IonContent,
  IonHeader,  IonTitle, IonLabel,
   IonCard, IonSkeletonText, IonFooter, IonCardContent
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-dashboard-trainer',
  templateUrl: './dashboard-personal-trainer.page.html',
  styleUrls: ['./dashboard-personal-trainer.page.scss'],
  standalone: true,
  imports: [
    RouterLink, IonMenuButton, IonCardSubtitle, IonCardTitle, IonButtons, IonCardHeader,
    IonTabButton, IonTabBar, IonChip, IonIcon, IonToolbar, IonContent,
     IonHeader,  IonTitle,  IonLabel,
     IonCard, IonSkeletonText, IonFooter, IonCardContent, CommonModule
  ]
})
export class DashboardTrainerPage {
  
  upcomingSessions$!: Observable<any[]>;

  constructor(
    private menuCtrl: MenuController,
    private auth: AuthService,
    private router: Router,
    private trainerService: TrainerService
  ) {}


   ionViewWillEnter() {
    this.menuCtrl.close();

    this.upcomingSessions$ = this.trainerService.getDashboard().pipe(
      map(res => res.data?.upcoming_sessions || []),
      catchError(err => {
        console.error('Errore nel recupero delle sessioni', err);
        Swal.fire({
          icon: 'error',
          title: 'Errore',
          text: 'Impossibile recuperare le sessioni.',
          confirmButtonText: 'OK',
          heightAuto: false,
        });
        return of([]); //per evitare crash
      })
    );
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
