import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private loadingElement: HTMLIonLoadingElement | null = null;

  constructor(private loadingController: LoadingController) {}

  /**
   * Mostra un overlay di caricamento con un messaggio opzionale.
   * @param message Messaggio da mostrare (default: "Attendere...")
   */
  async show(message: string = 'Attendere...') {
    this.loadingElement = await this.loadingController.create({
      message,
      spinner: 'crescent',
      translucent: true,
      cssClass: 'custom-loading'
    });
    await this.loadingElement.present();
  }

  /**
   * Nasconde l'overlay di caricamento se presente.
   */
  async hide() {
    if (this.loadingElement) {
      await this.loadingElement.dismiss();
      this.loadingElement = null;
    }
  }
}
