import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { User } from 'src/app/shared/interfaces/user.interface';

@Component({
  selector: 'app-user-card-modal',
  templateUrl: './user-card-modal.component.html',
  styleUrls: ['./user-card-modal.component.scss'],
})
export class UserCardModalComponent implements OnInit {
  @Input() user: User;

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}

  dismiss() {
    this.modalCtrl.dismiss();
  }
}
