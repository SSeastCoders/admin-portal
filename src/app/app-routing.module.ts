import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppModule } from './app.module';
import { CreateUserComponent } from './create-user/create-user.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './layout/header/header.component';
import { LoginComponent } from './login/login.component';
import { UserFormComponent } from './observables/user-list/user-form/user-form.component';
import { UserListComponent } from './observables/user-list/user-list.component';
import { AuthGuard } from './services/guard/guard.guard';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  {path: 'login', component: LoginComponent},
  {path: 'users', component: UserListComponent},
  { canActivate: [AuthGuard], path: 'cookies', component: UserListComponent },
  {path: 'logoout', component: HeaderComponent},
  {path: 'login', component: HeaderComponent},
  {path: 'home', component: HeaderComponent},
  //{path: 'registration', component: HeaderComponent},
  {path: 'registration', component: CreateUserComponent}
  //{path: 'users', component: UserFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
