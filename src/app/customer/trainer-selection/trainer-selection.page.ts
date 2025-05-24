import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Router, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { CustomerService } from '../../services/customer.service';
import { Trainer } from '../../models/Trainer';
import { FooterComponent } from "../../components/footer/footer.component"; // 

@Component({
  standalone: true,
  selector: 'app-trainer-selection',
  templateUrl: './trainer-selection.page.html',
  styleUrls: ['./trainer-selection.page.scss'],
  imports: [CommonModule, IonicModule, RouterModule, FooterComponent]
})
export class TrainerSelectionPage {
  private customerService = inject(CustomerService);
  private router = inject(Router);

  
  trainers$: Observable<Trainer[]> = this.customerService.getTrainers();

  selectTrainer(trainerId: number) {
  console.log('ID selezionato:', trainerId);//per debuggare
  this.customerService.setTrainer(trainerId).subscribe({
    next: (response) => {
      Swal.fire({ 
        title: 'Scelta riuscita', 
        text: 'Trainer selezionato con successo!', 
        icon: 'success', 
        heightAuto: false });
      this.router.navigate(['/customer/dashboard']);

    },
    error: (error) => {
      console.error('Errore durante la selezione del trainer:', error);
    }
  });
}


  goHome() {
    this.router.navigate(['/customer/dashboard']);
  }
}
