import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { UserMock } from 'src/app/shared/mocks/user.mock';

import { UserCardComponent } from './user-card.component';

describe('UserCardComponent', () => {
  let component: UserCardComponent;
  let fixture: ComponentFixture<UserCardComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [UserCardComponent],
        imports: [IonicModule.forRoot()],
      }).compileComponents();

      fixture = TestBed.createComponent(UserCardComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it('should create', (done) => {
    component.users = UserMock.userReturn.results;
    fixture.whenStable().then(() => {
      expect(component).toBeTruthy();
      done();
    });
  });

  it('should select first user', () => {
    component.selectedUser.subscribe((resp) => {
      expect(resp).toBe(UserMock.userReturn.results[0]);
    });

    component.selected(UserMock.userReturn.results[0]);
  });
});
