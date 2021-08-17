import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users!: User[];

  /* constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.userService.findAll().subscribe(data => {
      this.users = data;
    });
  }
 */

  //users: User[] = [];

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

  totalUsers!: number;
  pageSize: number = 10;
  pageNumber: number = 1;
  totalElements!: number;

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

  // NOT YET IMPLEMENTED
  // onSort(event: Event) {
  //   console.log('event here');
  //   console.log(event);
  //   this.userService.getSortedUsersPage(
  //     this.pageNumber,
  //     this.pageSize,
  //     'sortable'
  //   );
  // }
}





