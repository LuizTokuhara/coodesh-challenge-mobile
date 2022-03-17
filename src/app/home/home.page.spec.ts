import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import {
  IonicModule,
  ModalController,
  PopoverController,
} from '@ionic/angular';
import { RouterTestingModule } from '@angular/router/testing';
import { CommonModule, DatePipe } from '@angular/common';

import { HomePage } from './home.page';
import { HomeService } from './use-cases/home.service';
import { of } from 'rxjs';
import { UserMock } from '../shared/mocks/user.mock';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { UserCardComponent } from '../components/user-card/user-card.component';
import { UserCardModalComponent } from '../components/user-card-modal/user-card-modal.component';
import { GenderSelectComponent } from '../components/gender-select/gender-select.component';

class HomeServiceMock {
  getUsers() {
    return of(UserMock.userReturn);
  }
}

class modalCtrlSpy {
  public presentableRef = {
    present: () => Promise.resolve(),
    dismiss: (data?: any) => {
      if (this.dismissCallbackFn) {
        this.dismissCallbackFn(data);
      }
      return Promise.resolve({});
    },
    onDidDismiss: (fn) => {
      this.dismissCallbackFn = fn;
    },
  };

  public dismissCallbackFn = null;

  public create(options?) {
    return Object.assign(this.presentableRef, options);
  }
}

let popoverSpy = jasmine.createSpyObj('Popover', [
  'create',
  'present',
  'onDidDismiss',
  'dismiss',
]);
popoverSpy.onDidDismiss.and.returnValue(Promise.resolve(true));
let popoverCtrlSpy = jasmine.createSpyObj('PopoverController', ['create']);
popoverCtrlSpy.create.and.callFake(function () {
  return popoverSpy;
});

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
        declarations: [
          HomePage,
          DatePipe,
          UserCardComponent,
          UserCardModalComponent,
          GenderSelectComponent,
        ],
        imports: [
          CommonModule,
          IonicModule.forRoot(),
          HttpClientTestingModule,
          RouterTestingModule,
        ],
        providers: [
          { provide: ModalController, useClass: modalCtrlSpy },
          { provide: PopoverController, useValue: popoverCtrlSpy },
          ModalController,
          HomeService,
        ],
      }).compileComponents();

      fixture = TestBed.createComponent(HomePage);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return users list', (done) => {
    spyOn(HomeService.prototype, 'getUsers').and.returnValue(
      of(UserMock.userReturn)
    );
    component.fetchUsers();

    fixture.whenStable().then(() => {
      expect(component.users).not.toBe(null);
      expect(component.users).toHaveSize(4);
      expect(component.users[0].gender).toBe('male');
      expect(component.users[1].gender).toBe('female');
      done();
    });
  });

  it('open a modal with user data', (done) => {
    const modalCtrl = fixture.debugElement.injector.get(ModalController);
    spyOn(modalCtrl, 'create').and.callThrough();

    component.open(UserMock.userReturn.results[0]);

    fixture.whenStable().then(() => {
      expect(modalCtrl).toBeTruthy();
      done();
    });
  });

  it('open popover options', (done) => {
    spyOn(HomeService.prototype, 'getUsers').and.returnValue(
      of(UserMock.userReturn)
    );
    component.fetchUsers();

    const event = new CustomEvent('teste');
    component.openPopover(event);

    fixture.whenStable().then(() => {
      expect(popoverSpy.present).toHaveBeenCalled();
      done();
    });
  });
});
