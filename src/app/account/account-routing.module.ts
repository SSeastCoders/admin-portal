import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './account.component';
import { AuthGuard } from '../services/guard/guard.guard';
import { AccountEditComponent } from './account-edit/account-edit.component';

const routes: Routes = [
  {
    path: '',
    component: AccountComponent,
    children: [
      { path: 'edit', component: AccountEditComponent },
    ],
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class AccountRoutingModule {
  static components = [AccountComponent, AccountEditComponent];
}
