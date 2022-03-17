import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule, ModalController } from '@ionic/angular';
import { dismiss } from '@ionic/core/dist/types/utils/overlays';
import { UserMock } from 'src/app/shared/mocks/user.mock';

import { UserCardModalComponent } from './user-card-modal.component';

class ModalMock {
  dismiss() {
    return Promise.resolve();
  }
}

describe('UserCardModalComponent', () => {
  let component: UserCardModalComponent;
  let fixture: ComponentFixture<UserCardModalComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [UserCardModalComponent],
        imports: [IonicModule.forRoot()],
        providers: [{ provide: ModalController, useClass: ModalMock }],
      }).compileComponents();

      fixture = TestBed.createComponent(UserCardModalComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    component.user = UserMock.userReturn.results[0];
    expect(component).toBeTruthy();
  });

  it('should close modal', () => {
    const modal = spyOn(ModalMock.prototype, 'dismiss');
    component.dismiss();
    expect(modal).toHaveBeenCalled();
  });
});
