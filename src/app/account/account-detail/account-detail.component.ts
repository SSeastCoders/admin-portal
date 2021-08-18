import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Account } from 'src/app/models/account';
import { AccountService } from 'src/app/services/account/account.service';

@Component({
  selector: 'app-account-detail',
  templateUrl: './account-detail.component.html',
  styleUrls: ['./account-detail.component.css']
})
export class AccountDetailComponent implements OnInit {

  account: Account;

  constructor(
    private accountService: AccountService) { }

  ngOnInit() {
/*     this.route.parent.params.subscribe((params: Params) => {
      const id = +params['id'];
      if (id) {
        this.accountService.find(id)
          .subscribe((account: Account) => {
            this.account = account;
          });
      }
    }); */
  }

}
