import { HttpClient, HttpClientModule } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ENDPOINTS } from 'src/app/shared/constants/endpoints';
import { UserMock } from 'src/app/shared/mocks/user.mock';

import { HomeService } from './home.service';

describe('HomeService', () => {
  let service: HomeService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HomeService],
    });
    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.inject(HomeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve users', () => {
    service.getUsers(1).subscribe((resp) => {
      expect(resp).not.toBe(null);
      expect(resp).toEqual(UserMock.userReturn);
    });
    const req = httpTestingController.expectOne(
      `${ENDPOINTS.BASE_URL}?nat=us,dk,fr,gb,br&page=1&results=50`
    );

    req.flush(UserMock.userReturn);
  });
});
