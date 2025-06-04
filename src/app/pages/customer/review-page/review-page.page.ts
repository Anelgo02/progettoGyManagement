import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { CustomerService } from '../../../services/customer.service';
import {
  IonHeader, IonContent, IonToolbar, IonIcon, IonTitle, IonLabel, IonButton,
  IonButtons, IonMenuButton, IonTextarea,
} from "@ionic/angular/standalone";
import { AuthService } from 'src/app/core/auth.service';
import { FooterComponent } from "../../../components/footer/footer.component";
import { LoadingService } from 'src/app/core/loading.service';

@Component({
  selector: 'app-review-page',
  templateUrl: './review-page.page.html',
  styleUrls: ['./review-page.page.scss'],
  standalone: true,
  imports: [
    IonMenuButton, IonButtons, IonIcon, IonToolbar,
    IonContent, IonHeader, IonTitle, IonLabel, IonButton,
    IonTextarea,
    FormsModule,
    RouterModule,
    CommonModule,
    FooterComponent
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
    private router: Router,
    private loadingService: LoadingService
  ) {
    this.customerService.getCustomerInfo().subscribe(info => {
      this.trainerId = info?.trainer_id || null;
    });
  }

  ionViewWillEnter() {
    this.rating = 0;
    this.reviewText = '';
    this.reviewDate = '';

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

  async rate_trainer() {
    const today = new Date();
    this.reviewDate = today.toISOString();

    if (this.rating === 0) {
      Swal.fire({ title: 'Errore', text: 'Valutazione obbligatoria.', icon: 'error', heightAuto: false });
      return;
    }

    if (!this.trainerId) {
      Swal.fire({ title: 'Errore', text: 'Trainer non assegnato.', icon: 'error', heightAuto: false });
      return;
    }

    await this.loadingService.show('Invio recensione in corso...');

    this.customerService.rateTrainer(this.trainerId, this.rating, this.reviewText).subscribe({
      next: () => {
        this.loadingService.hide();
        Swal.fire({ title: 'Pubblicazione riuscita', text: 'Recensione inviata con successo!', icon: 'success', heightAuto: false });
        this.rating = 0;
        this.reviewText = '';
        this.reviewDate = '';
      },
      error: (err: any) => {
        this.loadingService.hide();
        console.error(err);
        Swal.fire({ title: 'Errore', text: err.error?.message || 'Errore durante l’invio.', icon: 'error', heightAuto: false });
      }
    });
  }


}
