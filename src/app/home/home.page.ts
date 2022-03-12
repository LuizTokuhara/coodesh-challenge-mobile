import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UserCardModalComponent } from '../components/user-card-modal/user-card-modal.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(private modalCtrl: ModalController) {}

  async open() {
    const modal = await this.modalCtrl.create({
      component: UserCardModalComponent,
      cssClass: 'user-card-modal',
      backdropDismiss: true,
      initialBreakpoint: 0.7,
      breakpoints: [0, 0.7],
      handle: false,
    });
    return await modal.present();
  }
}
