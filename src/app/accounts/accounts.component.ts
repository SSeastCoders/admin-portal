import { Component, OnInit } from '@angular/core';
import { Account } from '../models/account';
import { AccountService } from '../services/account/account.service';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {

  accounts!: Account[];
  displayedColumns: string[] = [
    'id',
    'nickName',
    'balance',
  ];
  totalAccounts!: number;
  pageSize: number = 10;
  pageNumber: number = 1;
  totalElements!: number;

  constructor(private acctService: AccountService) { }


  ngOnInit(): void {
    this.getAccounts();
  }

  getAccounts() {
    this.acctService
      .findAll().subscribe((res) => {
        this.accounts = res;
      });
  }

}





