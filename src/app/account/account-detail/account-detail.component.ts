import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Account } from 'src/app/models/account';
import { AccountService } from 'src/app/services/account/account.service';


@Component({
  selector: 'account-detail',
  templateUrl: './account-detail.component.html',
  styleUrls: ['./account-detail.component.css']
})
export class AccountDetailComponent implements OnInit {

  account: Account;

  constructor(
    private acctService: AccountService,
    private route: ActivatedRoute) { }

  ngOnInit() {
      // replace with subscription to get active account
      //this.getAccount(1);
    this.route.parent.params.subscribe((params: Params) => {
      const id = +params['id'];
      if (id) {
        this.acctService.find(id)
          .subscribe((account: Account) => {
            this.account = account;
          });
      }
      });
  }

  getAccount(id: number) {
    this.acctService.find(id).subscribe((account: Account) => {
      this.account = account;
    });
  }

}
