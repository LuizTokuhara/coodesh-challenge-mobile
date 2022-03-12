import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private loadPresent: boolean = false;

  constructor(public load: LoadingController) {}

  async show() {
    this.loadPresent = true;
    return await this.load
      .create({
        spinner: 'dots',
        duration: 5000,
      })
      .then((a) => {
        a.present().then(() => {
          if (!this.loadPresent) {
            a.dismiss().then(() => {});
          }
        });
      });
  }

  async hide() {
    this.loadPresent = false;
    return await this.load.dismiss().then(() => {
      //console.log('load dismiss');
    });
  }
}
