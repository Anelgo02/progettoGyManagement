import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonAvatar, IonIcon, IonButtons } from '@ionic/angular/standalone';
import { HeaderComponent } from "../components/header/header.component";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonButtons, IonIcon, IonAvatar, IonButton, IonHeader, IonToolbar, IonTitle, IonContent, HeaderComponent],
})
export class HomePage {
  constructor() {}
}
