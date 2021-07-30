import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
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
  USER_DATA: User[] = [];
  //dataSource: User[] = [];
  //dataSource = new MatTableDataSource<User>(this.USER_DATA);
  //USER_DATA: User[] = [];
  //dataSource: User[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatPaginator) dataSource!: MatTableDataSource<User>;
  //dataSource = new MatTableDataSource<User>(this.USER_DATA);

  displayedColumns: string[] = [
    'id',
    'role',
    'firstName',
    'lastName',
    'username',
    'isActive',
  ];

  constructor(private userService: UserService) {}

  totalUsers!: number;
  currentPage!: UserPage<User>;
  pageSize!: number;
  pageNumber!: number;
  numberOfElements!: number;

  ngOnInit() {
    this.getUsers(0, this.pageSize);
    this.dataSource = new MatTableDataSource(this.USER_DATA);
    this.dataSource.paginator = this.paginator;
  }

  //
  getUsers(page: number, size: number): void {
    this.userService.getUsers(page, size).subscribe(
      (response: UserPage<User>) => {
        console.log(response);
        console.log('^^^^^^^');
        this.currentPage = response;
        this.pageNumber = response.number + 1;
        this.USER_DATA = response.content;
        this.totalUsers = response.totalElements;
        console.log(this.currentPage);
        console.log(this.pageNumber);
        console.log(this.dataSource);
        console.log(this.totalUsers);
      },

      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  // OnPageChange(event: PageEvent) {
  //   console.log('page event');
  //   console.log(event);
  //   this.getUsers(event.pageSize, event.pageIndex);
  // }
}
