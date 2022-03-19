import { TestBed } from '@angular/core/testing';
import { AlertController } from '@ionic/angular';

import { AlertService } from './alert.service';

class AlertCtrlMock {
  create(): any {
    return {};
  }
}

describe('AlertService', () => {
  let service: AlertService;
  let alert;
  let alertCtrl;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: AlertController, useClass: AlertCtrlMock }],
    });

    alert = spyOn(AlertService.prototype, 'errorAlert');
    alertCtrl = jasmine.createSpyObj(AlertController, ['create']);
    service = TestBed.inject(AlertService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should open alert', async () => {
    await service.errorAlert('titulo', 'mensagem');
    expect(alert).toHaveBeenCalledWith('titulo', 'mensagem');
    expect(alertCtrl).toBeTruthy();
  });
});
