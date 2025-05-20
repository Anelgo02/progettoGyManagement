import { Component, OnInit } from '@angular/core';
import { CommonModule, AsyncPipe, NgIf, NgFor } from '@angular/common';

import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonIcon,
  IonLabel,
  IonButtons,
  IonButton,
  IonAvatar,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonChip,
  IonMenu,
  IonMenuButton,
  IonList,
  IonItem,
  IonFooter,
  IonTabBar,
  IonTabButton,
  IonSkeletonText
} from '@ionic/angular/standalone';

import { Observable } from 'rxjs';
import { Allenamento } from '../../models/allenamento';
import { WorkoutService } from '../../services/workout.service';
import { AuthService } from '../../core/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-cliente',
  templateUrl: './dashboard-cliente.page.html',
  styleUrls: ['./dashboard-cliente.page.scss'],
  standalone: true,
  imports: [
    // Ionic UI
    IonContent, IonHeader, IonTitle, IonToolbar, IonIcon, IonLabel, IonButtons,
    IonButton, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle,
    IonCardContent, IonChip, IonMenu, IonMenuButton, IonList, IonItem,
    IonFooter, IonTabBar, IonTabButton, IonSkeletonText,
    // Angular common
    CommonModule, NgIf, NgFor, AsyncPipe
  ]
})


export class DashboardClientePage implements OnInit {

  /** Stream degli allenamenti (arriva dal service) */
  allenamenti$!: Observable<Allenamento[]>;

  constructor(private workoutSvc: WorkoutService, private auth: AuthService, private router: Router) { }

  ngOnInit() {
  this.auth.user$.subscribe(user => {
    if (user && user.uid) {
      this.allenamenti$ = this.workoutSvc.list(user.uid);
    } else {
      this.router.navigate(['/login']);
    }
  });
}


  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
    console.log('Logout eseguito');
  }

  recensisci() {

  }
}
