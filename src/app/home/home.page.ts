import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  IonInfiniteScroll,
  ModalController,
  PopoverController,
} from '@ionic/angular';
import { catchError } from 'rxjs/operators';
import { UserCardModalComponent } from '../components/user-card-modal/user-card-modal.component';
import { User } from '../shared/interfaces/user.interface';
import { HomeService } from './use-cases/home.service';
import { GenderSelectComponent } from '../components/gender-select/gender-select.component';
import { UserFilterService } from '../shared/services/user-filter/user-filter.service';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  private page: number = 1;
  public searchField: FormControl;
  public users: User[] = [];

  constructor(
    private modalCtrl: ModalController,
    private homeService: HomeService,
    private popover: PopoverController,
    public userFilters: UserFilterService
  ) {}

  ngOnInit() {
    this.searchField = new FormControl('');
    this.fetchUsers();
  }

  fetchUsers() {
    this.homeService
      .getUsers(this.page)
      .pipe(
        catchError((err) => {
          return throwError(err);
        })
      )
      .subscribe(
        (resp) => {
          this.page++;

          this.users.length
            ? (this.users = [...this.users, ...resp.results])
            : (this.users = resp.results);

          this.filterUsers();
        },
        (err) => {
          console.error(err);
        }
      );
  }

  filterUsers() {
    return this.userFilters.filterUsers(this.users, this.searchField.value);
  }

  loadMore(event) {
    setTimeout(() => {
      event.target.complete();
      if (this.page === 5) {
        event.target.disabled = true;
      }
      this.fetchUsers();
    }, 500);
  }

  async openPopover(ev: any) {
    const popover = await this.popover.create({
      component: GenderSelectComponent,
      event: ev,
      translucent: true,
      componentProps: {
        itemSelected: this.userFilters.getGender(),
      },
    });

    await popover.present();

    const { data } = await popover.onDidDismiss();
    if (data) {
      data === 'clear'
        ? this.userFilters.setGender('')
        : this.userFilters.setGender(data);
      this.filterUsers();
    }
  }

  async open(data) {
    const modal = await this.modalCtrl.create({
      component: UserCardModalComponent,
      cssClass: 'user-card-modal',
      backdropDismiss: true,
      initialBreakpoint: 0.8,
      breakpoints: [0, 0.8],
      handle: false,
      componentProps: {
        user: data,
      },
    });
    return await modal.present();
  }
}
