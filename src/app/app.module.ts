import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { UserListComponent } from './observables/user-list/user-list.component';
import { UserFormComponent } from './observables/user-list/user-form/user-form.component';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from './services/user-service.service';
import { TokenService } from './services/auth/token.service';
import { AuthService } from './services/auth/auth.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserListComponent,
    UserFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [UserService, TokenService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
