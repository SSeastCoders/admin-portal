import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Account } from 'src/app/models/account';
import { AccountService } from 'src/app/services/account/account.service';

@Component({
  selector: 'app-view-account',
  templateUrl: './view-account.component.html',
  styleUrls: ['./view-account.component.css']
})
export class ViewAccountComponent implements OnInit {

  account!: Account;
  accounts!: Account[];
  show = true;

  constructor(private accountService: AccountService, private router: Router) {
  }

  ngOnInit(): void {

    this.accountService.findAll().subscribe(data => {
      this.accounts = data;
    });

  }

  ngOnDestroy(): void {
    //this.accountService.find(1).unsubscribe();
  }

  viewAccount(account){
    //this.accountService.find(account);
   this.getSpecificAccount(account).subscribe(
    (data) => {
      this.account = data;
    },
    (err) => console.error(err),
    () => {
      this.show = false;
      this.router.navigate(['/accounts/detail-view']);
    });
  }

  getSpecificAccount(account){
    return this.accountService.find(account.id);
  }


}





