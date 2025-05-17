import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

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
  IonMenuButton, IonTabButton, IonFooter, IonTabBar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-dashboard-cliente',
  templateUrl: './dashboard-cliente.page.html',
  styleUrls: ['./dashboard-cliente.page.scss'],
  standalone: true,
  imports: [IonTabBar, IonFooter, IonTabButton, 
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonIcon,
    IonLabel,
    IonButtons,
    IonButton,
    IonAvatar,
    IonMenuButton,
    CommonModule
  ]
})
export class DashboardClientePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
