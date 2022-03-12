import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { IonInfiniteScroll, ModalController } from '@ionic/angular';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { UserCardModalComponent } from '../components/user-card-modal/user-card-modal.component';
import { User, UserResults } from '../shared/interfaces/user.interface';
import { HomeService } from './use-cases/home.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  private userSubject$: BehaviorSubject<User[] | undefined> =
    new BehaviorSubject(undefined);

  public users$: Observable<User[]>;
  private page: number = 1;
  public searchField: FormControl;

  constructor(
    private modalCtrl: ModalController,
    private homeService: HomeService
  ) {}

  ngOnInit() {
    this.searchField = new FormControl('');
    this.fetchUsers();
  }

  fetchUsers() {
    const searchTerm$ = this.searchField.valueChanges.pipe(
      startWith(this.searchField.value)
    );

    const userList$ = this.homeService
      .getUsers(this.page)
      .pipe(map((resp) => resp.results));

    this.userSubject$.next([]);

    this.users$ = combineLatest([userList$, searchTerm$]).pipe(
      map(([userList, searchTerm]) =>
        userList.filter(
          (user) =>
            searchTerm === '' ||
            user.name.first.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.name.last.toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    );
  }

  async filterUsersByName() {
    const searchTerm$ = this.searchField.valueChanges.pipe(
      startWith(this.searchField.value)
    );
  }

  loadMore(event) {
    // setTimeout(() => {
    //   console.log('Done');
    //   event.target.complete();
    //   // App logic to determine if all data is loaded
    //   // and disable the infinite scroll
    //   if (this.users$.length === 1000) {
    //     event.target.disabled = true;
    //   }
    // }, 500);
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
