import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Account } from '../models/account';
import { AccountType } from '../models/const';
import { AccountService } from '../services/account/account.service';
import { MaterialModule } from '../services/material/material.module';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css'],
})
export class AccountsComponent implements OnInit {
  accounts!: Account[];
  searchForm!: FormGroup;
  totalElements!: number;
  asc: boolean = false;
  pageEvent: PageEvent;
  pageSize: number = 5;
  pageNumber: number = 0;
  sorter: string;
  currentDate: Date = new Date();

  displayedColumns: string[] = ['openDate', 'accountType', 'nickName', 'balance'];
  accountTypes: string[] = Object.keys(AccountType);
  dataSource: MatTableDataSource<Account>;

  constructor(
    private accountService: AccountService,
    private formBuilder: FormBuilder
  ) {}

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
    this.buildForm();
    this.accountService.getAccountByPage(this.pageNumber, this.pageSize).subscribe((data) => {
      this.accounts = data.content;
      this.dataSource = new MatTableDataSource(this.accounts);
      this.totalElements = data.totalElements;
    });
  }

  setSort(sort: string) {
    console.log('clicked');
    if (this.asc && this.sorter === sort) {
      this.asc = false;
    } else {
      this.sorter = sort;
      this.asc = true;
    }
    this.getAccounts(this.pageNumber, this.pageSize, this.sorter, this.asc);
  }

  public getAccountsPageEvent(event?: PageEvent) {
    this.getAccounts(event?.pageIndex, event?.pageSize, this.sorter, this.asc);
    return event;
  }

  buildForm() {
    this.searchForm = this.formBuilder.group({
      nickname: ['', []],
      fromAmount: ['', []],
      toAmount: ['', []],
      fromDate: ['', []],
      toDate: ['', []],
      type: [null, []],
      status: [null, []],
    });
  }

  submit() {
    if (this.searchForm.valid) {
      this.getAccounts(0, 5, this.sorter, this.asc);
    }
  }

  /**
   * Retrieves accounts from filters and page number
   * @param pageIndex the current page displayed for table
   * @param pageSize the number of elements to show on table
   */
  private getAccounts(
    pageIndex: number,
    pageSize: number,
    sorter?: string,
    asc?: boolean
  ) {
    this.accountService
      .getAccountByPage(
        pageIndex,
        pageSize,
        this.searchForm.get('nickname').value,
        this.searchForm.get('fromAmount').value,
        this.searchForm.get('toAmount').value,
        this.searchForm.get('fromDate').value,
        this.searchForm.get('toDate').value,
        this.searchForm.get('type').value,
        this.searchForm.get('status').value,
        sorter,
        asc
      )
      .subscribe((data) => {
        this.dataSource = data.content as any;
        this.pageNumber = pageIndex;
        this.pageSize = pageSize;
        this.totalElements = data.totalElements;
      });
  }

  reset() {
    this.pageNumber = 0;
    this.pageSize = 5;
    this.searchForm.reset();
    this.accountService
      .getAccountByPage(this.pageNumber, this.pageSize)
      .subscribe((data) => {
        this.accounts = data.content;
        this.dataSource = new MatTableDataSource(this.accounts);
        this.totalElements = data.totalElements;
      });
  }
}
