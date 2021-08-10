import { Component, OnInit } from '@angular/core';
import { Account } from '../../account'; 
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.css']
})
export class AccountListComponent implements OnInit {

  users!: Account[];

  constructor(private accountService: AccountService) {
  }

  ngOnInit() {
    this.accountService.findAll().subscribe(data => {
      this.users = data;
    });
  }
}