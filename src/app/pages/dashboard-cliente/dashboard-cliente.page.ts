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

@Component({
  selector: 'app-dashboard-cliente',
  templateUrl: './dashboard-cliente.page.html',
  styleUrls: ['./dashboard-cliente.page.scss'],
  standalone: true,
  imports: [
    // Ionic UI
    IonContent, IonHeader, IonTitle, IonToolbar, IonIcon, IonLabel, IonButtons,
    IonButton, IonAvatar, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle,
    IonCardContent, IonChip, IonMenu, IonMenuButton, IonList, IonItem,
    IonFooter, IonTabBar, IonTabButton, IonSkeletonText,
    // Angular common
    CommonModule, NgIf, NgFor, AsyncPipe
  ]
})


export class DashboardClientePage implements OnInit {

  /** Stream degli allenamenti (arriva dal service) */
  allenamenti$!: Observable<Allenamento[]>;

  constructor(private workoutSvc: WorkoutService, private auth: AuthService) {}

  ngOnInit() {
    this.allenamenti$ = this.workoutSvc.list();
  }

  logout() {
    console.log('Logout eseguito');
  }
}
