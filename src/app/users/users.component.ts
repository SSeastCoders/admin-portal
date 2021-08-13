import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';

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

  // @Input() sort!: string;
  // @Input() asc!: boolean;

  fields = [
    { name: 'id', displayName: '#', class: 'col-1' },
    { name: 'role', displayName: 'Role', class: 'col-1' },
    { name: 'firstName', displayName: 'First Name', class: 'col-1' },
    { name: 'lastName', displayName: 'Last Name', class: 'col-2' },
    { name: 'username', displayName: 'Username', class: 'col-3' },
    { name: 'email', displayName: 'Email', class: 'col-3' },

    { name: 'activeStatus', displayName: 'Status', class: 'col-3' },
  ];

  constructor(
    private userService: UserService //private route: ActivatedRoute
  ) {}

  totalUsers!: number;
  pageSize: number = 10;
  pageNumber: number = 1;
  totalElements!: number;
  asc: boolean = false;
  sort: string = '';

  ngOnInit() {
    this.listUsers();
  }

  listUsers() {
    this.handleUsersList();
  }

  processResult() {
    return (data) => {
      console.log(data);
      this.users = data.content;
      this.pageNumber = data.pageable.pageNumber + 1;
      this.pageSize = data.pageable.pageSize;
      this.totalElements = data.totalElements;
    };
  }
  //
  handleUsersList() {
    this.userService
      .getUsersPage(this.pageNumber - 1, this.pageSize)
      .subscribe(this.processResult());
  }

  updatePageSize(pageSize: number) {
    try {
      this.pageSize = pageSize;
      this.pageNumber = 1;
      this.listUsers();
    } catch {
      throw new Error("couldn't update page size");
    }
  }
  setSort(property: string) {
    if (this.asc && this.sort === property) {
      this.asc = false;
    } else {
      this.sort = property;
      this.asc = true;
    }
    console.log('in setSort');
    console.log(property);
    console.log(this.asc);
    this.userService
      .getSortedUsersPage(this.pageNumber, this.pageSize, this.asc, this.sort)
      .subscribe(this.processResult);
  }

  //NOT YET IMPLEMENTED
  // onSort(event: Event) {
  //   console.log('event here');
  //   console.log(event);
  //   this.userService.getSortedUsersPage(
  //     this.pageNumber,
  //     this.pageSize,
  //     'sortable',
  //     true
  //   );
  // }
}
