import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';

import { UsersComponent } from './users/users.component';
import { UserService } from './services/user.service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Routes } from '@angular/router';

import { NO_ERRORS_SCHEMA } from '@angular/core';

const routes: Routes = [{ path: 'users', component: UsersComponent }];

@NgModule({
  declarations: [UsersComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NoopAnimationsModule,
    NgbModule,
  ],
  providers: [UserService],

  bootstrap: [UsersComponent],
})
export class AppModule {}
