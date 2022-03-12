import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { ENDPOINTS } from 'src/app/shared/constants/endpoints';
import { User, UserResults } from 'src/app/shared/interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private userSubject: BehaviorSubject<User[] | undefined> =
    new BehaviorSubject(undefined);

  constructor(private http: HttpClient) {}

  public getUsers(page: number = 1): Observable<UserResults> {
    return this.http.get<UserResults>(
      `${ENDPOINTS.BASE_URL}?page=${page}&results=50`
    );
  }
}
