
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonHeader, IonContent, IonToolbar, IonIcon, IonTitle,
   IonLabel, 
  IonButtons, IonMenuButton, IonCard
} from "@ionic/angular/standalone";
import { AuthService } from 'src/app/core/auth.service';
import { FooterComponent } from "../../components/footer/footer.component";
//import { TrainerService } from 'src/app/services/trainer.service';

@Component({
  selector: 'app-trainer-reviews',
  templateUrl: './ptreview-page.page.html',
  styleUrls: ['./ptreview-page.page.scss'],
  standalone: true,
  imports: [
    CommonModule, FormsModule, RouterModule,
    IonMenuButton, IonButtons, IonIcon, IonToolbar,
    IonContent, IonHeader, IonTitle, IonLabel,
    IonCard,
    FooterComponent
]
})
export class TrainerReviewsPage {
  reviews: { customerName: string, rating: number, comment: string, date: string }[] = [];
  averageRating: number = 0;

  constructor(
    private auth: AuthService,
   // private trainerService: TrainerService,
    private router: Router
  ) {}

  ionViewWillEnter() {
    this.reviews = [
      {
        customerName: 'Mario Rossi',
        rating: 5,
        comment: 'Fantastico allenatore, molto disponibile!',
        date: '2025-05-18T00:00:00Z'
      },
      {
        customerName: 'Laura Bianchi',
        rating: 4,
        comment: 'Buona esperienza, allenamenti intensi!',
        date: '2025-05-15T00:00:00Z'
      },
      {
        customerName: 'Giuseppe Verdi',
        rating: 3,
        comment: 'Ok ma si può migliorare.',
        date: '2025-05-10T00:00:00Z'
      }
    ];

    const total = this.reviews.reduce((acc, r) => acc + r.rating, 0);
    this.averageRating = this.reviews.length > 0 ? total / this.reviews.length : 0;
  }

  getStarIcon(star: number, value: number): string {
    if (value >= star) return 'star';
    if (value >= star - 0.5) return 'star-half';
    return 'star-outline';
  }

  logout() {
    this.auth.logout().subscribe(() => {
      this.router.navigate(['/login']);
    });
  }
}

