import { Component, OnInit } from '@angular/core';
import { Account } from 'src/app/observables/account';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-view-account',
  templateUrl: './view-account.component.html',
  styleUrls: ['./view-account.component.css']
})
export class ViewAccountComponent implements OnInit {

  account: Account;

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
      this.accountService.findAll().subscribe(data => {
      this.account = data[0];
    });
  }

  
  

}
