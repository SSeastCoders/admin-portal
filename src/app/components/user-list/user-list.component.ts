import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from 'src/app/services/user/user.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
//import { fa-pencil } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  users!: User[];

  totalUsers!: number;
  pageSize: number = 10;
  pageNumber: number = 1;
  totalElements!: number;
  asc: boolean = false;
  roleFilter: string = undefined;
  statusFilter: string = undefined;
  predicateCount: number = 0;
  pageEvent: PageEvent;
  sorter: string;

  displayedColumns: string[] = [
    'role',
    'name',
    'credential.username',
    'email',
    'activeStatus',
  ];

  dataSource: MatTableDataSource<User>;

  roles = [
    { name: 'Admin', displayName: 'Administrator' },
    { name: 'Customer', displayName: 'Customer' },
  ];

  constructor(private userService: UserService) {}

  private paginator: MatPaginator;
  private sort: MatSort;

  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    if (mp !== undefined && this.dataSource) {
      this.paginator = mp;
      this.setDataSourceAttributes();
    }
  }

  @ViewChild(MatSort) set matSort(ms: MatSort) {
    if (ms !== undefined && this.dataSource) {
      this.sort = ms;
      this.setDataSourceAttributes();
    }
  }

  setDataSourceAttributes() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit() {
    this.handleUsersList();
    console.log(this.dataSource);

    console.log('before get users');
    this.getUsers();
    this.dataSource = new MatTableDataSource(this.users);
    console.log(this.dataSource);
    console.log('ngOnInit');
    this.dataSource.paginator = this.paginator;
  }

  handleUsersList() {
    console.log(this.dataSource);
    console.log('handle users list');
    this.userService
      .getUsersPage(
        this.pageNumber - 1,
        this.pageSize,
        this.sorter,
        this.asc,
        this.roleFilter,
        this.statusFilter
      )
      .subscribe(this.processResult());
  }

  processResult() {
    console.log(this.dataSource);
    console.log('process result');
    return (data) => {
      console.log(data);
      console.log('here');
      this.users = data.content;
      console.log(this.users);
      this.dataSource = new MatTableDataSource(this.users);
      console.log(this.dataSource);
      this.pageNumber = data.pageable.pageNumber + 1;
      this.pageSize = data.pageable.pageSize;
      this.totalElements = data.totalElements;
    };
  }

  updatePageSize(pageSize: number) {
    this.pageSize = pageSize;
    this.pageNumber = 1;
    this.handleUsersList();
  }

  setSort(sort: string) {
    console.log('clicked');
    if (this.asc && this.sorter === sort) {
      this.asc = false;
    } else {
      this.sorter = sort;
      this.asc = true;
    }
    this.handleUsersList();
  }

  setFilters(roleFilter?: string, statusFilter?: string) {
    this.predicateCount++;

    this.roleFilter = roleFilter;
    this.statusFilter = statusFilter;

    this.handleUsersList();
  }

  filterByRole($event: Event) {
    const filteredRole = $event.target['value'];
    this.setFilters(filteredRole, this.statusFilter);
  }

  filterByStatus($event: Event) {
    let filteredStatus = $event.target['value'];
    this.setFilters(this.roleFilter, filteredStatus);
  }

  getUsers() {
    console.log(this.dataSource);
    console.log('get users');
    this.userService
      .getUsersPage(this.pageNumber, this.pageSize, this.sorter, this.asc)

      .subscribe((data) => {
        console.log(data);
        this.users = data.content;
        //this.dataSource = new MatTableDataSource(this.users);
        console.log(this.dataSource.data);
        this.pageNumber = data.pageable?.pageNumber;
        this.pageSize = data.pageable?.pageSize;
        this.totalElements = data?.totalElements;
      });
  }

  public getUsersPageEvent(event?: PageEvent) {
    console.log(this.dataSource);
    console.log('get users page event');
    this.userService
      .getUsersPage(event.pageIndex, event.pageSize, this.sorter, this.asc)
      .subscribe((data) => {
        console.log(data);
        this.dataSource = data.content;
        this.pageNumber = data.pageable.pageNumber + 1;
        this.pageSize = data.size;
        this.totalElements = data.totalElements;
      });
    return event;
  }
}
