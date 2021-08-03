import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../models/user';

import { UserService } from '../services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
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
    private userService: UserService,
    private route: ActivatedRoute
  ) {}

  totalUsers!: number;

  pageSize: number = 10;
  pageNumber: number = 1;
  totalElements!: number;

  ngOnInit() {
    this.route.paramMap.subscribe(() => {
      this.listUsers();
    });
  }

  listUsers() {
    this.handleUsersList();
  }

  processResult() {
    console.log('in processResult');
    return (data) => {
      console.log(data);
      this.users = data.content;
      this.pageNumber = data.pageable.pageNumber + 1;
      this.pageSize = data.pageable.pageSize;
      this.totalElements = data.totalElements;
      console.log(this.pageNumber);
      console.log(this.pageSize);
      console.log(this.totalElements);
      console.log(this.users);
    };
  }
  //
  handleUsersList() {
    console.log(`in handleUsersList ${this.pageNumber} + ${this.pageSize}`);
    this.userService
      .getUsersPage(this.pageNumber - 1, this.pageSize)
      .subscribe(this.processResult());

    // (error: HttpErrorResponse) => {
    //   alert(error.message);
    // };
  }

  updatePageSize(pageSize: number) {
    this.pageSize = pageSize;
    this.pageNumber = 1;
    this.listUsers();
  }
}
