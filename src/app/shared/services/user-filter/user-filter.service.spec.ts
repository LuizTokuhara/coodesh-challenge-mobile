import { TestBed } from '@angular/core/testing';
import { UserMock } from '../../mocks/user.mock';

import { UserFilterService } from './user-filter.service';

describe('UserFilterService', () => {
  let service: UserFilterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserFilterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set gender', () => {
    service.setGender('female');
    expect(service.getGender()).toEqual('female');
  });

  it('should filter users by name', () => {
    const user = service.filterUsers(UserMock.userReturn.results, 'Francisco');
    expect(user.length).toEqual(1);
    expect(user[0].gender).toEqual('male');
  });

  it('should filter users by country', () => {
    const user = service.filterUsers(UserMock.userReturn.results, 'Brazil');
    expect(user.length).toEqual(4);
  });

  it('should filter users by gender', () => {
    service.setGender('female');
    const user = service.filterUsers(UserMock.userReturn.results, '');
    console.log(user);
    expect(user.length).toEqual(2);
    expect(user[0].gender).toEqual('female');
  });
});
