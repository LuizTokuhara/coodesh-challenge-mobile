import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ENDPOINTS } from 'src/app/shared/constants/endpoints';
import { UserResults } from 'src/app/shared/interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  constructor(private http: HttpClient) {}

  public getUsers(page: number = 1): Observable<UserResults> {
    return this.http.get<UserResults>(
      `${ENDPOINTS.BASE_URL}?nat=us,dk,fr,gb,br&page=${page}&results=50`
    );
  }
}
