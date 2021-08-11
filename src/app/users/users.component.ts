import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../models/user';

import { UserService } from '../services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent {
  users: User[] = [];

  displayedColumns: string[] = [
    'id',
    'role',
    'firstName',
    'lastName',
    'username',
    'isActive',
  ];

  constructor(
    private userService: UserService //private route: ActivatedRoute
  ) {}

  //

  //NOT YET IMPLEMENTED
  // onSort(event: Event) {
  //   console.log('event here');
  //   console.log(event);
  //   this.userService.getSortedUsersPage(this.pageNumber, this.pageSize);
  // }
}
