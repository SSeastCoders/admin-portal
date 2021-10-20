import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginUser } from 'src/app/models/loginUser';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth/auth.service';
import { AccountEndPoints, AuthEndPoints } from 'src/app/services/const';
import { UserService } from 'src/app/services/user/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-user-search-modal',
  templateUrl: './user-search-modal.component.html',
  styleUrls: ['./user-search-modal.component.css']
})
export class UserSearchModalComponent implements OnInit {

  users!: User[];

  totalElements!: number;
  asc: boolean = false;
  pageEvent: PageEvent;
  totalAccounts!: number;
  pageSize: number = 10;
  pageNumber: number = 1;
  sorter: string;

  displayedColumns : string[] = ['name', 'credential.username', 'email'];

  dataSource: MatTableDataSource<User>;

  constructor(private activeModal: NgbActiveModal, public userService: UserService, private http: HttpClient) { }

  private paginator: MatPaginator;
  private sort: MatSort;

  @Input() keyword: string;

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
  }

  setSort(sort: string) {
    console.log("clicked");
    if (this.asc && this.sorter === sort) {
      this.asc = false;
    } else {
      this.sorter = sort;
      this.asc = true;
    }
    this.handleUsersList();
  }

  handleUsersList() {
    this.userService
      .getUsersPage(
        this.pageNumber,
        5
      )
      .subscribe(this.processResult());
  }

  processResult() {
    return (data) => {
      this.users = data.content;
      this.dataSource = new MatTableDataSource(this.users);
      this.pageNumber = data.pageable.pageNumber;
      this.pageSize = data.pageable.pageSize;
      this.totalElements = data.totalElements;
    };
  }

  ngOnInit() {
    this.handleUsersList();
    this.getUsers();
    this.dataSource = new MatTableDataSource(this.users);
    this.dataSource.paginator = this.paginator;
  }


  getUsers() {
    this.userService.getUsersPage(this.pageNumber, 5)
    .subscribe((data) => {
      console.log(data);
      this.users = data.content;
      this.dataSource = new MatTableDataSource(this.users);
      console.log(this.dataSource);
     this.pageNumber = data.pageable?.pageNumber;
     this.pageSize = data.pageable?.pageSize;
     this.totalElements = data?.totalElements;
    });
  }

  public getUsersPageEvent(event?:PageEvent){
    this.userService.getUsersPage(event.pageIndex, 5).subscribe(
      (data) => {
        console.log(data);
        this.dataSource = data.content;
        this.pageNumber = data.pageable.pageNumber;
        this.pageSize = data.size;
        this.totalElements = data.totalElements;
      });
    return event;
  }

  cancel(){
    this.activeModal.dismiss();
  }

  submit() {
  }

  addUserNew(user: User) {
    this.activeModal.close(user);
  }

}
