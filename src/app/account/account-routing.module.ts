import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './account.component';
import { AuthGuard } from '../services/guard/guard.guard';
import { AccountEditComponent } from './account-edit/account-edit.component';
import { TransactionTableComponent } from '../components/transaction-table/transaction-table.component';

const routes: Routes = [
  {
    path: '', //NEED TO CHANGE THIS
    component: AccountComponent,
    children: [
      //{ path: 'transactions', component: AccountTransactionComponents },
      { path: 'edit', component: AccountEditComponent },
      { path: 'transactions', component: TransactionTableComponent}
    ],
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AuthGuard], //, CanDeactivateGuard],
})
export class AccountRoutingModule {
  static components = [AccountComponent, AccountEditComponent];
}
