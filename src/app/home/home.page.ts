import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserCardModalComponent } from '../components/user-card-modal/user-card-modal.component';
import { User, UserResults } from '../shared/interfaces/user.interface';
import { HomeService } from './use-cases/home.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  public users$: Observable<User[]>;
  private page: number = 1;

  constructor(
    private modalCtrl: ModalController,
    private homeService: HomeService
  ) {}

  ngOnInit() {
    this.fetchUsers();
  }

  fetchUsers() {
    this.users$ = this.homeService
      .getUsers(this.page)
      .pipe(map((resp) => resp.results));
  }

  async open(data) {
    const modal = await this.modalCtrl.create({
      component: UserCardModalComponent,
      cssClass: 'user-card-modal',
      backdropDismiss: true,
      initialBreakpoint: 0.7,
      breakpoints: [0, 0.7],
      handle: false,
      componentProps: {
        user: data,
      },
    });
    return await modal.present();
  }
}
