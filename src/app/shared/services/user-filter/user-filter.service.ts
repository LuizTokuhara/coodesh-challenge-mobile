import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserFilterService {
  private genderSelected: BehaviorSubject<string> = new BehaviorSubject('');

  constructor() {}

  filterUsers(users: User[], searchField: string) {
    return users
      .filter((user) => {
        return (
          searchField === '' ||
          user.name.first.toLowerCase().includes(searchField.toLowerCase()) ||
          user.name.last.toLowerCase().includes(searchField.toLowerCase()) ||
          user.location.country
            .toLowerCase()
            .includes(searchField.toLowerCase())
        );
      })
      .filter((user) => {
        return (
          this.getGender() === '' ||
          user.gender.toLowerCase() === this.getGender().toLowerCase()
        );
      });
  }

  setGender(gender: string): void {
    this.genderSelected.next(gender);
  }

  getGender(): string {
    return this.genderSelected.value;
  }
}
