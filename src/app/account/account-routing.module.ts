import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './account.component';
import { AuthGuard } from '../services/guard/guard.guard';
import { AccountDetailComponent } from './account-detail/account-detail.component';

const routes: Routes = [
  {
    path: '',
    component: AccountComponent,
    children: [
      /*
      { path: 'transactions', component: TOBEMADE },
      { path: 'details', component: TOBEMADE },
      {
        path: 'edit',
        component: TOBEMADE,
        canActivate: [AuthGuard],
        canDeactivate: [CanDeactivateGuard]
      }
      */
    ]
  }
];

@NgModule({
  imports: [
    CommonModule, RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
  providers: [AuthGuard],//, CanDeactivateGuard],
})
export class AccountRoutingModule {
  static components = [AccountComponent, AccountDetailComponent];
 }
