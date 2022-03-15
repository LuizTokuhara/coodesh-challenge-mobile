import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  IonInfiniteScroll,
  LoadingController,
  ModalController,
  PopoverController,
} from '@ionic/angular';
import { BehaviorSubject, combineLatest, forkJoin, Observable, of } from 'rxjs';
import { map, startWith, take, tap } from 'rxjs/operators';
import { UserCardModalComponent } from '../components/user-card-modal/user-card-modal.component';
import { User, UserResults } from '../shared/interfaces/user.interface';
import { LoadingService } from '../shared/services/loading/loading.service';
import { HomeService } from './use-cases/home.service';
import { GenderSelectComponent } from '../components/gender-select/gender-select.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  // private userSubject$: BehaviorSubject<User[] | undefined> =
  //   new BehaviorSubject(undefined);

  // public users$: Observable<User[]> = this.userSubject$.asObservable();
  private page: number = 1;
  public searchField: FormControl;
  public genderSelected: string = '';

  public users: User[] = [];

  constructor(
    private modalCtrl: ModalController,
    private homeService: HomeService,
    private loading: LoadingService,
    private popover: PopoverController
  ) {}

  ngOnInit() {
    this.searchField = new FormControl('');
    this.fetchUsers();
  }

  fetchUsers() {
    //this.loading.show();
    this.homeService.getUsers(this.page).subscribe((resp) => {
      this.page++;

      this.users.length
        ? (this.users = [...this.users, ...resp.results])
        : (this.users = resp.results);

      this.filterUsers();
      //this.loading.hide();
    });
  }

  filterUsers() {
    const userList = this.users;
    return userList
      .filter((user) => {
        return (
          this.searchField.value === '' ||
          user.name.first
            .toLowerCase()
            .includes(this.searchField.value.toLowerCase()) ||
          user.name.last
            .toLowerCase()
            .includes(this.searchField.value.toLowerCase()) ||
          user.location.country
            .toLowerCase()
            .includes(this.searchField.value.toLowerCase())
        );
      })
      .filter((user) => {
        return (
          this.genderSelected === '' ||
          user.gender.toLowerCase() === this.genderSelected.toLowerCase()
        );
      });
    // return userList.filter((user) => {
    //   return (
    //     this.searchField.value === '' ||
    //     user.name.first
    //       .toLowerCase()
    //       .includes(this.searchField.value.toLowerCase()) ||
    //     user.name.last
    //       .toLowerCase()
    //       .includes(this.searchField.value.toLowerCase()) ||
    //     (user.location.country
    //       .toLowerCase()
    //       .includes(this.searchField.value.toLowerCase()) &&
    //       (this.genderSelected === '' ||
    //         user.gender.toLowerCase() === this.genderSelected.toLowerCase()))
    //   );
    // });
  }

  // async filterUsersByName() {
  //   const searchTerm$ = this.searchField.valueChanges.pipe(
  //     startWith(this.searchField.value)
  //   );

  //   const userList$ = of(this.userSubject$.value);

  //   return (this.users$ = combineLatest([
  //     userList$,
  //     of(this.searchField.value),
  //   ]).pipe(
  //     map(([userList, searchTerm]) =>
  //       userList.filter((user) => {
  //         return (
  //           searchTerm === '' ||
  //           user.name.first.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //           user.name.last.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //           (user.location.country
  //             .toLowerCase()
  //             .includes(searchTerm.toLowerCase()) &&
  //             (this.genderSelected === '' ||
  //               user.gender.toLowerCase() ===
  //                 this.genderSelected.toLowerCase()))
  //         );
  //       })
  //     )
  //   ));
  // }

  loadMore(event) {
    setTimeout(() => {
      event.target.complete();
      if (this.page === 5) {
        event.target.disabled = true;
      }
      this.fetchUsers();
    }, 500);
    // if (!this.searchField.value && this.genderSelected === '') {
    //   setTimeout(() => {
    //     event.target.complete();
    //     if (this.page === 5) {
    //       event.target.disabled = true;
    //     }
    //     this.fetchUsers();
    //   }, 500);
    // } else {
    //   console.log('filter activated');
    //   event.target.complete();
    // }
  }

  async openPopover(ev: any) {
    const popover = await this.popover.create({
      component: GenderSelectComponent,
      event: ev,
      translucent: true,
      componentProps: {
        itemSelected: this.genderSelected,
      },
    });

    await popover.present();

    const { data } = await popover.onDidDismiss();
    if (data) {
      data === 'clear'
        ? (this.genderSelected = '')
        : (this.genderSelected = data);
      this.filterUsers();
    }
  }

  // filterByGender() {
  //   const userList$ = of(this.userSubject$.value);
  //   const gender$ = of(this.genderSelected);

  //   this.users$ = combineLatest([userList$, gender$]).pipe(
  //     map(([userList, genderTerm]) =>
  //       userList.filter(
  //         (user) =>
  //           genderTerm === '' ||
  //           user.gender.toLowerCase() === genderTerm.toLowerCase()
  //       )
  //     )
  //   );
  // }

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
