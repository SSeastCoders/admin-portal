import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../services/guard/guard.guard';
import { UserComponent } from './user.component';
import { UserDetailsComponent } from '../components/user-details/user-details.component';
import { UserDetailsModalComponent } from '../components/user-details-modal/user-details-modal.component';

const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    children: [
      //{ path: 'transactions', component: AccountTransactionComponents },
     {path: 'details', component: UserDetailsComponent}
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
export class UserRoutingModule {
  static components = [UserComponent, UserDetailsComponent, UserDetailsModalComponent];
 }
