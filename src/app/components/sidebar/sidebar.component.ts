import { Component, OnInit } from '@angular/core';
import { Router, } from '@angular/router';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonIcon, IonLabel, IonButton,  } from "@ionic/angular/standalone";
import { AuthService } from 'src/app/core/auth.service';
import {MenuController} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  imports: [ IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonIcon, IonLabel, IonButton, CommonModule],
  standalone: true,
})
export class SidebarComponent  implements OnInit {
  role: string = '';

  constructor(private auth: AuthService, private router: Router, private menuCtrl: MenuController) {

    this.role = this.auth.getUser()?.role?.toLowerCase() ?? '';



   }

  ngOnInit() {}

  logout() {
    this.menuCtrl.close().then(() => {
      this.auth.logout().subscribe(() => {
        this.router.navigate(['/login']);
      });
    });
  }

  recensisci() {
    this.menuCtrl.close().then(() => {
      this.router.navigate(['/customer/review-page']);
    }); 

  }

  selezionaPt() {
    this.menuCtrl.close().then(() => {
      this.router.navigate(['/customer/trainer-selection']);
    }); 

  }

}
