
import { Component, OnInit } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonTitle,
  IonButton,
  IonIcon
} from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
    

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  standalone: true,
  imports: [
    IonicModule,
    RouterModule
  ],
})
export class HeaderComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
