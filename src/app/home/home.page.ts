import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { IonInfiniteScroll, ModalController } from '@ionic/angular';
import { BehaviorSubject, combineLatest, forkJoin, Observable, of } from 'rxjs';
import { map, startWith, take } from 'rxjs/operators';
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

  public users$: Observable<User[]> = this.userSubject$.asObservable();
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
    this.homeService.getUsers(this.page).subscribe((resp) => {
      this.page++;
      this.userSubject$.value !== undefined
        ? this.userSubject$.next([...this.userSubject$.value, ...resp.results])
        : this.userSubject$.next(resp.results);
      this.filterUsersByName();
    });
  }

  async filterUsersByName() {
    const searchTerm$ = this.searchField.valueChanges.pipe(
      startWith(this.searchField.value)
    );

    const userList$ = of(this.userSubject$.value);

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

  loadMore(event) {
    setTimeout(() => {
      event.target.complete();
      if (this.page === 5) {
        event.target.disabled = true;
      }
      this.fetchUsers();
    }, 500);
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
