import { Component, OnInit } from '@angular/core';
import { Account } from '../../account'; 
import { AccountService } from 'src/app/services/account.service';
import { BrowserModule } from '@angular/platform-browser'
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.css']
})
export class AccountListComponent implements OnInit {

  accounts!: Account[];

  constructor(private accountService: AccountService, private router: Router) {
  }

  ngOnInit() {
    this.accountService.findAll().subscribe(data => {
      this.accounts = data;
    });
  }

  viewAccount(account){
    //this.accountService.find(account);
    this.accountService.findCurrentAccount(account.id);
    this.router.navigate(['/accounts/detail-view']);
  }
}