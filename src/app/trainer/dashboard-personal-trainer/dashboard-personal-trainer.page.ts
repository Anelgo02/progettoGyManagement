
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
  IonChip, IonToolbar, IonContent,
  IonHeader,  IonTitle, 
   IonCard, IonSkeletonText,  IonCardContent
} from '@ionic/angular/standalone';
import { FooterComponent } from "../../components/footer/footer.component";

@Component({
  selector: 'app-dashboard-trainer',
  templateUrl: './dashboard-personal-trainer.page.html',
  styleUrls: ['./dashboard-personal-trainer.page.scss'],
  standalone: true,
  imports: [
     IonMenuButton, IonCardSubtitle, IonCardTitle, IonButtons, IonCardHeader,
     IonChip, IonToolbar, IonContent,
    IonHeader, IonTitle, 
    IonCard, IonSkeletonText,  IonCardContent, CommonModule,
    FooterComponent
]
})
export class DashboardTrainerPage {
  
  upcomingSessions$!: Observable<any[]>;
  trainerSpecialization: string = '';

  constructor(
    private menuCtrl: MenuController,
    private auth: AuthService,
    private router: Router,
    private trainerService: TrainerService
  ) {}


   ionViewWillEnter() {
    this.menuCtrl.close();

    this.upcomingSessions$ = this.trainerService.getDashboard().pipe(
      map(res => {
        this.trainerSpecialization = res.data?.trainer_info?.specialization || '';
        return  res.data?.upcoming_sessions || []; 
        }),
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
