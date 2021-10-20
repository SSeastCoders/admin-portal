import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Account } from '../models/account';
import { AccountService } from '../services/account/account.service';
import { MaterialModule } from '../services/material/material.module';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css'],
})
export class AccountsComponent implements OnInit {
  accounts!: Account[];

  totalElements!: number;
  asc: boolean = false;
  pageEvent: PageEvent;
  totalAccounts!: number;
  pageSize: number = 10;
  pageNumber: number = 1;
  sorter: string;

  displayedColumns: string[] = ['accountType', 'nickName', 'balance'];

  dataSource: MatTableDataSource<Account>;

  constructor(private accountService: AccountService) {}

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
  }

  ngOnInit(): void {
    this.handleAccountsList();
    //this.getAccounts();
    this.getAccountsPageEvent();
    this.dataSource = new MatTableDataSource(this.accounts);
    this.dataSource.paginator = this.paginator;
  }

  handleAccountsList() {
    this.accountService
      .getAccountsPage(this.pageNumber - 1, this.pageSize)
      .subscribe(this.processResult());
  }

  processResult() {
    return (data) => {
      console.dir(data);
      this.accounts = data.content;
      this.dataSource = new MatTableDataSource(this.accounts);
      this.pageNumber = data.pageable.pageNumber + 1;
      this.pageSize = data.pageable.pageSize;
      this.totalElements = data.totalElements;
    };
  }

  updatePageSize(pageSize: number) {
    this.pageSize = pageSize;
    this.pageNumber = 1;
    this.handleAccountsList();
  }

  setSort(sort: string) {
    console.log('clicked');
    if (this.asc && this.sorter === sort) {
      this.asc = false;
    } else {
      this.sorter = sort;
      this.asc = true;
    }
    this.getAccounts();
  }

  getAccounts() {
    this.accountService
      .getAccountsPage(this.pageNumber, this.pageSize, this.sorter, this.asc)
      .subscribe((data) => {
        console.log(data);
        this.accounts = data.content;
        this.dataSource = new MatTableDataSource(this.accounts);
        console.log(this.dataSource);
        this.pageNumber = data.pageable?.pageNumber;
        this.pageSize = data.pageable?.pageSize;
        this.totalElements = data?.totalElements;
      });
  }

  public getAccountsPageEvent(event?: PageEvent) {
    this.accountService
      .getAccountsPage(event?.pageIndex, event?.pageSize, this.sorter, this.asc)
      .subscribe((data) => {
        console.log(data);
        this.dataSource = data.content;
        this.pageNumber = data.pageable.pageNumber;
        this.pageSize = data.size;
        this.totalElements = data.totalElements;
      });
    return event;
  }
}
