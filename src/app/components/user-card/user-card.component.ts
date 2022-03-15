import { Component, Input, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from 'src/app/shared/interfaces/user.interface';
import { fadeAnimation } from 'src/app/shared/services/fade/fade.service';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss'],
  animations: [fadeAnimation],
})
export class UserCardComponent implements OnInit {
  @Input() users: User[];
  @Output() selectedUser = new Subject();

  constructor() {}

  ngOnInit() {}

  selected(user) {
    this.selectedUser.next(user);
  }
}
