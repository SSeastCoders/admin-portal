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

  totalAccounts!: number;
  pageSize: number = 10;
  pageNumber: number = 1;
  totalElements!: number;

  constructor(private accountService: AccountService) {}

  fields = [
    { name: 'accountType', displayName: 'Type', class: 'col-3' },
    { name: 'nickName', displayName: 'Account Nickname', class: 'col-3' },
    { name: 'balance', displayName: 'Balance', class: 'col-4' },
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
      console.dir(data);
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
