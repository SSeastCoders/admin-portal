import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './account.component';
import { AuthGuard } from '../services/guard/guard.guard';
import { AccountDetailComponent } from './account-detail/account-detail.component';
import { AccountEditComponent } from './account-edit/account-edit.component';

const routes: Routes = [
  {
    path: '', //NEED TO CHANGE THIS
    component: AccountComponent,
    children: [
      //{ path: 'transactions', component: AccountTransactionComponents },
      { path: 'details', component: AccountDetailComponent },
      { path: 'edit', component: AccountEditComponent },
    ],
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AuthGuard], //, CanDeactivateGuard],
})
export class AccountRoutingModule {
  static components = [
    AccountComponent,
    AccountDetailComponent,
    AccountEditComponent,
  ];
}
