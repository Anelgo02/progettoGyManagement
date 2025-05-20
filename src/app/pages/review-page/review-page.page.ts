import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { CustomerService } from '../../services/customer.service';
import {
  IonHeader, IonItem, IonContent, IonToolbar, IonIcon, IonMenu, IonTitle, IonList, IonLabel, IonButton, IonCard, IonSkeletonText,
  IonFooter, IonCardContent, IonChip, IonTabBar, IonTabButton, IonCardHeader, IonButtons, IonCardTitle, IonCardSubtitle, IonMenuButton, IonTextarea, IonDatetime
} from "@ionic/angular/standalone";
import { AuthService } from 'src/app/core/auth.service';

@Component({
  selector: 'app-review-page',
  templateUrl: './review-page.page.html',
  styleUrls: ['./review-page.page.scss'],
  standalone: true,
  imports: [
    IonMenuButton, IonCardSubtitle, IonCardTitle, IonButtons, IonCardHeader, IonTabButton, IonTabBar, IonChip, IonIcon, IonToolbar,
    IonContent, IonItem, IonHeader, IonMenu, IonTitle, IonList, IonLabel, IonButton, IonCard, IonSkeletonText, IonFooter,
    IonTextarea, IonDatetime,
    FormsModule,
    RouterModule,
    CommonModule,
  ]
})
export class ReviewPage {
  trainerId: number | null = null;
  rating: number = 0;
  reviewText: string = '';
  reviewDate: string = '';

  constructor(
    private customerService: CustomerService,
    private auth: AuthService,
    private router: Router
  ) {
    this.customerService.getCustomerInfo().subscribe(info => {
      this.trainerId = info?.trainer_id || null;
    });
  }

  setRating(stars: number) {
    this.rating = stars;
  }

  isToday(dateStr: string): boolean {
    const today = new Date();
    const inputDate = new Date(dateStr);
    return (
      today.getFullYear() === inputDate.getFullYear() &&
      today.getMonth() === inputDate.getMonth() &&
      today.getDate() === inputDate.getDate()
    );
  }

  logout() {
    this.auth.logout().subscribe(() => {
      this.router.navigate(['/login']);
    });
  }

  rate_trainer() {
    if (!this.reviewDate) {
      Swal.fire({ title: 'Errore', text: 'Devi inserire la data della recensione.', icon: 'error', heightAuto: false });
      return;
    }

    if (!this.isToday(this.reviewDate)) {
      Swal.fire({ title: 'Errore', text: 'La data deve essere quella di oggi.', icon: 'error', heightAuto: false });
      return;
    }

    if (this.rating === 0 || !this.reviewText.trim()) {
      Swal.fire({ title: 'Errore', text: 'Valutazione e recensione obbligatorie.', icon: 'error', heightAuto: false });
      return;
    }

    if (!this.trainerId) {
      Swal.fire({ title: 'Errore', text: 'Trainer non assegnato.', icon: 'error', heightAuto: false });
      return;
    }

    this.customerService.rateTrainer(this.trainerId, this.rating, this.reviewText).subscribe({
      next: () => {
        Swal.fire({ title: 'Pubblicazione riuscita', text: 'Recensione inviata con successo!', icon: 'success', heightAuto: false });
        this.rating = 0;
        this.reviewText = '';
        this.reviewDate = '';
      },
      error: (err: any) => {
        console.error(err);
        Swal.fire({ title: 'Errore', text: err.error?.message || 'Errore durante l’invio.', icon: 'error', heightAuto: false });

      }
    });
  }
}
