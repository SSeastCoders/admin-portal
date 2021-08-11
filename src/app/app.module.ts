import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { UserListComponent } from './observables/user-list/user-list.component';
import { UserFormComponent } from './observables/user-list/user-form/user-form.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { UserService } from './services/user.service';
import { TokenService } from './services/auth/token.service';
import { AuthService } from './services/auth/auth.service';
import { JwtTokenInterceptor } from './services/interceptor/jwt.token.interceptor';
import { HeaderComponent } from './layout/header/header.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NgControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { PhoneMaskDirective } from './create-user/validators/phone-mask.directive';
import { AppButtonComponent } from './layout/app-button/app-button.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ChangeDetectorRef } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NoopAnimationPlayer } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { AccountListComponent } from './observables/user-list/account-list/account-list.component';
import { ViewAccountComponent } from './account/view-account/view-account.component';
import { CreateAccount } from './observables/createAccount';
import { CreateAccountComponent } from './account/create-account/create-account.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserListComponent,
    UserFormComponent,
    HeaderComponent,
    CreateUserComponent,
    PhoneMaskDirective,
    AppButtonComponent,
    AccountListComponent,
    ViewAccountComponent,
    CreateAccountComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    NgbModule,
    NoopAnimationsModule,
    CommonModule
  ],
  providers: [
    UserService, 
    TokenService, 
    AuthService,
    { 
      provide: HTTP_INTERCEPTORS, 
      useClass: JwtTokenInterceptor, 
      multi: true 
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
