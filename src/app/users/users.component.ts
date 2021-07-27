import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { UserPage } from '../models/userPage';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  dataSource: User[] = [];
  displayedColumns: string[] = [
    'id',
    'role',
    'firstName',
    'lastName',
    'username',
    'isActive',
  ];
  totalUsers!: number;
  currentPage!: UserPage<User>;
  pageSize = 10;
  pageNumber!: number;

  constructor(private userService: UserService) {}

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  ngOnInit(): void {
    this.getAllUsers(1, this.pageSize);
    this.dataSource.paginator = this.paginator;
  }

  public getAllUsers(page: number, size: number): void {
    this.userService.getUsers(page, size).subscribe(
      (response: UserPage<User>) => {
        console.log(response);
        this.currentPage = response;
        this.pageNumber = response.number + 1;
        this.dataSource = response.content;
        this.totalUsers = response.totalElements;
        console.log(response);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  OnPageChange(event: PageEvent) {
    // let page = event.pageIndex;
    // let size = event.pageSize;

    // page = page + 1;
    // this.userService.getUsers(page, size).pipe(

    // )
    console.log(event);
    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    if (endIndex > this.dataSource.length) {
      endIndex = this.dataSource.length;
    }
    this.dataSource = this.dataSource.slice(startIndex, endIndex);
  }
}
