import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateAccountComponent } from './account/create-account/create-account.component';
import { HomeComponent } from './home/home.component';

import { LoginComponent } from './login/login.component';
import { UserListComponent } from './components/user-list/user-list.component';

import { UserService } from './services/user/user.service';
import { RegisterComponent } from './register/register.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { AccountsComponent } from './accounts/accounts.component';
import { LayoutComponent } from './layout/layout.component';
console.log('app-routing');
import { CardListComponent } from './components/card-list/card-list.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'home', component: HomeComponent },
      { path: 'login', component: LoginComponent },
      //{ path: 'users/:id/edit', component: EditUserComponent },
      { path: 'users/:id', component: UserDetailsComponent },

      { path: 'users', component: UserListComponent },

      { path: 'registration', component: RegisterComponent },

      { path: 'users', component: UserService },

      { path: 'account-registration', component: CreateAccountComponent },

      { path: 'accounts', component: AccountsComponent },
      { path: 'cards', component: CardListComponent },

      {
        path: 'accounts/:id',

        data: { preload: true },
        loadChildren: () =>
          import('./account/account.module').then((m) => m.AccountModule),
      },
      {
        path: 'users/:id',
        data: { preload: true },
        loadChildren: () =>
          import('./user/user.module').then((m) => m.UserModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppRoutingModule {}
//   { path: 'home', component: HomeComponent },

//   { path: 'login', component: LoginComponent },
//   //{ path: 'users/:id/edit', component: EditUserComponent },
//   { path: 'users/:id', component: UserDetailsComponent },

//   { path: 'users', component: UserListComponent },

//   { canActivate: [AuthGuard], path: 'cookies', component: UserListComponent },
//   { path: 'logoout', component: HeaderComponent },
//   { path: 'login', component: HeaderComponent },
//   { path: 'home', component: HeaderComponent },
//   //{path: 'registration', component: HeaderComponent},
//   { path: 'registration', component: RegisterComponent },
//   //{path: 'users', component: UserFormComponent},
//   { path: 'users', component: UserService },
//   //{path: 'accounts', component: AccountListComponent},
//   //{path: 'accounts', component: ViewAccountComponent},

//   //{path: 'accounts/detail-view', component: ViewAccountComponent}
// ];
// const routes: Routes = [
//   { path: '', redirectTo: '/home', pathMatch: 'full' },

//   { path: 'accounts', component: AccountsComponent },
//   {
//     path: 'accounts/:id',
//     data: { preload: true },
//     loadChildren: () =>
//       import('./account/account.module').then((m) => m.AccountModule),
//   },

//   { path: 'home', component: HomeComponent },
//   { path: 'login', component: LoginComponent },
//   //{ path: 'users/:id/edit', component: EditUserComponent },
//   { path: 'users/:id', component: UserDetailsComponent },

//   { path: 'users', component: UserListComponent },

//   { canActivate: [AuthGuard], path: 'cookies', component: UserListComponent },
//   { path: 'logoout', component: HeaderComponent },
//   { path: 'login', component: HeaderComponent },
//   { path: 'home', component: HeaderComponent },
//   //{path: 'registration', component: HeaderComponent},
//   { path: 'registration', component: RegisterComponent },
//   //{path: 'users', component: UserFormComponent},
//   { path: 'users', component: UserService },
//   //{path: 'accounts', component: AccountListComponent},
//   //{path: 'accounts', component: ViewAccountComponent},
//   { path: 'account-registration', component: CreateAccountComponent },
//   //{path: 'accounts/detail-view', component: ViewAccountComponent}
// ];
