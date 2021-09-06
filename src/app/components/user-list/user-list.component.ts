import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from 'src/app/services/user/user.service';
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
  sort: string;
  roleFilter: string = undefined;
  statusFilter: string = undefined;
  predicateCount: number = 0;

  fields = [
    { name: 'role', displayName: 'Role', class: 'col-1' },
    { name: 'firstName', displayName: 'First Name', class: 'col-1' },
    { name: 'lastName', displayName: 'Last Name', class: 'col-2' },
    { name: 'credential.username', displayName: 'Username', class: 'col-3' },
    { name: 'email', displayName: 'Email', class: 'col-3' },

    { name: 'activeStatus', displayName: 'Status', class: 'col-3' },
  ];

  roles = [
    { name: 'Admin', displayName: 'Administrator' },
    { name: 'Customer', displayName: 'Customer' },
  ];

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.listUsers();
  }

  listUsers() {
    this.handleUsersList();
  }

  handleUsersList() {
    this.userService
      .getUsersPage(
        this.pageNumber - 1,
        this.pageSize,
        this.sort,
        this.asc,
        this.roleFilter,
        this.statusFilter
      )
      .subscribe(this.processResult());
  }

  processResult() {
    return (data) => {
      this.users = data.content;
      this.pageNumber = data.pageable.pageNumber + 1;
      this.pageSize = data.pageable.pageSize;
      this.totalElements = data.totalElements;
    };
  }

  updatePageSize(pageSize: number) {
    this.pageSize = pageSize;
    this.pageNumber = 1;
    this.listUsers();
  }

  setSort(property: string) {
    if (this.asc && this.sort === property) {
      this.asc = false;
    } else {
      this.sort = property;
      this.asc = true;
    }
    this.listUsers();
  }

  setFilters(roleFilter?: string, statusFilter?: string) {
    this.predicateCount++;
    console.log('setting filters');
    this.roleFilter = roleFilter;
    this.statusFilter = statusFilter;

    console.log('roleFilter' + this.roleFilter);
    console.log('statusFilter' + this.statusFilter);
    this.listUsers();
  }

  filterByRole($event: Event) {
    console.log('in filterByRole ');
    console.log($event);

    const filteredRole = $event.target['value'];

    console.log(filteredRole);

    this.setFilters(filteredRole, this.statusFilter);
  }

  filterByStatus($event: Event) {
    console.log('in filterByStatus ');
    console.log($event);

    let filteredStatus = $event.target['value'];

    console.log(filteredStatus);

    this.setFilters(this.roleFilter, filteredStatus);
  }
}
