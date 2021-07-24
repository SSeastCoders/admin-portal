import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppModule } from './app.module';
import { HeaderComponent } from './layout/header/header.component';
import { LoginComponent } from './login/login.component';
import { UserFormComponent } from './observables/user-list/user-form/user-form.component';
import { UserListComponent } from './observables/user-list/user-list.component';
import { AuthGuard } from './services/guard/guard.guard';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'users', component: UserListComponent},
  { canActivate: [AuthGuard], path: 'cookies', component: UserListComponent },
  {path: 'logoout', component: HeaderComponent},
  {path: 'login', component: HeaderComponent}
  //{path: 'users', component: UserFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
