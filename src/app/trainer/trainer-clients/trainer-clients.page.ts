import { Component } from '@angular/core';
import { TrainerService } from '../../services/trainer.service';
import { CommonModule } from '@angular/common';
import { Observable, catchError, map, of } from 'rxjs';
import Swal from 'sweetalert2';
import {
  IonContent, IonHeader, IonToolbar, IonTitle, IonCard, IonCardContent,
  IonCardHeader, IonCardSubtitle, IonCardTitle, IonSkeletonText, IonMenuButton
} from '@ionic/angular/standalone';
import { FooterComponent } from "../../components/footer/footer.component";

@Component({
  selector: 'app-trainer-clients',
  templateUrl: './trainer-clients.page.html',
  styleUrls: ['./trainer-clients.page.scss'],
  standalone: true,
  imports: [
    IonContent, IonHeader, IonToolbar, IonTitle,IonMenuButton,
    IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle,
    IonSkeletonText, CommonModule,
    FooterComponent
]
})
export class TrainerClientsPage {
  clients$!: Observable<any[]>;

  constructor(private trainerService: TrainerService) {}

  ionViewWillEnter() {
    this.clients$ = this.trainerService.getDashboard().pipe(
      map(res => res.data?.clients || []),
      catchError(err => {
        console.error('Errore nel recupero dei clienti', err);
        Swal.fire({
          icon: 'error',
          title: 'Errore',
          text: 'Impossibile recuperare i clienti.',
          confirmButtonText: 'OK',
          heightAuto: false,
        });
        return of([]);
      })
    );
  }
}
