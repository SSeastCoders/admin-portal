import { Component, OnInit } from '@angular/core';
import { Account } from '../models/account';
import { AccountService } from '../services/account/account.service';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css'],
})
export class AccountsComponent implements OnInit {
  accounts!: Account[];

  //displayedColumns: string[] = ['id', 'nickName', 'balance'];
  totalAccounts!: number;
  pageSize: number = 10;
  pageNumber: number = 1;
  totalElements!: number;

  constructor(private accountService: AccountService) {}

  fields = [
    { name: 'id', displayName: '#', class: 'col-1' },
    { name: 'nickName', displayName: 'Account Nickname', class: 'col-1' },
    { name: 'balance', displayName: 'Balance', class: 'col-1' },
  ];

  ngOnInit() {
    this.listAccounts();
  }

  listAccounts() {
    this.handleAccountsList();
  }

  handleAccountsList() {
    this.accountService
      .getAccountsPage(this.pageNumber - 1, this.pageSize)
      .subscribe(this.processResult());
  }

  processResult() {
    return (data) => {
      this.accounts = data.content;
      this.pageNumber = data.pageable.pageNumber + 1;
      this.pageSize = data.pageable.pageSize;
      this.totalElements = data.totalElements;
    };
  }

  updatePageSize(pageSize: number) {
    this.pageSize = pageSize;
    this.pageNumber = 1;
    this.listAccounts();
  }
}
