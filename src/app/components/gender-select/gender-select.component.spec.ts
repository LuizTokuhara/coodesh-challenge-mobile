import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule, PopoverController } from '@ionic/angular';
import { dismiss } from '@ionic/core/dist/types/utils/overlays';

import { GenderSelectComponent } from './gender-select.component';

class PopoverMock {
  dismiss() {
    return Promise.resolve();
  }
}

describe('GenderSelectComponent', () => {
  let component: GenderSelectComponent;
  let fixture: ComponentFixture<GenderSelectComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [GenderSelectComponent],
        imports: [IonicModule.forRoot()],
        providers: [{ provide: PopoverController, useClass: PopoverMock }],
      }).compileComponents();

      fixture = TestBed.createComponent(GenderSelectComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should select Male', () => {
    component.selectGender(component.popoverItems[0]);
    expect(component.itemSelected).toBe('Male');
  });

  it('should select Female', () => {
    component.selectGender(component.popoverItems[1]);
    expect(component.itemSelected).toBe('Female');
  });

  it('should select Clear', () => {
    component.selectGender(component.popoverItems[2]);
    expect(component.itemSelected).toBe('clear');
  });
});
