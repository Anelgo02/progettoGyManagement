import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Router, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';

import { CustomerService } from '../../services/customer.service';
import { Trainer } from '../../models/Trainer'; // ✅ la tua interfaccia

@Component({
  standalone: true,
  selector: 'app-trainer-selection',
  templateUrl: './trainer-selection.page.html',
  styleUrls: ['./trainer-selection.page.scss'],
  imports: [CommonModule, IonicModule, RouterModule]
})
export class TrainerSelectionPage {
  private customerService = inject(CustomerService);
  private router = inject(Router);

  // ✅ Tipizzata correttamente con Trainer[]
  trainers$: Observable<Trainer[]> = this.customerService.getTrainers();

  goHome() {
    this.router.navigate(['/customer/dashboard']);
  }
}
