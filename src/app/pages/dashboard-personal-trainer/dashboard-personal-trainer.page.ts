import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonTab, IonTabs, IonTabBar, IonIcon, IonLabel, IonTabButton, IonButton, IonButtons } from '@ionic/angular/standalone';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-personal-trainer',
  templateUrl: './dashboard-personal-trainer.page.html',
  styleUrls: ['./dashboard-personal-trainer.page.scss'],
  standalone: true,
  imports: [IonButtons, IonButton, IonIcon, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class DashboardPersonalTrainerPage implements OnInit {

  constructor(private router: Router) { }

  vaiAlProfilo(){
    this.router.navigate(['/profilo']);
  }

  ngOnInit() {
  }

}
