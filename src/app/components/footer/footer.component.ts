import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/app/core/auth.service';
import { IonFooter, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/angular/standalone';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    IonFooter,
    IonTabBar,
    IonTabButton,
    IonIcon,
    IonLabel
  ],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  userData: any;

  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    this.userData = this.auth.getUser();
  }
}
